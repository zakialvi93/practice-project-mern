import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/profile')
        .then(response => setUser(response.data))
        .catch(() => setUser(null));
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });
      setToken(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Login error', error);
    }
  };

  const register = async (name, email, password) => {
    try {
      await axios.post('/register', { name, email, password });
      // Handle post-registration logic here (e.g., redirect to login)
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

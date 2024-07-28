import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onRegisterClick = () => {
    navigate("/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate("/profile");
  };

  return (
    <div>
      <h1>Welcome To Practice Project</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Login Page</h2>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <br />
        <label>Don't have an account? </label>
        <button onClick={onRegisterClick}>Register</button>
      </form>
    </div>
  );
};

export default Login;

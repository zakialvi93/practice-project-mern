import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Users from './components/Users';
import NoPage from './components/NoPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

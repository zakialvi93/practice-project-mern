import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const onAllUsersClick = () => {
    navigate("/users");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/profile', { name, email, password });
      // Optionally, fetch the updated user profile if needed
    } catch (error) {
      console.error('Profile update error', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Logout />
      <h1>Welcome {user.name} to your Profile</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={onAllUsersClick}>See All Users</button>
    </div>
  );
};

export default Profile;

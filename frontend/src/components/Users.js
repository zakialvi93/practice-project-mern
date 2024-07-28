import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const response = await axios.get('/users');
        setUsers(response.data);
      };
      fetchUsers();
    } catch (e) {
      console.log(e);
    }

  }, []);

  return (
    <div>
      <button onClick={() => navigate("/profile")}>Back</button>
      <Logout />
      <h1>All Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

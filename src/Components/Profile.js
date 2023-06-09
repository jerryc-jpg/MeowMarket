import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders, updateUserProfile } from '../store';

const Profile = () => {
  const dispatch = useDispatch();
  const {auth } = useSelector((state) => state);
  const [username, setUsername] = useState(auth.username);
  const [email, setEmail] = useState(auth.email);
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProfile = {
      username,
      email,
      password,
    };
    dispatch(updateUserProfile(updatedProfile));
    setUsername('');
    setEmail('');
    setPassword('');
  };

  

  return (
    <div>
      <h1>Profile Page for {auth.username}</h1>
      <div>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

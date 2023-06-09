import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders, updateUserProfile, loginWithToken } from '../store';

const Profile = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [username, setUsername] = useState(auth.username);
  const [email, setEmail] = useState(auth.email);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e, setFunction) => {
    setFunction(e.target.value);
  };
  
  const handleShowPasswordChange = (e) => {
    setShowPassword(e.target.checked);
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

  useEffect(() => {
    dispatch(loginWithToken()); 
  }, [dispatch]);
  
  if (!auth.username) {
    return <p>Please <Link to='/login'>login</Link> to view the profile.</p>;
  }

  return (
    <div>
      <h1>Profile Page for {auth.username}</h1>
      <div>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => handleChange(e, setUsername)} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => handleChange(e, setEmail)} />
          </label>
          <br />
          <label>
            Password:
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => handleChange(e, setPassword)}
            />          
          </label>
          <label>
            Show Password
            <input
              type="checkbox"
              checked={showPassword}
              onChange={handleShowPasswordChange}
            />
          </label>
          <br />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

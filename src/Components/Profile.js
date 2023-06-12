import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders, updateUserProfile, loginWithToken } from "../store";

const Profile = () => {
   const dispatch = useDispatch();
   const { auth } = useSelector((state) => state);
   const [username, setUsername] = useState(auth.username);
   const [email, setEmail] = useState(auth.email);
   const [password, setPassword] = useState("");
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
         password
      };
      dispatch(updateUserProfile(updatedProfile));
      setUsername("");
      setEmail("");
      setPassword("");
   };

   useEffect(() => {
      dispatch(loginWithToken());
   }, [dispatch]);

   if (!auth.username) {
      return (
         <h2 className="text-center mt-5">
            Please <Link to="/login">login</Link> to view the profile
         </h2>
      );
   }

   return (
      <div className="container">
         <h1 className="mt-3">Profile Page for {auth.username}</h1>
         <div className="mt-4">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
               <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                     Username:
                  </label>
                  <input
                     type="text"
                     className="form-control"
                     id="username"
                     value={username}
                     onChange={(e) => handleChange(e, setUsername)}
                  />
               </div>
               <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                     Email:
                  </label>
                  <input
                     type="email"
                     className="form-control"
                     id="email"
                     value={email}
                     onChange={(e) => handleChange(e, setEmail)}
                  />
               </div>
               <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                     Password:
                  </label>
                  <input
                     type={showPassword ? "text" : "password"}
                     className="form-control"
                     id="password"
                     value={password}
                     onChange={(e) => handleChange(e, setPassword)}
                  />
               </div>
               <div className="form-check mb-3">
                  <input
                     type="checkbox"
                     className="form-check-input"
                     id="showPassword"
                     checked={showPassword}
                     onChange={handleShowPasswordChange}
                  />
                  <label className="form-check-label" htmlFor="showPassword">
                     Show Password
                  </label>
               </div>
               <button type="submit" className="btn btn-primary">
                  Save Changes
               </button>
            </form>
         </div>
      </div>
   );
};

export default Profile;

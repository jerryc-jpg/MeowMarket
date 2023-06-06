<<<<<<< HEAD
import React, { useState } from 'react';
import { attemptLogin, Register } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = ()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
=======
import React, { useState } from "react";
import { attemptLogin, Register } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [credentials, setCredentials] = useState({
      username: "",
      password: ""
   });
>>>>>>> 556c4d7dfd7c0ac7a96bd268d1f6de8eb32d4835

   const onChange = (ev) => {
      setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
   };

<<<<<<< HEAD
  const login = (ev)=> {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate('/');
  };

  const register = (ev)=> {
    ev.preventDefault();
    dispatch(Register(credentials));
    navigate('/');
  };


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={ login }>
        <input
          placeholder='username'
          value = { credentials.username }
          name = 'username'
          onChange = { onChange }
          />
        <input
          placeholder='password'
          name = 'password'
          value={ credentials.password }
          onChange = { onChange }
        />
        <button>Login</button>
        <button onClick={register}>Register</button>
      </form>
    </div>
  );
=======
   const login = (ev) => {
      ev.preventDefault();
      dispatch(attemptLogin(credentials));
      navigate("/");
   };

   const register = (ev) => {
      ev.preventDefault();
      dispatch(Register(credentials));
      navigate("/");
   };

   const isLoginValid = credentials.username === "" || credentials.password === "";

   return (
      <div>
         <h2>Login</h2>
         <form onSubmit={login}>
            <input placeholder="username" value={credentials.username} name="username" onChange={onChange} />
            <input placeholder="password" name="password" value={credentials.password} onChange={onChange} />
            <button disabled={isLoginValid}>Login</button>
            <button onClick={register}>Register</button>
         </form>
      </div>
   );
>>>>>>> 556c4d7dfd7c0ac7a96bd268d1f6de8eb32d4835
};

export default Login;

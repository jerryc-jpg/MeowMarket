import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import AllCats from './AllCats';

const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Meow Market</h1>
      <div>
        Welcome { auth.username }!!
        <button onClick={()=> dispatch(logout())}>Logout</button>
      </div>
      <AllCats />
    </div>
  );
};

export default Home;

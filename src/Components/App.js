import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart, fetchProducts } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';

const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
    dispatch(fetchProducts());
  }, []);

  useEffect(()=> {
    if(auth.id){
      dispatch(fetchCart());
    }
  }, [auth]);
  
  return (
    <div>
      <Navbar/>
      <h1>MeowMarket</h1>
       <Home />
        <div>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/cart' element={ <Cart /> } />
          </Routes>
        </div>
    </div>
  );
};

export default App;

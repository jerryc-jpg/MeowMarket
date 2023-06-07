import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import { Link } from 'react-router-dom';
import { addToCart } from "../store";

const Cart = ()=> {
  const { cart } = useSelector(state => state);
  const dispatch = useDispatch();
  const [items,setItems] = useState([]);

  React.useEffect(() => {
      setItems(cart.lineItems);
  },[cart])
  
  console.log(items);
  return (
    <div>
      <h1>Cart</h1>
      <div>
        {items.map((item) => {
          return(
          <div key={item.id}>
            <p>name: {item.product.name}</p>
            <p>quantity: {item.quantity}</p>
            <button>-</button>
            <input type="number" value={item.quantity} min="1" max="5"/>
            <button onClick={()=>dispatch(addToCart({product:item.product,quantity:1}))}>+</button>
            <hr/>
          </div>
          )
        })}
        
      </div>
      <>
        {/*
          JSON.stringify(cart, null, 2)
      */}
      </>
    </div>
  );
};

export default Cart;

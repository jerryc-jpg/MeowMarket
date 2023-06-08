import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import { Link } from 'react-router-dom';
import { addToCart } from "../store";

const Cart = ()=> {
  const { cart } = useSelector(state => state);
  const dispatch = useDispatch();
  const [items,setItems] = useState([]);
<<<<<<< Updated upstream

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
            <input type="number" Value={item.quantity} min="1" max="5"/>
            <button onClick={()=>dispatch(addToCart({product:item.product,quantity:1}))}>+</button>
            <hr/>
=======
  const [totalPrice,setTotalPrice] = useState(0);
  const [totalQ,setTotalQ] = useState(0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch(checkoutCart());
    navigate('/cart/checkout');
    
  }

  React.useEffect(() => {

    let list = [...cart.lineItems];

    if (list) {
      list.sort(function (a, b) {
        if (a.product.name < b.product.name) {
          return -1;
        }
        if (a.product.name > b.product.name) {
          return 1;
        }
        return 0;
      });
      console.log(list, "line24");
    }

    setItems(list);
    
    const sumPrice = list.reduce((acc,curr)=>{
      acc = acc + curr.product.price * curr.quantity;
      return acc;
    },0)

    const sumQ = list.reduce((acc,curr)=>{
      acc = acc+curr.quantity;
      return acc;
    },0)

    setTotalPrice(sumPrice);

    setTotalQ(sumQ);

  }, [cart]);
  console.log(items,"line46");
  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12">
        <h1>Cart</h1>
        <div>
          {items.map((item) => {
            return (
              <div key={item.id}>
                <img src={item.product.images[0]} />
                <p>name: {item.product.name}</p>
                <p>quantity: {item.quantity}</p>
                {item.product.productType!=='cat'?
                  <>
                    <button
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          product: item.product,
                          quantityToRemove: 1,
                        })
                      )
                    }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} min="1" max="5" />
                    <button
                      onClick={() =>
                        dispatch(addToCart({ product: item.product, quantity: 1 }))
                      }
                    >
                      +
                    </button>
                  </>:null
                }
               
                <button onClick={() =>
                      dispatch(
                        removeFromCart({
                          product: item.product,
                          quantityToRemove: item.quantity,
                        }))}
                      >remove from cart</button>
                <hr />
              </div>
            );
          })}
          <div>
            <div>
              <span>QUANTITY TOTAL: </span>
              <span>{totalQ}</span>
            </div>
            <div>
              <span>ORDER TOTAL: </span>
              <span>{totalPrice}</span>
            </div>
            <button onClick={()=>handleCheckout()}>Checkout</button>
>>>>>>> Stashed changes
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

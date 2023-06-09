import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, checkoutCart, updateProductQuantity } from "../store";


const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [items,setItems] = useState([]);
  const [totalPrice,setTotalPrice] = useState(0);
  const [totalQ,setTotalQ] = useState(0);

  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch(checkoutCart());

    navigate('/cart/checkout'); 
  }

  React.useEffect(() => {
    console.log(typeof(cart.lineItems));
    console.log(cart.lineItems,"line23");
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
    }

    const sumPrice = list.reduce((acc,curr)=>{
      acc = acc + curr.product.price * curr.quantity;
      return acc;
    },0)
    const sumQ = list.reduce((acc,curr)=>{
      acc = acc+curr.quantity;
      return acc;
    },0)

    setItems(list);
    setTotalPrice(sumPrice);
    setTotalQ(sumQ);

  }, [cart]);
 
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
                      onClick={() =>{
                          dispatch(
                            removeFromCart({
                              product: item.product,
                              quantityToRemove: 1,
                            })
                          )
                        }  
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} min="1" max="5" />
                    <button
                      onClick={() =>{
                          dispatch(updateProductQuantity({product:item.product,quantity:-1}));
                          dispatch(addToCart({ product: item.product, quantity: 1 }))
                        }
                      }
                    >
                      +
                    </button>
                  </>:null
                }
               
                <button 
                  onClick={() =>{
                    dispatch(updateProductQuantity({
                      product:item.product,
                      quantity:item.quantity*-1}));
                    dispatch(
                      removeFromCart({
                        product: item.product,
                        quantityToRemove: item.quantity,
                      }))
                    }
                  }
                      >remove from cart</button>
                <hr />
              </div>
            );
          })}
          </div>
          <div>


            <p>
              <span>QUANTITY TOTAL: </span>
              <span>{totalQ}</span>
            </p>
            <p>
              <span>ORDER TOTAL: </span>
              <span>{totalPrice}</span>
            </p>
            <button onClick={()=>handleCheckout()}>Checkout</button>
          </div>
          
        
        </div>
      </div>
    </div>
  );
};

export default Cart;

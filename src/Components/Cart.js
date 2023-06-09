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
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Shopping Cart</h1>
          {items.map((item) => (
            <div className="mb-4" key={item.id}>
              <div className="row align-items-center">
                <div className="col-auto">
                  <img src={item.product.images[0]} alt={item.product.name} className="rounded img-fluid" width={"250px"}/>
                </div>
                <div className="col">
                  <p className="mb-0">Name: {item.product.name}</p>
                  <p className="mb-0">Quantity: {item.quantity}</p>
                  {item.product.productType !== "cat" && (
                    <>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => {
                          dispatch(removeFromCart({ product: item.product, quantityToRemove: 1 }));
                        }}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        max="5"
                        className="form-control d-inline-block w-auto me-1"
                      />
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => {
                          dispatch(updateProductQuantity({ product: item.product, quantity: -1 }));
                          dispatch(addToCart({ product: item.product, quantity: 1 }));
                        }}
                      >
                        +
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      dispatch(updateProductQuantity({ product: item.product, quantity: item.quantity * -1 }));
                      dispatch(removeFromCart({ product: item.product, quantityToRemove: item.quantity }));
                    }}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
              <hr />
            </div>
          ))}
          <div className="d-flex justify-content-end mb-4">
            <div className="cart-summary">
              <p>
                <span>Quantity Total: </span>
                <span>{totalQ}</span>
              </p>
              <p>
                <span>Order Total: </span>
                <span>${totalPrice}</span>
              </p>
              <button className="btn btn-primary" onClick={() => handleCheckout()}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
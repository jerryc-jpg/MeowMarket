import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../store";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [items,setItems] = useState([]);

  React.useEffect(() => {
    const list = [...cart.lineItems];
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
                <hr />
              </div>
            );
          })}
          <button>Checkout</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

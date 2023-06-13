import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCart, fetchOrders } from "../store";

const Checkout = () => {
  const dispatch = useDispatch();
  const { cart, orders } = useSelector((state) => state);
  const [closedOrder, setClosedOrder] = useState({});

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (cart.lineItems.length > 0) {
      dispatch(checkoutCart());
    }
  }, [cart, dispatch]);

  useEffect(() => {
    const currentCartOrder = orders.find((order) => order.isCart === true);
    setClosedOrder(currentCartOrder);
  }, [orders]);

  return (
    <div>
      <h1>Thanks for shopping with us.</h1>
      {closedOrder && <p>Your order number: {closedOrder.id}</p>}
    </div>
  );
};

export default Checkout;

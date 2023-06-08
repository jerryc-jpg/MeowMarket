import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store';

const Profile = () => {
  const dispatch = useDispatch();
  const { orders, auth } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      <h2>Past Orders for {auth.username}</h2>
      {orders.length === 0 ? (
        <p>No past orders</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <>{console.log(order)}</>
            <p>Order ID: {order.id}</p>
            <p>Total: {order.total}</p>
            <ul>
              {order.lineItems.map((item) => (
                <li key={item.id}>
                  {item.product.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;

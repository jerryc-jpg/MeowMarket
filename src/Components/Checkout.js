import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCart, fetchCart } from "../store";
import { useElements, useStripe } from "@stripe/react-stripe-js";

const Checkout = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const { cart, orders } = useSelector((state) => state);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("FETCHING CART !!!!!!!!...");
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          if (cart.lineItems.length > 0) {
            console.log(cart);
            console.log(cart.lineItems);
            console.log("CHECKING OUT CART!!!!!");
            dispatch(checkoutCart());
          }
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }

      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
    });
  }, [stripe]);

  return (
    <div>
      <h1>Thanks for shopping with us.</h1>
      <p>Your order number: {cart && cart.id}</p>
    </div>
  );
};

export default Checkout;

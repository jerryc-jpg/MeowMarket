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
      <div className="vh-100 d-flex justify-content-center align-items-center">
         <div>
            <div className="mb-4 text-center">
               <svg
                  width="75"
                  height="75"
                  fill="currentColor"
                  className="bi bi-check-circle-fill text-success"
                  viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
               </svg>
            </div>
            <div className="text-center">
               <h1>Thank You!</h1>
               <button className="btn btn-outline-dark">
                  <Link to="/" className="text-decoration-none text-dark">
                     Back Home
                  </Link>
               </button>
            </div>
         </div>
      </div>
   );
};

export default Checkout;

import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, LinkAuthenticationElement, useElements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import emailValidator from "email-validator";

export default function CheckoutForm() {
   const stripe = useStripe();
   const elements = useElements();
   const dispatch = useDispatch();
   const [email, setEmail] = useState("");
   const [message, setMessage] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!stripe || !elements) {
         return;
      }

      if (!emailValidator.validate(email)) {
         setMessage("Please enter a valid email address.");
         return;
      }

      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: `${window.location.origin}/#/cart/checkout`,
            receipt_email: email
         }
      });

      if (error) {
         setMessage(error.message);
      } else {
         setMessage("Payment successful!");

         setEmail("");
      }

      setIsLoading(false);
   };

   const handleEmailChange = (e) => {
      const newEmail = e.target.value;
      setEmail(newEmail);
   };

   return (
      <div className="container-md mt-5">
         <h2 className="text-center mb-3">Payment</h2>
         <form id="payment-form" onSubmit={handleSubmit} className="w-50 mx-auto">
            <div className="form-group mb-3">
               <input
                  type="email"
                  id="email-input"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
               />
            </div>
            <div className="form-group mb-3">
               <PaymentElement id="payment-element" className="form-control" />
            </div>
            <div className="d-flex justify-content-end mb-3">
               <button disabled={isLoading} id="submit" className="btn btn-primary">
                  <span id="button-text">
                     {isLoading ? <div className="spinner-border spinner-border-sm" role="status"></div> : "Pay now"}
                  </span>
               </button>
            </div>
            {message && (
               <div id="payment-message" className="text-center">
                  {message}
               </div>
            )}
         </form>
      </div>
   );
}

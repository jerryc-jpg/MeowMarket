import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, LinkAuthenticationElement, useElements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {

    if (!stripe || !elements) {
        return;
    }

    e.preventDefault();
  
    setIsLoading(true);
  
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/#/cart/checkout`,
        receipt_email: email,
      }
    });
  
    
    
    if(error){
        setMessage(error.message);
    }

    setIsLoading(false);
    
  };
  
  const handleEmailChange = (e) => {
    if (e.target && e.target.value) {
      setEmail(e.target.value);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="w-50 m-auto">
      <div className="form-group">
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={handleEmailChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <PaymentElement id="payment-element" className="form-control" />
      </div>
      <button
        disabled={isLoading}
        id="submit"
        className="btn btn-primary btn-block"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner-border spinner-border-sm" role="status"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message" className="text-center mt-2">{message}</div>}
    </form>
  );
}

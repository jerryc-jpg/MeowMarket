import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";

const PaymentPage = () => {
   const token = window.localStorage.getItem("token");
   const visitorOrder = JSON.parse(window.localStorage.getItem("visitorOrder"));
   const { cart } = useSelector((state) => state);
   const [stripePromise, setStripePromise] = useState(null);
   const [clientSecret, setClientSecret] = useState("");
   const [totalPrice, setTotalPrice] = useState(0);

   useEffect(() => {
      let list;
      if (token) {
         list = [...cart.lineItems];
      } else {
         if (visitorOrder) {
            list = [...visitorOrder];
         } else {
            list = [];
         }
      }
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

      const sumPrice = list.reduce((acc, curr) => {
         acc = acc + curr.product.price * curr.quantity;
         return acc;
      }, 0);

      setTotalPrice(sumPrice);
   }, [cart]);

   useEffect(() => {
      fetch("/config").then(async (r) => {
         const { publishableKey } = await r.json();
         setStripePromise(loadStripe(publishableKey));
      });
   }, []);

   useEffect(() => {
      if (totalPrice > 0) {
         fetch("/api/payment/create-payment-intent", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ totalPrice })
         }).then(async (res) => {
            const { clientSecret } = await res.json();
            setClientSecret(clientSecret);
         });
      }
   }, [totalPrice]);

   const appearance = {
      theme: "flat"
   };

   const loader = "auto";

   const options = {
      clientSecret,
      appearance,
      loader
   };

   return (
      <div className="d-flex justify-content-center my-5">
         {stripePromise && clientSecret ? (
            <Elements stripe={stripePromise} options={options}>
               <CheckoutForm />
            </Elements>
         ) : (
            <div className="spinner-border" role="status">
               <span className="visually-hidden">Loading...</span>
            </div>
         )}
      </div>
   );
};

export default PaymentPage;

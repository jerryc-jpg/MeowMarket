const express = require('express');
const app = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = app;


app.post('/create-payment-intent', async (req, res, next) => {
    try {
      const amount  = Math.round(req.body.totalPrice*100);
      const paymentIntent = await stripe.paymentIntents.create({
        currency: 'usd',
        amount,
        automatic_payment_methods: {
            enabled: true,
        },
      });
      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
        return res.status(400).json({ 
            error: {
                message: error.message 
            }
        });
    }
  });



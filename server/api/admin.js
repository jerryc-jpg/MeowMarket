const express = require('express');
const app = express.Router();
const { User, Product } = require('../db');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;


const checkIsAdmin = async (req, res, next) => {
    const token = req.headers.authorization;

    try {
      const {id} = jwt.verify(token, JWT);
      const user = await User.findByPk(id);
      
      if (!user.isAdmin) {
        const error = new Error('NOT AN ADMIN');
        error.status = 403;
        return next(error);
      }
      req.user = user;
      next();
    } catch (error) {
      error.status = 401;
      return next(error);
    }
  };
  

app.post('/products', checkIsAdmin, async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch(e){
    next(e)
  }
});

app.put('/products/:id', checkIsAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (e) {
    next(e);
  }
});

app.delete('/products/:id', checkIsAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    product.destroy();
    res.send(product)
  } catch (e) {
    next(e);
  }
});

app.get('/users/:id', checkIsAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

module.exports = app;

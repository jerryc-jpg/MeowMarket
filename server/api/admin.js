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
  

app.post('/products', async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch(e){
    next(e)
  }
});

app.get('/products', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (e) {
    next(e);
  }
});

app.delete('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    product.destroy();
    res.send(product)
  } catch (e) {
    next(e);
  }
});

app.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/users/:id', checkIsAdmin, async (req, res, next) => {
  try {

    const userId = req.params.id;
    const user = await User.findByPk(userId);
    await user.destroy();
    
    res.send(user);

  } catch (e) {
    console.log("==== ERROR =============")
    console.log(e);
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

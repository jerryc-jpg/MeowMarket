const express = require('express');
const app = express.Router();
const { Product } = require('../db');



  app.get('/', async(req, res, next)=> {
    try {
      const products = await Product.findAll();
      res.send(products);
    }
    catch(ex){
      next(ex);
    }
  });

  app.get('/:id', async(req, res, next)=> {
    try {
      const product = await Product.findByPk(req.params.id);
      res.send(product);
    }
    catch(ex){
      next(ex);
    }
  });

  app.put('/:id', async(req, res, next)=> {
    try {
      const token = req.headers.authorization;
      if (token){
        const{quantity} = req.body; 
        const product = await Product.findByPk(req.params.id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        product.quantity -= quantity;
        await product.save();
        res.send(product);
        }
      
    }
    catch(ex){
      next(ex);
    }
  });
  

  
  module.exports = app;
 
  
  
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
  

  
  module.exports = app;
 
  
  
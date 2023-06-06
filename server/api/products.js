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
      console.log('print');
      console.log(typeof req.params.id,'line18');
      const product = await Product.findOne(req.params.id);
      console.log(product);
      res.send(product);
    }
    catch(ex){
      next(ex);
    }
  });
  
  module.exports = app;
 
  
  
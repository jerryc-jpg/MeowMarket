const express = require('express');
const app = express.Router();
const { Product } = require('../db');

  app.get('/', async(req, res, next)=> {
    try {
      const cats = await Product.findAll();
      res.send(cats);
    }
    catch(ex){
      next(ex);
    }
  });
  
  module.exports = app;
 
  
const express = require('express');
const app = express.Router();
const { Wishlist, User, Product } = require('../db');
module.exports = app;

app.get('/', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        const wishlist = await Wishlist.findAll({
        where: { userId: user.id },
        include: [{
            model: Product
        }]
        });
        res.send(wishlist);
    } catch (ex) {
        next(ex);
    }
    }
);

app.post('/', async(req, res, next)=> {
    try {
        const user = await User.findByToken(req.headers.authorization);
        res.send(await user.addToWishlist(req.body));
    }
    catch(ex){
        next(ex);
    }
    }
);

app.delete('/:id', async(req, res, next)=> {
    try {
        const user = await User.findByToken(req.headers.authorization);
        const wishlist = await Wishlist.findOne({
        where: { userId: user.id, productId: req.params.id }
        });
        await wishlist.destroy();
        res.send(wishlist);
    }
    catch(ex){
        next(ex);
    }
    }
);


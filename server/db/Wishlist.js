const { DataTypes } = require('sequelize');
const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const { INTEGER, UUID, UUIDV4 } = conn.Sequelize;

const Wishlist = conn.define('wishlist', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

User.hasMany(Wishlist);
Wishlist.belongsTo(User);
Product.hasMany(Wishlist);
Wishlist.belongsTo(Product);

module.exports = Wishlist;
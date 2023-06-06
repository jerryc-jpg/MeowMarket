const conn = require('./conn');
const { STRING, TEXT, FLOAT, INTEGER, UUID, UUIDV4 } = conn.Sequelize;

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  productType: {
    type: STRING,
    allowNull: false,
  },
  price:{
    type: FLOAT,  
    allowNull: false
  },
  imgUrl:{
    type: TEXT,
    defaultValue: "",
  },
  breed: {
    type: STRING,
  },
  description:{
    type: TEXT,
  },
  age:{
    type: INTEGER,
  },

});

module.exports = Product;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Stock = new Schema({
  name: {
    type: String
  },
  symbol: {
    type: String
  },
  quantity: {
    type: Number
  },
  price: {
    type:Number
  },
  ismanual: {
    type: Boolean
  },
  iscapital:{
    type:Boolean
  },
  isliquid:{
    type:Boolean
  },
  date:{
    type: Date
  }
},{
    collection: 'stock'
});

module.exports = mongoose.model('Stock', Stock);
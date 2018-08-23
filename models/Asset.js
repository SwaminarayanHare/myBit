var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Asset = new Schema({
  price: {
    type: Number
  },
  iscurrent: {
    type: Boolean
  },
  date:{
    type: Date
  }
},{
    collection: 'asset'
});

module.exports = mongoose.model('Asset', Asset);
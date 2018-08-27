var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Asset = new Schema({
  quantity: {
    type: Number
  },
  iscurrent: {
    type: Boolean
  },
  date:{
    type: Date
  },
  iscapital:{
    type:Boolean
  },
  isliquid:{
    type:Boolean
  }
},{
    collection: 'asset'
});

module.exports = mongoose.model('Asset', Asset);
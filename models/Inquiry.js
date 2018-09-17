var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Inquiry = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  comment:{
    type: String
  },
  date:{
    type: Date
  },
  email: {
    type: String
  },
  phone:{
    type:Number
  },    
  isFulfilled:{
    type: Boolean
  },
  product:{
    type: String
  }
},{
    collection: 'inquiry'
});

module.exports = mongoose.model('Inquiry', Inquiry);
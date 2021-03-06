var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var User = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  phone:{
    type:Number
  },
  dob:{
    type: Date
  },
  password: {
    type: String
  },
  isAdmin: {
    type: Boolean
  },
  isApproved: {
    type: Boolean
  },
  doj:{
    type: Date
  },
  panCard:{
    type: String
  },
  address:{
    type:String
  },
  isActive:{
    type:Boolean
  }
  
},{
    collection: 'users'
});

module.exports = mongoose.model('User', User);
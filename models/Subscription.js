var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Subscription = new Schema({
  userid: {
    type: String
  },
  planid: {
    type: String
  },
  amount: {
    type: Number
  },
  subscriptionDate: {
      type :Date
  },  
  email: {
    type :String
},
firstName: {
    type :String
},
lastName: {
    type :String
},
assetQuantity:{
    type:Number
},
buyingprice:{
    type:Number
}
},{
    collection: 'subscriptions'
});

module.exports = mongoose.model('Subscription', Subscription);
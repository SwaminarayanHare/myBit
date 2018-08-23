var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Plan = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  }
},{
    collection: 'plans'
});

module.exports = mongoose.model('Plan', Plan);
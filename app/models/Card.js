const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Card = new Schema({
  title: {type:String, default:""},
  type: {type:String, default:""}
});

module.exports = mongoose.model('Card', Card);

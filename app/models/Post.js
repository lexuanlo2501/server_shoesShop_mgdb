const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Post = new Schema({
  title: {type:String, default:""},
  type: {type:String, default:""}
});

module.exports = mongoose.model('Post', Post);




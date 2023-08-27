const mongoose = require('mongoose')
const Post = require('./Post')
const Schema = mongoose.Schema

const Person = new Schema({
    name: {type:String},
    age : {type:Number},
    favoritePost: {type:mongoose.Schema.Types.ObjectId, ref: "Post"}


})

module.exports = mongoose.model("Person", Person)
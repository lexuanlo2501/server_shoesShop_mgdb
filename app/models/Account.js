const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Account = new Schema({
    fullName: {type:String, default:""},
    phoneNumber: {type:String, default:""},
    email: {type:String, default:""},
    accName: {type:String, default:""},
    password: {type:String, default:""},
    dateOfBirth: {type:String, default:""},
    gender: {type:String, default:""},
    role: {type:String, default:""},
    lock: {type:Boolean, default:false},


});

module.exports = mongoose.model('Account', Account);

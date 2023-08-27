const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://lelolo:0777216047@cluster0.0gmneaz.mongodb.net/', {
            dbName : "nodejs-test",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect successfully')
    } catch (err) {
        console.log("err:",err)

    }
}

module.exports = {connect}
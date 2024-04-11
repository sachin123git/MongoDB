const mongoose = require('mongoose')

const user_data = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    image : {
        type: String,
    }
})

const user = mongoose.model('User' , user_data)

module.exports = user;
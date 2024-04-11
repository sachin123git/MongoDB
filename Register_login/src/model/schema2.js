const mongoose = require('mongoose')

const travel_data = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    // date: {
    //     type: String,
    //     required: true
    // }
})

const data = mongoose.model('user_datas' , travel_data)

module.exports = data;
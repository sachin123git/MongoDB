const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const user_data = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    },
    tokens: [{
        tokenType: {
        type: String,
        required: true
        }
    }]
})

user_data.methods.generateAuthToken = async function(){
    try{
        const token = await jwt.sign({_id : this._id}, process.env.SECRET_KEY)
        this.tokens.push({tokenType : token})
        await this.save();
        console.log(token)
        return token;
    }catch(err){
        console.log(err)
    } 
}

const user = mongoose.model('User' , user_data)

module.exports = user;
const jwt = require('jsonwebtoken');
const user = require('../model/schema') // can access the data of user using the collection

const auth = async(req , res , next)=>{
    try {
        const token = req.cookies.token
        if (!token) {
            // If token is not available, assume user is not logged in
            // Redirect to the login page or any other appropriate action
            return res.redirect('/login');
        }
        const veryVerified = jwt.verify(token , process.env.SECRET_KEY)
        console.log(veryVerified)
        next();
    } catch (error) {
        console.error(error)
    }
}

module.exports = auth;
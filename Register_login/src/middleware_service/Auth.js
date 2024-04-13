const jwt = require('jsonwebtoken');
const User = require("../model/schema");

const Auth = async(req , res , next)=>{
    try {
        const token = req.cookies.token
        if (!token) {
            // If token is not available, assume user is not logged in
            // Redirect to the login page or any other appropriate action
            return res.redirect('/login');
        }
        const veryVerified = jwt.verify(token , process.env.SECRET_KEY)
        console.log(veryVerified)
        const user = await User.findById(veryVerified._id);

        req.token = token;
        req.user = user; 
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error");
    }
}

const generateAuthToken = async (user) => {
    try {
        const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        user.tokens.push({ tokenType: token });
        await user.save();
        console.log(token);
        return token;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { Auth, generateAuthToken };

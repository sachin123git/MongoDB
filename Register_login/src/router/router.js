
const express = require('express');
const path = require('path');
const { Auth, generateAuthToken } = require('../middleware_service/Auth')
const multer = require('multer');
const mongoose = require('mongoose');
const User = require('../model/schema');
const data = require('../model/schema2');
const {main , generateOTP} = require('../OTP_Verify/verify')
const fs = require('fs');
const { Console } = require('console');
const { send } = require('process');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `src/uploads`)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router.get('/home', (req, res) => {
    res.render('home');
});

router.get('/profile', Auth, async (req, res) => {
    try {
        const user = req.user; // Assuming req.user contains the user data\

        res.render('profile', {
            username: user.username,
            email: user.email,
            image: user.image,
            birthdate : user.birthdate,
            id: user.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', Auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save(); // Save changes to the user

        // Clear the token cookie
        res.clearCookie("token");

        // Redirect to the login page
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

});

router.post('/register', upload.single('image'), async (req, res) => {
    try {
        const body = req.body;
        const existingUser = await User.findOne({ email: body.email });

        if (existingUser) {
            return res.status(400).send("Email already exists");
        }

        const newUser = await User.create({
            username: body.username,
            email: body.email,
            password: body.password,
            birthdate: body.birthdate,
            image: path.join('uploads', req.file.filename)
        });

        const Token = await generateAuthToken(newUser);

        res.cookie('token', Token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60000),
        })

        console.log(newUser);
        console.log(req.file);
        res.redirect('login');
    } catch (error) {

        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/login', async (req, res) => {
    try {
        const body = req.body;
        const user = await User.findOne({
            username: body.username,
            password: body.password
        });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const Token = await generateAuthToken(user);

        res.cookie('token', Token, {
            httpOnly: true,
            expires: new Date(Date.now() + 100000),
        })

        // Render the home page and pass the username as data
        res.render('home', { username: req.cookies.token && user.username });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

router.get('/search', async (req, res) => {
    try {
        const { from, to } = req.query;

        const travel_data = await data.findOne({ from, to });

        if (!travel_data || travel_data.length === 0) {
            return res.status(404).send("No travel data found for the provided criteria");
        }

        console.log(travel_data);
        res.render('home', { data: req.cookies.token && travel_data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/contact', async (req, res) => {
    try {
        const filePath = path.join(`src/view/contact.html`);
        console.log(filePath)

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.send(data);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
// This is a simplified example, adjust according to your actual implementation
let storedOTP; // Variable to store the OTP

router.get('/verify', async (req, res) => {
    try {
        storedOTP = generateOTP(); // Generate OTP and store it
        await main(storedOTP); // Send the OTP via email
        console.log("OTP sent:", storedOTP);
        res.send('Success');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/verify', async (req, res) => {
    try {
        const { otp } = req.body; // Retrieve the OTP entered by the user
        console.log('OTP entered by the user:', otp);

        // Compare the entered OTP with the stored OTP
        if (otp === storedOTP.toString()) { // Compare as strings
            res.render('verifymsg').send('Verified');
        } else {
            console.log('OTP Verification Failed');
            res.send('Invalid OTP');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});





module.exports = router;
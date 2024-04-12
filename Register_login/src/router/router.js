
const express = require('express');
const path = require('path');
const Auth = require('../middleware/Auth')
const multer = require('multer');
const mongoose = require('mongoose');
const User = require('../model/schema');
const data = require('../model/schema2')

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router.get('/home', (req, res) => {
    res.render('home');
});

router.get('/secrete', Auth, (req, res) => {
    console.log(req.cookies.token);
    res.render('secrete');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', Auth, async (req, res) => {
    // Clear the token cookie
    res.clearCookie("token");
    // Redirect to the login page
    res.redirect('login');
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
            phone: body.phone,
            image: path.join('src', 'uploads', req.file.filename)
        });

        const Token = await newUser.generateAuthToken();

        res.cookie('token', Token, {
            httpOnly: true,
            expires: new Date(Date.now() + 90000),
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

        const Token = await user.generateAuthToken();

        res.cookie('token', Token, {
            httpOnly: true,
            expires: new Date(Date.now() + 90000),
        })

        // Render the home page and pass the username as data
        res.render('home', { username: user.username });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

router.get('/search', async (req, res) => {
    try {
        const { from, to } = req.query;

        console.log(from, to);

        const travel_data = await data.findOne({ from, to });

        if (!travel_data || travel_data.length === 0) {
            return res.status(404).send("No travel data found for the provided criteria");
        }

        console.log(travel_data);
        res.render('home', { data: travel_data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
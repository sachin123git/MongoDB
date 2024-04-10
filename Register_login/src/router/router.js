const express = require('express');
const mongoose = require('mongoose');
const User = require('../model/schema'); 

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const body = req.body;
        const newUser = await User.create({
            username: body.username,
            email: body.email,
            password: body.password,
            phone: body.phone
        });

        console.log(newUser);
        res.send(newUser);
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

        // If user is found, you can send a success response
        return res.status(200).send("Login successful");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

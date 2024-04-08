const http = require('http');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})

const user = mongoose.model('user', schema);

mongoose.connect('mongodb://127.0.0.1:27017/mycode').then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.error("Database connection error:", err);
})

app.get('/api/home', async (req, res) => {
    // res.send('Hello World!');
    const body = req.body;
    try {
        const data = await user.create({
            name: body.name,
            age: body.age,
            gender: body.gender
        })
        res.send("data sended successfully");
    } catch {
        (err) => {
            console.log(err);
        }
        res.send('data not sent successfully');
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');

mongoose.connection.on('connected', () => {
    console.log("Database is connected");
});

mongoose.connection.on('error', (err) => {
    console.error("Database connection error:", err);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const schema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
      
    },
    email: {
        type: String,
        unique: true
    }
});

const USER = mongoose.model('User', schema);

app.get('/', async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
        const result = await USER.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email
        });
        console.log(result);
        return res.status(201).json({ msg: result});
    } catch (error) {
        console.error("Error occurred while creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

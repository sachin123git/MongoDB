const express = require('express');
const app = express();
const fs = require('fs')
const mongoose = require('mongoose')
const port = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/API')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const schema = new mongoose.Schema({
first_name : {
    type: String,
},
last_name : {
    type: String,
},
email : {
    type: String,
    unique: true,
    sparse: true 
},
gender : {
    type: String,
},
ip_address : {
    type: String,
}
})

const User = mongoose.model('User', schema);

app.get('/api/home', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// app.post('/api/home', async(req, res) => {
//     const body = req.body;

//     try {
//         const result = await User.create({
//             first_name: body.first_name,
//             last_name: body.last_name,
//             email: body.email,
//             gender: body.gender,
//             ip_address: body.ip_address
//         });

//         console.log(result);
//         res.send(result);
//         res.status(201).json({ msg: "User saved successfully" });
//     } catch (error) {
//         if (error){
//             console.error('Error creating user:', error);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     }
// });

app.post('/api/home', async (req, res) => {
    const body = req.body;

    try {
        const result = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            gender: body.gender,
            ip_address: body.ip_address
        });

        console.log(result);
        // res.json(result);
        res.status(201).json({ msg: "User saved successfully", result });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.listen(8000, () => {
    console.log("the sever is listening", port);
})

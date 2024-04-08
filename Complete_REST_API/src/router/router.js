const express = require('express')
const router = new express.Router()
const user = require('../model/schema')

router.post('/api/user', async(req, res) => {
    const body = req.body
    try{
        const data = await user.create({ 
            name: body.name,
            email: body.email,
            password: body.senha,
            role : body.role

        })
        console.log(data)
        res.status(200).send(data)
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.get("/api/user" ,async(req, res) => {
    try{
        const result = await user.find()
        res.status(200).send(result)
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.get("/api/user/:id" ,async(req, res) => {
    try{
        const _id = req.params.id
        const result = await user.findById(_id)
        res.status(200).send(result)
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.patch("/api/user/:id" , async(req, res) => {
    const _id = req.params.id
    const body = req.body
    try{
        const result = await user.findByIdAndUpdate(_id, body)
        res.status(200).send(result)
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.delete("/api/user/:id" , async(req, res) => {
    const _id = req.params.id
    try{
        const result = await user.findByIdAndDelete(_id)
        res.status(200).send(result)
    }catch(err){
        res.status(500).send(err.message)
    }
});

router.get("/api/user/name/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const result = await user.findOne({ name: name });
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
const express = require('express')
const user = require('./src/model/schema')
const app = express()
require("./src/connection/conect")
const port = 5500
app.use(express.json());

app.post('/api/user', async(req, res) => {
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

app.get("/api/user" ,async(req, res) => {
    try{
        const result = await user.find()
        res.status(200).send(result)
    }catch(err){
        res.status(500).send(err.message)
    }
})

app.get("/api/user/:id" ,async(req, res) => {
    try{
        const _id = req.params.id
        const result = await user.findById(_id)
        res.status(200).send(result)
    }catch(err){
        res.status(500).send(err.message)
    }
})

app.patch("/api/user/:id" , async(req, res) => {
    const _id = req.params.id
    const body = req.body
    try{
        const result = await user.findByIdAndUpdate(_id, body)
        res.status(200).send(result)
    }catch(err){
        res.status(500).send(err.message)
    }
})

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})
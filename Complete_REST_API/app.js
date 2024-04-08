const express = require('express')
const router = require('./src/router/router')
const app = express()

// get file from connection fro database connection
require("./src/connection/conect")
const port = 5500

// use middleware for get data from body
app.use(express.json());

// requred and use router for routing 
app.use(router)

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})
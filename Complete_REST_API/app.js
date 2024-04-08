const express = require('express')
const router = require('./src/router/router')
const app = express()
require("./src/connection/conect")
const port = 5500
app.use(express.json());

app.use(router)

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})
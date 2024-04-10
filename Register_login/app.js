const express = require('express')
const path = require('path')
const router = require("./src/router/router")
require("./src/db/connect")
const app = express()
const port = 3000


app.set("views", path.join(__dirname ,"/src/view"));
app.set('view engine', 'hbs')
app.use(express.json()); // Parsing JSON request body
app.use(express.urlencoded({ extended : false })); // Parsing URL-encoded request body
app.use(router); // Mounting the router

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
  })

app.listen(port, () => {
  console.log('Example app listening on port', port)
})
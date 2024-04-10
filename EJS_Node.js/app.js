const express = require('express');
const app = express();
const port = 2000;
const path = require('path');

app.use(express.json());
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname , "src/views"));

app.get('/', (req, res) => {
    res.render('home' , {title : 'Webpage'}); 
});

app.listen(port, () => {
    console.log("The server is listening", port);
});

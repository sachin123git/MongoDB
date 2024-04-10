const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() =>{
    console.log('Connected to MongoDB')
}).catch(err =>{
    console.log(err)
})
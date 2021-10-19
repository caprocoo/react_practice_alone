const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://BrianOh:abcd1234@react-practice-alone.d00el.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(()=>{
    console.log('MongoDB Connected...')
}).catch(err=>console.log(err))





app.get('/', function(req, res) {
  res.send('hello world');
});
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
});




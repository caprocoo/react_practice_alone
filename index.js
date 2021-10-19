const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const {User} = require('./models/User');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://BrianOh:abcd1234@react-practice-alone.d00el.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(()=>{
    console.log('MongoDB Connected...')
}).catch(err=>console.log(err))






app.get('/', function(req, res) {
  res.send('hello world~~~~~~~~~~~');
});

app.post('/register', (req, res)=>{

    //회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 DB에 넣어준다



    const user = new User(req.body);
    user.save((err, doc)=>{
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success : true
        })
    });


})


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
});




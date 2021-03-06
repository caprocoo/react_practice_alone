const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//10자리 암호화된 비밀번호
const saltRounds = 10;
const jwt = require('jsonwebtoken');



const userSchema = mongoose.Schema({

    name : {
        type : String,
        maxlength : 50
    },
    email :{
        type : String,
        trim : true,
        unique:1
    },
    password :{
        type : String,
        maxlength : 5
    },
    lastname :{
        type : String,
        maxlength : 50
    },
    role :{
        type : Number,
        default : 0
    },
    image : String,
    token :{
        type : String
    },
    tokenExp:{
        type : Number
    }

});



userSchema.pre('save', function(next){
    //비밀번호를 암호화 시키기 위해 bcrypt를 install 한다
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash;
                next()
            });
        });
    }else{
        next()
    }

    
    
})
userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword 12345 와 암호화된 비밀번호를 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
        cb(null, isMatch)
    })

}
userSchema.methods.generateToken = function(cb){
    //jsonwebtoken을 이용해서 token 생성하기
    var user = this;
    //user._id와 secretToken을 합쳐서 token을 만든다
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token;
    user.save(function(err, user){
         if(err) return cb(err)
         cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    jwt.verify(token, 'secretToken', function(err, decoded){
        user.findOne({"_id" : decoded, "token" : token }, function(err, user){
            if(err) return cb(err);
            cb(null, user)

        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User}


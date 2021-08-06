const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const usercred = {
    "emails":['helloworld@gmail','example@gmail.com'],
    "passwords":['lsdfjlj','Pass@123']

}
app.get('/',(req,res)=>{
    res.json({
        message:'Welcome'
    });
});

app.post('/auth',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Login Successful..',
                authData
            })
        }
    })
});

app.post('/login', (req,res)=>{
    const user = {
        email : "example@gmail.com",
        password : "Pass@123"
    }
    jwt.sign({user},'secretkey',(err,token)=>{
        res.json({
            token
        })
    })

});

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1]
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(5000,()=> console.log('Server started'))
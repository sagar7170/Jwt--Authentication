require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());
let refressTokens = [];
app.post('/token',(req,res)=>{
   const refressToken = req.body.token;
   console.log(refressTokens[0]);
   if(refressToken == null) return res.sendStatus(401);
// if(!refressTokens.includes(refressToken)) return res.sendStatus(403);
   jwt.verify(refressToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
    if(err) return res.sendStatus(403);
    const accessToken = generateRefressToken({name:user.name});
    res.json({accessToken:accessToken}); 
   })
})

app.post('/login',(req,res) =>{ 
    const user = {name: req.body.username}
    const  accessToken = generateRefressToken(user);
    const refressToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
    refressTokens.push(refressToken);
    res.json({accessToken:accessToken, refressToken:refressToken});
}) 

function generateRefressToken(user){
    return  jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15s'});
}

app.listen(4000);
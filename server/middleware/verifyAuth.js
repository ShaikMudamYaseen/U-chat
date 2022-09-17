const jwt=require('jsonwebtoken')
const config=require('../config/app.config')
require('dotenv').config()


const verifyAuth=(req,res,next)=>{
    try{
        var jwtToken
        if(req.cookies.jwt){
            jwtToken=req.cookies.jwt


        }else{

            jwtToken=req.query.jwt
        }
    // console.log(req.query.jwt);
    // const jwtToken=token.split('=')[1]
    // console.log(authheaders);
    // console.log(jwtToken);
    if(jwtToken){
        // console.log(req.cookies.jwt);
        // const token=token1.split(';')[0]
        jwt.verify(jwtToken,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
            if(err) return res.status(403).send('invalid token')
            req.id=decode.id
            next()
        })

    }
    else{
        res.status(401).send("not authorized")
    }
}
catch(error){
    res.json({
        message:"authentication error"
    })
}


}
module.exports=verifyAuth
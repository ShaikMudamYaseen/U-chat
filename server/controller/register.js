const user=require('../model/user.schema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {connect}=require('getstream')
const nodemailer=require('nodemailer')
const config=require('../config/app.config')
const multer=require('multer')
const cloudinary=require('../service/cloudinary')
const fs=require('fs')
require('dotenv').config()


// const cookie=require('cookie-parser')
const register=async(req,res)=>{
    // console.log(req.body);
    try{

    const {userName,fullName,email,mobileNo,password}=req.body
    
            // await user.save().then(console.log("success")).catch((console.log("error")))
    // return new Promise((resolve,reject)=>{
        if(userName!=null & fullName!=null &email !=null & mobileNo!=null & password !=null){
            const hashedPass=await bcrypt.hashSync(password,10)

            // user.userName
            const result=await cloudinary.uploader.upload(req.file.path)
            await fs.unlinkSync(req.file.path)

            const data={
            userName:userName,
            fullName:fullName,
            avatarURL:result.url,
            cloudinaryId:result.public_id,
            email:email,
            mobileNo:mobileNo,
            password:hashedPass
            }
            console.log(data);
            const user2=new user(data)
            try{
                await user2.save(async(error,data)=>{

                    if(!error){      
                        // console.log(data);
                        const serverClient=connect(process.env.API_KEY,process.env.API_SECRET,process.env.APP_ID)  
                        const streamToken=serverClient.createUserToken(data._id.toString()) 
                        const token = jwt.sign(
                            { id: data._id, username: data.userName },
                            process.env.ACCESS_TOKEN_SECRET
                          );
                        res.cookie("jwt", token, { httpOnly: true});
                        res.cookie("streamToken", streamToken, { httpOnly: true});
                        const transpoter=nodemailer.createTransport({
                            service:"outlook",
                            auth:{
                                user:config.email,
                                pass:config.emailPassword
                            }
                            
                        })
                        // const mailList=["dummymr86@gmail.com"]
                        const details={
                            from:"uchat@outlook.in",
                            to:`${email}`,
                            subject:"Welcome to U-Chat",
                            html:`Hii ${fullName}, <br> <br> Thanks for signing up to <b>U-Chat</b>, From now on you'll be our valuable user, your username is<b> "${userName}"</b> and  password for loging in is <b>"${password}"</b>. <br><br> Have a nice day <br><br> Cheers,<br> U-chat Team.`
                        }
                        await transpoter.sendMail(details,(err)=>{
                            if(err){
                                console.log(err);
                                // res.write(err)
                                // res.end()
                            }
                            else{
                                console.log("mail sent");

                                // res.write("mail sent")
                                // res.end()
                            }
                        })


                        res.json({
                            message:"registration successful",
                            status:"success",
                            user:data,
                            token:token,
                            streamToken:streamToken
                        })
                        
                    }
                    else{
                        // console.log(error.keyValue);
                        // console.log(error.keyValue[Object.keys(error.keyValue)])
                        try{
                        res.json({
                            
                            message:`${error.keyValue[Object.keys(error.keyValue)]} already in use`,
                            status:"failed",
                            // message:error
                        })
                    }catch{
                        // console.log(error);
                        res.json({
                            message:error.message.split(":")[2],
                            status:"failed",
                            // message2:`${error.path} ${error.path} `

                        })
                    }
                    }
                
                
                })
                
                

            }catch(err){
                // console.log("error");
                res.json({
                        message:err.message,
                        status:"failed"
                        })

            }
           

        }else{
            res.json({
                message:"fill all detailes",
                status:"failed"
            })
        }
        
    }
    
catch(error){
    console.log("error");
    res.json(error)
}
    // )
}
module.exports=register
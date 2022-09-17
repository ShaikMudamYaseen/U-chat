const testRouter = require("express").Router();
const verifyAuth=require("../middleware/verifyAuth")
const userModel=require('../model/user.schema')
// const streamChat = require("stream-chat").StreamChat;
require('dotenv').config()
testRouter.route("/").post(verifyAuth,async(req,res,next)=>{
    console.log(req.id);
    try{
        const user=await userModel.findOne({_id:req.id})

        // const client=streamChat.getInstance(process.env.API_KEY,process.env.API_SECRET,{ allowServerSideConnect: true, })
        // const streamToken=req.query.streamToken
        // console.log(streamToken);
        // console.log('twice');

        // try{
        
        // if(streamToken){
        //     // await client.disconnectUser()

        //     await client.connectUser({
        //         id:user._id.toString(),
        //         username:user.userName,
        //         fullName:user.fullName,
        //         avatarURL:user.avatarURL,
        //         email:user.email,
        //         mobileNo:user.mobileNo
        //     },streamToken)
            res.send({
                message:`authorized`,
                status:"success",
                user:user
            })
        // }

        // else{
        //     res.send({
        //         message:`not connected`,
        //     })

        // }
    // }
    // catch(err){
    //     res.json({
    //         message:err
    //     })
    // }



    
    // const serverToken=req.cookies.streamToken

    // const client=streamChat.getInstance(process.env.API_KEY, { allowServerSideConnect: true, })
    // console.log(process.env.API_KEY);
    // // const token=req.cookies.
    // // console.log(req.cookies.serverToken);
    // if(serverToken){
    //     client.connectUser({
    //         id:user._id.toString(),
    //         username:user.userName,
    //         email:user.email,
    //         mobileNo:user.mobileNo
    //     },serverToken)
    // }
    
    
    }
    catch(error){
        res.json({
            message:'something went wrong'
        })
    }
    next()

})



module.exports = testRouter;

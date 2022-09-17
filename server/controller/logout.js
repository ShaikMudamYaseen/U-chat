const userModel = require("../model/user.schema");

const logout=async(req,res,next)=>{
    // try{
    //     // const user = await userModel.findOne({ email: email });

    //     // res.clearCookie()
    //     res.json({
    //         message:`logout successful ${user.userName}`
    //     })
    //     next()

    // }catch(error){
    //     res.json({
    //         message:"not logout"
    //     })

    // }
        res.clearCookie('jwt')
        res.clearCookie('streamToken')
        res.json({
            message:"logout successful"
        })
        next()

}

module.exports=logout

const registerRouter=require('express').Router()
const register=require('../controller/register')
const upload = require('../middleware/profile_pic')
registerRouter.route('/').post(upload.single('profile'),register)
    // (req,res,next)=>{
//     register(req.body).then(response=>{
//         res.status(201).send(response)
//     }).catch((error)=>{res.status(400).send(error)})
//     next()
// })

module.exports=registerRouter

const registerRouter=require('express').Router()
const logout=require('../controller/logout')
const verifyAuth=require('../middleware/verifyAuth')
registerRouter.route('/').post(verifyAuth,logout)
    // (req,res,next)=>{
//     register(req.body).then(response=>{
//         res.status(201).send(response)
//     }).catch((error)=>{res.status(400).send(error)})
//     next()
// })

module.exports=registerRouter

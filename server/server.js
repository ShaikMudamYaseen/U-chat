const express=require('express')
const app=express()
const serverService=require('./server.services')

serverService.createDbConnection()
serverService.middewares(app)
serverService.routes(app)
module.exports={
    app
}

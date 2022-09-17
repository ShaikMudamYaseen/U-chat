const connection=require('./db/connection')
const express=require('express')
const loginRouter=require('./routes/loginRoute')
const registerRouter=require('./routes/registerRoute')
const test=require('./routes/testRoute')
const cors=require('cors')
const logout=require('./controller/logout')
const config=require('./config/app.config')
const cookiePar=require('cookie-parser')


// const loginRoute
const createDbConnection=()=>{
    connection.dbConnection()
    // const connectionDetails=connection.getConnection()
    // console.log(connectionDetails);

}
const middewares=(app)=>{
    app.use(cors())
    app.use(express.query())
    app.use(express.json())
    app.use(cookiePar())
    app.use(express.urlencoded({extended:true}))


}
const routes=(app)=>{
    app.use("/signup",registerRouter)
    app.use("/login",loginRouter)
    app.use("/test",test)
    app.use("/logout",logout)


}
module.exports={
    createDbConnection,
    middewares,
    routes
}
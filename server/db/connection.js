const mongoose=require('mongoose')
const config=require('../config/app.config')
const dbConnection=()=>{
    mongoose.connect(config.mangooseConfig.url).then(console.log('connected to mongo')).catch((error)=>{
        console.log(error);
    })
}
const getConnection=()=>{
    return mongoose.connection
}

module.exports={
    dbConnection,
    getConnection
}
const server=require('../server')
const config=require('../config/app.config')

server.app.listen(config.PORT,()=>{
    console.log(`listening in port ${config.PORT}`);
})
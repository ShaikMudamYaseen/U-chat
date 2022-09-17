PORT=process.env.PORT || 4000

const mangooseConfig={
    url:"mongodb+srv://dummymr:Dummy123@cluster0.glkir0l.mongodb.net/U-Chat?retryWrites=true&w=majority"
}
const corsWhitelist=["http://localhost:3000/","http://127.0.0.1:3000/"]
const coresOptions={
    origin:(origin,callback)=>{
        if (corsWhitelist.indexOf(origin)!==-1||!origin){
            callback(null,true)

        }
        else{
            callback(new Error("not allowed to access"))
        }
    },
    optionSuccessStatus:200
}
const email="uchat@outlook.in"
const emailPassword="Dummy@123"
module.exports={
    mangooseConfig,
    PORT,
    coresOptions,
    email,
    emailPassword

}
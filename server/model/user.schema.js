const mongoose=require('mongoose')

const user=new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true
    },
    fullName:{
        type:String,
        require:true
    },
    avatarURL:{
        type:String,
        require:true

    },
    cloudinaryId:{
        type:String,
        require:true
    },
    email:{
        lowercase:true,
        type:String,
        require:true,
        unique:true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
        
    },
    mobileNo:{
        type:String,
        require:true,
        unique:true,
        maxLength:10,
        minLength:10
    },
    password:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model("users",user)
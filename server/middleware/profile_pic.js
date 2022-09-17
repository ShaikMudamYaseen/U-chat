const multer=require('multer')
const path=require('path')
const storage=multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,'user_profiles')

    },
    filename:(req,file,cd)=>{
        cd(null,file.originalname)
    }
})
const upload=multer({storage:storage,
fileFilter:(req,file,cb)=>{
    let ext=path.extname(file.originalname)
    if(ext!=='.jpg' && ext!=='.jpeg' && ext!=='.png'){
        cb(new Error("Not supported formate"),false)
        return
    }
    cb(null,true)
}
})
module.exports=upload
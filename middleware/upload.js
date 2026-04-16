import multer from 'multer';
//diskStorage() stores files in local system
const storage=multer.diskStorage({
    //cb is callback
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname.replace(/\s+/g,""))
    }
    
})
const upload=multer({storage})
export default upload
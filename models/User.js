import mongoose, { Types } from "mongoose"
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String 
    },
    bio:{
        type:String
    },
    followers:[{
        follower:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'

        }
    }],
    following:[{
        followed:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }]
    
    
},
{timestamps:true}
)
const User=mongoose.model('User',userSchema)
export default User
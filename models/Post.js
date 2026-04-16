import mongoose from "mongoose"
const postSchema=new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    caption:{
        type:String,
        required:true
    },
    media:[
        {
            mediaType:{
                type:String,
            },
            mediaUrl:{
                type:String,
            },
            publicId:{
                type:String
            }
        }
    ],
    likes:[{
        likedBy:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
        }
    }],
    likeCount:{
        type:Number,
        default:0
    },
    commentsCount:{
        type:Number,
        default:0
    },
    location:{
        type:String
    },

  
    // comments:{
    //     type:[
    //         {
    //             userId: {
    //                 type: mongoose.Schema.Types.ObjectId,
    //                 ref: "User",
    //                 required: true
    //         },
    //             text: {
    //                 type: String,
    //                 required: true
    //         },
    //         createdAt: {
    //             type: Date,
    //             default: Date.now
    //         }
    //         }
    //     ]
    // }
},
{timestamps:true}
)
 const Post=new mongoose.model('Post',postSchema)
export default Post;
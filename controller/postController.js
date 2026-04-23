import Post from "../models/Post.js"
import Comment from "../models/Comments.js";
import cloudinary from "../services/cloudinary.js";
import fs from "fs";
export const addPost=async(req,res)=>{
    try {
        const {caption,location}=req.body;
        // const  media =req.files.map((file)=>{
        //     return {
        //         mediaType:file.mimetype.startsWith("image")?"image":"video",
        //         // mediaUrl:file.path.replace(/\\/g, "/")
        //         mediaUrl:file.filename
        //     }
        // })
        const media=[];
        for(const file of req.files){
            //upload file to cloudinary
            const result=await cloudinary.uploader.upload(file.path,{
                folder:"socialmediaapp"
            })
            media.push({
                mediaType:file.mimetype.startsWith("image")?"image":"video",
                mediaUrl:result.secure_url,
                publicId:result.public_id
            })
            fs.unlinkSync(file.path)
        }
        
        const post =await Post.create({
            userId:req.user.id,
            caption,
            location,
            media
        })
        return res.status(201).json({
            success:true,
            message:"Post Created Successfully!",
            data:post
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
// export const getAllPost=async(req,res)=>{
//     try {
//         const allPosts = await Post.find().populate("userId", "name profilePic").sort({ createdAt: -1 })
//         return res.status(200).json({
//             success:true,
//             message:"All Posts Retrieved Successfully!",
//             data:allPosts
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success:false,
//             message:"Internal Server Error"
//         })
//     }
// }
//pagination : converts the data into pages and limit the number of posts per page
export const getAllPost=async(req,res)=>{
    try {
        const page=Math.max(Number(req.query.page)|| 1,1) //first 1 is default val second 1 is min val of page number
        const limit=Math.min(Number(req.query.limit)||5,20);
        const skip=(page-1)*limit
        const search=req.query.search
        //const posts=await Post.find({
            //multiple conditions use or and use array
        //     $or: [
        //         {location:"Mangalore"},
        //         {likeCount:{$gt:10}}
        //     ]
        // })
        //find({likeCount:{$not:{$gt:10}}})//get posts with likes count not greater than 10
        // find({
        // location:{
        //     $in:["Mangalore","Udupi","Bangalore"]
        // }})
        const posts=await Post.find()
        .populate("userId","name profilePic")
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit)
        //.select('caption likes') to select specific fields from model and - means exclude that field
        const totalPosts=await Post.countDocuments();
        const totalpages=Math.ceil(totalPosts/limit);
        return res.status(200).json({
            success:true,
            message:"All Posts retreived successfully",
            data:posts,
            paginatedData:{
                currentPage:page,
                totalpages: totalpages,
                totalPosts,
                hasNextPage:page< totalpages,
                hasPrevPage:page>1
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
        
    }
}
export const myPost=async(req,res)=>{
    try {
        const uid=req.user.id;
        const mypost=await Post.find({userId:uid}).populate("userId","name profilePic").sort({createdAt:-1})
        console.log(mypost)
        return res.status(201).json({
            success:true,
            message:"Post Retrieved Successfully!",
            data:mypost
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
export const deletePost=async(req,res)=>{
    try {
        const pid=req.params.id;
        const userId=req.user.id;
        const myPost=await Post.findById(pid)
        if(!myPost){
            return res.status(404).json({
                success:false,
                message:"Post Not Found!"
            })
        }
        if(myPost.userId.toString()!==userId){
            return res.status(404).json({
                success:false,
                message:"Unauthorized"
            })
        }
        //delete image from cloudinary
        for(const media of myPost.media){
            await cloudinary.uploader.destroy(media.publicId)
        }
        

        const deletedata=await Post.findByIdAndDelete(pid)
        res.status(200).json({
            success:true,
            message:"Post Deleted Successfully!",
            data:deletedata
        })
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


export const likePost=async(req,res)=>{
    try {
        const userId=req.user.id;
        const postId=req.params.id;
        await Post.findByIdAndUpdate(postId,{
            $push:{
                likes: {
                    likedBy:userId
                }
            }
        },{new:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
export const dislikePost=async(req,res)=>{
    try {
        const userId=req.user.id;
        const postId=req.params.id;
        await Post.findByIdAndUpdate(postId,{
            $pull:{
                likes: {
                    likedBy:userId
                }
            }
        },{new:true})
        //  await Post.findByIdAndUpdate(postId,{
        //     $pop:{
        //         media: -1   
        //     }
        // },{new:true})
    } catch (error) {
        
    }
}

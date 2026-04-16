import { addPost,myPost,deletePost,getAllPost } from "../controller/postController.js";
import express from 'express'
import authUser from "../middleware/authUser.js";
import upload from "../middleware/upload.js";
const router=express.Router();
router.post('/addpost',authUser,upload.array("media"),addPost)
router.get('/allpost',getAllPost)
router.get('/mypost',authUser,myPost)
router.delete('/deletepost/:id',authUser,deletePost)
export default router;

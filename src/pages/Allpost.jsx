import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegComment } from "react-icons/fa"

export default function Allpost() {
    const [post,setPost]=useState([]);
        const [refresh,setRefresh]=useState(false);
        const navigate=useNavigate();
        const {getAllPost,deletep}=useContext(UserContext)
        console.log(post)
        const deletePost=async(id)=>{
            try {
                // const res=await axios.delete(`http://localhost:3000/post/deletepost/${id}`)

                const res=await deletep(id)
                console.log(res.data)
                if(res.data.success){
                    alert(res.data.message)
                    setRefresh(!refresh)
                }
            } catch (error) {
                console.log(error)
            }
        }
        const fetchPost=async()=>{
            try {
                const res=await getAllPost()
                console.log(res)
                if(res.data.success){
                    setPost(res.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        useEffect(()=>{
            fetchPost()
            console.log(post)
    
        },[refresh])
      return (
        <div>
            <div>
                <h1 className=' bg-white text-black  rounded-xl  font-bold text-4xl m-8 p-5'>All Posts</h1>
    
            </div>
    
            <div className='flex flex-col gap-1 p-10 items-center'>
            {   post.map((item)=>(
                    <div key={item._id} className="card bg-blue-100 text-black w-96 shadow-sm ">
                        <h2 className=" p-2 text-xl card-title">{item.userId?.name}</h2>
                        {/* <figure className='overflow-x-auto w-full' >
                            <div className='w-full flex gap-2'>
                             {item.media?.map((m, index) => (
                            <img key={m._id}
                            src={`http://localhost:3000/uploads/${m.mediaUrl}`}
                            alt="Shoes" />
                            ))}
                            </div>
                           
                        </figure> */}
                         <figure className=' pl-3 gap-10 overflow-scroll'>
                        {item.media.map((pic,index)=>{
                            return(
                           
    
                           
                            <img key={index}
                            // src={`http://localhost:3000/uploads/${pic.mediaUrl}`}
                            src={pic.mediaUrl}
                            alt="Shoes" />
                                )
                        })}
                        </figure>
                         
                            
                        <div className="card-body">
                   
                            <p className='font-medium'>{item.caption}</p>
                            <div className="flex gap-6 items-center mt-3">
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <FaHeart className="text-red-500 text-xl" />
                                    <span>{item.likes?.length || 0}</span>
                                </div>
    
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <FaRegComment className="text-xl" />
                                    <span>{item.comments?.length || 0}</span>
                                </div>
                            </div>
                            <button onClick={()=>{deletePost(item._id)}} className="btn btn-info ml-auto w-25 text-white  bg-blue-600  ">Delete </button>
    
                    
                        </div>
             
                    </div>
                ))}
            </div>
        </div>
        
        )
    
    
  
}

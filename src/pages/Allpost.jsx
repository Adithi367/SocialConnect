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
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-10"> */}
            <div className='flex flex-col gap-4 justify-center  items-center'> 
            {   post.map((item)=>(
                    <div key={item._id} className=" card bg-blue-100 text-black w-96 shadow-sm ">
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
                            <h2 className=' text-blue-700 font-bold'>{item.location}</h2>

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

// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaHeart, FaRegComment } from "react-icons/fa";
// import UserContext from "../context/UserContext";

// export default function Allpost() {
//   const [post, setPost] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasNext, setHasNext] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { getAllPost, deletep } = useContext(UserContext);

//   const fetchPost = async () => {
//     if (!hasNext || loading) return;

//     try {
//       setLoading(true);

//       const res = await getAllPost(page); // pass page
//       if (res.data.success) {
//         setPost((prev) => [...prev, ...res.data.data]); // append posts
//         setHasNext(res.data.paginatedData.hasNextPage);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPost();
//   }, [page]);

//   // scroll event
//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
//         hasNext &&
//         !loading
//       ) {
//         setPage((prev) => prev + 1);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [hasNext, loading]);

//   const deletePost = async (id) => {
//     try {
//       const res = await deletep(id);

//       if (res.data.success) {
//         alert(res.data.message);

//         // remove deleted post from UI
//         setPost((prev) => prev.filter((p) => p._id !== id));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="bg-white text-black rounded-xl font-bold text-4xl m-8 p-5">
//         All Posts
//       </h1>

//       <div className="flex flex-col gap-4 justify-center items-center">
//         {post.map((item) => (
//           <div key={item._id} className="card bg-blue-100 text-black w-96 shadow-sm">
//             <h2 className="p-2 text-xl card-title">{item.userId?.name}</h2>

//             <figure className="pl-3 gap-10 overflow-scroll">
//               {item.media.map((pic, index) => (
//                 <img key={index} src={pic.mediaUrl} alt="Post" />
//               ))}
//             </figure>

//             <div className="card-body">
//               <p className="font-medium">{item.caption}</p>

//               <div className="flex gap-6 items-center mt-3">
//                 <div className="flex items-center gap-2 cursor-pointer">
//                   <FaHeart className="text-red-500 text-xl" />
//                   <span>{item.likes?.length || 0}</span>
//                 </div>

//                 <div className="flex items-center gap-2 cursor-pointer">
//                   <FaRegComment className="text-xl" />
//                   <span>{item.comments?.length || 0}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={() => deletePost(item._id)}
//                 className="btn btn-info ml-auto w-25 text-white bg-blue-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {loading && <p className="text-center p-5 font-bold">Loading more posts...</p>}

//       {!hasNext && (
//         <p className="text-center p-5 font-bold text-gray-500">
//           No more posts
//         </p>
//       )}
//     </div>
//   );
// }
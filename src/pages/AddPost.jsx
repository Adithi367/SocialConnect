import axios from 'axios'
import React, { useState } from 'react'
import UserContext from '../context/UserContext'
import { useContext } from 'react'
export default function AddPost() {
    const [caption,setCaption]=useState("")
    //const [media,setMedia]=useState(null)
    const [media,setMedia]=useState([])
    const [location,setLocation]=useState("")
    const { createPost } = useContext(UserContext);

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            // const formData=new FormData();
            // if(!caption || !media||!location||media.length==0){
            //     return alert("All fields are required");
            // }
            // formData.append("caption",caption);
            
            // formData.append("location",location);
            // for(let i=0;i<media.length;i++){
            //     formData.append("media",media[i])
            // }
            await createPost({caption,location,media})
            alert("Post Created Successfully!") 
            
            
                
                setCaption("")
                setMedia([])
                setLocation("")
            
           
        } catch (error) {
            console.log(error)
        }
    }
  return (
    
    <div >
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
 <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
   <h1 className="text-2xl font-bold text-center text-gray-700">Add Post</h1>
   <form onSubmit={handleSubmit} className="space-y-4 mt-4" >
     <div>
       <label className="label">
         <span className="label-text">Caption</span>
       </label>
       <input
         type="text"
         placeholder="Enter the Caption"
         value={caption}
         onChange={(e)=>setCaption(e.target.value)}
         className="text-white input input-bordered input-primary w-full"
       />
     </div>
     <div>
       <label className="label">
         <span className="label-text">Caption</span>
       </label>
       <input
         type="text"
         placeholder="Enter the Location"
         value={location}
         onChange={(e)=>setLocation(e.target.value)}
         className="text-white input input-bordered input-primary w-full"
       />
     </div>
     <div>
       <label className="label">
         <span className="label-text">Image</span>
       </label>
       <input
         type="file"
         multiple
         onChange={(e)=>setMedia([...e.target.files])}
         placeholder="Enter your Image"
         className="input input-bordered input-primary   w-full"
       />
     </div>
    
     <button type="submit" className="btn btn-primary w-full mt-5">Submit</button>
   </form>
 </div>
</div>
    </div>
  )
}



// <div className="card bg-base-100 w-96 shadow-sm">
//             <figure>
//                 <img
//                 src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//                 alt="Shoes" />
//             </figure>
//             <div className="card-body">
//                 <h2 className="card-title">Card Title</h2>
//                 <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
//             <div className="card-actions justify-end">
//             <button className="btn btn-primary">Buy Now</button>
//             </div>
//         </div>
// </div>
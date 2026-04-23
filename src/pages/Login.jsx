// import React from 'react'

// export default function Login() {
//   return (
//     <div style={{justifyContent:'center',display:'flex',marginTop:'100px'}}>
        
//         <div style={{height:'350px',backgroundColor:'rgba(173, 242, 226, 0.93)',borderRadius:'20px',border:'1px solid black',display:'flex',flexDirection:'column',width:'300px',padding:'10px',justifyContent:'center',alignItems:'center'}}>
//             <h1>Login</h1>
//             <input type="text" placeholder='Enter Username' style={{padding:10,borderRadius:3,margin:'20px',width:'200px'}} />
//             <input type="password" placeholder='Enter Password' style={{padding:10,borderRadius:3,margin:'20px',width:'200px'}} />
//             <button onClick={() => alert('Login clicked!')} style={{fontWeight:'bold',color:'white',backgroundColor:'rgba(4, 38, 188, 0.93)',padding:10,borderRadius:3,margin:'20px',width:'220px'}}>Login</button>
//         </div>
//     </div>
//   )
// }
import React, { useState } from 'react'
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
export default function Login() {
  const [form,setForm]=useState({
        
        email:'',
       
        password:''
    });
    const {handleLogin}=useContext
    (UserContext)
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
        console.log(e.target.value)
    }
    const handleSubmit=async()=>{
        try {
           
            
            await handleLogin(form)
            console.log(form)
            alert('Logged in Successfully')
            setForm({
               
                email:'',
            
                password:''
            })

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="flex flex-col justify-center items-center bg-blue-100 h-screen">

      <div className="w-100 gap-5 justify-center shadow-xl flex flex-col bg-blue-100 border border-blue-700 p-10 rounded-xl">
        
        <h1 className="text-center text-blue-700 font-bold text-3xl">Login</h1>
      
        <input 
          type="text" 
          placeholder="Enter Username" onChange={handleChange} name='email' value={form.email}
          className="p-3 text-black rounded-l border border-black m-2"
        />

        <input 
          type="password" 
          placeholder="Enter Password" onChange={handleChange} name='password' value={form.password}
          className=" text-black p-3 border rounded-l border-black m-2"
        />

      <button onClick={handleSubmit} className="btn btn-accent  rounded-l ">Submit</button>


      </div>

      <p className="mt-3 text-black">
        Don't have an account? 
        <a href="/register" className="font-bold text-blue-800 hover:underline ml-1">
          Register here
        </a>
      </p>
      <Link to="/register" className="mt-3 text-blue-800 hover:underline">
        Don't have an account? Register here
      </Link>
      

    </div>
  )
}
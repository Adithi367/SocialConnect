import React, { useState } from 'react'
import axios from 'axios'
import UserContext from '../context/UserContext'
import { useContext } from 'react'
export default function Register() {
  const [formData,setFormData]=useState({
    username:'',
    email:'',
    phone:'',
    password:''
  })
  const {handleRegister}=useContext(UserContext)
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
    console.log(formData)
    console.log(e.target.value)

  }
  const handleSubmit=async(e)=>{
    try {
      console.log(formData)
      handleRegister(formData)
      alert('Registered Successfully')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=" flex flex-col justify-center items-center bg-blue-100 h-screen "  >

        <div className=" w-100 gap-5 justify-center  shadow-xl flex flex-col bg-blue-100 border border-blue-700  p-10 rounded-xl" >
  {/* <h1 className="  text-center md:text-xl xs:text-l sm:text-6xl font-bold underline text-green-700">
    Hello world!
  </h1> */}
            <h1 className=" text-center  text-blue-700 font-bold text-3xl   ">Register</h1>

            <input onChange={handleChange} value={formData.username} name='username' type="text" placeholder='Enter Username' className="p-3 rounded-l border text-black border-black m-2" />
            <input onChange={handleChange} value={formData.email} name='email' type="email" placeholder='Enter Email' className="p-3  border rounded-l text-black border-black m-2" />
            <input onChange={handleChange} value={formData.phone} name='phone' type="text" placeholder='Enter Phone number' className="p-3  border rounded-l text-black border-black m-2" />
            <input onChange={handleChange} value={formData.password} name='password' type="password" placeholder='Enter Password' className="p-3 border text-black rounded-l border-black m-2" />
            <button onClick={handleSubmit} className="p-3 rounded-xl mt-3 font-bold text-white bg-blue-700 hover:bg-blue-600">Submit</button>
            
        </div>
        <p className='text-black'>Already have any account? <a href="/" className=" font-bold text-blue-800 hover:underline">Login here</a></p>
    </div>
  )
}

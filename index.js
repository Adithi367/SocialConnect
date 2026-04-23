
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
//type="commonJs" const express=require('express')
import mongoConnection from './db.js'
import cors from 'cors'
import postrouter from './routes/postRoutes.js'
import userrouter from './routes/userRoute.js'
import cookieParser from 'cookie-parser'
const app=express()
app.use(express.json())
mongoConnection()
app.use(cookieParser())
app.use(cors({
    //origin:['http://localhost:5173'],
    origin:['http://localhost:5173', 'https://social-connect-ivory.vercel.app'],
    //origin:true,
    credentials:true
}))

const PORT=process.env.PORT
app.get('/test',(req,res)=>{
    res.json({message:'Hello World'})
    console.log('Hello World '+new Date())
})

 app.use("/auth",userrouter)
// app.use("/auth", (req, res, next) => {
//   console.log("Auth route hit:", req.method, req.url);
//   next();
// }, userrouter);
app.use("/post",postrouter)
app.use("/uploads",express.static("uploads/"))
app.listen(PORT,()=>{
    console.log('Server is running on port http://localhost:'+PORT)
})

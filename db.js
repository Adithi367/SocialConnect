import mongoose from 'mongoose';

//const mongoose =require('mongoose')
const mongoConnection= async()=>{
    try {
        const mongo_url=process.env.mongoUrl;

        await mongoose.connect(mongo_url)
        console.log("Database connected")
    } catch (error) {
        console.log("Error in connection")
        console.log(error)
    }
}
export default mongoConnection;
//module.exports=mongoConnection

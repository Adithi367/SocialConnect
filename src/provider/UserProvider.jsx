import UserContext from "../context/UserContext"
import axios from "axios"

axios.defaults.withCredentials=true

const UserProvider=({children})=>{

    //global states
    const BaseUrl=import.meta.env.VITE_BASE_URL

    //global functions
    const handleRegister=async(data)=>{
        try {
            const res=await axios.post(`${BaseUrl}/auth/register`,data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogin=async(data)=>{
        try {
            const res=await axios.post(`${BaseUrl}/auth/login`,data,)
            console.log("I am response"+res)
        } catch (error) {
            console.log(error)
        }
    }
    const createPost=async({caption,location,media})=>{
        try {
            const formData=new FormData();
            if(!caption || !media||!location||media.length==0){
                return alert("All fields are required");
            }
            formData.append("caption",caption);
            
            formData.append("location",location);
            for(let i=0;i<media.length;i++){
                formData.append("media",media[i])
            }
            const res=await axios.post(`${BaseUrl}/post/addpost`,formData,{
              withCredentials:true,
              headers:{
                "Content-Type":"multipart/form-data"
              }
            })
            console.log(res)
            return res;
            
        } catch (error) {
            console.log(error)
        }
    }
    const getPost=async()=>{
        try {
            const res=await axios.get(`${BaseUrl}/post/mypost`,{
              withCredentials:true
            })
            console.log(res)
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const getAllPost=async()=>{
        try {
            const res=await axios.get(`${BaseUrl}/post/allpost?page=1&limit=10`,{
              withCredentials:true  
            })
            console.log(res)
            return res;
        }
            catch (error) { 
                console.log(error)
            }
    }
    const deletep=async(id)=>{
        try {
            const res=await axios.delete(`${BaseUrl}/post/deletepost/${id}`,{
              withCredentials:true
            })
            console.log(res)
            return res;
        } catch (error) {
            console.log(error)
        }
    }


    const value={
        //all states and functions
        handleRegister,
        handleLogin,
        createPost,
        getPost,
        getAllPost,
         deletep
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider
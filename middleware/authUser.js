import jwt from 'jsonwebtoken'

 const authUser=async(req,res,next)=>{
    try {
        //const token=req.header("auth-token")
        const secretKey=process.env.SECRETKEY //same secret key throughout the project
        console.log("Cookies:"+req.cookies)
        console.log("Auth header"+req.headers.authorization)
        const token=req.cookies.mycookie;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token not found"
            })
        }
        const decoded=jwt.verify(token,secretKey) //payload: this line separates payload from token
        req.user= decoded ;
       
        
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success:false,
            message:"Invalid token"
        })
    }
}
export default authUser;
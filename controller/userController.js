import User from './../models/User.js'
import bcrypt from 'bcrypt'
import sendEmail from './../services/emailSet.js'
import jwt from 'jsonwebtoken'
// export const registerUser=async(req,res)=>{
//     try {
//         const {username,email,phone,password}=req.body;
//         const userexist=await User.findOne({email})
//         if(userexist){
//             return res.status(400).json({
//                 success:false,
//                 message:"User already exists"
//             })
//         }
//         const hashedPassword=await bcrypt.hash(password,10)
//         const user=await User.create({
//             name:username,
//             email:email,
//             phone:phone,
//             password:hashedPassword
//         })
//         await sendEmail(email,'Welcome to SocialConnect',
//             `<div> Welcome to SocialConnect ${username}</div>`
//         )
    

//         res.status(201).json({
//             success:true,
//             message:"Registered Successfully",
//             data:user
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success:false,
//             message:"Internal Server error"
//         })
//     }
// }   


//new register

export const registerUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: username,
      email,
      phone,
      password: hashedPassword,
    });

    try {
      await sendEmail(
        email,
        'Welcome to SocialConnect',
        `<div>Welcome to SocialConnect ${username}</div>`
      );
      console.log("Welcome email sent to:", email);
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
      // Optional: continue registration even if email fails
    }

    res.status(201).json({
      success: true,
      message: "Registered Successfully",
      data: user,
    });

  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};






export const loginUser = async (req, res) => {
  try {
    const secretkey=process.env.SECRETKEY

      console.log("LOGIN API HIT");
    console.log(req.body)
    console.log(secretkey)
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: userExist._id, name: userExist.name },
      secretkey,{expiresIn:'7d'}
    );
    //response.cookie(key,val,{options})
    res.cookie("mycookie",token,{
      httpOnly:true,
      secure:false,
      sameSite:'lax',
      maxAge:7*24*60*60*1000

    })

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};




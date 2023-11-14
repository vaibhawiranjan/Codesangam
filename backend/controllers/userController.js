const User=require(`../models/userModel`)
const jwt=require(`jsonwebtoken`)

const createTokens=(_id)=>{
    jwt.sign({_id},process.env.SECRET,{expiresIn:'1d'})
}
//login
const LoginUser=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user= await User.login(email,password)
        const token=createTokens(user._id)
        res.status(200).json({email,token})
    }catch(error){
        res.status(404).json({error:error.message})
    }
}
//signup
const SignupUser=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user= await User.signup(email,password)
        const token=createTokens(user._id)
        res.status(200).json({email,token})
    }catch(error){
        res.status(404).json({error:error.message})
    }
}
module.exports={LoginUser,SignupUser}
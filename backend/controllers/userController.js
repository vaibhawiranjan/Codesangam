const User=require(`../models/userModel`)
const jwt=require(`jsonwebtoken`)
const nodemailer=require('nodemailer')
const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'1d'})
}

//login
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try{
     const user=await User.login(email,password)
     const token=createToken(user._id)
     res.status(200).json({email,token})
     const sendMail=async(req,res)=>{
          let transporter=await nodemailer.createTransport({
              service:'gmail',
              auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: 'annahartvr@gmail.com',
                pass: 'wlfz qzge yveb hxyj'
              }
          });
          const info = await transporter.sendMail({
              from: '"VAIBHAWI 👻" <annahartvr@gmail.com>', // sender address
              to: email, // list of receivers
              subject: "Hello ✔", // Subject line
              html: "<b>New login</b> <br> Complete pending tasks", // html body
          });
           try{
     const result=await transporter.sendMail(info)
     console.log("Email sent successfully")
           }catch(error){
          console.log(error)
           }
     }
     
     sendMail()
}catch(error){
     res.status(404).json({error:error.message})
}
}



//signup
const signupUser=async(req,res)=>{
   const {email,password}=req.body
   try{
        const user=await User.signup(email,password)
        const token=createToken(user._id)
        res.status(200).json({email,token})
   }catch(error){
        res.status(404).json({error:error.message})
   }
}

module.exports={loginUser,signupUser}
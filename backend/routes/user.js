const express=require(`express`)
const router=express.Router()
const {LoginUser,Signupser}=require(`../controllers/userController`)

router.post('/login',LoginUser)
router.post('/signup',Signupser)

module.exports=router
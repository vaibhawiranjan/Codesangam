require(`dotenv`).config()
const express=require(`express`);
const mongoose=require(`mongoose`);
const notesRoutes=require(`./routes/enter`);
const userRoutes=require('./routes/user')
const cors = require("cors");



const app=express();
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use(
    cors({
      //Sets Access-Control-Allow-Origin to the UI URI
      origin: '*',
      //Sets Access-Control-Allow-Credentials to true to recieve cookies
      credentials: true,
    })
  );
app.use(`/api/notes`,notesRoutes)
app.use('/api/user',userRoutes)

//db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected")
})
.catch((error)=>{
    console.log(error)
})
app.listen(process.env.PORT,()=>{
    console.log(`LIstening at${process.env.PORT}`);
})

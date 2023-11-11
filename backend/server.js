require(`dotenv`).config()
const express=require(`express`);
const mongoose=require(`mongoose`);
const notesRoutes=require(`./routes/enter`);
const app=express();
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use(`/api/notes`,notesRoutes)
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

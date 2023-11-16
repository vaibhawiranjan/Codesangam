const Note=require(`../models/Notes`)
const mongoose=require(`mongoose`)
const getAllNotes=async(req,res)=>{
    const user_id=req.user._id
    const notes=await Note.find({user_id}).sort({createdAt: -1})//all elemets in descending order
    res.status(200).json(notes)
}
const getNotes=async(req,res)=>{
    const { id }=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such notes exist"})
    }
    const workout=await Workout.findById(id)
    if(!workout){
       return res.status(404).json({error:"No such notes exist"})
    }
    res.status(200).json(workout)
}
const createNote=async(req,res)=>{
    const{title,description,deadline}=req.body
    let emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!deadline){
        emptyFields.push('deadline')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all details',emptyFields})
    }
    try{
        const user_id=req.user._id
        const note=await Note.create({title,description,deadline,user_id})
        res.status(200).json(note)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
   
}
const deleteNote=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such notes exist"})
    }
    const note=await Note.findOneAndDelete({_id: id})
    if(!note){
       return res.status(404).json({error:"No such note exist"})
    }
    res.status(200).json(note)

}
const updateNote=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such workout"})
    }
    const note=await Note.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!note){
       return res.status(404).json({error:"No such workout"})
    }
    res.status(200).json(note)

}

module.exports={
    createNote,getAllNotes,getNotes,deleteNote,updateNote
}
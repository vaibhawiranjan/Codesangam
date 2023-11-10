const Notes=require(`../models/Notes`)
const express=require(`express`)
const mongoose=require(`mongoose`)
const getAllNotes=async(req,res)=>{
    const workouts=await Notes.find({}).sort({createdAt: -1})//all elemets in descending order
    res.status(200).json(Notes)
}
const getNotes=async(req,res)=>{
    const { id }=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such workout"})
    }
    const note=await Notes.findById(id)
    if(!note){
       return res.status(404).json({error:"No such workout"})
    }
    res.status(200).json(note)
}
const createNote=async(req,res)=>{
    const{title,load,reps}=req.body
    try{
        const note=await Notes.create({title,load,reps})
        res.status(200).json(note)
    }
    catch(err){
        res.status(400).json({error:error.message})
    }
   
}
const deleteNote=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such note"})
    }
    const note=await Notes.findOneAndDelete({_id: id})
    if(!note){
       return res.status(404).json({error:"No such note"})
    }
    res.status(200).json(note)

}
const updateNote=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such note"})
    }
    const note=await Notes.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!note){
       return res.status(404).json({error:"No such note"})
    }
    res.status(200).json(note)

}

module.exports={
    createNote,getAllNotes,getNotes,deleteNote,updateNote
}
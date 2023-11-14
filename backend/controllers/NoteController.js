const Notes=require(`../models/Notes`)
const express=require(`express`)
const mongoose=require(`mongoose`)
const getAllNotes=async(req,res)=>{
    const note=await Notes.find({}).sort({createdAt: -1})//all elemets in descending order
    res.status(200).json(note)
}
const getNotes=async(req,res)=>{
    const { id }=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such note"})
    }
    const note=await Notes.findById(id)
    if(!note){
       return res.status(404).json({error:"No such note"})
    }
    res.status(200).json(note)
}
const createNote=async(req,res)=>{
    const{title,description,deadline}=req.body
    let emptyfields=[]
    if(!title){
        emptyfields.push('title')
    }
    if(!deadline){
        emptyfields.push('deadline')
    }
    if(!description){
        emptyfields.push('title')
    }
    if(emptyfields.length>0){
        res.status(400).json({error:"Please fill in all the details",emptyfields})
    }




    try{
        const note=await Notes.create({title,Deadline,user_id})
        res.status(200).json(note)
    }
    catch(err){
        res.status(400).json({error: err})
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
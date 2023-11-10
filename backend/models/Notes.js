const mongoose=require(`mongoose`)
const Schema=mongoose.Schema
const noteSchema=new Schema({
    Description:{
        type:String,
        required:true
    },
   
    Deadline:{
        type: Date,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model(`Notes`,noteSchema)//The first is database collection


const express=require(`express`)
const {createNote,getAllNotes,getNotes,deleteNote,updateNote}=require(`../controllers/NoteController.js`)
const Notes=require(`../models/Notes.js`)
const router=express.Router()
router.get(`/`,getAllNotes)
router.get(`/:id`,getNotes)
router.post(`/`,createNote)
router.delete(`/:id`,deleteNote)
router.patch(`/:id`,updateNote)
module.exports=router
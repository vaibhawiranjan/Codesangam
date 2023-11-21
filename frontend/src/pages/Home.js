import {useEffect} from 'react'
import { useNotesContext } from '../components/hooks/useNotesContext'
import NoteDetails from '../components/NoteDetails'
import Noteform from '../components/NoteForm'
const Home=()=>{

  const {notes,dispatch}=useNotesContext()
  
  
useEffect(()=>{
  const fetchNotes=async()=>{
    const response=await fetch('http://localhost:4000/api/notes') //localbackend
   const json=await response.json()
   
   if(response.ok){
    dispatch({type:'SET_NOTES',payload:json})
   }
}
   
fetchNotes()
},[dispatch])

return(
  <div className="home">
   <div className='notes'>
    {notes && notes.map(note=>(
      <NoteDetails key={note._id} note={note}/>
    ))}
   </div>
   <Noteform/>
  </div>
)
}
export default Home;
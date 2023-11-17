import {useEffect} from 'react'
import { useNotesContext } from '../components/hooks/useNotesContext'
import NoteDetails from '../components/NoteDetails'
import Noteform from '../components/NoteForm'
const Home=()=>{

  const {notes,dispatch}=useNotesContext()
  
  
useEffect(()=>{
  const fetchNotes=async()=>{
    const response=await fetch('/api/notes') //localbackend
   const json=await response.json()
   if(response.ok){
    dispatch({type:'SET_NOTES',playload:json})
   }
}
   
fetchNotes()
},[dispatch])

return(
  <div className="home">
   <div className='NOTE'>
    {notes && notes.map(note=>(
      <NoteDetails key={note._id} note={note}/>
    ))}
   </div>
   <Noteform/>
  </div>
)
}
export default Home;
// import { NotesContext } from "../contexts/NotesContext"
import { useNotesContext } from "./hooks/useNotesContext"

import { useAuthContext } from './hooks/useAuthContext'
const NoteDetails=({note})=>{
const {dispatch}=useNotesContext()
const { user } = useAuthContext()
const handleClick=async()=>{
  if (!user) {
    return
  }
  const response=await fetch('http://localhost:4000/api/notes/' + note._id,{method:'DELETE', headers: {
    'Authorization': `Bearer ${user.token}`}
  })
  const json=await response.json()//jo delete document h vo ayha ajayega

  if(response.ok){
dispatch({type:'DELETE_NOTE',payload:json})
  }
}

    return (
    <div className= "note-details">
      {/* {`note-details${note.colour}`}> */}
       <h4>{note.title}</h4>
        <p><strong>Description  </strong>{note.description}</p>
        <p><strong>Deadline </strong>{note.deadline}</p>
        <p>{note.createAt}</p>
         <span onClick={handleClick}>delete</span>
    </div>
)
}

export default NoteDetails
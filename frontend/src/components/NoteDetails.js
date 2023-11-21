// import { NotesContext } from "../contexts/NotesContext"
import { useNotesContext } from "./hooks/useNotesContext"
// import formatDistanceToNow from "date-fns/formatDistanceToNow"

const NoteDetails=({note})=>{
const {dispatch}=useNotesContext()
const handleClick=async()=>{
  const response=await fetch('http://localhost:4000/api/notes/' + note._id,{method:'DELETE'})
  const json=await response.json()//jo delete document h vo ayha ajayega

  if(response.ok){
dispatch({type:'DELETE_NOTES',payload:json})
  }
}

    return (
    <div className= "note-details">
      {/* {`note-details${note.colour}`}> */}
       <h4>{note.title}</h4>
        <p><strong>Description  </strong>{note.description}</p>
        <p><strong>Deadline </strong>{note.deadline}</p>
        {/* <p>{formatDistanceToNow(new Date(note.createAt,{addSuffix:true}))}</p> */}
         <span onClick={handleClick}>delete</span>
    </div>
)
}

export default NoteDetails
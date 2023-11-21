import { useState } from "react"
import { useNotesContext } from "./hooks/useNotesContext"  
 
const NoteForm=()=>{
    const {dispatch}=useNotesContext()
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [deadline,setDeadline]=useState('')
    const [colour,setColour]=useState('')
    const [error,setError]=useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit=async(e)=>{
        e.preventDefault() //so that form auto submit na ho

        const note={title,description,deadline}
        const response=await fetch('http://localhost:4000/api/notes',{
            method:'POST',
            body:JSON.stringify(note),
            headers:{
                'Content-Type':'application/json'
            }
        })
     const json=await response.json()
        if(!response.ok){
setError(json.error)
setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setEmptyFields([])
            setTitle('')
            setDescription('')
            setDeadline('')
            setError(null)
            
            dispatch({type:'CREATE_NOTE',payload:json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a task !!</h3>

            <label>Title</label>
            <input className="input" type="text" onChange={(e)=>setTitle(e.target.value)} value={title} 
            
            ></input>

            <label>Description</label>
            <input className="input" type="text" onChange={(e)=>setDescription(e.target.value)} value={description}></input>

            <label>Deadline(No. of days alloted for the task)</label>
            <input className="input" type="number" onChange={(e)=>setDeadline(e.target.value)} value={deadline}></input>
 
             {/* <label>Priority</label>
             
            <input className="color" id="red" type="radio" name="color" onClick={() => setColour("red")}/>Urgent
          
            <input className="color" id="yellow" type="radio" name="color" onClick={() => setColour("yellow")} />Important
            
            <input className="color" id="green"type="radio" name="color"  onClick={() => setColour("green")} />Minor Task */}
            


<button>ADD TASK</button>
{error && <div className="error">{error}</div>}
        </form>
    )
}

export default NoteForm
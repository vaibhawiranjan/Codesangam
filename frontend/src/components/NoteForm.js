import { useState } from "react"
import { useNotesContext } from "./hooks/useNotesContext"  
 
const NoteForm=()=>{
    const {dispatch}=useNotesContext()
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [deadline,setDeadline]=useState('')
    const [error,setError]=useState(null)


    const handleSubmit=async(e)=>{
        e.preventDefault()

        const note={title,description,deadline}
        const response=await fetch('/api/notes',{
            method:'POST',
            body:JSON.stringify(note),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json=await response.json()
        if(!response.ok){
setError(json.error)
        }

        if(response.ok){
            setTitle('')
            setDescription('')
            setDeadline('')
            setError(null)
            console.log('added',json)
            dispatch({type:'CREATE_NOTE',payload:json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a task !!</h3>

            <label>Title</label>
            <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}></input>



            <label>Description</label>
            <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description}></input>

            <label>Deadline(No. of days alloted for the task)</label>
            <input type="number" onChange={(e)=>setDeadline(e.target.value)} value={deadline}></input>


<button>ADD TASK</button>
{error && <div className="error">{error}</div>}
        </form>
    )
}

export default NoteForm
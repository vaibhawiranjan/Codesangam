import { NotesContext } from "../../contexts/NotesContext";
import { useContext } from "react";

export const useNotesContext =()=>{
    const context =useContext(NotesContext)
    
if(!context){
    throw Error('error')
}
    return context
}
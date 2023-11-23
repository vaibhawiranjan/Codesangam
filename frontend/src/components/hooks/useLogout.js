import { useAuthContext } from "./useAuthContext"
import { useNotesContext } from "./useNotesContext" 

export const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch : notesDispatch} = useNotesContext()

    const logout= () =>{
    //remove user form local storage
    localStorage.removeItem('user')

    //dispatch logout action
    dispatch({type: 'LOGOUT'})
    dispatch({type: 'SET_NOTES' , payload:null})
    }
    
    return {logout}
}

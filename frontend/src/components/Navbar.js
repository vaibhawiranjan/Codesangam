import { Link } from "react-router-dom"
import { useLogout } from "./hooks/useLogout"
import { useAuthContext } from "./hooks/useAuthContext"


const Navbar=()=>{
   
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => { 
        logout()
    }


    return(
    <header>
       <div className="container">
            <Link to='/'>
                <h1>Moonlight Scroll</h1>
            </Link>
            { user && 
            (   
                <div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Log Out</button>
                </div>
            )}
            { !user && (
            <div>
                <Link to='/login' className='nav-login'>Login</Link>
                <Link to='/signup'className='nav-signup'>Signup</Link>
            </div>
            )}
        </div> 
    </header>

    )
}

export default Navbar
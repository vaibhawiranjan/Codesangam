import { WorkoutsContext } from "../contexts/WorkoutContext"
import { useWorkoutsContext } from "./hooks/useWorkoutContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
const WorkoutDetails=({workout})=>{
const {dispatch}=useWorkoutsContext()
const handleClick=async()=>{
  const response=await fetch('/api/workouts/' + workout._idl,{method:'DELETE'})
  const json=await response.json()//jo delete document h vo ayha ajayega

  if(response.ok){
dispatch({type:'DELETE_WORKOUT',payload:json})
  }
}


    return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Description</strong>{workout.load}</p>
        <p><strong>Importance</strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createAt,{addSuffix:true}))}</p>
         <span onClick={handleClick}>delete</span>
    </div>
)
}

export default WorkoutDetails
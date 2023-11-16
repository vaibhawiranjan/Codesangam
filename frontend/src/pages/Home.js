import {useEffect} from 'react'
import { useWorkoutsContext } from '../components/hooks/useWorkoutContext'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
const Home=()=>{

  const {workouts,dispatch}=useWorkoutsContext()
  
  
useEffect(()=>{
  const fetchWorkouts=async()=>{
    const response=await fetch('/api/workouts') //localbackend
   const json=await response.json()
   if(response.ok){
    dispatch({type:'SET_WORKOUTS',playload:json})
   }
}
   
fetchWorkouts()
},[dispatch])

return(
  <div className="home">
   <div className='workouts'>
    {workouts && workouts.map(workout=>(
      <WorkoutDetails key={workout._id} workout={workout}/>
    ))}
   </div>
   <WorkoutForm/>
  </div>
)
}
export default Home;
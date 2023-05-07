import CreateGoal from "../components/CreateGoal"
import ShowGoal from "../components/ShowGoal"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { deleteGoal, getGoals,reset } from "../features/goals/goalSlice"
import Spinner from "../components/Spinner"

const Dashboard = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.auth)
  const {goals, isError, isLoading, message} = useSelector((state)=>state.goals)

  useEffect(()=>{
    if(isError){
        toast.error(message)
    }
    if(user && !isError){
      dispatch(getGoals())
    }
    return ()=>{
      dispatch(reset())
    }
    
},[isError,message,user,dispatch])

const onDelete = (id)=>dispatch(deleteGoal(id))

if(isLoading){
    return <Spinner />
}

  return (
    <>
      {user?<>
        <section className="heading">
          <p>Welcome {user.name}.</p>
          <CreateGoal />
        </section>
        <section className="content">
          {goals.length>0?
            <div className="goals">
              {goals.map(goal=><ShowGoal key={goal._id} goal={goal} onDelete={onDelete}/>)}
            </div>
          :<h3>No goals to show</h3>}
        </section>    
      </>:<section className="heading">
            <p>Please Login or Register</p>
          </section>}
    </>
  )
}

export default Dashboard
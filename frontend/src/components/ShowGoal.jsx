import {FaEdit,FaTimes} from 'react-icons/fa'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateGoal } from '../features/goals/goalSlice'

const ShowGoal = ({goal,onDelete}) => {
    const [editGoal,setEditGoal] = useState(false)
    const [editText,setEditText] = useState('')
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateGoal({goalId:goal._id,editText}))
    }


    return (
        <div className="goal">
            {editGoal?
            <form onSubmit={onSubmit}>
                <input type="text" className='edit-text' id='edit' name='edit'
                value={editText} placeholder='Edit Goal Text' 
                onChange={(e)=>setEditText(e.target.value)}/>
            </form>:
            <div>{new Date(goal.updatedAt).toLocaleString('en-US')}</div>
            }
            
            <h2>{goal.text}</h2>
            <button className="close" onClick={()=>onDelete(goal._id)}><FaTimes/></button>
            <button className="edit" onClick={()=>setEditGoal(!editGoal)}><FaEdit /></button>
        </div>         
  )
}

export default ShowGoal

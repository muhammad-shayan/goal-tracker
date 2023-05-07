import { useState } from 'react'
import { createGoal } from '../features/goals/goalSlice'
import { useDispatch } from 'react-redux'

const CreateGoal = () => {
  const [text,setText] = useState('')
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createGoal({text}))
    setText('')
  }


  return (
    <section className="form">
      <form onSubmit={onSubmit}>
          <div className="form-group">
              <input type="text" id="text" name="text" value={text} placeholder='Create Goal'
              onChange={(e)=>setText(e.target.value)}/>
              <button type='submit' className="btn btn-block">Add goal</button>
          </div>
      </form>
    </section>
  )
}

export default CreateGoal

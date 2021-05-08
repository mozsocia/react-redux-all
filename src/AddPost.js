import React, { useState } from 'react'
import { useStore } from 'react-redux'
import actions from './actions'


function AddPost() {
  const { dispatch } = useStore()


  const [state, setState] = useState({
    title: null,
    body: null
  })


  const handleChange = (e) => {
    // console.log("change");
    setState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(actions.add_post(state))
    // dispatch({ type: 'ADD_POST', payload: state })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" id="title" onChange={handleChange} value={state.title || ""} />
        <input type="text" id="body" onChange={handleChange} value={state.body || ""} />
        <button type="submit">submit</button>

      </form>

    </div>
  )
}


export default AddPost

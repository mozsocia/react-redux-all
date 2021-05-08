const urlm = "http://localhost:3001/posts"
// json-server --watch db.json --port 3001

const actions = {

  delete_post: (id) => (dispatch, getState) => {
    fetch(urlm + "/" + id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
      .then(res => {
        console.log(res)
        dispatch({ type: 'DELETE_POST', id: id })
      })
      .catch(() => console.log("error"))

  }
  ,

  add_post: (state) => (dispatch, getState) => {
    const newpost = { id: getState().posts.length + 1, ...state }
    fetch(urlm, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newpost)
    })
      .then(dispatch({ type: 'ADD_POST', payload: newpost }))
      .catch((err) => console.log(err))


  },

  first_mount_fn: () => (dispatch) => {

    fetch(urlm)
      .then(res => res.json())
      .then((posts) => {
        dispatch({ type: "SET_POSTS", payload: posts })
        console.log(urlm);
      })

  }


}


// { type: 'ADD_POST', payload: state } { type: 'DELETE_POST', id: e.target.id }

export default actions
import { createStore, applyMiddleware } from 'redux';
//import logger from 'redux-logger'
import { produce } from 'immer'
import thunk from 'redux-thunk';
import { SET_POSTS, ADD_POST, DELETE_POST } from "./actionTypes"

const iniState = {
  users: ['mozdalif', 'ahiya mun'],
  posts: [
    // { id: 1, title: 'The post title  ', body: 'dskfj adskfjask djfakj slaskfjaos' },
    // { id: 2, title: '2The post title ', body: '2dskfj adskfjask djfakj slaskfjaos' },
    // { id: 3, title: '3The post title', body: '3dskfj adskfjask djfakj slaskfjaos' }
  ]
}

const Reducer = (state = iniState, action) => {

  if (action.type === DELETE_POST) {

    let id = parseInt(action.id)
    const result = produce(state, draft => {
      draft.posts = draft.posts.filter(post => post.id !== id);
    })
    return result
  }



  if (action.type === SET_POSTS) {

    const result = produce(state, draft => {
      draft.posts = action.payload;
    })

    return result
  }

  if (action.type === ADD_POST) {
    // const newpost = { id: state.posts.length + 1, ...action.payload }
    const result = produce(state, draft => {
      draft.posts.push(action.payload)
    })

    return result;
  }

  return state;


}


// export const save_post = () => async (dispatch, getState) => {
//   const posts = getState().posts
//   await fetch('http://localhost:3000/posts', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(posts)
//   })
//   alert("save success");

// }

// export const load_post = () => async (dispatch, getState) => {
//   const posts = await fetch('http://localhost:3000/posts',).then(res => res.json())
//   dispatch({ type: "SET_POSTS", payload: posts })
//   // console.log(posts);


// }


const store = createStore(Reducer, applyMiddleware(thunk))

export default store;
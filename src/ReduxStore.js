import { createStore } from 'redux';
import { produce } from 'immer'

const iniState = {
  users: ['mozdalif', 'sonia'],
  posts: [
    { id: 1, title: 'The post title  ', body: 'dskfj adskfjask djfakj slaskfjaos' },
    { id: 2, title: '2The post title ', body: '2dskfj adskfjask djfakj slaskfjaos' },
    { id: 3, title: '3The post title', body: '3dskfj adskfjask djfakj slaskfjaos' }
  ]
}

const Reducer = (state = iniState, action) => {

  if (action.type === 'DELETE_POST') {
    let id = parseInt(action.payload)
    // let newPosts = state.posts.filter(post => post.id !== id);

    // return {
    //   ...state,
    //   posts: newPosts
    // }

    const result = produce(state, draft => {
      draft.posts = draft.posts.filter(post => post.id !== id)
    })
    return result

  }

  if (action.type === 'ADD_POST') {

    //   return {
    //     ...state,
    //     posts: [
    //       ...state.posts,
    //       { id: state.posts.length + 1, ...action.payload }
    //     ]

    //   }
    // }
    action.payload.id = state.posts.length + 1

    const result = produce(state, draft => {
      draft.posts.push(action.payload)
    })

    return result
  }

  return state;
}

const store = createStore(Reducer)

export default store;
import { createStore } from 'redux';

const iniState = {
  users: ['mozdalif', 'ahiya mun'],
  posts: [
    { id: 1, title: 'The post title  ', body: 'dskfj adskfjask djfakj slaskfjaos' },
    { id: 2, title: '2The post title ', body: '2dskfj adskfjask djfakj slaskfjaos' },
    { id: 3, title: '3The post title', body: '3dskfj adskfjask djfakj slaskfjaos' }
  ]
}

const Reducer = (state = iniState, action) => {

  if (action.type === 'DELETE_POST') {
    // let id = parseInt(action.id)    
    let newPosts = state.posts.filter(post => post.id !== action.id);
    // console.log(newPosts);

    return {
      ...state,
      posts: newPosts
    }
  }

  if (action.type === 'ADD_POST') {

    // // console.log(action.payload);
    // let newState = state.posts
    // // action.payload.id = state.posts.length +1
    // newState.push(action.payload)
    const newst = {
      id: state.posts.length + 1,
      ...action.payload
    }
    return {
      ...state,
      posts: [
        ...state.posts,
        newst
      ]

    }

  }


  return state;


}


const store = createStore(Reducer)

export default store;
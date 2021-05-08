import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import actions from './actions'


function Home() {
  const posts = useSelector(state => state.posts)

  const dispatch = useDispatch()



  const handleClick = (e) => {

    dispatch(actions.delete_post(e.target.id))
    // dispatch({ type: 'DELETE_POST', id: e.target.id })
  }


  useEffect(() => {
    dispatch(actions.first_mount_fn())

  }, []);

  useEffect(() => {
    console.log("wowoww");
  })


  let postList = posts.length ? (
    posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <button onClick={handleClick} id={post.id}>DELETE</button>
        <br />
        <hr />
      </div>
    )
    )
  ) : (
    <div>no posts</div>
  );

  return (
    <div>
      <br />

      <hr />
      {postList}


    </div>
  )
}



export default Home;

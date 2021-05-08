import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const posts = useSelector(state => state.posts)

  const dispatch = useDispatch()

  const handleClick = (e) => {
    // console.log(e.target.id);
    let id = parseInt(e.target.id)
    deletePost(id);

  }
  const deletePost = (id) => dispatch({ type: 'DELETE_POST', id: id })


  let postList = posts.length ? (
    posts.map(post => {
      return (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={handleClick} id={post.id}>DELETE</button>
          <br />
          <hr />
        </div>
      )
    })
  ) : (
    <div>no posts</div>
  );

  return (
    <div>
      {postList}
    </div>
  )
}



export default Home;

import React, { Component } from 'react'
import { connect } from 'react-redux';


export class Home extends Component {
  // deletePost = (id) => this.props.dispatch({ type: 'DELETE_POST', id: id })


  handleClick = (e) => {
    // console.log(e.target.id);
    // let id = parseInt(e.target.id)
    this.props.dispatch({ type: 'DELETE_POST', payload: e.target.id })
  }


  render() {
    // console.log(this.props);
    const { posts } = this.props.rdxStore
    let postList = posts.length ? (
      posts.map(post => {
        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={this.handleClick} id={post.id}>DELETE</button>
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
}
function mapStateToProps(state) {
  return { rdxStore: state }
}



export default connect(mapStateToProps)(Home)

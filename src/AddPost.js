import React, { Component } from 'react'
import { connect } from 'react-redux'

export class AddPost extends Component {
  state = {
    id: this.props.rdxStore.posts.length + 1,
    title: null,
    body: null
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e, id) => {
    console.log(id);
    e.preventDefault()
    this.props.AddPost(this.state)

    this.setState(prevState => ({
      id: this.props.rdxStore.posts.length + 1,
      title: null,
      body: null
    }))

  }



  render() {

    // console.log("--log from addpost");
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e, 89)}>
          <input type="text" id="title" onChange={this.handleChange} value={this.state.title ? this.state.title : ""} />
          <input type="text" id="body" onChange={this.handleChange} value={this.state.body ? this.state.body : ""} />
          <button type="submit">submit</button>

        </form>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({ rdxStore: state })

const mapDispatchToProps = (dispatch) => {
  return {
    AddPost: (post) => dispatch({ type: 'ADD_POST', payload: post })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)

import React, { Component } from 'react'
import { connect } from 'react-redux'


export class AddPost extends Component {
  state = {
    title: null,
    body: null
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch({ type: 'ADD_POST', payload: this.state })

    this.setState(prevState => ({
      title: null,
      body: null
    }))
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="title" onChange={(e) => this.setState({ title: e.target.value })} value={this.state.title || ""} />
          <input type="text" id="body" onChange={(e) => this.setState({ body: e.target.value })} value={this.state.body || ""} />
          <button type="submit">submit</button>
        </form>

      </div>
    )
  }
}



// function mapStateToProps(state) {
//   return { rdxStore: state }
// }



export default connect()(AddPost)

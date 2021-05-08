import React, { Component } from 'react'
import { connect } from 'react-redux';

export class Home extends Component {

  handleClick = (e)=> {
    console.log(e.target);
    this.props.increment()
  }
  render() {
    console.log(this.props);    
    return (
      <div>
        <h1>MY Project React</h1>

        <h2>Counter: {this.props.rdxStore.counter}</h2>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({rdxStore: state})

const mapDispatchToProps = (dispatch)=> {
  return {
    increment: ()=>dispatch({type:'INCREMENT'})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home)

import React from 'react';
import AddPost from './AddPost';
import Home from './Home';



const App = () => {
  return (
    <div className="App">
      <h1>MY Project React</h1>
      <h2>ALL Posts</h2>
      <br />
      <AddPost />
      <Home title="mozdalif" pro="engineer" />

    </div>
  );
}



export default App;

const redux = require('redux');


const createStore = redux.createStore;





function buyCake() {
  return {
    type: 'BUY_CAKE',
    info: "first redux action"
  }
}



const initalCakeState = {
  numOfCakes: 10
}



const cakeReducer = (state = initalCakeState, action) => {
  switch(action.type) {
    case 'BUY_CAKE': return{
      ...state,
      numOfCakes: state.numOfCakes + 1
    }
    default: return state
  }
}


const store = createStore(cakeReducer)


console.log('inital state:', store.getState());


const unscribe = store.subscribe(()=>{
  console.log("updated store: ", store.getState());
})



store.dispatch(buyCake())

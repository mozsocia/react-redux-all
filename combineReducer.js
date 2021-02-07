const redux = require('redux');


const createStore = redux.createStore;
const combineReducers = redux.combineReducers;





function buyCake() {
  return {
    type: 'BUY_CAKE',
    info: "first redux action"
  }
}

function buyIceCream() {
  return {
    type: "BUY_ICECREAM",
    info: "first redux ice"
  }
}

const initalCakeState = {
  numOfCakes: 10
}

const initalIceCreamState= {
  numOfIceCream: 10
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

const iceCreamReducer = (state = initalIceCreamState, action) => {
  switch(action.type) {
    case 'BUY_ICECREAM': return{
      ...state,
      numOfIceCream: state.numOfIceCream + 1
    }
    default: return state
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

const store = createStore(rootReducer)













console.log('inital state:', store.getState());



const unscribe = store.subscribe(()=>{
  console.log("updated store: ", store.getState());
})

store.dispatch(buyCake())


store.dispatch(buyCake())
store.dispatch(buyIceCream())
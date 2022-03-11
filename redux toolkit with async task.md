#### First have to create a slice 
```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



// Get user goals
const getGoals = createAsyncThunk(
  'todos/getAll', // name of the thunk
  async (_, thunkAPI) => {
    try {     
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/')
        return response.data
     
    } catch (error) {
      const message =
        (error.response && error.response.data &&          
          error.response.data.message) ||
        error.message ||
        error.toString()
     
      return thunkAPI.rejectWithValue(message)
    }
  }
)


const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,

    add_goal: (state, action) => {
      state.goals.push(action.payload)
    },
    delete_goal: (state, action) => {
      state.goals = state.goals.filter(
        (goal) => goal._id !== action.payload.id
      )
    }
  },
  
  extraReducers: (builder) => {
    builder      
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
  },
})
export { getGoals }
export const { reset, add_goal, delete_goal } = goalSlice.actions
export default goalSlice.reducer


```


#### Now dispatch actions 
```js
  import { useDispatch, useSelector } from 'react-redux'
  import { getGoals, reset, add_goal, delete_goal } from '../features/goals/goalThunk'

  dispatch(getGoals())

  dispatch(add_goal({ 
      text: "complete brad mern stack"
      id: "622ad480f6853a0626503c57"
  }))

  dispatch(delete_goal({ id: 23123 }))

```

### Show data 
```js
 import { useDispatch, useSelector } from 'react-redux'
 const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )
  ```

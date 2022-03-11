goalThunk.js

```js
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/goals/'


// Create new goal
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.post(API_URL, goalData, config)
      console.log("thunk", response.data);
      return response.data

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)




// Get user goals
export const getGoals = createAsyncThunk(
  'goals/getAll',
  async (_, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user?.token
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.get(API_URL, config)

        return response.data
      } else {
        // throw new Error('token not found')
      }


    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (id, thunkAPI) => {

    try {
      const token = thunkAPI.getState().auth.user.token


      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.delete(API_URL + id, config)
      console.log(response);
      return response.data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export {
  createGoal,
  getGoals,
  deleteGoal,
}
```

goalSlice.js

```js
import { createSlice } from '@reduxjs/toolkit'
import { getGoals, createGoal, deleteGoal } from './goalThunk'

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
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload)
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
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
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        )
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})
export { getGoals, createGoal, deleteGoal }
export const { reset } = goalSlice.actions
export default goalSlice.reducer
```


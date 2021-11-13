import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {getUserByToken} from '../../utils/API/userAPI'


const initialState = {
	token: localStorage.getItem('userToken') || null,
	data: null,
	error: null,
	isLoading: true,
}



export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async () => {
		const response = await getUserByToken()
		// eslint-disable-next-line no-console
		// console.log('user',response)
		return response.data
	}
)


const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setToken(state, action)
		{
			state.token = action.payload
			localStorage.setItem('userToken',action.payload)
		},
		logOut(state)
		{
			localStorage.removeItem('userToken')
			state = initialState
			return state
		},
	},
	extraReducers: {
		[fetchUser.fulfilled]: (state, action) => {
			delete(action.payload.password)
			state.data = action.payload
			state.isLoading = false
			state.error = null
		},
		[fetchUser.pending]: (state) => {
			state.isLoading = true
			state.error = null
		},
		[fetchUser.rejected]: (state) => {
			state.isLoading = true
			state.token = null
			state.error = 'Error happened while links loading'
		},
	}
})

export const { actions } = userSlice

export default userSlice.reducer
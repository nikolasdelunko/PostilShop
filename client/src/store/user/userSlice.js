import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserByToken } from '../../utils/API/userAPI'
import { getCustomerOrders } from '../../utils/API/ordersAPI'
import { getSubscriptionByEmail } from '../../utils/API/subscribersAPI'


const initialState = {
	token: localStorage.getItem('userToken') || null,
	data: null,
	error: null,
	isLoading: false,
	order: null,
	orders : null,
}

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async () => {
		const response = await getUserByToken()
		// return (!response.isError) ?  : null
		// return response.data
		if(!response.isError)
		{
			if(response.data.email)
			{
				const {email} = response.data
				const subscribeResp = await getSubscriptionByEmail(email, false)
				return (subscribeResp.isError && subscribeResp.errors.message) 
					? {...response.data, subscribe: true} 
					: {...response.data, subscribe: false}
			}
			else
			{
				return response.data
			}
		}
		else
		{
			return null
		}
	}
)

export const fetchUserOrders = createAsyncThunk(
	'user/fetchUserOrders',
	async () =>{
		const response = await getCustomerOrders()
		return (!response.isError) ? response.data : null
		// return response.data
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setNewData(state,action){
			state.data = action.payload
		},
		setToken(state, action) {
			const { token, rememberMe } = action.payload
			state.token = token
			if (rememberMe) {
				localStorage.setItem('userToken', token)
			}
		},
		logOut(state) {
			localStorage.removeItem('userToken')
			return {...state, order: null, orders : null, token: null, data: null}
		},

		setOrder(state,action) {
			state.order = action.payload
		}
	},
	extraReducers: {
		[fetchUser.fulfilled]: (state, action) => {
			delete (action.payload.password)
			state.data = action.payload
			state.isLoading = false
			state.error = null
		},
		[fetchUser.pending]: (state) => {
			state.isLoading = true
			state.error = null
		},
		[fetchUser.rejected]: (state) => {
			localStorage.removeItem('userToken')
			state.isLoading = false
			state.token = null
			state.error = 'Error happened while user data loading. Relogin plz'
		},
		[fetchUserOrders.fulfilled]:(state,action) => {
			state.orders = action.payload
			state.isLoading = false
			state.error = null
		},
		[fetchUserOrders.pending]:(state)=>{
			state.isLoading =true
			state.error = null
		},
		[fetchUserOrders.rejected]:(state)=>{
			state.isLoading = false
			state.error = 'Error happened while user data loading. Relogin plz'
		},
	}
})

export const { actions } = userSlice

export default userSlice.reducer
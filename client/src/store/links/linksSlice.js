import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {getLinks} from '../../utils/API/linksApi'

export const fetchLinks = createAsyncThunk(
	'links/fetchLinks',
	async () => {
		const response = await getLinks()
		return (!response.isError) ? response.data : []
	}
)

const linksSlice = createSlice({
	name: 'links',
	initialState: {
		data: [],
		isLoading: true,
	},
	extraReducers: {
		[fetchLinks.fulfilled]: (state, action) => {
			state.data = action.payload
			state.isLoading = false
		},
		[fetchLinks.pending]: (state) => {
			state.isLoading = true
		},
		[fetchLinks.rejected]: (state) => {
			state.isLoading = false
		},
	},
})

export const { actions } = linksSlice

export default linksSlice.reducer
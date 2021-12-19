import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {getSettings} from '../../utils/API/settingsApi'
import { returnMode } from '../../utils/helpers/stringHelper'

const initialState = {
	data: null,
	isLoading: true,
	error: null,
}

export const fetchSettings = createAsyncThunk(
	'settings/fetchSettings',
	async () => {
		const mode = returnMode()
		const response = await getSettings()
		if(response.data)
		{
			return response.data[0][mode].settings
		}
	}
)

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	extraReducers: {
		[fetchSettings.fulfilled]: (state, action) => {
			state.data = action.payload
			state.isLoading = false
			state.error = null
		},
		[fetchSettings.pending]: (state) => {
			state.isLoading = true
			state.error = null
		},
		[fetchSettings.rejected]: (state, action) => {
			state.isLoading = false
			state.error = action.payload
		},
	}
})

export const { actions } = settingsSlice

export default settingsSlice.reducer
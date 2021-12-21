import { createAsyncThunk } from '@reduxjs/toolkit'
import {getCategories} from '../../utils/API/categoriesApi'

const fetchCategories = createAsyncThunk(
	'category/fetchCategories',
	async () => {
		const response = await getCategories()
		return (!response.isError) ? response.data : []
	}
)

export default { fetchCategories }
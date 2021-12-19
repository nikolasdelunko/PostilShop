// import axios from 'axios'
import {FetchData} from './base'

const api = new FetchData('/api/configs')

export const getSettings = () => api.get('')

export default {
	getSettings,
}
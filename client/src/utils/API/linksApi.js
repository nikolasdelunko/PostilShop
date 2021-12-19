import {FetchData} from './base'

const api = new FetchData()

const getLinks = () => api.get('/api/links')

export default {getLinks}
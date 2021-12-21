import {FetchData} from './base'

const api = new FetchData('/api/catalog')

export const getCategories = () => api.get('')
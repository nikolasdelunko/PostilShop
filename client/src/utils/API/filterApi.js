import {FetchData} from './base'

const api = new FetchData('/api/filters')

export const getFiltersByType = (type) => api.get(`/${type}`)

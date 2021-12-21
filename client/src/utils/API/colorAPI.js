import {FetchData} from './base'

const api = new FetchData('/api/colors')

export const getColors = () => api.get('')
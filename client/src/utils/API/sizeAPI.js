import {FetchData} from './base'

const api = new FetchData('/api/sizes')

export const getSizes = () => api.get('')
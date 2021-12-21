import {FetchData} from './base'

const api = new FetchData('/api/links')

export const getLinks = () => api.get('')
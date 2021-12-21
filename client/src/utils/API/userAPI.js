import {FetchData} from './base'

const api = new FetchData('/api/customers')

export const registerUser = (data) => api.post('', data)

export const loginUser = (data) => api.post('/login', data, '', {}, false)

export const updateData = (data) => api.put('', data)

export const updatePassword = (data) => api.put('/password', data)

export const getUserByToken = () => api.get('/customer')
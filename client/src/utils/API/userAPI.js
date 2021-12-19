import axios from 'axios'

import {FetchData} from './base'

const api = new FetchData('/api/customers')

export const registerUser = (data) => api.post('', data)

export const loginUser = (data) => api.post('/login', data)

export const updateData = (data) => axios.put('/api/customers', data)

export const updatePassword = (data) => axios.put('/api/customers/password', data)

export const getUserByToken = () => axios('/api/customers/customer')

export const getUserOrders = () => axios('/api/orders')


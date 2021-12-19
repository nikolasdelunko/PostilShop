import axios from 'axios'

import {FetchData} from './base'

const api = new FetchData('')

// export const registerUser = (data) => axios.post('/api/customers/', data)
export const registerUser = (data) => api.post('/api/customers', data)

// export const loginUser = (data) => axios.post('/api/customers/login', data)
export const loginUser = (data) => api.post('/api/customers/login', data)

export const updateData = (data) => axios.put('/api/customers', data)

export const updatePassword = (data) => axios.put('/api/customers/password', data)

export const getUserByToken = () => axios('/api/customers/customer')

export const getUserOrders = () => axios('/api/orders')


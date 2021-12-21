import axios from 'axios'

import {FetchData} from './base'

const api = new FetchData('/api/orders')

const placeOrder = (newOrder) => axios.post('/api/orders', newOrder)
// please look up in docs what to put in newOrder

// eslint-disable-next-line max-len
const updateOrder = (updatedOrder, orderId) => axios.put(`/orders/${orderId}`, updatedOrder)
// updatedOrder is an obejct with parameters you want to add or edit

const cancelOrder = (orderId) => axios.put(`/orders/cancel/${orderId}`)
// turns parameter canceled to true and sends email to customer

const deleteOrder = (orderId) => axios.delete(`/orders/${orderId}`)

export const getCustomerOrders = () => api.get('')
// gets all the orders of a current customer. Requires authorization

const getOrderByOrderNo = (orderNo) => axios.get(`/orders/${orderNo}`)
// orderNo is assigned to the order by the system atomatically, when it is created

export default {
	placeOrder,
	updateOrder,
	cancelOrder,
	deleteOrder,
	getOrderByOrderNo
}
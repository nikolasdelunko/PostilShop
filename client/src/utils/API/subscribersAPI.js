import {FetchData} from './base'
import {subscribeTemlate, unSubscribeTemlate} from '../emailTemplates'

const api = new FetchData('/api/subscribers/')

export const addSubscribe = (email) => api.post('',{
	email: email,
	letterSubject: 'Your subscription promo code',
	letterHtml: subscribeTemlate(email),
})

export const getSubscriptionByEmail = (email) => api.get(`${email}`)

export const changeSubscription = (obj) => api.put(
	`email/${obj.email}`,{
		...obj,
		letterSubject: obj.enabled === true ? 'Subscription activation' : 'Subscription cancel',
		letterHtml: obj.enabled === true 
			? subscribeTemlate(obj.email) 
			: unSubscribeTemlate(obj.email),
	})
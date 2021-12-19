/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import { toastr } from 'react-redux-toastr'
import axios from 'axios'
// import i18n from '../i18n'
// import { toastrErrorOptions } from '../utils/responseToastrUtil'
// import history from '../routes/history'

import { snackActions } from '../configurators/SnackBarUtils'


const METHOD_GET = 'get'
const METHOD_POST = 'post'
const METHOD_PUT = 'put'
const METHOD_DELETE = 'delete'

export class FetchData {
	constructor(url = '') {
		this.baseUrl = url
	}

	get(url, requestParams, headers, showError = true) {
		return this.makeRequest(
			this.baseUrl + url,
			METHOD_GET,
			null,
			requestParams,
			headers,
			showError
		)
	}

	post(url, body, requestParams, headers, showError = true) {
		return this.makeRequest(
			this.baseUrl + url,
			METHOD_POST,
			body,
			requestParams,
			headers,
			showError
		)
	}
	
	put(url, body, requestParams, headers, showError = true) {
		return this.makeRequest(
			this.baseUrl + url,
			METHOD_PUT,
			body,
			requestParams,
			headers,
			showError
		)
	}
	
	delete(url, body, requestParams, headers, showError = true) {
		return this.makeRequest(
			this.baseUrl + url,
			METHOD_DELETE,
			body,
			requestParams,
			headers,
			showError
		)
	}

	makeRequest(url, method, body, reqParams, headers, showError) {
		const appliedHeaders = headers || {}

		const requestParams = {
			method: method || METHOD_GET,
			data: body,
			params: {
				...(reqParams || {})
			},
			headers: appliedHeaders
		}

		if (method === METHOD_POST || method === METHOD_PUT) {
			requestParams.headers['Content-Type'] = 'application/json'
		}

		return this.sendRequest(url, requestParams, showError)
	}

	sendRequest(url, requestParams, showError) {
		return new Promise((resolve, reject) => {
			axios(url, requestParams)
				.then(result => resolve(result))
				.catch(reason => {
					if (showError) {
						this.requestFailed(reason, showError, url)
					}
					if (reason && reason.response) {
						const { data } = reason.response
						console.log('RESPONSE',data)
						// reject(new Error(data && data.message))
						reject(data)
					}
					else reject(reason)
				})
		})
	}

	requestFailed(reason, showError, url) {
		const { response } = reason
		
		// eslint-disable-next-line no-console
		// console.log('AAAALLLL', response)

		const message = response && response.data && response.data.message
		if (message) {
		// 	toastr.light(
		// 		i18n.isInitialized ? i18n.t('toastr.error') : 'Помилка',
		// 		message,
		// 		toastrErrorOptions
		// 	)
		// } else if (i18n.isInitialized) {
		// 	toastr.light(
		// 		i18n.t('toastr.error'),
		// 		i18n.t('toastr.somethingWrong'),
		// 		toastrErrorOptions
		// 	)
			// eslint-disable-next-line no-console
			console.log('PIZDEC', response)
			snackActions.warning(message)
		}
		if (
			response &&
			(
				(response.status === 404 && 
					!url.includes('/api/customers/login')) ||
				response.status === 500 ||
				(response.status === 401 &&
					showError &&
					!url.includes(`${process.env.REACT_APP_API_PATH}/auth`)))
		) {
			// history.push({
			//   pathname: '/error',
			//   state: {
			//     message: response.data && response.data.message,
			//     status: response.status
			//   }
			// })
			// eslint-disable-next-line no-console
			console.log('AHTUNG', response)
			snackActions.warning('Server error, reload plz!')
		}
	}
}

const api = new FetchData()
// const routedApi = new FetchData(process.env.REACT_APP_API_PATH)

// export default FetchData
export default api
// export { routedApi }







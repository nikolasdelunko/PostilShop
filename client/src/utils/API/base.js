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

	async	sendRequest(url, requestParams, showError) {
		try{
			const result = await axios(url, requestParams)
			return {isError: false, data: result.data}
		}
		catch(catchedErr)
		{
			// eslint-disable-next-line no-console
			console.log('catchedErr',catchedErr.response.data, typeof catchedErr.response.data)
		
			if(showError)
			{
				this.myRequestFailed(catchedErr, showError, url)
			}
			//можно прикрутить отправку на сервер или setry.io

			//при желании их можно получать и обрабатывать на месте без try-catch
			return {isError: true, errors: typeof catchedErr.response.data === 'object' ? catchedErr.response.data : {}}
		}
	}

	// eslint-disable-next-line no-unused-vars
	myRequestFailed(reason, showError, url) {
		const { response } = reason
		const messages = response && response.data && typeof response.data === 'object' && response.data
		if(Object.keys(messages).length && showError)
		{
			Object.values(messages).map(message => snackActions.warning(message))
		}

		//лучше сделать редирект на 404 или что-то типа

		// eslint-disable-next-line no-console
		console.log('errors',reason)
	}

}

const api = new FetchData()

export default api
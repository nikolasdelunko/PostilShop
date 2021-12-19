import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { userOperations, userSelectors} from '../../store/user'
import { loginUser, registerUser } from '../API/userAPI'
import {subscribeTemlate} from '../emailTemplates'
import modalActions from '../../store/modal'
import {snackActions} from '../configurators/SnackBarUtils'

const useAuth = () => {
	const dispatch = useDispatch()
	const token = useSelector(userSelectors.getToken())
	const checkToken = () => 
	{
		if (token) {
			axios.defaults.headers.Authorization = token
			dispatch(userOperations.fetchUser())
			dispatch(userOperations.fetchUserOrders())
		} else {
			axios.defaults.headers.Authorization = null
			/*if setting null does not remove `Authorization` header then try     
					delete axios.defaults.headers.common['Authorization'];
				*/
		}
		return token
	}

	const login = async (values) => {
		let formData = {...values}
		const {rememberMe} = formData
		delete (formData.rememberMe)
	
		const res = await loginUser(formData)
		if (res.data) {
			//save token to store (and localStorage)
			dispatch(userOperations.setToken({token: res.data.token, rememberMe}))
			dispatch(modalActions.modalToggle(false))
			snackActions.success('You successfully Logged In')
		}
	}

	const register = async (values) => {
		let formData = {
			...values,
			letterSubject: 'Your subscription promo code',
			letterHtml: subscribeTemlate(values.email),
		}
		const {email: loginOrEmail,password,rememberMe} = formData
		delete (formData.confirmPass)
		delete (formData.rememberMe)
		const res = await registerUser(formData)
		if (res.data) {
			snackActions.success('You successfully registered')
			await login({loginOrEmail,password,rememberMe})
		}
	}
	return {checkToken, login, register}
}

export default useAuth
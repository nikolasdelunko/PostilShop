import React from 'react'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { Box, Button, Grid, Typography } from '@mui/material'
import { border } from './styles'
import TextInput from '../UserProfile/UserForm/FormUI/Textfield'
import SelectInput from '../UserProfile/UserForm/FormUI/SelectInput'
import countries from '../UserProfile/UserForm/data/countries.json'
import { useDispatch, useSelector } from 'react-redux'
import { userOperations, userSelectors } from '../../store/User'
import * as Yup from 'yup'
import { phoneRegExp } from '../UserProfile/UserForm/data/Regex'
import PropTypes from 'prop-types'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'




const FORM_VALIDATION = Yup.object().shape({
	firstName: Yup
		.string()
		.min(4, 'Write Real Name')
		.max(50, 'Too Long')
		.typeError('Write Real Name')
		.required('required'),
	lastName: Yup
		.string()
		.min(4, 'Write Real Name')
		.max(50, 'Too Long')
		.typeError('Write Real Name')
		.required('required'),
	phone: Yup.string()
		.matches(phoneRegExp, 'Please enter a valid phone number').required('required')
	,
	email: Yup
		.string()
		.email('Invalid email'),
	address: Yup
		.string()
		.min(10, 'Write Real Address')
		.max(50, 'Too Long')
		.required('required'),
	city: Yup
		.string()
		.max(10, 'Write Real city')
		.required('required'),
	zip: Yup
		.string()
		.matches(/^[0-9]+$/, 'Must be only numbers')
		.max(6, 'Not valid zip code')
		.min(4, 'Not valid zip code')
		.required('required'),
	country: Yup
		.string()
		.required('required'),
})

const ShipAdr = ({handleNext, handleBack}) => {
	const user = useSelector(userSelectors.getData())
	const token = useSelector(userSelectors.getToken())
	const dispatch = useDispatch()
	const isLoggedIn = !!user

	const INITIAL_FORM_STATE = {
		firstName:user?.lastName || '',
		lastName: user?.lastName ||'',
		email: user?.email || '',
		phone: user?.phone || '',
		address: user?.address || '',
		city: user?.city || '',
		country: user?.country || '',
		zip: user?.zip || '' ,
	}


	return (
		<div>
			<Formik
				initialValues={{ ...INITIAL_FORM_STATE }}
				validationSchema={FORM_VALIDATION}
				onSubmit={(values) => {

					const update ={
						firstName: values.firstName,
						lastName: values.lastName,
						email:values.email,
						phone: values.phone,
						address: values.address,
						city: values.city,
						country: values.country,
						zip: values.zip,

					}
					{isLoggedIn ?
						axios.put('/api/customers', update , {
							headers: {Authorization : token}
						}): dispatch(userOperations.setUnregistered(update)) && localStorage.setItem('Unregistered' , JSON.stringify(update))}
				}}
			>
				{({ handleSubmit, isValid, dirty }) => (
					<Form>
						<Typography
							variant='body1'
							color='primary'
							fontSize='40px'
							fontWeight='700'
							letterSpacing='3px'
							// textAlign='center'
							component={'div'}
							sx={{mb:'25px', mt:'10px'}}
						>
						Shipping Details
						</Typography>
						<div style={border} />
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<TextInput
									name="firstName"
									label="First Name *"


								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextInput
									name="lastName"
									label="Last Name *"
								/>
							</Grid>
							<Grid item xs={12} >
								<TextInput name="address" label="Address *" />
							</Grid>
							<Grid item xs={6} >
								<TextInput name="address2" label="Address 2" />
							</Grid>
							<Grid item xs={6} md={6}>
								<TextInput
									name="email"
									label="Email"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<SelectInput
									name="country"
									label="Country *"

									options={countries}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextInput name="city" label="City *" />
							</Grid>
							<Grid item xs={12} md={6}>
								<TextInput
									name="zip"
									label="Zip/Postal Code *"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextInput name="phone" label="Phone number *" />
							</Grid>
						</Grid>
						<Box style={border}/>
						<Box sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
							<Button
								variant="text"
								sx={{
									fontSize: '18px',
									color: '#373F41',
								}}
								onClick={()=> {
									handleBack()
								}}
							><ArrowBackIosNewIcon
									sx={{
										height: '17px',
									}}
								/> BACK</Button>
							<Button
								disabled={!isValid && !dirty}
								type='submit'
								sx={{
									width: '200px',
									height: '50px',
									background: '#373F41',
									borderRadius: '4px',
									border: 'none',
									top: '102%',
									cursor: 'pointer',
								}}
								onClick={ () => {
									handleSubmit()
									{isValid &&  dirty && handleNext()}
								}}
								variant="contained"
							>
							NEXT
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</div>
	)
}

ShipAdr.propTypes = {
	handleNext: PropTypes.func,
	handleBack: PropTypes.func,
}
export default ShipAdr
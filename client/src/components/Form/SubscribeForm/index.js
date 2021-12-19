import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, Alert } from '@mui/material'
import { SUBSCRIBE_SCHEMA } from '../setting/Schemes'
import TextInput from '../setting/customElements/TextInput'
import { addSubscribe } from '../../../utils/API/subscribersAPI'
import { styled } from '@mui/material/styles'

import { snackActions } from '../../../utils/configurators/SnackBarUtils'

const StyledForm = styled(Form)(() => ({
	display: 'flex',
	width: '100%',
}))

const StyledAlert = styled(Alert)(() => ({
	width: '100%',
}))

const SubscribeForm = () => {
	const handleSubmit = async ({ email }, formikFunctions) => {
		const res = await addSubscribe(email)
		if (res.data) {
			snackActions.success('You successfully subscribed')
			formikFunctions.resetForm()
		}
	}

	return (
		<Formik
			initialValues={{ email: '' }}
			validationSchema={SUBSCRIBE_SCHEMA}
			onSubmit={handleSubmit}
		>
			{(formikProps) => (
				<>
					<StyledForm noValidate>
						<Field
							data-testid="email"
							component={TextInput}
							type="email"
							placeholder="e-mail"
							name="email"
							onBlur={formikProps.handleBlur}
							onChange={formikProps.handleChange}
							error={true}
							asyncborderradius={'on'}
							fullWidth={true}
						/>

						<Button
							data-testid="button"
							type='submit'
							variant="contained"
							disabled={
								!formikProps.isValid ||
								formikProps.isSubmitting
							}
							asyncborderradius={'on'}
							sx={{
								paddingLeft: '40px',
								paddingRight: '40px',
							}}
						>
							send
						</Button>
					</StyledForm>

					{!formikProps.isValid && (
						<StyledAlert
							severity="error"
							icon={false}
						>
							{formikProps.errors.email}
						</StyledAlert>
					)}
				</>
			)}
		</Formik>
	)
}

export default SubscribeForm

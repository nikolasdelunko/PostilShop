import React from 'react'
import PropTypes from 'prop-types'
import {Box, Button, Typography} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const CartPageFragments = ({content, activeStep, handleBack, handleNext}) => 
{
	return (
		<>
			<Typography
				sx={{ mt: 2, mb: 1 }}
			>
				{content}
			</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
			
				<Button
					variant="text"
					sx={{
						marginLeft: '5rem',
						fontSize: '18px',
						color: '#373F41',
					}}
					disabled={activeStep === 0}
					onClick={handleBack}
				><ArrowBackIosNewIcon
						sx={{
							height: '17px',
						}}
					/>
					BACK
				</Button>

				{activeStep === 0 && (
					<>
						<Box sx={{ flex: '1 1 auto' }} />
						<Button variant={'contained'} onClick={handleNext} style={{width: '200px', marginRight: '4rem'}}>
							NEXT
						</Button>
					</>
				)}

				<Box sx={{ flex: '1 1 auto' }} />
			</Box>
		</>
	)
}

CartPageFragments.propTypes = {
	content: PropTypes.element,
	activeStep: PropTypes.number,
	handleBack: PropTypes.func,
	handleNext: PropTypes.func,
}

export default CartPageFragments
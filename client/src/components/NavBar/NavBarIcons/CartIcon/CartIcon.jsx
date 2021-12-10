import React from 'react'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import { useStyles } from './styles'
import { useDispatch } from 'react-redux'
import modalActions from '../../../../store/Modal'
import CartModal from '../../../Modal/CartModal/CartModal'
import { Box } from '@mui/system'
import useHandleShoppingBag from '../../../../utils/customHooks/useHandleShoppingBag'

const Carticon = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const handleOpen = (content) => dispatch(modalActions.modalToggle(content))
	const {totalProductsQuanity} = useHandleShoppingBag()

	return (
		<IconButton
			aria-label="cart"
			sx={{ padding: 0 }}
			title='Cart'
			onClick={() => handleOpen(<CartModal />)}
			data-testid='navbar-cart-icon'
		>
			<Badge badgeContent={totalProductsQuanity} color="success">
				<Box className={classes.navbarLink}>
					<LocalMallIcon />
				</Box>
			</Badge>
		</IconButton>
	)
}

export default Carticon
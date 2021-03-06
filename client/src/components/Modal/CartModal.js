import React from 'react'
import BasicModal from './Modal'
import useHandleShoppingBag from '../../utils/customHooks/useHandleShoppingBag'
import CardInModal from '../CardInModal/CardInModal'
import { Button, GlobalStyles, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Box } from '@mui/system'
import { useDispatch } from 'react-redux'
import modalActions from '../../store/Modal'

const style = {
	modal: {
		position: 'absolute',
		overflowY: 'scroll',
		top: '50%',
		left: '50%',
		width: 320,
		boxSizing: 'border-box',
		transform: 'translate(-50%, -50%)',
		bgcolor: '#fff',
		padding: '15px 10px 0',
		maxHeight: '80vh',
	},
	link: {
		textDecoration: 'none',
		display: 'block',
		width: '100%',
		margin: '1.5rem 0'
	},
	button: {
		width: '100%'
	},
	title: {
		margin: '1rem 0'
	}
}

const CartModal = () => {
	const { shoppingBag, totalPrice } = useHandleShoppingBag()
	const dispatch = useDispatch()
	const handleClose = () => dispatch(modalActions.modalToggle(false))

	console.log(shoppingBag)
	return (
		<BasicModal
			style={style.modal}
			body={
				<Box>
					{shoppingBag?.length
						? <Box>
							<GlobalStyles
								styles={{
									'*::-webkit-scrollbar': {
										width: '0.2em',
									},
									'*::-webkit-scrollbar-thumb': {
										backgroundColor: '#373F41',
										outline: '1px solid slategrey',
									},
								}}
							/>
							<Typography
								fontSize={18}
								style={style.title}>
								TOTAL: USD ${totalPrice}.00
							</Typography>
							<Link exact='true' to={'/cart'} style={style.link}>
								<Button
									onClick={handleClose}
									variant={'contained'}
									style={style.button}>
									CHECKOUT
								</Button>
							</Link>
							<Box>
								{shoppingBag?.map((item, key) =>
									(<CardInModal
										price={item?.currentPrice}
										image={'/' + item.imageUrls[0]}
										title={item?.product?.name}
										key={key}
										size={item?.size?.name}
										color={item?.color?.name}
										amount={item?.amount}
									/>))}
							</Box>
						</Box>
						: <Box style={{ margin: '3rem auto' }}>
							<Typography
								fontSize={32}
								variant={'h2'}
								style={{ textAlign: 'center', padding: '0 2rem' }}>
								Your bag is feeling lonely - add some beautiful new to it!
							</Typography>
							<Button
								variant={'contained'}
								style={{ margin: '2rem auto 0', display: 'block' }}
								onClick={handleClose}>
								CONTINUE SHOPPING
							</Button>
						</Box>}
				</Box>}
		/>
	)
}

export default CartModal
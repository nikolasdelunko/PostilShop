import React from 'react'
import { Button } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { ProductSelector } from '../../../store/product'
import modalActions from '../../../store/modal'
import { favoritesOperations} from '../../../store/favorites'
import LoginModal from '../../Modal/LoginModal/LoginModal'
import useHandleShoppingBag from '../../../utils/customHooks/useHandleShoppingBag'
import { userSelectors } from '../../../store/user'
import { useTheme } from '@mui/styles'

import { snackActions } from '../../../utils/configurators/SnackBarUtils'

const ActionButtons = () => {
	const handleShoppingBag = useHandleShoppingBag()
	const activeProduct = useSelector(ProductSelector.getProduct())
	const dispatch = useDispatch()
	const user = useSelector(userSelectors.getData())
	const handleOpen = (content) => dispatch(modalActions.modalToggle(content))
	const favoritesStorage = JSON.parse(localStorage.getItem('favorites')) || []
	const allSizes = useSelector(ProductSelector.allSizes())
	const allColors = useSelector(ProductSelector.allColors())
	const parent = useSelector(ProductSelector.getParent())
	const theme = useTheme()

	const addToFavorites = () => {
		if (!localStorage.getItem('favorites')) localStorage.setItem('favorites', JSON.stringify([]))

		if (favoritesStorage.includes(activeProduct._id)) {
			const index = favoritesStorage.indexOf(activeProduct._id)
			favoritesStorage.splice(index, 1)
		} else {
			favoritesStorage.push(activeProduct._id)
		}
		favoritesOperations.fetchFavorites(favoritesStorage)(dispatch)
		localStorage.setItem('favorites', JSON.stringify(favoritesStorage))
	}

	return (
		<>
			<Button
				disableRipple
				disabled={activeProduct.quantity < 1}
				sx={{
					mx: '13px',
					padding: { lg: '21px 33px', md: '16px', sm: '10px' },
					[theme.breakpoints.between('766', '860')]: { fontSize: '9px' }
				}}
				variant={'contained'}
				onClick={() => {
					const activeSizeName = allSizes.filter(
						i => i.size._id === activeProduct.size
					)
					const activeColorName = allColors.filter(
						i => i._id === activeProduct.color
					)

					handleShoppingBag.add({
						...activeProduct,
						size: activeSizeName[0].size.name,
						color: activeColorName[0].name,
						title: parent.name,
						description: parent.description
					})
					snackActions.success('+ 1 product added')
				}}
			>
				ADD TO BAG
			</Button>
			<Button disableRipple
				title={favoritesStorage.includes(activeProduct._id) ? 'remove from favorites' : 'add to favorites'}
				sx={{
					padding: { lg: '22px', md: '16px', sm: '12px', xs: '9px' },
					[theme.breakpoints.between('766', '860')]: { padding: '12px' }
				}}
				variant={'contained'}
				onClick={!user
					? async () => {
						await handleOpen(<LoginModal />)
						await !favoritesStorage.includes(activeProduct._id)
							&& addToFavorites()
					}
					: addToFavorites
				}
			>
				{favoritesStorage.includes(activeProduct._id) && user
					? <FavoriteOutlinedIcon fontSize={'small'} />
					: <FavoriteBorderOutlinedIcon fontSize={'small'} />
				}
			</Button>
		</>
	)
}

export default ActionButtons

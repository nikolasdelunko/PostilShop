import React, { useEffect } from 'react'
import { Button, Container, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { favoritesOperations, favoritesSelectors } from '../../store/Favorites'
import { Box } from '@mui/system'
import BackdropLoader from '../../components/UI/BackdropLoader/BackdropLoader'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard'
import UseSeo from '../../utils/customHooks/useSeo'

const Favorites = () => {
	const favorites = useSelector(favoritesSelectors.getFavorites())
	const isLoading = useSelector(favoritesSelectors.isLoading())
	const dispatch = useDispatch()
	const favoriteID = JSON.parse(localStorage.getItem('favorites')) || []

	useEffect(() => {
		favoritesOperations.fetchFavorites(favoriteID)(dispatch)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [favoriteID.length])

	return (
		<>
			<UseSeo 
				title = {'Product Favorites'}
				description = {'Product favorites user liked'}
				keywords = {
					favorites ? favorites.map(
						favorite => `${favorite.name}, ${favorite.manufacturer}, 
						${favorite.brand}, ${favorite.seller}, 
						${favorite.manufacturerCountry}`)
						.join(', ') 
						: null
				}
			/>
			<Container maxWidth={'lg'} sx={{ minWidth: 320
			}}>
				{isLoading && <BackdropLoader open={isLoading} />}
				{!favoriteID.length
					? <Box style={{ textAlign: 'center', margin: '7rem 0' }}>
						<Typography
							fontSize={32}
							sx={{ mb: '14px', mt: '30px', textTransform: 'uppercase' }}
							variant='h2'
						>
						Oops! Your wish list is empty
						</Typography>
						<Typography
							fontSize={25}
							variant='h4'
						>
						You can add items here if you haven&apos;t decided to buy them yet
						</Typography>
						<Link
							to={'/shop/catalog'}
							style={{ textDecoration: 'none' }}
						>
							<Button
								variant='contained'
								style={{ marginTop: '2rem' }}
							>
							Continue shopping
							</Button>
						</Link>
					</Box>
					: <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography
							fontSize={32}
							sx={{ mb: '14px', mt: '30px' }}
							variant='h2'
						>
						Favorites
						</Typography>
					</Box>
				}
				<Grid container spacing={2} sx={{ marginBottom: '40px' }} >
					{favorites?.map(item => (
						<Grid item md={6} sm={6} xs={12} key={item.variants._id}>
							<ProductCard
								_id={item.variants._id}
								sx={{ width: { sm: '580px' }, height: { sm: '545px' } }}
								image={'/' + item.variants.imageUrls[0]}
								title={item.name}
								price={item.variants.currentPrice}
							/>
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	)
}

export default Favorites
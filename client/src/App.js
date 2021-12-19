/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Header from './components/NavBar/NavBar'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes'
import { useSelector, useDispatch } from 'react-redux'
import { modalSelectors } from './store/modal'
import useAuth from './utils/customHooks/useAuth'
import ScrollButton from './components/ScrollButton/ScrollButton'
// import RootSnackBar from './components/UI/RootSnackBar'
import { settingsOperations } from './store/settings'
import { makeStyles } from '@mui/styles'

import UseScrollToTop from './utils/customHooks/useScrollToTop'

import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from './utils/configurators/SnackBarUtils'


const useStyles = makeStyles(() => ({
	snackbar: {
		zIndex: '99999999999!important',
	}
}))

const App = () => {
	const { checkToken } = useAuth()
	const dispatch = useDispatch()
	const modal = useSelector(modalSelectors.checkOpen())
	const classes = useStyles()

	useEffect(() => {
		checkToken()
	}, [checkToken])

	useEffect(() => {
		dispatch(settingsOperations.fetchSettings())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const exeptionScroll = ['/shop/catalog', '/search']

	

	return (
		<div className={'App'}>
			<SnackbarProvider
				classes={{containerRoot: classes.snackbar}}
			>
				<SnackbarUtilsConfigurator />
				<Header />
				<UseScrollToTop exeptions={exeptionScroll} >
					<AppRoutes />
				</UseScrollToTop>
				<Footer />
				{/* <RootSnackBar /> */}
				<ScrollButton />
			</SnackbarProvider>
			{modal}
		</div>
	)
}

export default App
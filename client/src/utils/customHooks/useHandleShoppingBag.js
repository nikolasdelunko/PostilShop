import { useDispatch, useSelector } from 'react-redux'
import {shoppingBagSelectors, shoppingBagOperations} from '../../store/ShoppingBag'
import cartAPI from '../../utils/API/cartAPI'

export default function useHandleShoppingBag() {
	const dispatch = useDispatch()
	const shoppingBag = useSelector(shoppingBagSelectors.getShoppingBag())
	const totalPrice = shoppingBag?.reduce((acc, prodObject) => 
		acc + (prodObject.product.currentPrice * prodObject.cartQuantity)
	, 0)
	const totalProductsQuanity = shoppingBag?.reduce(
		(acc, prodObject) => acc + prodObject.cartQuantity, 0)

	const add = (product) => {
		const newProduct = {cartQuantity: 1, product}
		const bag = shoppingBag.map( prod => prod.product._id === product._id 
			? {
				...prod, 
				cartQuantity: (prod.cartQuantity + 1 <= prod.product.quantity) 
					? prod.cartQuantity + 1 
					: prod.product.quantity
			}
			: prod
		)
		if(bag.findIndex(	prod => prod.product._id === product._id ) === -1)
		{
			bag.push(newProduct)
		}
		dispatch(shoppingBagOperations.setData(bag))
		// cartAPI.addProductToCart(product._id)
	}

	// const remove = async (id) => {
	const remove = (id) => {
		// const shoppingBag = JSON.parse(localStorage.getItem('shoppingBag'))
		// const newShoppingBag = [
		// 	...shoppingBag.filter(item => item?._id !== id),
		// 	...shoppingBag.filter(item => item?._id === id)?.slice(0, -1),
		// ]
		// const bag = shoppingBag.filter(prodObject => prodObject.product._id !== id)

		const bag = shoppingBag
			.map( prod => prod.product._id === id 
				? {
					...prod, 
					cartQuantity: prod.cartQuantity - 1
				}
				: prod
			)
			.filter(prod => prod.cartQuantity > 0)
		
		dispatch(shoppingBagOperations.setData(bag))
		// localStorage.setItem('shoppingBag', JSON.stringify(newShoppingBag))
		// dispatch(shoppingBagOperations.removeFromShoppingBag(newShoppingBag))
		
		// await cartAPI.deleteProductFromCart(id)
	}


	// const removeAll = async (id) => {
	const removeAll = (id) => {
		const bag = shoppingBag.filter(prodObject => prodObject.product._id !== id)
		dispatch(shoppingBagOperations.setData(bag))


		// const shoppingBag = JSON.parse(localStorage.getItem('shoppingBag'))
		// const newShoppingBag = shoppingBag.filter(item => item?._id !== id)

		// localStorage.setItem('shoppingBag', JSON.stringify(newShoppingBag))
		// dispatch(shoppingBagOperations.removeFromShoppingBag(newShoppingBag))

		// await cartAPI.deleteCart(id)
	}

	const AfterBuy = async () => {
		localStorage.setItem('shoppingBag', [])
		dispatch(shoppingBagOperations.setData([]))
		await cartAPI.clearCart()
	}

	return {
		add, remove, removeAll, AfterBuy,
		totalPrice,
		totalProductsQuanity,
		shoppingBag,
		// shoppingBag: shoppingBag
		// 	?.reduce((acc, val) =>
		// 		acc.some(item => item?._id === val?._id)
		// 			? acc
		// 			: [...acc, ...[{
		// 				...val, amount: shoppingBag
		// 					?.filter(item => item?._id === val?._id)
		// 					?.length
		// 			}]], [])
		// 	?.sort((a, b) => b?.currentPrice - a?.currentPrice),
	}
}

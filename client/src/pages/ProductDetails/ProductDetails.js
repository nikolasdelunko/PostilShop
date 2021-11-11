import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productsAPI from '../../utils/API/productsAPI'
import ProductDescription from '../../components/ProductDescription/ProductDescription'
import { Alert, Container } from '@mui/material'

const ProductDetails = () => {
	const { id } = useParams()
	const [data, setData] = useState({})

	const getProductData = async (id) => {
		if (id.length === 0) return

		const res = await productsAPI.getOneProduct(id)
		setData(res.data)
	}

	useEffect(() => {
		getProductData(id)
	}, [id])

	if (Object.keys(data).length === 0) {
		return <Alert severity='error'>Product not found</Alert>
	} 

	return (
		<Container maxWidth="lg">
			<h1>ProductDetails</h1>
			<ProductDescription/>
		</Container>
	)
}

export default ProductDetails

import { useEffect, useState } from 'react'
import {getCategories} from '../API/categoriesApi'
import { useDispatch, useSelector } from 'react-redux'
import { categorySelectors } from '../../store/category'
import * as categoryActions from '../../store/category/categorySlice'

const UseCategoryTree = () => {
	const [ category, setCategory ] = useState([])
	const categoryTree = useSelector(categorySelectors.getCategoryTree())
	const dispatch = useDispatch()

	const getParent = (parentId, curArray) => {
		return curArray.find(el => el._id === parentId)
	}

	const addChildren = (curElem, curArray) => {
		const parent = getParent(curElem.parentId, curArray)
		parent.children = [ ...parent.children || [], curElem ]
		return parent
	}

	const setTree = (tree, elem) => {
		let res = [...tree]
		if (res.includes(elem)) {
			res = res.filter(el => el._id !== elem._id)
			res.push(elem)
		} else {
			res.push(elem)
		}
		return res
	}

	const sortTreeByChildren = (tree) => {
		return tree.filter(el => !el.parentId)
	}

	const makeCategoryTree = (arr) => {
		return arr.reduce((tree, curElem, index, curArray) => {
			if (!curElem.parentId) {
				tree.push(curElem)
			} else {
				const parentWithChildren = addChildren(curElem, curArray)
				tree = setTree(tree, parentWithChildren)
			}
			return sortTreeByChildren(tree)
		}, [])
	}

	useEffect(() => {
		if (category.length) return
		getCategories().then(res => {
			if(!res.isError)
			{
				setCategory(res.data)
			}
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		dispatch(categoryActions.setCategoryTree(makeCategoryTree(category)))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category])

	return categoryTree
}

export default UseCategoryTree
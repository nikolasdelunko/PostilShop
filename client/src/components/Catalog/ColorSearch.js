import React, { useEffect, useState } from 'react'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import colorAPI from '../../utils/API/colorAPI'



const ColorSearch = () => {

	const [colors, setColors] =	useState([])

	useEffect(async ()=>{
		const res = await colorAPI.getColors()
		setColors(res.data)
	},[])



	return (
		<div>
			<Box sx={{my:'10px'}}>
				{colors.length && (colors.map((color)=> {
					return(
						// eslint-disable-next-line react/jsx-key
						<ToggleButtonGroup exclusive value={'red'}>
							<ToggleButton key={color._id}  aria-label={color.name} value={color._id} color={'neutral'} sx={{border: 'none', padding: '0', mr:'10px'}}>
								<CircleIcon stroke-width={1} stroke={'black'}
									sx={{width: '20px',color: color.cssValue }}/>
							</ToggleButton>
						</ToggleButtonGroup>
					)
				})) }
			</Box>
		</div>
	)
}

export default ColorSearch
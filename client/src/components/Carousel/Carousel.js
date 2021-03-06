import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import './slick(custom).css'
import './slick-theme(custom).css'
import { useStyleCarousel } from '../../utils/customHooks/useStyleCarousel'
import { Link } from 'react-router-dom'

const Carousel = ({
	slides,
	main,
	product,
	related
}) => {
	const style = useStyleCarousel()
	const [nav1, setNav1] = useState()
	const [nav2, setNav2] = useState()
	const slider = useRef()
	const thumbs = useRef()

	useEffect(() => {
		setNav1(slider.current)
		setNav2(thumbs.current)
	}, [])

	const SampleNextArrow = (props) => {
		const { className, onClick } = props
		return (
			<div className={style.nextEl} onClick={onClick}>
				<div
					className={className + style.nextEl}
					style={{
						borderTop: '2px solid #5C5E60',
						borderRight: '2px solid #5C5E60',
						transform: 'rotate(45deg)'
					}}
				/>
			</div>
		)
	}

	const SamplePrevArrow = (props) => {
		const { className, onClick } = props
		return (
			<div className={style.prevEl} onClick={onClick}>
				<div
					className={className + style.prevEl}
					style={{
						borderTop: '2px solid #5C5E60',
						borderRight: '2px solid #5C5E60',
						transform: 'rotate(-135deg)'
					}}
				/>
			</div>
		)
	}

	const settingsMain = {
		dots: true,
		infinite: true,
		speed: 500,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow/>,
		prevArrow: <SamplePrevArrow/>,
		responsive: [
			{
				breakpoint: 600,
				settings: {
					arrows: false
				}
			},
		]
	}
	const settingRelated = {
		infinite: true,
		speed: 500,
		initialSlide: 1,
		arrows: true,
		centerMode: true,
		nextArrow: <SampleNextArrow/>,
		prevArrow: <SamplePrevArrow/>,
		responsive: [
			{
				breakpoint: 800,
				settings: {
					slidesToShow: slides.length >= 3 ? 2 : slides.length
				}
			},
			{
				breakpoint: 600,
				settings: {
					arrows: false,
					slidesToShow: 1
				}
			},
		]

	}
	const settingsProducts = {
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		arrows: true,
		nextArrow: <SampleNextArrow/>,
		prevArrow: <SamplePrevArrow/>,
		responsive: [
			{
				breakpoint: 600,
				settings: {
					arrows: false
				}
			},
		]
	}
	const settingThumbs = {
		slidesToScroll: 1,
		initialSlide: 1,
		centerMode: true,
		focusOnSelect: true,
	}

	return (
		<>
			{main &&
				<Slider
					{...settingsMain}
					className={style.show}
				>
					{slides.map((slide) => {
						return (
							<Link
								to = {slide.category?.name ?
									`/shop/catalog?category=${slide.category?.name}`
									: `/product-details/${slide?.product._id}`}
								key={slide.customId}>
								<div className={style.mainContainer} >
									<img src={slide.imageUrl} className={style.slide} alt=""/>
									<div className={style.textBlock}>
										<p className={style.title}>{slide.title}</p>
										{slide.description &&
								<p className={style.desc}>{slide.description}</p>}
									</div>
								</div>
							</Link>
						)
					})}
				</Slider>
			}
			{product &&
				<div className={style.productsWrapper}>
					<Slider
						className={style.products}
						{...settingsProducts}
						asNavFor={nav2}
						ref={slider}
					>
						{slides?.map((slide, index) => {
							return (
								<div key={index} className={style.slideContainer}>
									<img src={`/${slide}`} className={style.productSlide} alt=""/>
								</div>
							)
						})}
					</Slider>
					<Slider
						{...settingThumbs}
						slidesToShow={slides.length <= 3 ? slides.length : 3}
						asNavFor={nav1}
						ref={thumbs}
						className={style.thumbWrapper}
					>
						{slides?.map((slide, index) => {

							return (
								<div key={index}>
									<img src={`/${slide}`} className={style.thumb} alt=""/>
								</div>
							)
						})}
					</Slider>
				</div>

			}

			{related &&
				<>
					<h3 className={style.relatedTitle}>RELATED ITEMS</h3>
					<Slider
						{...settingRelated}
						className={`${style.related}`}
						slidesToShow={slides.length <= 3 ? slides.length : 3}
					>
						{slides?.map((slide) => {
							return (
								<div key={slide.customId}>
									<div style={{ position: 'relative', margin: '0 10px' }}>
										<Link to={`${slide?.prodId}`}>
											<img src={slide.imageUrl} className={style.thumb} style={{
												maxWidth: '380px',
												maxHeight: '380px',
												borderRadius: '5px'
											}} alt=""/>
											<div className={style.relatedTextBox}>
												<p className={style.relatedText}>{slide.name}</p>
												<p className={style.relatedPrice}>${slide.price}</p>
											</div>
										</Link>
									</div>
								</div>
							)
						})}
					</Slider>
				</>
			}
		</>
	)
}

Carousel.propTypes = {
	isLoading: PropTypes.bool,
	slides: PropTypes.array,
	main: PropTypes.bool,
	related: PropTypes.bool,
	product: PropTypes.bool,
	className: PropTypes.string,
	onClick: PropTypes.func
}

export default Carousel

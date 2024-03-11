import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

// COMPONENTS
import Title from './ArrowTitle';
import BookCard from './BookCard';

// STYLES
import styles from '../styles/BookListSlide.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { set } from 'react-hook-form';

const BookListSlide = ({
	list,
	bigCategory,
	midCategoryTitle,
	title,
	author,
	imageUrl,
}) => {
	var settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<>
			<section className={styles['swiper-container']}>
				<div className={styles['container']}>
					<Swiper
						spaceBetween={20}
						slidesPerView={7}
						slidesOffsetBefore={0}
						id={'my-swiper'}
					>
						<div className={styles['slide']}>
							{list.map((item) => {
								return (
									<SwiperSlide>
										<BookCard
											title={item.title}
											author={item.author}
											img={item.imageUrl}
											isbn={item.isbn}
										/>
									</SwiperSlide>
								);
							})}
						</div>
					</Swiper>
				</div>
			</section>
		</>
	);
};

export default BookListSlide;

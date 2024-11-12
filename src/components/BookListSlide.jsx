import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// ASSETS
import loading_thumbnail from '../assets/loading_thumbnail_x4.png';

// COMPONENTS
import BookCard from './BookCard';

// STYLES
import styles from '../styles/BookListSlide.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BookListSlide = ({ list }) => {
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
									<SwiperSlide key={item.bookId}>
										<BookCard
											key={item.bookId}
											title={item.title}
											author={item.author}
											img={
												item.imageUrl === null
													? loading_thumbnail
													: item.imageUrl
											}
											isbn={item.bookId}
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

import { Link } from 'react-router-dom';

// ASSETS
import loading_thumbnail from '../assets/loading_thumbnail_x4.png';

// Styles
import styles from '../styles/BookCard.module.css';

const BookCard = ({ title, author, img, isbn }) => {
	return (
		<>
			<Link to={`/book-detail?isbn=${isbn}`}>
				<div className={styles['card_container']}>
					<div className={styles['book_img']}>
						<img
							className={styles['book_thumbnail']}
							src={img === '' ? loading_thumbnail : img}
							alt="썸네일"
						/>
					</div>
					<div className={styles['book_info_wrapper']}>
						<div className={styles['book_title']}>{title}</div>
						<div className={styles['book_author']}>{author}</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default BookCard;

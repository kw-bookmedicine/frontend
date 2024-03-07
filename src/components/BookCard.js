// Styles
import styles from '../styles/BookCard.module.css';

const BookCard = ({ title, author, img }) => {
	return (
		<>
			<div className={styles['card_container']}>
				<div className={styles['book_img']}>
					<img className={styles['book_thumbnail']} src={img} alt="썸네일" />
				</div>
				<div className={styles['book_info_wrapper']}>
					<div className={styles['book_title']}>{title}</div>
					<div className={styles['book_author']}>{author}</div>
				</div>
			</div>
		</>
	);
};

export default BookCard;

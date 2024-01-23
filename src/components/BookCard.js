// Styles
import styles from '../styles/BookCard.module.css';

const BookCard = ({ title, author }) => {
	return (
		<>
			<div className={styles['card_container']}>
				<div className={styles['book_img']}></div>
				<div className={styles['book_info_wrapper']}>
					<div className={styles['book_title']}>{title}</div>
					<div className={styles['book_author']}>{author}</div>
				</div>
			</div>
		</>
	);
};

export default BookCard;

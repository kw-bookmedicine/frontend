import { Link } from 'react-router-dom';

// Styles
import styles from '../styles/ArrowTitle.module.css';

const ArrowTitle = ({ bigCategory, title, type }) => {
	const titleType = ['shadow'].includes(type) ? type : 'default';

	return (
		<div className={styles[`${titleType}_container`]}>
			<div className={styles[`${titleType}_wrapper`]}>
				<div className={styles['title']}>{title}</div>
				<Link to={`/book/${bigCategory}/${title}`}>
					<div className={styles['arrow']}></div>
				</Link>
			</div>
		</div>
	);
};

export default ArrowTitle;

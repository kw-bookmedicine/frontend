import { Link } from 'react-router-dom';

// Styles
import styles from '../styles/ArrowTitle.module.css';

const ArrowTitle = ({ title, type }) => {
	const titleType = ['shadow'].includes(type) ? type : 'default';

	return (
		<>
			<div className={styles[`${titleType}_container`]}>
				<div className={styles['title']}>{title}</div>
				<div className={styles['arrow']}>
					<Link />
				</div>
			</div>
		</>
	);
};

export default ArrowTitle;

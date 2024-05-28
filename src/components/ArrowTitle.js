import { Link } from 'react-router-dom';

// Styles
import styles from '../styles/ArrowTitle.module.css';

const ArrowTitle = ({ bigCategory, title, type }) => {
	const titleType = ['shadow', 'oneLine'].includes(type) ? type : 'default';

	let linkUrl =
		titleType === 'oneLine'
			? '/oneline/prescription'
			: `/book/${bigCategory}/${title}`;
	if (titleType === 'shadow') {
		return (
			<div className={styles[`${titleType}_container`]}>
				<div className={styles[`${titleType}_wrapper`]}>
					<div className={styles['title']}>{title}</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className={styles[`${titleType}_container`]}>
				<div className={styles[`${titleType}_wrapper`]}>
					<div className={styles['title']}>{title}</div>
					<Link to={linkUrl}>
						<div className={styles['arrow']}></div>
					</Link>
				</div>
			</div>
		);
	}
};

export default ArrowTitle;

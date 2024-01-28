import { Link } from 'react-router-dom';

import styles from '../styles/Button.module.css';

const Button = ({ text, type }) => {
	const btnType = ['login', 'join', 'logout', 'exp', 'edit', 'rank'].includes(
		type,
	)
		? type
		: 'default';

	return (
		<button className={styles[`Btn-${btnType}`]}>
			<Link to={`/${btnType}`}>{text}</Link>
		</button>
	);
};

Button.defaultProps = {
	type: 'default',
};

export default Button;

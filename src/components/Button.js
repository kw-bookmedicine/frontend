import { Link } from 'react-router-dom';

import styles from '../styles/Button.module.css';

const Button = ({ text, type }) => {
	let btnType = [
		'login',
		'join',
		'logout',
		'logout2',
		'exp',
		'edit',
		'rank',
		'withdraw',
	].includes(type)
		? type
		: 'default';

	let btnUrl = '';
	if (type === 'nickname' || type === 'password' || type === 'job') {
		btnUrl = `/edit/${type}`;
		btnType = 'edit2';
	} else {
		btnUrl = `/${btnType}`;
	}

	return (
		<button className={styles[`Btn-${btnType}`]}>
			<Link to={btnUrl}>{text}</Link>
		</button>
	);
};

Button.defaultProps = {
	type: 'default',
};

export default Button;

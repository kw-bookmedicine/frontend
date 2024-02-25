import { Link } from 'react-router-dom';

import styles from '../styles/Button.module.css';

const Button = ({ text, type }) => {
	let btnType = [
		'login',
		'postLogin',
		'join',
		'logout',
		'logout2',
		'exp',
		'edit',
		'editConfirm',
		'rank',
		'withdraw',
		'add',
		'delete',
	].includes(type)
		? type
		: 'default';

	let btnUrl = '';
	if (type === 'nickname' || type === 'password' || type === 'job') {
		btnUrl = `/edit/${type}`;
		btnType = 'edit2';
	} else if (type === 'logout' || type === 'logout2') {
		// localStorage.clear();
		btnUrl = '/';
	} else {
		btnUrl = `/${btnType}`;
	}

	const logout = () => {
		let token = localStorage.getItem('token');
		console.log('logout!');
		localStorage.clear();
		window.location.replace('http://localhost:3000/');
	};

	const renderButton = (url, type) => {
		if (type === 'add' || type === 'delete') {
			return <button className={styles[`Btn-${type}`]}>{text}</button>;
		} else {
			if (type === 'logout') {
				return (
					<button
						onClick={() => {
							logout();
						}}
						className={styles[`Btn-${type}`]}
					>
						{text}
					</button>
				);
			} else {
				return (
					<button className={styles[`Btn-${type}`]}>
						<Link to={url}>{text}</Link>
					</button>
				);
			}
		}
	};

	return <div className="button_wrapper">{renderButton(btnUrl, type)}</div>;
};

Button.defaultProps = {
	type: 'default',
};

export default Button;

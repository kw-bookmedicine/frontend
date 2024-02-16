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
	} else {
		btnUrl = `/${btnType}`;
	}

	const renderButton = (url, type) => {
		if (type === 'add' || type === 'delete') {
			return (
				<button className={styles[`Btn-${type}`]}>
					{text}
					{/* <Link to={url}>{text}</Link> */}
				</button>
				// <div
				// 	className={styles[`Btn-${type}-text`]}
				// 	onClick={() => {
				// 		// console.log({ type });
				// 	}}
				// >
				// 	{text}
				// </div>
			);
		} else {
			return (
				<button className={styles[`Btn-${type}`]}>
					<Link to={url}>{text}</Link>
				</button>
			);
		}
	};

	return <div className="button_wrapper">{renderButton(btnUrl, type)}</div>;
};

Button.defaultProps = {
	type: 'default',
};

export default Button;

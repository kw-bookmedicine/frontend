import { Link } from 'react-router-dom';

const Button = ({ text, type }) => {
	const btnType = ['login', 'join', 'logout'].includes(type) ? type : 'default';
	return (
		<button className={['Button', `Button_${btnType}`].join(' ')}>
			<Link to={`/${btnType}`}>{text}</Link>
		</button>
	);
};

Button.defaultProps = {
	type: 'default',
};

export default Button;

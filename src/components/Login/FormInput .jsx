import ErrorMessage from './ErrorMessage';
import styles from '../../styles/Login/FormInput.module.css';
import { useLocation } from 'react-router-dom';

const FormInput = ({
	type = 'text',
	register,
	name,
	rules,
	placeholder,
	errors,
}) => {
	const location = useLocation();
	const pathSegment = location.pathname.split('/').filter(Boolean)[0];

	const inputWrapperClass = `${styles.inputWrapper} ${
		styles[`${pathSegment}-input-wrapper`] || ''
	}`;
	const inputClass = `${styles.input} ${styles[`${pathSegment}-input`] || ''}`;

	return (
		<div className={inputWrapperClass}>
			<input
				className={inputClass}
				type={type}
				{...register(name, rules)}
				placeholder={placeholder}
			/>
			{errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
		</div>
	);
};

export default FormInput;

import styles from '../styles/Footer.module.css';

const Footer = () => {
	return (
		<>
			<div className={styles['footer_wrapper']}>
				<div className={styles['footer_inner']}>
					Copyright © 2024 책국 All Rights Reserved.
				</div>
			</div>
		</>
	);
};

export default Footer;

import styles from '../styles/Footer.module.css';

const Footer = () => {
	return (
		<>
			<div className={styles['footer_wrapper']}>
				<div className={styles['footer_inner']}>
					<div className={styles['footer_left_wrapper']}>책국</div>
					<div className={styles['footer_right_wrapper']}>
						<div className={styles['footer_right_top_wrapper']}>
							<p>개인정보처리방침</p>
							<p>|</p>
							<p>이용약관</p>
							<p>|</p>
							<p>서비스 이용안내</p>
						</div>
						<div className={styles['footer_right_bottom_wrapper']}>
							<p>Copyright © 2024 책국 All Rights Reserved.</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;

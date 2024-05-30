import React, { useState } from 'react';

// COMPONENTS
import Footer from '../components/Footer';

// STYLES
import '../styles/LandingPage.css';

const landingPage = () => {
	return (
		<>
			<section className="landing_container">
				<section className="landing_top_container">
					<div className="landing_top_content_wrapper">
						<div className="landing_top_title_wrapper">
							<img
								src="/icon/home/landing_logo_icon.svg"
								alt="로고"
								id="landing_logo_icon"
							/>
							<span>로그인</span>
						</div>
						<div className="landing_top_content_intro_wrapper">
							<div className="content_intro_left_wrapper">
								<p>당신의 고민에</p>
								<p>한걸음 가까이</p>
								<p id="content_intro_left_sub_title">
									고민작성부터 고민처방까지 한번에
								</p>
								<button id="content_intro_left_btn">책국에서 처방받기 →</button>
							</div>
							<div className="content_intro_right_wrapper">
								<img
									src="/icon/home/landing_top_icon.svg"
									id="landing-page-intro-icon"
								/>
							</div>
						</div>
					</div>
				</section>
				<section className="landing_worry_info_container">
					<div className="landing_worry_info_content_wrapper">
						<div className="worry_info_left_wrapper">
							<p>다양한 분야의</p>
							<p>고민들을 작성해보세요!</p>
							<button id="worry_write_to_btn">고민작성하러가기 →</button>
						</div>
						<div className="worry_info_right_wrapper">
							<div className="worry_ex1">
								<div className="worry_ex1_box">
									<div id="mimoji_icon1_wrapper">
										<img
											src="/icon/home/landing_intro_female_icon_1.png"
											id="intro-icon1"
										/>
									</div>
								</div>
							</div>
							<div className="worry_ex2">
								<div className="worry_ex2_box">
									<div id="mimoji_icon2_wrapper">
										<img
											src="/icon/home/landing_intro_female_icon_2.png"
											id="intro-icon2"
										/>
									</div>
								</div>
							</div>
							<div className="worry_ex3">
								<div className="worry_ex3_box">
									<div id="mimoji_icon3_wrapper">
										<img
											src="/icon/home/landing_intro_male_icon.png"
											id="intro-icon3"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="landing_prscr_container">
					<div className="landing_prscr_content_wrapper">
						<div className="landing_prscr_title_wrapper">
							<p>AI와 책 처방사들이 당신만을 위한</p>
							<p>책 처방을 드립니다!</p>
						</div>
					</div>
				</section>
				<section className="landing_prscr_write_container"></section>
				<section className="join_container"></section>
			</section>
			<Footer />
		</>
	);
};

export default landingPage;

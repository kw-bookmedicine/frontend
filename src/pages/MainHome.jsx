import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Footer from '../components/Footer';
import OneLinePrscrCard from '../components/Prescription/OneLinePrscrCard';
import PrscrCard from '../components/Prescription/PrescriptionCard';

// STYLES
import '../styles/LandingPage.css';

const LandingPage = () => {
	const item = {
		id: '1',
		bookIsbn: '978',
		clientNickname: '팡우니',
		createdDate: '2024.05.31',
		title:
			'“재미있는 판타지 소설을 읽어보고 싶을 땐  해리포터 불의 잔을 읽어보세요”',
		bookImageUrl: '/loading_thumbnail_x4.png',
		bookTitle: '해리포터 불의 잔',
		bookAuthor: 'J.K.롤링',
	};

	const prscrItem1 = {
		createdDate: '2024.05.31',
		title: '“새로운 환경에 적응하기 힘들어요!”',
		title2: '',
		bookImageUrl: '/loading_thumbnail_x4.png',
		bookTitle: '해리포터 불의 잔',
		bookAuthor: 'J.K.롤링',
		company: '도서관',
		date: '2020.04.30',
	};

	const prscrItem2 = {
		createdDate: '2024.05.31',
		title: `“주린이가 쉽게 이해할 수 `,
		title2: '있는 책이에요!',
		bookImageUrl: '/loading_thumbnail_x4.png',
		bookTitle: '해리포터 불의 잔',
		bookAuthor: 'J.K.롤링',
		company: '도서관',
		date: '2020.04.30',
	};

	const prscrItem3 = {
		createdDate: '2024.05.31',
		title: '“스트레스 해소가 필요할 땐 ',
		title2: '이 책을 한 번 읽어보세요!"',
		bookImageUrl: '/loading_thumbnail_x4.png',
		bookTitle: '해리포터 불의 잔',
		bookAuthor: 'J.K.롤링',
		company: '도서관',
		date: '2020.04.30',
	};

	return (
		<>
			<section className="landing_container">
				<section className="landing_top_container">
					<div className="landing_top_content_wrapper">
						<div className="landing_top_title_wrapper">
							<Link to={'/'}>
								<span id="logo_title">책국</span>
								{/* <img
									src="/icon/home/landing_logo_icon.svg"
									alt="로고"
									id="landing_logo_icon"
								/> */}
							</Link>
							<Link to={'/login'}>
								<span id="logo_login_title">로그인</span>
							</Link>
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
									<div className="worry_ex1_comment_wrapper">
										<div className="worry_ex1_profile">
											<p id="worry_ex1_name">김지현</p>
											<p>20대 대학생</p>
										</div>
										<p>"요즘 뭘 먹기만 해도 살이 쪄서 문제에요.</p>
										<p>
											<b className="worry-card-bold">식단 관리</b>를 하면서,{' '}
											<b className="worry-card-bold">근육</b>도 키우고{' '}
											<b className="worry-card-bold">체지방</b>도 관리 하기 위해
											참고할 수 있는 책 좀 추천해주세요."
										</p>
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
									<div className="worry_ex2_comment_wrapper">
										<div className="worry_ex2_profile">
											<p id="worry_ex2_name">서은지</p>
											<p>20대 취준생</p>
										</div>
										<p>
											"다다음주에{' '}
											<b className="worry-card-bold">정보처리기사</b>
											시험입니다.
										</p>
										<p>
											<b className="worry-card-bold">단기간</b>에 준비하기에
											좋은 책을 추천해주실 수 있을까요?"
										</p>
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
									<div className="worry_ex3_comment_wrapper">
										<div className="worry_ex3_profile">
											<p id="worry_ex3_name">오주훈</p>
											<p>30대 직장인</p>
										</div>
										<p>"최근에 해외 주식에 관심이 생기기 시작했습니다. </p>
										<p>
											<b className="worry-card-bold">해외 주식</b>
											으로 <b className="worry-card-bold">수익</b>내보고 싶어요!
											해외 주식 관련된 책 추천 부탁드립니다."
										</p>
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
						<div className="landing_prscr_content">
							<div className="landing_prscr_ai_box">
								<div className="landing_prscr_ai_left_wrapper">
									<img
										src="/icon/home/landing_ai_prscr_icon.svg"
										alt="AI처방 아이콘"
										id="prscr_ai_icon"
									/>
								</div>
								<div className="landing_prscr_right_wrapper">
									<div className="ai-bubble">
										<div className="ai-bubble_left_wrapper">
											<p id="ai-bubble-title">류선재 님께 추천드리는 책</p>
											<p id="ai-bubble-comment">
												류선재 님께서 작성 하신 고민 글에서 ‘스프링’, ‘개발’,
												‘취업’ 을 주요 키워드로 파악했습니다. <br />
												<br />
												류선재 님이 관심을 보일 만한 책 ‘자바 ORM 표준 JPA
												프로그래밍’을 추천드립니다 !
											</p>
										</div>
										<div className="ai-bubble_right_wrapper">
											<img
												src="/loading_thumbnail_x4.png"
												id="ai-bubble_thumbnail"
											/>
											<div className="ai-bubble_bookInfo_wrapper">
												<p id="ai-bubble_book_title">해리포터</p>
												<p id="ai-bubble_book_author">J.K.롤링</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<OneLinePrscrCard type={'landing'} item={item} />
						</div>
					</div>
				</section>
				<section className="landing_prscr_write_container">
					<div className="landing_prscr_write_content_wrapper">
						<div className="landing_prscr_write_left_wrapper">
							<PrscrCard id={'prscrCard_1'} item={prscrItem1} />
							<PrscrCard id={'prscrCard_2'} item={prscrItem2} />
							<PrscrCard id={'prscrCard_3'} type={'flip'} item={prscrItem3} />
						</div>
						<div className="landing_prscr_write_right_wrapper">
							<p>책 처방사가 되어</p> <br />
							<p>직접 책 처방을 지어보세요!</p>
						</div>
					</div>
				</section>
				<section className="join_container">
					<div className="join_content_wrapper">
						<div className="join_title_wrapper">
							<p>나에게 맞는 책을 처방 받아보세요!</p>
						</div>
						<div className="join_content">
							<div className="join_prscr_card" id="join_today_prscr_card">
								<div className="join_prscr_card_title">
									<p>책으로 보내는 하루,</p>
									<p>오늘의 책 처방전</p>
								</div>
								<div className="join_prscr_card_subTitle">
									<p>당신을 위한 책을 3권 추천해드립니다.</p>
									<p>오늘의 책 처방으로 하루를 시작해보세요!</p>
								</div>
								<img
									src="/icon/home/today-prscr-icon.svg"
									alt="오늘의 처방전 아이콘"
									id="today_prscr_card_icon"
								/>
							</div>
							<div className="join_prscr_card" id="join_ai_prscr_card">
								<div className="join_prscr_card_title">
									<p>당신만을 위한,</p>
									<p>책국 AI 약사가 주는 책 처방</p>
								</div>
								<div className="join_prscr_card_subTitle">
									<p>평소 관심 있어 하는 카테고리와 키워드를 기반</p>
									<p> 으로 책국 AI 약사가 책을 추천해드립니다!</p>
								</div>
								<img
									src="/icon/home/ai-prscr-icon.svg"
									alt="ai 처방 아이콘"
									id="ai_prscr_card_icon"
								/>
							</div>
							<div className="join_prscr_card" id="join_ai_prscr_card">
								<div className="join_prscr_card_title">
									<p>고민을 나누면,</p>
									<p>책 추천이 찾아옵니다!</p>
								</div>
								<div className="join_prscr_card_subTitle">
									<p>고민을 털어 놓아 보세요. 다른 유저들과 함께</p>
									<p>책 속에서 해답을 찾아보세요!</p>
								</div>
								<img
									src="/icon/home/other-prscr-icon.svg"
									alt="다른사람 처방 아이콘"
									id="other_prscr_card_icon"
								/>
							</div>
						</div>
					</div>
				</section>
			</section>
			<Footer />
		</>
	);
};

export default LandingPage;

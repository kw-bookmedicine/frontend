import React from 'react';

// COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import Btn from '../components/Button';

// STYLES
import '../styles/MyPage.css';

const Mypage = () => {
	return (
		<>
			<Header />
			<div className="myPage_container">
				<div className="myPage_banner"></div>
				<div className="myPage_content">
					<div className="myPage_user_wrapper">
						<div className="user_left_wrapper">
							<div className="left_img_wrapper"></div>
						</div>
						<div className="user_right_wrapper">
							<div className="right_userInfo_title_wrapper">
								<div className="userInfo_name_text">사용자닉네임</div>
								<Btn text={'등급'} type="rank" />
							</div>
							<div className="right_userInfo_comment_wrapper">
								<div className="userInfo_comment">
									나는 어디에서 왔을까? 내가 제일 좋아하는 색깔은 검정검정.나는
									어디에서 왔을까?나는 어디에서 왔을까? 내가 제일 좋아하는
									색깔은 검정검정.나는 어디에서 왔을까? 내가 제일 좋아하는
									색깔은 검정검정.나는 어디에서 왔을까? 내가 제일 좋아하는
									색깔은 검정검정.나는 어디에서 왔을까? 내가 제일 좋아하는
									색깔은 검정검정.나는 어디에서 왔을까? 내가 제일 좋아하는
									색깔은 검정검정.나는 어디에서 왔을까? 내가 제일 좋아하는
									색깔은 검정검정.나는 어디에서 왔을까? 내가 제일 좋아하는
									색깔은 검정검정.나는 어디에서 왔을까? 내가 제일 좋아하는
									색깔은 검정검정.
								</div>
							</div>
							<div className="right_userInfo_btn_wrapper">
								<Btn text={'수정'} type="edit" />
							</div>
						</div>
					</div>
					<div className="myPage_service_wrapper">
						<div className="service_title">서비스 관리</div>
						<div className="service_userReview_text">복용내역</div>
						<div className="service_userFeed_text">내 피드</div>
					</div>
					<div className="myPage_info_wrapper">
						<div className="info_title">정보 관리</div>
						<div className="info_myInfo_text">내 정보 관리</div>
						<div className="info_alert_text">알림 설정</div>
					</div>
					<div className="myPage_button_wrapper">
						<Btn text={'회원탈퇴'} type="withdraw" />
						<Btn text={'로그아웃'} type="logout2" />
					</div>
					<section className="myPage_footer">
						<Footer />
					</section>
				</div>
			</div>
		</>
	);
};

export default Mypage;

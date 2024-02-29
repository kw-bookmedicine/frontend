import React from 'react';

// COMPONENTS
import Footer from '../components/Footer';
import Btn from '../components/Button';

// ASSETS
import general from '../assets/interest_category_general.png';
import philosophy from '../assets/interest_category_philosophy.png';
import religion from '../assets/interest_category_religion.png';
import social from '../assets/interest_category_social-science.png';
import natural from '../assets/interest_category_natural-science.png';
import tech from '../assets/interest_category_tech.png';
import art from '../assets/interest_category_art.png';
import language from '../assets/interest_category_language.png';
import literature from '../assets/interest_category_literature.png';
import history from '../assets/interest_category_history.png';

// STYLE
import { styled } from 'styled-components';
import '../styles/Signup3.css';

const categoryList = ['general', 'philosophy', 'religion'];

const Signup3 = () => {
	return (
		<>
			<div className="signup3_container">
				<div className="signup3_up_wrapper">
					<div className="signup3_up_title_tag_wrapper">
						<h1 className="signup3_title">관심사 선택</h1>
						<div className="select_tag_wrapper"></div>
					</div>
					<div className="signup3_up_subTitle_step_wrapper">
						<div className="signup3_subTitle">최대 5개까지 선택 가능</div>
						<div className="signup3_step_wrapper">
							<div className="signup3_circle-1">1</div>
							<div className="signup3_circleToLine" />
							<div className="signup3_circle-2">2</div>
							<div className="signup3_circleToLine2" />
							<div className="signup3_circle-3">3</div>
						</div>
					</div>
				</div>
				<div className="signup3_mid_wrapper">
					<UserInterestItem>총류</UserInterestItem>
					{/* <div className="user_interest_item" id="general" alt={'총류'}>
						총류
					</div> */}
					<div
						className="user_interest_item"
						id="philosophy"
						// style={{
						// 	backgroundImage: `url(${philosophy})`,
						// 	backgroundSize: 'cover',
						// }}
					>
						철학
					</div>
					<div
						className="user_interest_item"
						id="religion"
						// style={{
						// 	backgroundImage: `url(${religion})`,
						// 	backgroundSize: 'cover',
						// }}
					>
						종교
					</div>
					<div
						className="user_interest_item"
						id="social"
						// style={{
						// 	backgroundImage: `url(${social})`,
						// 	backgroundSize: 'cover',
						// }}
					>
						사회과학
					</div>
					<div
						className="user_interest_item"
						id="natural"
						// style={{
						// 	backgroundImage: `url(${natural})`,
						// 	backgroundSize: 'cover',
						// }}
					>
						자연과학
					</div>
					<div
						className="user_interest_item"
						alt={'기술과학'}
						id="tech"
						// style={{
						// 	backgroundImage: `url(${tech})`,
						// 	backgroundSize: 'cover',
						// }}
					>
						기술과학
					</div>
					<div
						className="user_interest_item"
						id="art"
						// style={{
						// 	backgroundImage: `url(${art})`,
						// 	backgroundSize: 'cover',
						// }}
					>
						예술
					</div>
					<div
						className="user_interest_item"
						id="language"
						// style={{
						// 	backgroundImage: `url(${language})`,
						// 	backgroundSize: 'cover',
						// }}
					>
						언어
					</div>
					<div
						className="user_interest_item"
						id="literature"
						// style={{
						// 	backgroundImage: `url(${literature})`,
						// 	backgroundSize: 'cover',
						// }}
					>
						문학
					</div>
					<div
						className="user_interest_item"
						id="history"
						// style={{
						// 	backgroundImage: `url(${history})`,
						// 	backgroundSize: 'cover',
						// }}
					>
						역사
					</div>
				</div>
				<button className="select_complete_button">선택 완료</button>
				<section className="signup3_footer">
					Copyright © 2024 책국 All Rights Reserved.
				</section>
			</div>
		</>
	);
};

export default Signup3;

const UserInterestItem = styled.div`
	width: 220px;
	height: 220px;
	margin: 10px;
	background: url(${general});
	background-size: cover;
	background-position: center;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;

	/* Font */
	color: #fff;
	font-family: var(--basic-font);
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;

	&:hover {
		background: linear-gradient(
				0deg,
				rgba(164, 214, 222, 0.78),
				rgba(164, 214, 222, 0.78)
			),
			url(${general});
		cursor: pointer;
	}
`;

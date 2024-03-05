import React, { useState, useRef } from 'react';

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
	const categoryRef = useRef();
	const generalRef = useRef();

	const [pickCategory, setPickCategory] = useState('');

	const pick = () => {
		console.log(categoryRef.current.textContent);
		categoryRef.current.focus();
		setPickCategory(categoryRef.current.textContent);
	};

	return (
		<>
			<div className="signup3_container">
				<div className="signup3_up_wrapper">
					<div className="signup3_up_title_tag_wrapper">
						<h1 className="signup3_title">관심사 선택</h1>
						<div className="select_tag_wrapper">{pickCategory}</div>
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
					<UserInterestItem
						onClick={() => {
							setPickCategory('총류');
						}}
					>
						총류
					</UserInterestItem>

					<div
						className="user_interest_item"
						id="philosophy"
						onClick={() => {
							setPickCategory('철학');
						}}
					>
						철학
					</div>
					<div
						className="user_interest_item"
						id="religion"
						// ref={categoryRef}
						onClick={() => {
							setPickCategory('종교');
						}}
					>
						종교
					</div>
					<div className="user_interest_item" id="social">
						사회과학
					</div>
					<div className="user_interest_item" id="natural">
						자연과학
					</div>
					<div className="user_interest_item" id="tech">
						기술과학
					</div>
					<div className="user_interest_item" id="art">
						예술
					</div>
					<div className="user_interest_item" id="language">
						언어
					</div>
					<div className="user_interest_item" id="literature">
						문학
					</div>
					<div className="user_interest_item" id="history">
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

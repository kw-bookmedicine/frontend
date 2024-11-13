import React, { useState, useRef, useEffect } from 'react';

// COMPONENTS
import Footer from '../../components/Footer';
import Btn from '../../components/Button';
import BigCategory from '../../components/interestGrid';
import Tag from '../../components/HashTag';

// SERVICE
import api from '../../services/api';

// STYLE
import { styled } from 'styled-components';
import '../../styles/Signup3.css';
import useSignupStore from '../../store/signup-store';
import { useLocation, useNavigate } from 'react-router-dom';

const categoryList = ['general', 'philosophy', 'religion'];

// todo
// - 회원가입 요청에서 관심사 필드값 수정필요할 수도?
const Signup3 = () => {
	const [choiceItem, setChoiceItem] = useState('');
	const [pickItemList, setPickItemList] = useState([]);
	const [pickCtgList, setPickCtgList] = useState([]);

	const [active, setActive] = useState(false);
	const [clicked, setClicked] = useState(false);
	const [backClicked, setbackClicked] = useState(false);

	const navigate = useNavigate();

	const userInfo = useSignupStore((state) => state.userInfo); // 회원정보 가져오기

	// 특정 카테고리별 중분류 보여주는 함수
	const choiceCtgHandler = (event) => {
		setClicked(true);
		setbackClicked(false);
		fetchMidCtg(event.target.innerText);
		setChoiceItem(event.target.innerText);
	};

	// 회원가입 요청
	const postSignup = async () => {
		try {
			let signUpData = {
				...userInfo,
				interestList: pickItemList, // 선택한 관심사 추가
			};
			if (!userInfo.username && !userInfo.password && !userInfo.name) {
				// 소셜 로그인일 경우, 불필요한 필드 제거
				const { username, password, name, ...rest } = signUpData;
				signUpData = rest;
			}

			let response;
			if (userInfo.username && userInfo.password && userInfo.name) {
				// 일반 로그인
				response = await api.post('/signup', signUpData, {
					withCredentials: true,
				});
			} else {
				// 소셜 로그인
				response = await api.post(
					`/signup/oauth?email=${userInfo.email}`,
					signUpData,
					{
						withCredentials: true,
					},
				);
			}
			if (response.status === 200) {
				alert('회원가입을 축하합니다');
				navigate('/login');
			}
		} catch (error) {
			console.error('회원가입 중 오류가 발생했습니다:', error);
		}
	};

	const fetchMidCtg = async (ctg) => {
		try {
			api.get('/api/category/big').then((res) => {
				const transformedData = res.data.reduce((bigCtgTitle, category) => {
					bigCtgTitle[category.name] = category.items.map((item) => item.name);
					return bigCtgTitle;
				}, {});
				setPickCtgList(transformedData[ctg]);
			});
		} catch (err) {
			console.log(err);
		}
	};

	// 중분류에서 뒤로 가기 했을 때, 적용되는 함수
	const backClickHandler = () => {
		setbackClicked(true);
		setActive(true);
		setClicked(false);
	};

	// 선택한 아이템과 아이템 개수 초과에 따라 알람을 주는 함수
	const choiceItemHandler = (event) => {
		if (pickItemList.length < 5) {
			if (pickItemList.includes(event.target.innerText)) {
				alert('이미 선택한 아이템입니다.');
			} else {
				setPickItemList((prevItem) => [...prevItem, event.target.innerText]);
			}
		} else {
			alert('최대 선택할 수 있는 관심사는 5개입니다.');
		}
	};

	// 선택한 카테고리 중에서 삭제하는 함수
	const deleteItem = (event) => {
		let delItem = event.target.innerText;
		setPickItemList(pickItemList.filter((item) => item !== delItem));
	};

	// 회원가입 완료 버튼 눌렀을 때, 알람 주는 함수
	const joinAlert = () => {
		if (pickItemList.length === 0) {
			if (!active) {
				alert('관심사를 선택해주세요');
			}
		} else {
			postSignup(); // 회원가입 요청
		}
	};

	// 대분류 렌더링 함수
	const renderBigCtg = () => {
		return (
			<>
				<div
					className='user_interest_bigCtg_item'
					id='general'
					onClick={choiceCtgHandler}
				>
					총류
				</div>
				<div
					className='user_interest_bigCtg_item'
					id='philosophy'
					onClick={choiceCtgHandler}
				>
					철학
				</div>
				<div
					className='user_interest_bigCtg_item'
					id='religion'
					onClick={choiceCtgHandler}
				>
					종교
				</div>

				<div
					className='user_interest_bigCtg_item'
					id='social'
					onClick={choiceCtgHandler}
				>
					사회과학
				</div>
				<div
					className='user_interest_bigCtg_item'
					id='natural'
					onClick={choiceCtgHandler}
				>
					자연과학
				</div>
				<div
					className='user_interest_bigCtg_item'
					id='tech'
					onClick={choiceCtgHandler}
				>
					기술과학
				</div>
				<div
					className='user_interest_bigCtg_item'
					id='art'
					onClick={choiceCtgHandler}
				>
					예술
				</div>
				<div
					className='user_interest_bigCtg_item'
					id='language'
					onClick={choiceCtgHandler}
				>
					언어
				</div>
				<div
					className='user_interest_bigCtg_item'
					id='literature'
					onClick={choiceCtgHandler}
				>
					문학
				</div>
				<div
					className='user_interest_bigCtg_item'
					id='history'
					onClick={choiceCtgHandler}
				>
					역사
				</div>
			</>
		);
	};

	return (
		<>
			<div className='signup3_container'>
				<div className='signup3_up_wrapper'>
					<div className='signup3_up_title_tag_wrapper'>
						<div className='signup3_up_title_wrapper'>
							<h1 className='signup3_title'>관심사 선택</h1>
							<p className='signup3_subTitle'>최대 5개까지 선택 가능</p>
						</div>
						<div className='signup3_step_wrapper'>
							<div className='signup3_circle-1'>1</div>
							<div className='signup3_circleToLine' />
							<div className='signup3_circle-2'>2</div>
							<div className='signup3_circleToLine2' />
							<div className='signup3_circle-3'>3</div>
						</div>
					</div>
					<div className='select_tag_wrapper'>
						{pickItemList.map((item, idx) => {
							return (
								<React.Fragment key={item + idx}>
									<Tag
										className='select_item_tag'
										key={idx + item}
										text={item}
										type={'interest'}
										onClick={deleteItem}
									/>
								</React.Fragment>
							);
						})}
					</div>
				</div>
				<div className='signup3_mid_wrapper'>
					{clicked ? (
						<>
							<div className='user_choice_back' onClick={backClickHandler}>
								<img
									src='/icon/join/left_arrow.png'
									alt='뒤로가기'
									className='user_choice_back_btn'
								/>
							</div>
							<BigCategory
								onClick={choiceCtgHandler}
								list={pickCtgList}
								choiceClick={choiceItemHandler}
							/>
						</>
					) : active ? null : (
						renderBigCtg()
					)}
					{backClicked ? renderBigCtg() : null}
				</div>

				<button className='select_complete_button' onClick={joinAlert}>
					선택 완료
				</button>
				{/* <section className="signup3_footer">
					Copyright © 2024 책국 All Rights Reserved.
				</section> */}
			</div>
		</>
	);
};

export default Signup3;

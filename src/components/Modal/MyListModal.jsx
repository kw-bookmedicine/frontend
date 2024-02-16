// 로그인하고 나서 바로 보여줄 모달창

import React, { useState, useEffect } from 'react';
import image from '../../assets/naver-icon.jpg';
import axios from 'axios';

// COMPONENTS
import SearchResultList from '../../components/SearchResultList';
import PickBookList from '../../components/PickBookList.js';

// STYLES
import '../../styles/MyListModal.css';

const MyListModal = ({ onClose }) => {
	const [input, setInput] = useState('');
	const [bookData, setData] = useState([]);

	useEffect(() => {
		const timer = setTimeout(() => {
			// 빈 문자열일 때 API 호출 방지
			if (input.trim() !== '') {
				axios
					.get(
						`https://www.googleapis.com/books/v1/volumes?q=${input}&key=AIzaSyDUtFpAVpNPHCEW-pxSxpTHSACNjko_MCc&maxResults=10`,
					)
					.then((res) => {
						setData(res.data.items ? res.data.items : []);
						// console.log('success');
						// console.log(input);
					})
					.catch((err) => console.log(err));
			}
		}, 100);

		// cleanup 함수를 반환하여 컴포넌트가 언마운트될 때 타이머를 해제합니다.
		return () => clearTimeout(timer);
	}, [input]);

	// 모달 내에서 검색한 책 이름 받아오는 함수
	const [pickTitle, setPickTitle] = useState('');

	const choiceTitle = (bookTitle) => {
		setPickTitle(bookTitle);
	};

	let pickBookListTitle = pickTitle;

	const renderPickList = (pickTitle, pickAuthor) => {
		if (pickBookListTitle !== '') {
			console.log(pickBookListTitle);
			return (
				<PickBookList type="short" title={pickTitle} author={pickAuthor} />
			);
		}
	};

	// 모달 창 닫는 함수
	const handleClose = () => {
		onClose?.();
	};

	const searchBook = (evt) => {
		if (evt.key === 'Enter' || evt.target.name === 'search-button') {
			console.log('hello');
			axios
				.get(
					`https://www.googleapis.com/books/v1/volumes?q=${input}&key=AIzaSyDUtFpAVpNPHCEW-pxSxpTHSACNjko_MCc` +
						'&maxResults=10',
				)
				.then((res) => {
					// console.log(res.data.items.slice(0, 7));
					setData(res.data.items.slice(0, 7));
					// console.log("success");
				})
				.catch((err) => console.log(err));
		}
	};

	const [isShow, setIsShow] = useState(false);

	const handleSearchResultShow = () => {
		setIsShow(true);
	};

	return (
		<>
			<div className="myListModal_overlay">
				<div className="myListModal_wrapper">
					<div className="myListModal_left_wrapper">
						{/* 검색 창 */}
						<div
							className="myList_search_wrapper"
							onClick={(e) => {
								e.stopPropagation();
								handleSearchResultShow();
							}}
						>
							<label>
								<div className="myList_search_wrap_inner">
									<button
										className="myList_search_button"
										onChange={searchBook}
										name="search-button"
									/>
									<input
										type="text"
										placeholder="검색어를 입력하세요"
										className="myList_search_input"
										value={input}
										onChange={(e) => {
											setInput(e.target.value);
										}}
										onKeyPress={searchBook}
									/>
									{input.length > 0 ? (
										<button
											className="search-close-button"
											onClick={(e) => {
												setInput('');
												// setChoiceBook(e.target.value);
											}}
										>
											X
										</button>
									) : null}
								</div>
							</label>
							{input.length > 0 && isShow ? (
								<SearchResultList
									book={bookData}
									type="myBook"
									onClick={(e) => {
										e.stopPropagation();
										console.log(e);
									}}
									updateBook={choiceTitle}
								/>
							) : null}
						</div>
						<div className="left_inputList_wrapper">
							<h4>50권의 책을 찾았어요!</h4>
							<div className="left_inputList_box">
								<PickBookList
									type="long"
									title={'해리포터와 불의 잔'}
									author={'J.K. 롤링'}
								/>
							</div>
						</div>
					</div>
					<div className="myListModal_right_wrapper">
						<div onClick={handleClose} className="CloseButton" />
						<h1>읽은 책 목록</h1>
						<div className="right_selectList">
							{/* <PickBookList type="short" /> */}
							{renderPickList(pickBookListTitle)}
						</div>
						<button className="select_complete">선택완료</button>
					</div>
				</div>
			</div>
			;
		</>
	);
};

export default MyListModal;

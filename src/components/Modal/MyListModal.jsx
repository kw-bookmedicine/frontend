// 로그인하고 나서 바로 보여줄 모달창

import React, { useState, useEffect } from 'react';
import image from '../../assets/naver-icon.jpg';
import axios from 'axios';

// COMPONENTS
import SearchResultList from '../../components/SearchResultList';
import PickBookItem from '../PickBookItem.jsx';

// STYLES
import '../../styles/MyListModal.css';

const MyListModal = ({ onClose }) => {
	const [input, setInput] = useState('');
	const [bookData, setData] = useState([]);

	// 오른쪽에 읽은 목록에 대한 책 제목 배열
	const [addBookList, setAddBookList] = useState([]);
	const [isEnter, setIsEnter] = useState(false);
	const [bookCount, setBookCount] = useState(0);

	// 새롭게 필터링 된 배열
	const [filterBookList, setFilterBookList] = useState([]);

	// 모달 내에서 검색한 책 이름 받아오는 함수
	const [pickTitle, setPickTitle] = useState('');
	const [prevItem, setPrevItem] = useState('');

	const choiceTitle = (bookTitle) => {
		setPickTitle(bookTitle);
	};

	let pickBookListTitle = pickTitle;

	// 읽은 목록 추가 버튼을 눌렀을 때, 읽은 목록 배열(addBookList)에 요소 추가 함수
	const AddBookList = (pickBookTitle) => {
		setAddBookList(
			addBookList.includes(pickBookTitle)
				? addBookList
				: addBookList.concat(pickBookTitle),
		);
	};

	const FilterBookTitle = (title) => {
		console.log("count1's add list:", addBookList);
		console.log('title:', title);
	};

	// 삭제된 항목을 다시 추가할 때 실행될 함수
	const newUpdateReadList = (newList) => {
		setFilterBookList(newList);
		console.log('new: ', newList);
	};

	// filterBookList '목록 삭제' 버튼 한 번만 눌러도 삭제되도록 하기
	// isClick 으로 하면 계속 filter로 되기 때문에 바꿔야됨.

	// 오른쪽에서 목록 삭제 버튼 클릭 시 실행되는 함수
	const updateReadList = (list) => {
		setFilterBookList(list);
		console.log('filter:', list);
	};

	const [clickCount, setClickCount] = useState(0);
	// 목록 삭제 버튼 클릭 시 활성 여부
	const [isClick, setIsClick] = useState(false);
	// 목록 삭제 버튼 눌렀을 때 실행되는 함수
	const updateClick = (click) => {
		// console.log('click=>', click);
		if (click === 1) {
			// 목록 삭제 버튼 활성화
			setClickCount(2);
		} else {
			// 읽은 목록 추가 버튼 활성화
			setClickCount(1);
		}
		// console.log('click:', click);

		setIsClick(click);
	};

	// 엔터 눌렀을 때 검색 결과 보이기
	const renderSearchList = (e) => {
		if (input.trim() !== '') {
			axios
				.get(
					`https://www.googleapis.com/books/v1/volumes?q=${input}&key=AIzaSyDUtFpAVpNPHCEW-pxSxpTHSACNjko_MCc`,
				)
				.then((res) => {
					// setData(res.data.items ? res.data.items : []);
					setData(res.data.items);
					setIsEnter(true);
					setBookCount(res.data.items.length);
				})
				.catch((err) => console.log(err));
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
								// handleSearchResultShow();
							}}
						>
							<label>
								<div className="myList_search_wrap_inner">
									<button
										className="myList_search_button"
										// onChange={searchBook}
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
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												renderSearchList(e);
											}
										}}
									/>
									{input.length > 0 ? (
										<button
											className="search-close-button"
											onClick={(e) => {
												setInput('');

												// 왼쪽에 검색 결과를 전부 안보이게 함.
												setIsEnter(false);

												setBookCount(0);
												// setChoiceBook(e.target.value);
											}}
										>
											X
										</button>
									) : null}
								</div>
							</label>
						</div>
						<div className="left_inputList_wrapper">
							<h4>{bookCount}권의 책을 찾았어요!</h4>
							<div className="left_inputList_box">
								{bookData.length > 0 && isEnter
									? bookData.map((ele) => {
											return (
												<PickBookItem
													key={ele.id}
													type="long"
													title={ele.volumeInfo.title}
													updateTitle={AddBookList}
													clicked={updateClick}
													// author={ele.volumeInfo.authors}
												/>
											);
									  })
									: ''}
							</div>
						</div>
					</div>
					<div className="myListModal_right_wrapper">
						<div onClick={handleClose} className="CloseButton" />
						<h1>읽은 책 목록</h1>
						<div className="right_selectList">
							{/* <PickBookList type="del" /> */}
							{/* {addBookList.length} */}
							{/* list:{addBookList} */}

							{/* addBookList => 제일 처음 클릭해서 추가된 책 목록 */}
							{/*  */}

							{addBookList.length > 0 && clickCount > 0
								? //이미 한 번 리스트가 추가된 상태

								  clickCount === 2
									? // 목록 삭제 버튼이 눌렸을 때
									  filterBookList.map((item) => {
											console.log('count:', clickCount);
											return (
												<PickBookItem
													key={item}
													type="short"
													title={item}
													readList={filterBookList}
													updateTitle={FilterBookTitle}
													updateList={updateReadList}
													clicked={updateClick}
												/>
											);
									  })
									: // 읽은 목록 다시 추가할 때
									  addBookList.map((item) => {
											console.log('count:', clickCount);
											return (
												<PickBookItem
													key={item}
													type="short"
													title={item}
													readList={addBookList}
													updateTitle={FilterBookTitle}
													updateList={newUpdateReadList}
													clicked={updateClick}
												/>
											);
									  })
								: ''}
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

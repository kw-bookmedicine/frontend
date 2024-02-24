// 로그인하고 나서 바로 보여줄 모달창

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// COMPONENTS
import PickBookItem from '../PickBookItem.jsx';

// STYLES
import '../../styles/MyListModal.css';

const MyListModal = ({ onClose }) => {
	const [input, setInput] = useState('');
	const [searchBookResult, setData] = useState([]); // 검색 결과가 추가된 리스트
	const [pickBookList, setPickBookList] = useState([]); // 처음 읽은 목록이 추가된 리스트
	const [filterBookList, setFilterBookList] = useState([]); // 삭제 후 필터링 된 책 리스트

	// 오른쪽에 읽은 목록에 대한 책 제목 배열
	const [addBookList, setAddBookList] = useState([]);
	const [isEnter, setIsEnter] = useState(false);
	const [bookCount, setBookCount] = useState(0);

	// '읽은 목록 추가' 버튼 활성 여부
	// false => 처음 추가
	// true => 삭제 후 다시 추가
	const [isClick, setIsClick] = useState(false);

	// '목록 삭제' 버튼 눌렀을 때 실행되는 함수
	const updateClick = () => {
		// '목록 삭제' 버튼 클릭 후에는 '읽은 목록 추가' 버튼 재활성
		setIsClick(true);
	};

	// 책 리스트 업데이트
	const updateBookList = (list) => {
		// console.log('isClick:', isClick);
		!isClick ? setPickBookList(list) : setFilterBookList(list);
	};

	// 읽은 목록 추가 버튼을 눌렀을 때, 읽은 목록 배열(addBookList)에 요소 추가 함수
	const AddBookList = (pickBookTitle) => {
		// console.log('add book: ', pickBookTitle);
		setAddBookList(
			pickBookList.includes(pickBookTitle)
				? pickBookList
				: pickBookList.push(pickBookTitle),
		);
	};

	// '목록 삭제' 버튼 클릭 시 실행되는 함수
	const FilterBookList = (list) => {
		// console.log('filter list:', list);
		setPickBookList(list);
	};

	// 엔터 눌렀을 때 검색 결과 보이기
	const renderSearchList = (e) => {
		if (input.trim() !== '') {
			axios
				.get(
					`https://www.googleapis.com/books/v1/volumes?q=${input}&key=AIzaSyDUtFpAVpNPHCEW-pxSxpTHSACNjko_MCc`,
				)
				.then((res) => {
					setData(res.data.items); // 검색 결과 저장
					setIsEnter(true); // 엔터 눌렀을 때 렌더링
					setBookCount(res.data.items.length); // 검색 결과로 나온 책 권수
				})
				.catch((err) => console.log(err));
		}
	};

	// 모달 창 닫는 함수
	const handleClose = () => {
		onClose?.();
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
							}}
						>
							<label>
								<div className="myList_search_wrap_inner">
									<button
										className="myList_search_button"
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
											onClick={() => {
												// x 버튼 눌렀을 때 발생하는 이벤트
												setInput('');
												// 왼쪽에 검색 결과를 전부 안보이게 함.
												setIsEnter(false);
												setBookCount(0);
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
								{searchBookResult.length > 0 && isEnter
									? searchBookResult.map((ele) => {
											return (
												<PickBookItem
													key={ele.id}
													type="long"
													title={ele.volumeInfo.title}
													BookList={pickBookList}
													updateList={AddBookList}
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
							{pickBookList.length > 0
								? pickBookList.map((item) => {
										return (
											<PickBookItem
												key={item}
												type="short"
												title={item}
												BookList={pickBookList}
												updateList={FilterBookList}
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

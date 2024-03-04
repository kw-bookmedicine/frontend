import React, { useState, useRef, useEffect } from 'react';

// COMPONENT
import Btn from './Button';

// STYLE
import '../styles/PickBookItem.css';

const PickBookItem = ({
	type,
	title,
	author,
	updateTitle,
	BookList,
	updateList,
	updateAuthor,
	clicked,
	clickCount,
}) => {
	let listType = ['long', 'short'].includes(type) ? type : 'default';

	const clickRef = useRef(null);
	const clickAuthorRef = useRef(null);

	// 오른쪽에 보여줄 선택된 책 제목
	const [pickBookTitle, setPickBookTitle] = useState('');
	const [pickBookAuthor, setPickBookAuthor] = useState('');
	const [bookList, setBookList] = useState([]);

	useEffect(() => {
		setBookList(BookList);
	});

	const addPick = () => {
		console.log('add:', clickRef.current);
		clickRef.current.focus();
		setPickBookTitle(clickRef.current.textContent);
	};

	const addAuthorPick = () => {
		console.log('add author:', clickAuthorRef.current);
		clickAuthorRef.current.focus();
		setPickBookAuthor(clickAuthorRef.current.textContent);
	};

	// 읽은 목록에서 삭제될 때 선택되는 함수
	const deletePick = () => {
		clickRef.current.focus();
		// console.log('del:', clickRef.current.textContent);
		setPickBookTitle(clickRef.current.textContent);
	};

	// 목록 삭제 버튼 클릭 시 활성 여부
	const onClick = () => {
		clicked(true);
	};

	const offClick = () => {
		clicked(false);
	};

	// 제일 처음 읽은 목록 추가 함수
	const bookUpdateList = () => {
		updateList(clickRef.current.textContent);
		updateAuthor(clickAuthorRef.current.textContent);
	};

	// 읽은 목록에서 삭제 버튼 누른 후 필터링 되는 함수
	const filterPickList = (pickBookTitle) => {
		updateList(BookList.filter((item) => item !== pickBookTitle));
	};

	return (
		<>
			<div className={`${listType}-pickBookList_wrapper`}>
				<div
					className={`${listType}-pickBook_title`}
					ref={clickRef}
					title={title}
				>
					{title}
				</div>
				<div
					className={`${listType}-pickBook_author`}
					ref={clickAuthorRef}
					title={author}
				>
					{author}
				</div>
				{listType === 'long' ? (
					<button
						className="Btn-add"
						onClick={() => {
							// console.log('========== 읽은 목록 추가 ==========');
							// offClick();
							addPick();
							addAuthorPick();

							// console.log(bookList);
							// updateClickCount();
							bookUpdateList();
						}}
					>
						읽은 목록 추가
					</button>
				) : (
					<button
						className="Btn-delete"
						onClick={() => {
							// 해당 책 데이터가 삭제되어야 함.
							// console.log('========== 목록 삭제 ==========');
							// onClick();
							deletePick();
							filterPickList(clickRef.current.textContent);
						}}
					>
						목록 삭제
					</button>
				)}
			</div>
		</>
	);
};

export default PickBookItem;

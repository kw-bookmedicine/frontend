import React, { useState, useRef } from 'react';

// COMPONENT
import Btn from './Button';

// STYLE
import '../styles/PickBookItem.css';

const PickBookItem = ({
	type,
	title,
	author,
	updateTitle,
	readList,
	updateList,
	clicked,
}) => {
	const clickRef = useRef();

	// 오른쪽에 보여줄 선택된 책 제목
	const [pickBookTitle, setPickBookTitle] = useState('');

	const pick = () => {
		clickRef.current.focus();
		console.log('del:', clickRef.current.textContent);
		setPickBookTitle(clickRef.current.textContent);

		// updatePickTitle(pickBookTitle);
	};

	// 오른쪽 읽은 목록에 추가될 책 제목 update 하는 함수
	const updatePickTitle = (pickBookTitle) => {
		console.log(pickBookTitle);
		updateTitle(pickBookTitle);
	};

	let filterReadList = [];
	// 목록 삭제 버튼 클릭 시 활성 여부
	const [isClick, setIsClick] = useState(false);
	// const onClick = () => {
	// 	clicked(isClick)
	// }

	let listType = ['short', 'long'].includes(type) ? type : 'default';

	return (
		<>
			<div className={`${listType}-pickBookList_wrapper`}>
				<span className="pickBook_title" ref={clickRef}>
					{title}
				</span>
				<span className="pickBook_author">{author}</span>
				{listType === 'long' ? (
					<button
						className="Btn-add"
						onClick={(e) => {
							pick();
							updatePickTitle(clickRef.current.textContent);
							// console.log(e.currentTarget.textContent);
							// console.log(e);
							// console.log('읽은 목록 추가');
						}}
					>
						읽은 목록 추가
					</button>
				) : (
					<button
						className="Btn-delete"
						onClick={() => {
							// 해당 책 데이터가 삭제되어야 함.
							console.log('목록 삭제');
							pick();
							clicked(true);
							// setIsClick(true);
							// onClick;
							filterReadList = readList.filter(
								(item) => item !== pickBookTitle,
							);
							updateList(filterReadList);

							// 버튼이 한 번이라도 눌렸으면 설정되는 값을 모달로 보내서 다르게 렌더링 함.

							// console.log(filterReadList);
							// console.log(readList);
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

import React from 'react';

// COMPONENT
import Btn from './Button';

// STYLE
import '../styles/PickBookList.css';

const PickBookList = ({ type, title, author }) => {
	let listType = ['short', 'long'].includes(type) ? type : 'default';

	return (
		<>
			<div className={`${listType}-pickBookList_wrapper`}>
				<span className="pickBook_title">{title}</span>
				<span className="pickBook_author">{author}</span>
				{listType === 'long' ? (
					<Btn text={'읽은 목록 추가'} type="add" />
				) : (
					<Btn text={'목록 삭제'} type="delete" />
				)}
			</div>
		</>
	);
};

export default PickBookList;

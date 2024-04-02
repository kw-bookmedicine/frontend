import React, { useState, useEffect } from 'react';

// SERVIce
import api from '../../services/api';

// COMPONENTS

// STYLE
import '../../styles/SearchBookModal.css';

const SearchBook = ({ onClose, author, isClick, active }) => {
	// 검색 결과 선택 여부
	const handleModalIsClick = async () => {
		onClose();
		isClick();
	};

	// 검색 리스트 가져오기
	// const fetchSearchData = async () => {
	// 	if (input.trim() === '') return;
	// 	api.get(`/api/search/book?author=${author}&target=modal`).then((res) => {
	// 		console.log(res.data);
	// 		setSearchData(res.data);
	// 	});
	// };

	// useEffect(() => {
	// 	fetchSearchData();
	// }, [author]);

	return (
		<>
			<div
				className={`searchBook_modal_container_${active}`}
				onClick={handleModalIsClick}
			></div>
		</>
	);
};

export default SearchBook;

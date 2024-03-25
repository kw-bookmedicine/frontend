import React, { useState } from 'react';

// COMPONENTS

// STYLE
import '../../styles/SearchBookModal.css';

const SearchBook = ({ onClose }) => {
	// 모달 창 닫는 함수
	const handleClose = () => {
		onClose?.();
	};

	return (
		<>
			<div className="searchBook_modal_container"></div>
		</>
	);
};

export default SearchBook;

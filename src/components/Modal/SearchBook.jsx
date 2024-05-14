import React, { useState, useEffect } from 'react';

// COMPONENTS

// STYLE
import '../../styles/SearchBookModal.css';

const SearchBook = ({ onClose, searchResult, isClick, active, resClick }) => {
	// 검색 결과 선택 여부
	const handleModalIsClick = async () => {
		onClose();
		isClick();
	};

	return (
		<>
			{active
				? searchResult.map((item) => {
						return (
							<div
								className="searchBook_modal_item_wrapper"
								key={'result-item:' + item.isbn}
								onClick={async () => {
									handleModalIsClick();
									resClick(item);
								}}
							>
								<div className="item_left_wrapper">
									<img
										src={
											item.imageUrl === null
												? '/loading_thumbnail_x4.png'
												: item.imageUrl
										}
										alt=""
										id="item_thumbnail"
									/>
								</div>
								<div className="item_right_wrapper">
									<p id="item_title">{item.title}</p>
									<p>{item.author}</p>
								</div>
							</div>
						);
				  })
				: null}
		</>
	);
};

export default SearchBook;

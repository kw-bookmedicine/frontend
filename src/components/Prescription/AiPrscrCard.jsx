import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// STYLE
import '../../styles/Prescription/AiPrscrCard.css';

const AiPrscrCard = ({ item, nickname }) => {
	const [keywordArr, setKeywordArr] = useState(item.keywords);

	const formatKeywords = (keywordArr) => {
		if (keywordArr.length === 0) return '';
		if (keywordArr.length === 1) return ` ‘${keywordArr[0]}’`;
		if (keywordArr.length === 2)
			return ` ‘${keywordArr[0]}’, ‘${keywordArr[1]}’`;
		if (keywordArr.length === 3)
			return ` ‘${keywordArr[0]}’, ‘${keywordArr[1]}’, ‘${keywordArr[2]}’`;
	};

	useEffect(() => {
		setKeywordArr(item.keywords);
		formatKeywords(keywordArr);
	}, []);

	return (
		<>
			<Link to={`/book-detail?isbn=${item.isbn}`}>
				<div className="ai_prscrCard_container">
					<div className="ai_prscrCard_left_wrapper">
						<img
							src="/icon/home/landing_ai_prscr_icon.svg"
							alt="AI처방 아이콘"
							id="aiPrscrCard_ai_icon"
						/>
					</div>
					<div className="ai_prscrCard_right_wrapper">
						<div className="ai_prscrCard_ai_bubble">
							<div className="ai_prscrCard_ai_bubble_left_wrapper">
								<p id="ai_prscrCard_ai_bubble_title">
									{nickname}님께 추천드리는 책
								</p>
								<p id="ai_prscrCard_ai_bubble_comment">
									{nickname} 님께서 작성 하신 고민 글에서
									{formatKeywords(keywordArr)} 을 주요 키워드로 파악했습니다.{' '}
									<br />
									<br />
									{nickname} 님이 관심을 보일 만한 책 ‘{item.title}’을
									추천드립니다 !
								</p>
							</div>
							<div className="ai_prscrCard_ai_bubble_right_wrapper">
								<img
									src={item.imageUrl ?? '/loading_thumbnail_x4.png'}
									id="ai_bubble_thumbnail"
								/>
								<div className="ai_prscrCard_ai_bubble_bookInfo_wrapper">
									<p id="ai_bubble_book_title">{item.title}</p>
									<p id="ai_bubble_book_author">{item.author}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default AiPrscrCard;

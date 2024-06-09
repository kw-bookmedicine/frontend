import React, { useState } from 'react';

// STYLE
import '../../styles/Counseling/PrescriptionCard.css';

const PrescriptionCard = ({ id, type, item }) => {
	const [flipped, setFlipped] = useState(false);

	const toggleFlip = () => {
		if (type === 'flip') {
			setFlipped(!flipped);
		}
	};

	const renderFront = () => {
		return (
			<>
				<div id="prscrCard_mid_title">처방전</div>
				<div className="bookInfo_left_wrapper">
					<img src={item.bookImageUrl} alt="" className="bookInfo_img" />
				</div>
				<div className="bookInfo_right_wrapper">
					<p className="prscrCard_bookInfo_title">
						{item.bookTitle !== null ? item.bookTitle : '책 제목'}
					</p>
					<p className="prscrCard_bookInfo_author">
						{item.bookAuthor !== null ? item.bookAuthor : '저자'}
					</p>
					<p className="prscrCard_bookInfo_date">
						{item.date !== null && item.company !== null
							? `${item.company}/${item.date}`
							: '출판사/출판연도'}
					</p>
				</div>
			</>
		);
	};

	const renderBack = () => {
		return (
			<>
				<div id="prscrCard_mid_title">처방사유</div>
				<div className="prscrCard_reason_wrapper">
					{item.description !== null ? item.description : '처방사유'}
				</div>
			</>
		);
	};

	return (
		<>
			<div
				className={`prscrCard_container ${flipped ? 'flipped' : ''}`}
				onClick={toggleFlip}
				id={id !== null ? id : null}
			>
				<div className="prscrCard_top_wrapper">
					<img
						src="/icon/pharmacy_icon.svg"
						alt=""
						className="prscr_vector_icon"
					/>
					<div className="prscrCard_title_wrapper">
						<div className="prscrCard_title">
							{item.title !== null ? (
								<p>
									{item.title}
									<br />
									{item.title2}
								</p>
							) : (
								'고민제목'
							)}
						</div>
						{/* <div className="prscrCard_user_name_wrapper">
							우리 모두에게 전하는 이야기
						</div> */}
					</div>
				</div>
				<div className="prscrCard_mid_wrapper">
					<div className="prscrCard_bookInfo_wrapper">
						{flipped ? renderBack() : renderFront()}
					</div>
				</div>
				<div className="prscrCard_bottom_wrapper">
					<div className="prscrCard_update_date">{item.createdDate}</div>
				</div>
			</div>
		</>
	);
};

export default PrescriptionCard;

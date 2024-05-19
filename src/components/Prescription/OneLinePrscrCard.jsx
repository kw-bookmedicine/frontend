import React from 'react';

// COMPONENTS
import HashTag from '../HashTag';

// STYLE
import '../../styles/Prescription/OneLinePrscrCard.css';
import { Link } from 'react-router-dom';

const OneLinePrscrCard = ({ item }) => {
	return (
		<>
			<Link
				to={`/oneline/prescription-detail?prscrId=${item.id}&bookIsbn=${item.bookIsbn}`}
			>
				<div className="OneLinePrscrCard_wrapper">
					<div className="oneLineCard_profile_wrapper">
						<img
							src="/icon/profile/basic_profile_img.svg"
							alt="작성자 프로필"
							id="oneLineCard_profile_img"
						/>
						<div className="oneLineCard_profile_userInfo_wrapper">
							<p id="oneLineCard_user_nickname">{item.clientNickname}</p>
							<p>{item.createdDate}</p>
						</div>
					</div>
					<div className="oneLineCard_title_wrapper">
						<p>{item.title}</p>
					</div>
					<div className="oneLineCard_bookInfo_wrapper">
						<img
							src={
								item.bookImageUrl === null
									? '/loading_thumbnail_x4.png'
									: item.bookImageUrl
							}
							alt="책 썸네일"
							id="oneLineCard_thumbnail"
						/>
						<div className="oneLineCard_bookInfo_right_wrapper">
							<div className="oneLineCard_bookInfo_content_wrapper">
								<div className="bookInfo_content_left_wrapper">
									<p id="oneLineCard_bookInfo_bookTitle">{item.bookTitle}</p>
									<p>{item.bookAuthor}</p>
								</div>
								<div className="showBook_btn_wrapper">
									{/* <Link to={`/book-detail?isbn=${item.bookIsbn}`}> */}
									<button
										href={`/book-detail?isbn=${item.bookIsbn}`}
										id="showBook_btn"
									>
										책 보러가기
									</button>
									{/* </Link> */}
								</div>
							</div>
							{/* <div className="oneLineCard_bookInfo_keyword_wrapper">
							<HashTag text={'저주'} type={'keyword'} />
							<HashTag text={'해리포터'} type={'keyword'} />
							<HashTag text={'판타지'} type={'keyword'} />
						</div> */}
						</div>
					</div>
					<div className="oneLineCard_evaluation_wrapper">
						<div className="evaluation_wrapper">
							<img
								src="/icon/oneLine-prscr/like.png"
								id="oneLineCard_like_icon"
							/>
							<span>좋은 추천이에요</span>
							<span>20</span>
						</div>
						<div className="evaluation_wrapper">
							<img
								src="/icon/oneLine-prscr/laughing.png"
								id="oneLineCard_good_icon"
							/>
							<span>도움이 되었어요</span>
							<span>10</span>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default OneLinePrscrCard;

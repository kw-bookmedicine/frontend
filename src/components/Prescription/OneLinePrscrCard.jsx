import React, { useState } from 'react';

// COMPONENTS
import HashTag from '../HashTag';

// STYLE
import '../../styles/Prescription/OneLinePrscrCard.css';
import { Link, useNavigate } from 'react-router-dom';

const OneLinePrscrCard = ({ type, item }) => {
	const navigate = useNavigate();

	const handleBookDetailNavigation = (event) => {
		event.preventDefault();
		navigate(`/book-detail?isbn=${item.bookIsbn}`);
	};

	const [likeNum, setLikeNum] = useState(0);
	const [isLike, setIsLike] = useState(false);
	const [likeIcon, setLikeIcon] = useState(
		'/icon/oneLine-prscr/before-like.svg',
	);
	const handleLikeUp = (event) => {
		event.preventDefault();

		if (!isLike) {
			setLikeNum((prevNum) => prevNum + 1);
			setLikeIcon('/icon/oneLine-prscr/after-like.svg');
		} else {
			if (likeNum > 0) {
				setLikeNum((prevNum) => prevNum - 1);
				setLikeIcon('/icon/oneLine-prscr/before-like.svg');
			} else {
				setLikeNum(0);
			}
		}
		setIsLike(!isLike);
		// console.log(likeNum)
	};

	const [helpNum, setHelpNum] = useState(0);
	const [isHelp, setIsHelp] = useState(false);
	const [helpIcon, setHelpIcon] = useState(
		'/icon/oneLine-prscr/before-help.svg',
	);
	const handleHelpUp = (event) => {
		event.preventDefault();
		if (!isHelp) {
			setHelpNum((prevNum) => prevNum + 1);
			setHelpIcon('/icon/oneLine-prscr/after-help.svg');
		} else {
			if (helpNum > 0) {
				setHelpNum((prevNum) => prevNum - 1);
				setHelpIcon('/icon/oneLine-prscr/before-help.svg');
			} else {
				setHelpNum(0);
			}
		}
		setIsHelp(!isHelp);
		// console.log(helpNum)
	};

	return (
		<>
			<Link
				to={
					type !== 'landing'
						? `/oneline/prescription-detail?prscrId=${item.id}&bookIsbn=${item.bookIsbn}`
						: '/login'
				}
			>
				<div
					className="OneLinePrscrCard_wrapper"
					id={type !== 'landing' ? null : 'landing_oneline_card'}
				>
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
										onClick={handleBookDetailNavigation}
										id="showBook_btn"
									>
										책 보러가기
									</button>
									{/* </Link> */}
								</div>
							</div>
						</div>
					</div>
					<div className="oneLineCard_evaluation_wrapper">
						<div className="evaluation_wrapper">
							<img
								src={likeIcon}
								id="oneLineCard_like_icon"
								onClick={handleLikeUp}
							/>
							<span>좋은 추천이에요</span>
							<span>{likeNum}</span>
						</div>
						<div className="evaluation_wrapper">
							<img
								src={helpIcon}
								id="oneLineCard_help_icon"
								onClick={handleHelpUp}
							/>
							<span>도움이 되었어요</span>
							<span>{helpNum}</span>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default OneLinePrscrCard;

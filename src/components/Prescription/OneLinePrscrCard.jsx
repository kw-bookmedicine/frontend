import React, { useState, useEffect } from 'react';

// COMPONENTS
import HashTag from '../HashTag';

// SERVICE
import api from '../../services/api';

// STYLE
import '../../styles/Prescription/OneLinePrscrCard.css';
import { Link, useNavigate } from 'react-router-dom';

const OneLinePrscrCard = ({ type, item }) => {
	const navigate = useNavigate();

	const handleBookDetailNavigation = (event) => {
		event.preventDefault();
		navigate(
			type !== 'landing' ? `/book-detail?isbn=${item.bookIsbn}` : '/login',
		);
	};

	const [likeNum, setLikeNum] = useState(
		type !== 'landing' ? item.likeCount : 24,
	);
	const [isLike, setIsLike] = useState(item.like);
	const [likeIcon, setLikeIcon] = useState(
		type !== 'landing'
			? item.like === false
				? '/icon/oneLine-prscr/before-like.svg'
				: '/icon/oneLine-prscr/after-like.svg'
			: '/icon/oneLine-prscr/after-like.svg',
	);

	const handleLikeUp = (event) => {
		event.preventDefault();

		if (!isLike) {
			// 좋아요 반영 보내기
			api
				.get(`/api/oneline-emotion/like/${item.id}`, {
					withCredentials: true,
				})
				.then((res) => {
					console.log('like up:', res.data);
					if (res.data === 'success') {
						setLikeNum((prevNum) => prevNum + 1);
						setLikeIcon('/icon/oneLine-prscr/after-like.svg');
					}
				});
		} else {
			if (likeNum > 0) {
				// 좋아요 취소하기
				api
					.delete(`/api/oneline-emotion/like/${item.id}`, {
						withCredentials: true,
					})
					.then((res) => {
						console.log(res.data);
						if (res.data === 'success') {
							setLikeNum((prevNum) => prevNum - 1);
							setLikeIcon('/icon/oneLine-prscr/before-like.svg');
						}
					});
			} else {
				setLikeNum(0);
			}
		}
		setIsLike(!isLike);
		// console.log(likeNum)
	};

	const [helpNum, setHelpNum] = useState(
		type !== 'landing' ? item.helpfulCount : 35,
	);
	const [isHelp, setIsHelp] = useState(item.helpful);
	const [helpIcon, setHelpIcon] = useState(
		type !== 'landing'
			? item.helpful === false
				? '/icon/oneLine-prscr/before-help.svg'
				: '/icon/oneLine-prscr/after-help.svg'
			: '/icon/oneLine-prscr/after-help.svg',
	);
	const handleHelpUp = (event) => {
		event.preventDefault();
		if (!isHelp) {
			//도움이 되었어요 추가
			api
				.get(`/api/oneline-emotion/helpful/${item.id}`, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.data === 'success') {
						setHelpNum((prevNum) => prevNum + 1);
						setHelpIcon('/icon/oneLine-prscr/after-help.svg');
					}
				});
		} else {
			if (helpNum > 0) {
				// 도움이 되었어요 취소하기
				api
					.delete(`/api/oneline-emotion/helpful/${item.id}`, {
						withCredentials: true,
					})
					.then((res) => {
						if (res.data === 'success') {
							setHelpNum((prevNum) => prevNum - 1);
							setHelpIcon('/icon/oneLine-prscr/before-help.svg');
						}
					});
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
					className={
						type !== 'bookDetail'
							? 'OneLinePrscrCard_wrapper'
							: 'bookDetail_OneLinePrscrCard_wrapper'
					}
					id={type !== 'landing' ? null : 'landing_oneline_card'}
				>
					<div className="oneLineCard_profile_wrapper">
						<img
							src={
								type !== 'landing'
									? '/icon/profile/basic_profile_img.svg'
									: '/icon/home/other_prscr_user.png'
							}
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
									{type !== 'bookDetail' ? (
										<button
											onClick={handleBookDetailNavigation}
											id="showBook_btn"
										>
											책 보러가기
										</button>
									) : null}

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
								onClick={
									type !== 'landing' && type !== 'bookDetail'
										? handleLikeUp
										: null
								}
							/>
							<span>좋은 추천이에요</span>
							<span>{likeNum}</span>
						</div>
						<div className="evaluation_wrapper">
							<img
								src={helpIcon}
								id="oneLineCard_help_icon"
								onClick={
									type !== 'landing' && type !== 'bookDetail'
										? handleHelpUp
										: null
								}
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

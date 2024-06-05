import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// COMPONENTS
import Header from '../../components/Header';
import HashTag from '../../components/HashTag';
import ConfirmModal from '../../components/Modal/ConfirmModal';

// SERVICE
import api from '../../services/api';
import useNicknameStore from '../../store/nickname-store';

// STYLE
import '../../styles/Prescription/OneLinePrscrDetail.css';

const OneLinePrscrDetail = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const prscrId = searchParams.get('prscrId');
	const bookIsbn = searchParams.get('bookIsbn');

	const [data, setData] = useState({});
	const [bookData, setBookData] = useState({});
	const [keywordArr, setKeywordArr] = useState([]);

	const { nickname } = useNicknameStore();
	const [fetchNickname, setFetchNickname] = useState(
		sessionStorage.getItem('nickname') || '',
	);
	const [writer, setWriter] = useState(sessionStorage.getItem('writer') || '');
	const [isShow, setIsShow] = useState(false);

	const [likeNum, setLikeNum] = useState(0);
	const [isLike, setIsLike] = useState(false);
	const [likeIcon, setLikeIcon] = useState(
		'/icon/oneLine-prscr/before-like.svg',
	);

	const [helpNum, setHelpNum] = useState(0);
	const [isHelp, setIsHelp] = useState(false);
	const [helpIcon, setHelpIcon] = useState(
		'/icon/oneLine-prscr/before-help.svg',
	);

	const fetchData = async () => {
		try {
			api
				.get(`/api/oneline-prescriptions/${prscrId}`, {
					withCredentials: true,
				})
				.then((res) => {
					setIsLike(res.data.like);
					setIsHelp(res.data.helpful);
					setLikeNum(res.data.likeCount);
					setHelpNum(res.data.helpfulCount);
					setLikeIcon(
						res.data.like === true
							? '/icon/oneLine-prscr/after-like.svg'
							: '/icon/oneLine-prscr/before-like.svg',
					);
					setHelpIcon(
						res.data.helpful === true
							? '/icon/oneLine-prscr/after-help.svg'
							: '/icon/oneLine-prscr/before-help.svg',
					);
					setData(res.data);
					setWriter(res.data.clientNickname);
					if (res.data.clientNickname !== writer) {
						sessionStorage.setItem('writer', res.data.clientNickname);
						setIsShow(false);
					} else {
						if (writer === nickname) {
							setIsShow(true);
						}
						// console.log(writer);
						// console.log(nickname);
					}
				});
		} catch (err) {
			window.location.replace('/login');
			console.log(err);
		}
	};

	const getBookData = () => {
		try {
			if (data.bookIsbn !== null) {
				api
					.get(`/api/book/detail?isbn=${bookIsbn}`, {
						withCredentials: true,
					})
					.then((res) => {
						setBookData(res.data);
						if (res.data.keywordItemList.length !== 0) {
							setKeywordArr(res.data.keywordItemList);
						}
					});
			}
		} catch (err) {
			window.location.replace('/login');
			console.log(err);
		}
	};

	const showBtnHandler = async () => {
		if (writer !== '') {
			if (writer !== fetchNickname) {
				setIsShow(false);
			} else {
				setIsShow(true);
			}
		} else {
			console.log('유저 닉네임 정보가 없습니다.');
		}
	};

	useEffect(() => {
		fetchData();
		getBookData();

		if (nickname !== '') {
			sessionStorage.setItem('nickname', nickname);
			setFetchNickname(nickname);
		}
	}, []);

	useEffect(() => {
		showBtnHandler();
	}, [writer]);

	const editPrscr = () => {
		navigate(
			`/oneline/prescription/edit?prscrId=${prscrId}&bookIsbn=${bookIsbn}`,
		);
		// console.log('수정');
	};

	const deletePrscr = () => {
		try {
			api
				.delete(`/api/oneline-prescriptions/${prscrId}`, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.data === 'success') {
						alert('한 줄 처방을 삭제했습니다.').then(
							navigate('/oneline/prescription'),
						);
					} else {
						alert('한 줄 처방 삭제에 실패했습니다.');
					}
				});
		} catch (err) {
			// window.location.replace('/login');
			console.log(err);
		}
		// console.log('삭제');
	};

	// 좋아요, 도움이 되었어요 반영 여부 핸들러
	const handleLikeUp = (event) => {
		event.preventDefault();

		if (!isLike) {
			// 좋아요 반영 보내기
			api
				.get(`/api/oneline-emotion/like/${prscrId}`, {
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
					.delete(`/api/oneline-emotion/like/${prscrId}`, {
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

	const handleHelpUp = (event) => {
		event.preventDefault();
		if (!isHelp) {
			//도움이 되었어요 추가
			api
				.get(`/api/oneline-emotion/helpful/${prscrId}`, {
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
					.delete(`/api/oneline-emotion/helpful/${prscrId}`, {
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
			<Header />
			<div className="oneLine_prscr_detail_container">
				<div className="oneLinePrscr_detail_up_wrapper">
					<div className="oneLinePrscr_detail_content_container">
						<div className="prscr_detail_left_wrapper">
							<div className="prscr_detail_img_wrapper">
								<img
									src={
										data.bookImageUrl === null
											? '/loading_thumbnail_x4.png'
											: data.bookImageUrl
									}
									id="oneLine-prscr-book-img"
								/>
							</div>
							<div className="prscr_detail_bookAbout_wrapper">
								<p>책 정보</p>
								<div className="bookAbout_content">
									{bookData.content === null
										? '책 정보를 준비 중입니다.'
										: bookData.content}
								</div>
								<div className="bookKeyword_wrapper">
									{keywordArr.map((item, idx) => {
										return (
											<HashTag
												text={item.name}
												type={'keyword'}
												key={'키워드' + idx + '-' + item.name}
											/>
										);
									})}
								</div>
							</div>
						</div>
						<div className="prscr_detail_right_wrapper">
							<div className="prscr_detail_bookInfo_wrapper">
								<div className="bookInfo_title_wrapper">
									<p>{data.bookTitle}</p>
									<div className="bookInfo_title_btn_wrapper">
										{isShow && (
											<>
												<button id="edit-btn" onClick={editPrscr}>
													수정하기
												</button>
												<button id="delete-btn" onClick={deletePrscr}>
													삭제하기
												</button>
											</>
										)}
									</div>
								</div>
								<p>{data.bookAuthor}</p>
								<p>
									{data.bookPublishYear === null
										? '출판사 / 출판연도'
										: `${data.bookPublishingHouse} / ${data.bookPublishYear}`}
								</p>
							</div>
							<div className="prscr_detail_user_wrapper">
								<div className="userInfo_wrapper">
									<img
										src="/icon/profile/basic_profile_img.svg"
										id="user_img"
									/>
									<p>
										{data.clientNickname === null
											? '사용자 닉네임'
											: data.clientNickname}
									</p>
								</div>
								<div className="prscr_detail_evaluation_wrapper">
									<button
										className="prscr_detail_evaluation_btn"
										onClick={handleLikeUp}
									>
										<img src={likeIcon} id="like-icon" />
										<span>좋은 추천이에요 {likeNum}</span>
									</button>
									<button
										className="prscr_detail_evaluation_btn"
										onClick={handleHelpUp}
									>
										<img src={helpIcon} id="help-icon" />
										<span>도움이 되었어요 {helpNum}</span>
									</button>
								</div>
							</div>
							<div className="prscr_detail_content_wrapper">
								<div className="prscr_detail_content_title_wrapper">
									<p>{data.title}</p>
								</div>
								<div className="prscr_detail_content_about_wrapper">
									<p>처방사유</p>
									<p id="prscr_detail_content">{data.description}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="oneLinePrscr_detail_down_wrapper"></div>
			</div>
		</>
	);
};

export default OneLinePrscrDetail;

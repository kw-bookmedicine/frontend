import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// COMPONENTS
import Header from './../../components/Header';
import Title from '../../components/Prescription/ProcessTitle';
import WidePrscrCard from '../../components/Prescription/WidePrescriptionCard';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import AiPrscrCard from '../../components/Prescription/AiPrscrCard';

// SERVICE
import api from '../../services/api';
import useNicknameStore from '../../store/nickname-store';

// STYLE
import '../../styles/Counseling/WorryDetail.css';

const WorryDetail = () => {
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	const boardId = searchParams.get('board');

	const [boardData, setBoardData] = useState({});
	const [prescriptionData, setPrescriptionData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// 현재 접속한 유저 닉네임
	const { nickname } = useNicknameStore();

	// 고민 작성자 닉네임
	const [fetchNickname, setFetchNickname] = useState(
		sessionStorage.getItem('nickname') || '',
	);
	const [writer, setWriter] = useState(
		sessionStorage.getItem('worry-writer') || '',
	);
	// 삭제 버튼 보이기 여부
	const [isShow, setIsShow] = useState(false);

	const pageEnd = useRef();
	const [page, setPage] = useState(0);
	const [totalElem, setTotalElem] = useState('');

	const [aiPrscrArr, setPrscrArr] = useState([]);
	const [isRecommending, setIsRecommending] = useState(false);
	const [isNoRecommendBook, setIsNoRecommendBook] = useState(false);

	// 해당하는 고민 글 정보 가져오기
	const fetchData = async () => {
		try {
			if (!boardId) {
				console.error('주소에 boardId가 없습니다.');
				return;
			}
			api
				.get(`/api/board/${boardId}`, { withCredentials: true })
				.then((res) => {
					setBoardData(res.data);
					setWriter(res.data.nickname);
					if (res.data.nickname !== writer) {
						sessionStorage.setItem('worry-writer', res.data.nickname);
						setIsShow(false);
					} else {
						if (writer === nickname) {
							setIsShow(true);
						}
					}
				});
		} catch (err) {
			window.location.replace('/login');
			console.error(err);
		}
	};

	useEffect(() => {
		fetchPrescription();
	}, [page]);

	// 해당 고민 글의 처방전 조회
	const fetchPrescription = async () => {
		try {
			await api
				.get(`/api/prescription?page=${page}&size=5&boardId=${boardId}`, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.data.totalPages > page) {
						if (res.data.content.length !== 0) {
							setPrescriptionData((prevData) => [
								...prevData,
								...res.data.content,
							]);
						}
					}
				});
		} catch (error) {
			window.location.replace('/login');
			console.log('해당 글 처방전 조회 실패', error);
		}
	};

	useEffect(() => {
		if (pageEnd.current) pageEnd.current.disconnect();

		const handleObserver = (entries) => {
			const target = entries[0];
			if (target.isIntersecting) {
				if (prescriptionData.length !== 0) {
					setPage((prevPage) => prevPage + 1);
				}
			}
		};

		pageEnd.current = new IntersectionObserver(handleObserver, {
			threshold: 1,
		});

		const lastElement = document.querySelector(
			'.wd_prscr_list_wrapper > *:last-child',
		);

		if (lastElement) {
			pageEnd.current.observe(lastElement);
		}

		return () => {
			if (pageEnd.current) pageEnd.current.disconnect();
		};
	}, [prescriptionData]);

	const showBtnHandler = async () => {
		if (writer !== '') {
			if (writer !== fetchNickname) {
				setIsShow(false);
			} else {
				setIsShow(true);
			}
		} else {
			// console.log('유저 닉네임 정보가 없습니다.');
		}
	};

	useEffect(() => {
		showBtnHandler();
	}, [writer]);

	const movePrescriptionWrite = () => {
		navigate(
			`/prescription/write?boardId=${boardId}&nickname=${boardData.nickname}`,
		);
	};

	// 해당 고민 글 삭제
	const handleBoardIdDelete = async () => {
		try {
			await api.delete(`/api/board/${boardId}`, {
				withCredentials: true,
			});
			navigate('/counseling');
		} catch (error) {
			console.error('boardId Delete 실패:', error);
		} finally {
			setIsModalOpen(false);
		}
	};

	// AI 처방전
	const getAiPrscr = () => {
		try {
			api
				.get(`/api/recommend/book/boardbased?boardId=${boardId}`)
				.then((res) => {
					if (res.data.recommending === true) {
						// 처방 진행 중
						setIsRecommending(false);
						setIsNoRecommendBook(true);
					} else {
						// 처방은 됨.
						if (res.data.id === null) {
							// 추천된 책이 없음
							setIsNoRecommendBook(false);
						} else {
							setPrscrArr(res.data);
						}
					}
					if (res.data === '') {
						setIsRecommending(false);
					} else {
						setIsRecommending(true);
					}
				});
		} catch (err) {
			window.location.replace('/login');
			console.log(err);
		}
	};

	useEffect(() => {
		fetchData();
		getAiPrscr();

		let userNickname = sessionStorage.getItem('userNickname');
		if (userNickname !== '') {
			setFetchNickname(nickname);
		}
	}, []);

	return (
		<>
			<Header />
			<div className="worry_detail_content">
				<Title type={'normal'} value={boardData.nickname} />
				<div className="worry_detail_title_wrapper">
					<div className="wd_container">
						<div className="wd_user_wrapper">
							<div className="wd_user_left_wrapper">
								<div className="wd_user_img">
									<img
										src="/icon/profile/basic_profile_img.svg"
										alt="유저 프로필"
										className="wd_user_img"
									/>
								</div>
								<div className="wd_user_info_wrapper">
									<div className="wd_user_name">{boardData.nickname}</div>
									<div className="wd_user_date">
										{boardData.createdDate
											? boardData.createdDate.slice(0, 10)
											: null}
									</div>
								</div>
							</div>
							{isShow && (
								<>
									<button
										onClick={() => setIsModalOpen(true)}
										className="wd_delete_btn"
									>
										삭제
									</button>
								</>
							)}
						</div>
						<div className="wd_title_text_wrapper">{boardData.title}</div>
					</div>
				</div>
				<div className="worry_detail_content_wrapper">
					<div className="wd_content_detail_wrapper">
						{boardData?.answers
							?.slice(0, boardData.answers.length - 2)
							.map((response) => (
								<div key={response.id}>
									<span className="wd_content_detail_title">
										{response.question}
									</span>
									<div className="wd_content_detail_text">
										{response.answer}
									</div>
								</div>
							))}
						<span className="wd_content_detail_title">고민 내용</span>
						<div className="wd_content_detail_text">
							{boardData.description}
						</div>
					</div>
					<div className="worry_detail_prscr_wrapper">
						{isRecommending ? (
							<>
								<div className="worry_detail_AI_recommendBook_wrapper">
									{isNoRecommendBook ? (
										<>
											<div className="worry_detail_no_ai_prscr_wrapper">
												<div className="worry_detail_no_ai_prscr_title_wrapper">
													<p>
														{boardData.nickname}님을 위한 AI 처방이 준비
														중입니다!
													</p>
													<p>조금만 기다려주세요!</p>
												</div>
												<img
													src="/images/book-detail/write_prscr_img_2.png"
													id="no_prscr_img"
												/>
											</div>
										</>
									) : aiPrscrArr.length !== 0 ? (
										<>
											{/* false이면서 값이 있는 상황*/}
											<AiPrscrCard
												item={aiPrscrArr}
												nickname={boardData.nickname}
											/>
										</>
									) : (
										<>
											{/* false이면서 null */}
											<p>고민에 맞는 책을 찾지 못했어요</p>
											<p id="no_ai_recommend_text">
												제안하고 싶은 도서가 있다면, 1:1 문의를 이용해주세요
											</p>
											<img
												src="/images/book-detail/write_prscr_img.png"
												id="no_ai_recommend_book_img"
											/>
										</>
									)}
								</div>
								{/* <div className="worry_detail_prscr_wrapper"> */}
								<div className="wd_prscr_list_title">처방전 확인하기</div>
								{prescriptionData.length > 0 ? (
									// 다른 사람 처방이 있는 경우
									<>
										<div className="wd_prscr_list_wrapper">
											{prescriptionData.map((prescription) => {
												return (
													<WidePrscrCard
														key={prescription.id}
														props={prescription}
													/>
												);
											})}
										</div>
									</>
								) : (
									<div className="worry_detail_no_prscr_wrapper">
										<div className="worry_detail_no_prscr_title_wrapper">
											<p>작성된 처방전이 없어요</p>
											<p>
												{boardData.nickname} 님을 위한 처방전을 작성해보세요!
											</p>
										</div>
									</div>
								)}
								{/* </div> */}
							</>
						) : (
							<>
								<div className="worry_detail_no_ai_prscr_wrapper">
									<div className="worry_detail_no_ai_prscr_title_wrapper">
										<p>
											{boardData.nickname}님을 위한 AI 처방이 준비 중입니다!
										</p>
										<p>조금만 기다려주세요!</p>
									</div>
									<img
										src="/images/book-detail/write_prscr_img_2.png"
										id="no_prscr_img"
									/>
								</div>
								{/* <div className="worry_detail_prscr_wrapper"> */}
								{prescriptionData.length > 0 ? (
									<>
										<div className="wd_prscr_list_title">처방전 확인하기</div>
										<div className="wd_prscr_list_wrapper">
											{prescriptionData.map((prescription) => (
												<WidePrscrCard
													key={prescription.id}
													props={prescription}
												/>
											))}
										</div>
									</>
								) : (
									<div className="worry_detail_no_prscr_title_wrapper">
										<p>작성된 처방전이 없어요</p>
										<p>{boardData.nickname} 님을 위한 처방전을 작성해보세요!</p>
									</div>
								)}
								{/* </div> */}
							</>
						)}
						{/* (
						<div className="worry_detail_no_prscr_wrapper">
							<div className="worry_detail_no_prscr_title_wrapper">
								<p>작성된 처방전이 없어요</p>
								<p>{boardData.nickname} 님을 위한 처방전을 작성해보세요!</p>
							</div>

						</div>
						)} */}
					</div>

					<button onClick={() => movePrescriptionWrite()} className="prscr_btn">
						처방하러 가기
					</button>
				</div>
			</div>
			<ConfirmModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleBoardIdDelete}
			/>
		</>
	);
};

export default WorryDetail;

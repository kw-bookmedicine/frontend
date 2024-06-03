import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// COMPONENTS
import Header from './../../components/Header';
import Title from '../../components/Prescription/ProcessTitle';
import WidePrscrCard from '../../components/Prescription/WidePrescriptionCard';
import ConfirmModal from '../../components/Modal/ConfirmModal';

// SERVICE
import api from '../../services/api';
import useNicknameStore from '../../store/nickname-store';

// STYLE
import '../../styles/Counseling/WorryDetail.css';

const WorryDetail = () => {
	const [boardData, setBoardData] = useState({});
	const [prescriptionData, setPrescriptionData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// const currentUrl = window.location.href;

	// // URL에서 boardId 쿼리 파라미터 값을 추출
	// const urlParams = new URLSearchParams(new URL(currentUrl).search);
	// const boardId = urlParams.get("board");

	const [searchParams] = useSearchParams();
	const boardId = searchParams.get('board');

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
						console.log(writer);
						console.log(nickname);
					}
				});
		} catch (err) {
			console.error(err);
		}
	};

	// 해당 고민 글의 처방전 조회
	const fetchPrescription = async () => {
		try {
			const response = await api.get(
				`/api/prescription?page=0&size=20&boardId=${boardId}`,
				{ withCredentials: true },
			);
			setPrescriptionData(response.data);
		} catch (error) {
			console.log('해당 글 처방전 조회 실패', error);
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
		fetchPrescription();

		if (nickname !== '') {
			sessionStorage.setItem('nickname', nickname);
			setFetchNickname(nickname);
		}
	}, []);

	useEffect(() => {
		showBtnHandler();
	}, [writer]);

	const navigate = useNavigate();

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
					{prescriptionData.length > 0 ? (
						<div className="worry_detail_prscr_wrapper">
							<div className="wd_prscr_list_title">처방전 확인하기</div>
							<div className="wd_prscr_list_wrapper">
								{prescriptionData.map((prescription) => (
									<WidePrscrCard key={prescription.id} props={prescription} />
								))}
							</div>
						</div>
					) : (
						<div className="worry_detail_no_prscr_wrapper">
							<div className="worry_detail_no_prscr_title_wrapper">
								<p>작성된 AI 처방이 없어요</p>
								<p>기다려주세요!</p>
							</div>

							<img
								src="/images/worry_detail/no_prscr_img.png"
								id="no_prscr_img"
							/>
						</div>
					)}
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

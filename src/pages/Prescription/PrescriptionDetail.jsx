import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// ASSETS
import loading_thumbnail from '../../assets/loading_thumbnail_x4.png';

// COMPONENTS
import Header from '../../components/Header.js';
import Title from '../../components/Prescription/ProcessTitle.jsx';
import PrescriptionCard from '../../components/Prescription/PrescriptionCard.jsx';

// SERVICE
import api from '../../services/api.js';

// STYLE
import '../../styles/Prescription/PrescriptionDetail.css';
import Skeleton from '../../components/Skeleton.jsx';
import ConfirmModal from '../../components/Modal/ConfirmModal.jsx';

// todo
// - 각 처방전에 대한 데이터 API 완성 시, 더미데이터에서 교체하기
const PrescriptionDetail = () => {
	const [searchParams] = useSearchParams();
	const boardId = searchParams.get('boardId');
	const prescriptionId = searchParams.get('prescriptionId');
	const [prescriptionData, setPrescriptionData] = useState(null);
	const [worryTitle, setWorryTitle] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [fromNickname, setFromNickname] = useState(
		sessionStorage.getItem('userNickname') || '',
	);
	const [targetNickname, setTargetNickname] = useState('');

	const deletePrescription = async () => {
		try {
			const response = await api.delete(`/api/prescription/${prescriptionId}`, {
				withCredentials: true,
			});
			// console.log(response);
		} catch (error) {
			console.error('처방전 삭제 요청 실패', error);
		}
	};

	const handleDeletePrescription = async () => {
		await deletePrescription();
		navigate(`/worry-detail?board=${boardId}`); // boardID 값이 필요함
	};

	const navigate = useNavigate();

	const handlePatchPrescription = () => {
		navigate(`/prescription/write`, {
			state: { ...prescriptionData, boardId, prescriptionId },
		});
	};

	const fetchData = async () => {
		try {
			const response = await api.get(`/api/prescription/${prescriptionId}`, {
				withCredentials: true,
			});
			setPrescriptionData(response.data);
			setTargetNickname(response.data.nickname);
		} catch (error) {
			window.location.replace('/login');
			console.error('처방전 데이터 불러오기 실패', error);
		}
	};

	// 고민 타이틀 받기
	const fetchPrescriptionTitle = async () => {
		try {
			const response = await api.get(`/api/board/${boardId}`, {
				withCredentials: true,
			});

			setWorryTitle(response.data.title);
		} catch (error) {
			window.location.replace('/login');
			console.error('처방전 데이터 불러오기 실패', error);
		}
	};

	useEffect(() => {
		fetchData();
		fetchPrescriptionTitle();
	}, []);

	if (!prescriptionData) {
		return (
			<>
				<Header />
				<Title type={'detail'} />
				<Skeleton />
			</>
		);
	}

	return (
		<>
			<Header />
			<Title
				type={'detail'}
				fromNickname={fromNickname}
				targetNickname={targetNickname}
			/>
			<div className="prscr_detail_top_container">
				<div className="prscr_detail_top_info_wrapper">
					<div className="prscr_detail_top_wrapper">
						<div className="dt_prscr_title_wrapper">
							<div onClick={() => navigate(`/worry-detail?board=${boardId}`)}>
								<span id="dt_prscr_title">"{worryTitle}"</span>
								&nbsp;에 대한&nbsp;
								<span id="dt_from_nickname">{prescriptionData.nickname}</span>
								님의 처방전
							</div>
							<div className="prscr_dt_wrapper">
								<button
									onClick={handlePatchPrescription}
									className="prscr_dt_btn_edit"
								>
									수정
								</button>
								<button
									onClick={() => setIsModalOpen(true)}
									className="prscr_dt_btn_delete"
								>
									삭제
								</button>
							</div>
						</div>

						<div className="prscr_dt_bookInfo_wrapper">
							<div className="prscr_dt_left_wrapper">
								<img
									src={prescriptionData.imageUrl ?? loading_thumbnail}
									alt=""
									id="prscr_dt_loading_img"
								/>
							</div>
							<div className="prscr_dt_right_wrapper">
								<p className="prscr_dt_right_title">
									책 제목: {prescriptionData.bookTitle ?? ''}
								</p>
								<p className="prscr_dt_right_author">
									저자: {prescriptionData.author ?? ''}
								</p>
								<p className="prscr_dt_right_bookCompany">
									출판사:
									{prescriptionData.publishingHouse ?? ' 알에이치코리아(RHK)'}
								</p>
								<p className="prscr_dt_right_bookCompany">
									출판연도: {prescriptionData.publishYear ?? ''}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="prscr_detail_bottom_wrapper">
				<div className="prscr_detail_res_container">
					<h1 className="prscr_dt_res_title">처방제목</h1>
					<p className="prscr_dt_res_content">{prescriptionData.title}</p>
					<h1 className="prscr_dt_res_title">처방사유</h1>
					<p>{prescriptionData.description}</p>
				</div>
			</div>
			<ConfirmModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleDeletePrescription}
			/>
		</>
	);
};

export default PrescriptionDetail;

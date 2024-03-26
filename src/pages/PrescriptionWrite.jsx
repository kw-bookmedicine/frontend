import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Header from '../components/Header';
import Title from '../components/Prescription/ProcessTitle';
import SearchBookModal from '../components/Modal/SearchBook';

// ASSETS
import loading_img from '../assets/loading_thumbnail_x4.png';

// STYLE
import '../styles/Counseling/PrescriptionWrite.css';

const PrescriptionWrite = () => {
	const [input, setInput] = useState('');
	const [isShow, setIsShow] = useState(false); // 검색창 모달창
	const [searchType, setSearchType] = useState('title'); // 검색 유형 상태

	const handleSearchResultClose = () => {
		setIsShow(false);
	};

	const handleSearchResultShow = () => {
		setIsShow(true);
	};

	const handleSelectChange = (e) => {
		setSearchType(e.target.value);
		setInput('');
	};

	const [modalOn, setModalOn] = useState(false);
	const [modalIsClick, setModalIsClick] = useState(false);

	const handleModal = () => {
		setModalOn(!modalOn);
	};

	const handleModalIsClick = (modalIsClick) => {
		console.log(modalIsClick);
		setModalIsClick(modalIsClick);
	};

	return (
		<>
			<Header />
			<Title type={'process'} value={'30'} />
			<div className="prescription_info_container">
				<div className="prscr_left_wrapper">
					<img
						src={loading_img}
						alt="로딩 썸네일"
						className="prscr_img_wrapper"
					/>
				</div>
				<div className="prscr_right_wrapper">
					<div className="prscr_search_wrapper">
						<img
							src="/icon/search_icon.png"
							alt=""
							className="prscr_search_icon"
						/>
						<input
							type="text"
							placeholder="처방할 책을 검색해주세요"
							value={input}
							className="prscr_search_text"
							onChange={(e) => {
								setInput(e.target.value);
								setModalOn(true);
							}}
						/>
						{input.length > 0 ? (
							<button
								className="prscr_search_close_btn"
								onClick={() => {
									setInput('');
									handleModal(false);
								}}
							>
								X
							</button>
						) : null}
						{modalOn && input.length === 0 ? handleModal(false) : null}
					</div>
					{modalOn && (
						<SearchBookModal
							onClose={handleModal}
							isClick={handleModalIsClick}
							author={input}
						/>
					)}
				</div>
			</div>
			{modalIsClick && input.length > 0 ? (
				<div className="prescription_btn_container">
					<button className="prscr_cancel_btn">취소하기</button>
					<Link to={'/prescription/write/2'}>
						<button className="prscr_apply_btn">처방전 작성하기</button>
					</Link>
				</div>
			) : null}
		</>
	);
};

export default PrescriptionWrite;

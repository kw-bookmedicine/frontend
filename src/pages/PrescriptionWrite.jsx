import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Header from '../components/Header';
import Title from '../components/Prescription/ProcessTitle';
import SearchBookModal from '../components/Modal/SearchBook';

// ASSETS
import loading_img from '../assets/loading_thumbnail_x4.png';
import loading_test_img from '../assets/loading_test_img.png';

// STYLE
import '../styles/Counseling/PrescriptionWrite.css';

const PrescriptionWrite = () => {
	const [input, setInput] = useState('');
	const [isShow, setIsShow] = useState(false); // 검색 모달창

	// 모달창을 클릭한 여부
	const [modalIsClick, setModalIsClick] = useState(false);
	const [searchData, setSearchData] = useState(0);

	const handleModalClose = () => {
		setIsShow(false);
	};

	const handleModalShow = () => {
		setIsShow(true);
	};

	const handleModalIsClick = () => {
		setModalIsClick(true);
		setSearchData(1);
	};

	const handleObserver = (e) => {
		// 요소 감시 중 해당하는 요소가 화면에 등장했을 때, 여기 코드 실행
		e.forEach((viewTarget) => {
			console.log('target');
			// console.log(viewTarget);
		});
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(items) => {
				items.forEach((item) => {
					if (item.isIntersecting) {
						// console.log(item.target, 'is visible!');
						item.target.classList.add('visible');
					} else {
						// item.target.classList.remove('visible');
					}
				});
			},
			{ threshold: 0 },
		);
		// 특정 dom 요소가 화면에 등장하는 지 여부를 감시함.
		const box = document.getElementById('test_text');
		observer.observe(box);
		// box.forEach((item) => observer.observe(item));
	});

	return (
		<>
			<Header />
			<Title type={'process'} value={'30'} />
			<div className="prescription_content_container">
				<section className="prescription_content_up_container">
					<div className="prscr_bookInfo_wrapper">
						<div className="prscr_left_wrapper">
							<img
								src={modalIsClick ? loading_test_img : loading_img}
								alt="로딩 썸네일"
								className="prscr_img_wrapper"
							/>
						</div>
						<div className="prscr_right_wrapper">
							<div className="prscr_searchBar_wrapper">
								<img
									src="/icon/search_icon.png"
									className="prscr_search_icon"
								/>

								<input
									type="text"
									placeholder="처방할 책을 검색해주세요"
									value={input}
									className="prscr_search_text"
									onChange={(e) => {
										setInput(e.target.value);
										handleModalShow();
									}}
								/>
								{input.length > 0 ? (
									<button
										className="prscr_search_close_btn"
										onClick={() => {
											setInput('');
											handleModalClose();
										}}
									>
										X
									</button>
								) : null}
								{isShow && input.length === 0 ? handleModalClose() : null}
							</div>
							{isShow && input.length > 0 ? (
								<SearchBookModal
									onClose={handleModalClose}
									isClick={handleModalIsClick}
									author={input}
									active={isShow}
								/>
							) : (
								<SearchBookModal
									onClose={handleModalClose}
									isClick={handleModalIsClick}
									author={input}
									active={isShow}
								/>
							)}

							{isShow === false && modalIsClick && searchData > 0 ? (
								<div className="prscr_search_res_wrapper">
									<p className="search_res_bookTitle">책 제목</p>
									<p className="search_res_bookAuthor">저자</p>
									<p className="search_res_bookCompany">출판사</p>
								</div>
							) : null}

							{/* {isShow && modalIsClick ? (
								handleModalClose ? (
									<div className="prscr_search_res_wrapper">
										<p className="search_res_bookTitle">책 제목</p>
										<p className="search_res_bookAuthor">저자</p>
										<p className="search_res_bookCompany">출판사</p>
									</div>
								) : null
							) : null} */}
						</div>
					</div>
				</section>
				<section className="prescription_content_bottom_container">
					<div id="test_text"></div>
				</section>
			</div>
			<div className="prescription_btn_container">
				<button className="prscr_cancel_btn">취소하기</button>
				<Link to={'/prescription/write/2'}>
					<button className="prscr_apply_btn">처방전 작성하기</button>
				</Link>
			</div>

			{/* {modalIsClick && input.length > 0 ? (
				<div className="prescription_btn_container">
					<button className="prscr_cancel_btn">취소하기</button>
					<Link to={'/prescription/write/2'}>
						<button className="prscr_apply_btn">처방전 작성하기</button>
					</Link>
				</div>
			) : null} */}
		</>
	);
};

export default PrescriptionWrite;

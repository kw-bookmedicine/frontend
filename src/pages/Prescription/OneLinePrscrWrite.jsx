import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Header from '../../components/Header';
import Title from '../../components/Prescription/ProcessTitle';
import SearchBookModal from '../../components/Modal/SearchBook';

// ASSETS
import loading_img from '../../assets/loading_thumbnail_x4.png';
import loading_test_img from '../../assets/loading_test_img.png';

// SERVICE
import api from '../../services/api';

// STYLE
import '../../styles/Prescription/OneLinePrscrWrite.css';

const OneLinePrscrWrite = () => {
	const [processValue, setProcessValue] = useState(0);

	const [input, setInput] = useState('');
	const [isShow, setIsShow] = useState(false); // 검색 모달창
	// const location = useLocation();
	// const navigate = useNavigate(); // 버튼 클릭시 페이지 이동

	// 모달창을 클릭한 여부
	const [modalIsClick, setModalIsClick] = useState(false);
	let [searchData, setSearchData] = useState(0);

	const handleModalClose = async () => {
		setIsShow(false);
	};

	const handleModalShow = async () => {
		setIsShow(true);
	};

	const handleModalIsClick = async () => {
		setProcessValue(50);
		setModalIsClick(true);

		setSearchData(searchData + 1);
		searchData = searchData + 1;
		// console.log(searchData);
	};

	// const { register, handleSubmit, setValue } = useForm({
	// 	defaultValues: {
	// 		title: location.state?.title || '',
	// 		description: location.state?.description || '',
	// 		isbn: location.state?.isbn || '9788932011172', // 임시 ISBN ->
	// 		boardId: location.state?.boardId,
	// 		prescriptionId: location.state?.prescriptionId || undefined,
	// 	},
	// });

	useEffect(() => {
		const observer = new IntersectionObserver(
			(items) => {
				items.forEach((item) => {
					if (item.isIntersecting) {
						// console.log(item.target, 'is visible!');
						if (modalIsClick === true) {
							chTarget.classList.add('oneLine_visible');
							chTarget.classList.remove('no');
						} else {
							chTarget.classList.add('oneLine_visible');
							chTarget.classList.remove('no');
						}
					} else {
						if (modalIsClick === false) {
							// chTarget.classList.add('no');
							// chTarget.classList.remove('oneLine_visible');
							chTarget.classList.add('oneLine_visible');
						} else {
							chTarget.classList.add('no');
							chTarget.classList.remove('oneLine_visible');
						}
					}
				});
			},
			{
				threshold: 0.05,
			},
		);
		// 특정 dom 요소가 화면에 등장하는 지 여부를 감시함.
		const box = document.getElementById('observe_target');
		const chTarget = document.getElementById('oneLine_prscr_write_box');
		observer.observe(box);
	});

	// const onSubmit = (data, event) => {
	// 	event.preventDefault();

	// 	if (!data.isbn) {
	// 		alert('책을 선택해주세요.');
	// 		return;
	// 	}
	// 	// navigate('/prescription/write/2', { state: data });
	// };

	// 검색 결과
	const [searchResult, setSearchResult] = useState([]);

	useEffect(() => {
		fetchSearchData();
	}, [input]);

	// 검색 데이터 가져오기
	const fetchSearchData = () => {
		try {
			if (input.trim() === '') return;

			api
				.get(`/api/search/book?title=${input}&target=page&page=${0}&size=${10}`)
				.then((res) => {
					if (res.data.content.length > 0) {
						setSearchResult(res.data.content);
					}
				});
		} catch (err) {
			console.log(err);
		}
	};

	const [choiceItem, setChoiceItem] = useState({});

	const resClick = (item) => {
		// console.log(item);
		setChoiceItem(item);
	};

	return (
		<>
			<Header />
			<Title type={'oneLine'} value={processValue} />
			{/* <form onSubmit={handleSubmit(onSubmit)}> */}
			<div className="oneLine_prscr_content_container">
				<section className="prescription_content_up_container">
					<div className="prscr_category_wrapper"></div>
					<div className="prscr_bookInfo_wrapper">
						<div className="prscr_left_wrapper">
							<img
								src={
									modalIsClick
										? choiceItem.imageUrl
											? choiceItem.imageUrl
											: loading_img
										: loading_img
								}
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
									value={isShow ? (input === '' ? '' : input) : ''}
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
							</div>

							{/* 처음에 모달 클릭되었을 때 책 정보 나타나는 에러 방지 */}
							{isShow === false && modalIsClick === true
								? input.length > 0
									? null
									: setModalIsClick(false)
								: null}
							{isShow && input.length === 0 ? setIsShow(false) : null}

							{isShow && input.length > 0 ? (
								<>
									<div
										className={`searchBook_modal_container_${isShow}`}
										onClick={handleModalIsClick}
									>
										<SearchBookModal
											onClose={handleModalClose}
											isClick={handleModalIsClick}
											searchResult={searchResult}
											active={isShow}
											resClick={resClick}
										/>
									</div>
								</>
							) : (
								<>
									<div
										className={`searchBook_modal_container_${isShow}`}
										onClick={handleModalIsClick}
									>
										<SearchBookModal
											onClose={handleModalClose}
											isClick={handleModalIsClick}
											searchResult={searchResult}
											active={isShow}
											resClick={resClick}
										/>
									</div>
								</>
							)}

							{isShow === false && modalIsClick && searchData > 0 ? (
								<div className="prscr_search_res_wrapper">
									<p className="search_res_bookTitle">{choiceItem.title}</p>
									<p className="search_res_bookAuthor">{choiceItem.author}</p>
									<p className="search_res_bookCompany">
										{choiceItem.publishingHouse}
									</p>
								</div>
							) : null}
						</div>
					</div>
				</section>
				<section
					className="prescription_content_bottom_container"
					id="observe_target"
				>
					<div id="oneLine_prscr_write_box">
						<label className="oneLine_prscr_writeBox_title_wrapper">
							<p>처방제목</p>
							<input
								// {...register('title', { required: true })}
								type="text"
								placeholder="한 줄 처방 제목을 작성하세요"
							/>
						</label>
						<label>
							<p>처방사유</p>
							<textarea
								// {...register('description', { required: true })}
								type="text"
								placeholder="처방사유를 작성하세요"
							/>
						</label>
					</div>
				</section>
			</div>
			<div className="prescription_btn_container">
				<button className="prscr_cancel_btn">취소하기</button>
				<Link to={'/prescription/write/2'}>
					<button className="prscr_apply_btn">처방전 작성하기</button>
				</Link>
			</div>
			{/* </form> */}
		</>
	);
};

export default OneLinePrscrWrite;

import React, { useState, useEffect, useRef, Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// COMPONENTS
import Header from '../../components/Header';
import Title from '../../components/Prescription/ProcessTitle';
import SearchBookModal from '../../components/Modal/SearchBook';
import DropMenu from '../../components/DropDown';

// ASSETS
import loading_img from '../../assets/loading_thumbnail_x4.png';
import loading_test_img from '../../assets/loading_test_img.png';

// SERVICE
import api from '../../services/api';

// STYLE
import '../../styles/Prescription/OneLinePrscrWrite.css';
import {
	MAX_LENGTH_DEFAULT,
	MAX_LENGTH_TITLE,
} from '../../constants/constants';
// import 'sweetalert2/src/sweetalert2.scss';

const OneLinePrscrWrite = () => {
	const [processValue, setProcessValue] = useState(0);

	const [input, setInput] = useState('');
	const [isShow, setIsShow] = useState(false); // 검색 모달창
	const location = useLocation();
	const navigate = useNavigate(); // 버튼 클릭시 페이지 이동

	const [choiceItem, setChoiceItem] = useState({});

	// 모달창을 클릭한 여부
	const [modalIsClick, setModalIsClick] = useState(false);
	let [searchData, setSearchData] = useState(0);

	// 글 작성
	const [titleInput, setTitleInput] = useState('');
	const [contentInput, setContentInput] = useState('');

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

	const [category, setCategory] = useState('');

	// 선택된 키워드 타입 지정
	const ctgType = (ctg) => {
		switch (ctg) {
			case '관계/소통':
				setCategory('Relationships_Communication');
				break;
			case '소설/에세이':
				setCategory('Fiction_Essays');
				break;
			case '경제/경영':
				setCategory('Economy_Management');
				break;
			case '자녀/양육':
				setCategory('Children_Parenting');
				break;
			case '사회':
				setCategory('Society');
				break;
			case '철학':
				setCategory('Philosophy');
				break;
			case '건강':
				setCategory('Health');
				break;
			case '역사':
				setCategory('History');
				break;
			case '수학/과학/공학':
				setCategory('Science_Math_Engineering');
				break;
			case '문제집/수험서':
				setCategory('Workbook_Examination');
				break;
			case '취업':
				setCategory('Employment_Career');
				break;
			case '취미':
				setCategory('Hobbies');
				break;
			case '기타':
				setCategory('ETC');
				break;
		}
	};

	// 한 줄 처방 작성 요청 보내기
	const postData = async () => {
		const inputTitle = document.getElementById('oneLine-prscr-title').value;

		const inputDescription = document.getElementById(
			'oneLine-prscr-description',
		).value;

		// console.log(category);
		// console.log(inputTitle);
		// console.log(inputDescription);
		// console.log(choiceItem.isbn);

		try {
			if (
				category !== '' &&
				inputTitle !== '' &&
				inputDescription !== '' &&
				choiceItem.isbn !== null
			) {
				api
					.post(
						'/api/oneline-prescriptions/new',
						{
							title: `${inputTitle}`,
							description: `${inputDescription}`,
							bookIsbn: `${choiceItem.isbn}`,
							keyword: `${category}`,
						},
						{ withCredentials: true },
					)
					.then((res) => {
						alert('한 줄 처방전이 작성되었습니다!');
						// swal('한 줄 처방전이 작성되었습니다!', '', 'success');
						window.location.replace('/oneline/prescription');
						console.log('성공');
						// console.log(res.data);
					});
			} else {
				alert('모든 항목을 채워주세요.');
			}
		} catch (err) {
			console.log(err);
		}
	};

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
							chTarget.classList.remove('visible');
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

	const onSubmit = (data, event) => {
		event.preventDefault();

		if (!data.isbn) {
			alert('책을 선택해주세요.');
			return;
		}
		// navigate('/prescription/write/2', { state: data });
	};

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

	const resClick = (item) => {
		// console.log(item);
		setChoiceItem(item);
	};

	const closeWrite = () => {
		const closeConfirm = window.confirm('한 줄 처방 작성을 취소하시겠습니까?');
		if (closeConfirm === true) {
			window.location.replace('/oneline/prescription');
		}
	};

	return (
		<>
			<Header />
			<Title type={'oneLine'} value={processValue} />
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
						<div className="prscr_category_wrapper">
							<span>카테고리</span>
							<div id="choice-category">
								<DropMenu
									DropDownTitle={'카테고리를 선택해주세요'}
									ctgType={(ctg) => ctgType(ctg)}
								/>
							</div>
						</div>
						<label className="oneLine_prscr_writeBox_title_wrapper">
							<p className="prescription_content_bottom_text">
								처방제목{' '}
								<span>
									[ {titleInput.length} / {MAX_LENGTH_TITLE}자 ]
								</span>
							</p>
							<input
								type="text"
								value={titleInput}
								onChange={(e) => setTitleInput(e.target.value)}
								placeholder="한 줄 처방 제목을 작성하세요"
								id="oneLine-prscr-title"
								maxLength={MAX_LENGTH_TITLE}
								minLength={1}
							/>
						</label>
						<label>
							<p className="prescription_content_bottom_text">
								처방사유{' '}
								<span>
									[ {contentInput.length} / {MAX_LENGTH_DEFAULT}자 ]
								</span>
							</p>
							<textarea
								type="text"
								value={contentInput}
								onChange={(e) => setContentInput(e.target.value)}
								placeholder="처방사유를 작성하세요"
								id="oneLine-prscr-description"
								maxLength={MAX_LENGTH_DEFAULT}
								minLength={1}
							/>
						</label>
					</div>
				</section>
			</div>
			<div className="prescription_btn_container">
				<button
					className="prscr_cancel_btn"
					onClick={() => {
						closeWrite();
					}}
				>
					취소하기
				</button>

				<button
					className="prscr_apply_btn"
					id="prscr-write-btn"
					onClick={() => {
						postData();
					}}
				>
					처방전 작성하기
				</button>
			</div>
			{/* </form> */}
		</>
	);
};

export default OneLinePrscrWrite;

import React, { useState, useEffect, useRef, Component } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
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
import '../../styles/Prescription/OneLinePrscrEdit.css';
// import 'sweetalert2/src/sweetalert2.scss';

const OneLinePrscrEdit = () => {
	const [processValue, setProcessValue] = useState(0);
	const [searchParams] = useSearchParams();
	const prscrId = searchParams.get('prscrId');
	const bookIsbn = searchParams.get('bookIsbn');
	const [keyword, setKeyword] = useState('');

	const [input, setInput] = useState('');
	const [isShow, setIsShow] = useState(false); // 검색 모달창
	const location = useLocation();
	const navigate = useNavigate(); // 버튼 클릭시 페이지 이동

	const [editablePrscrData, setEditablePrscrData] = useState([]); // 처방전의 수정할 데이터 정보
	const [bookData, setBookData] = useState([]); // 수정할 책 정보
	const [choiceItem, setChoiceItem] = useState({});

	// 관련된 한 줄 처방 정보 가져오기
	const fetchData = () => {
		try {
			api
				.get(`/api/oneline-prescriptions/${prscrId}`, {
					withCredentials: true,
				})
				.then((res) => {
					setEditablePrscrData(res.data);
					ctgType(res.data.keyword);
				});
		} catch (err) {
			window.location.replace('/login');
			console.log(err);
		}
	};

	const getBookData = () => {
		try {
			if (editablePrscrData.bookIsbn !== null) {
				api
					.get(`/api/book/detail?isbn=${bookIsbn}`, {
						withCredentials: true,
					})
					.then((res) => {
						setBookData(res.data);
					});
			}
		} catch (err) {
			window.location.replace('/login');
			console.log(err);
		}
	};

	useEffect(() => {
		fetchData();
		getBookData();
	}, []);

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

	const [category, setCategory] = useState('');

	// 선택된 키워드 타입 지정
	const ctgType = async (ctg) => {
		switch (ctg) {
			case 'Relationships_Communication':
				setKeyword('관계/소통');
				break;
			case 'Fiction_Essays':
				setKeyword('소설/에세이');
				break;
			case 'Economy_Management':
				setKeyword('경제/경영');
				break;
			case 'Children_Parenting':
				setKeyword('자녀/양육');
				break;
			case 'Society':
				setKeyword('사회');
				break;
			case 'Philosophy':
				setKeyword('철학');
				break;
			case 'Health':
				setKeyword('건강');
				break;
			case 'History':
				setKeyword('역사');
				break;
			case 'Science_Math_Engineering':
				setKeyword('수학/과학/공학');
				break;
			case 'Workbook_Examination':
				setKeyword('문제집/수험서');
				break;
			case 'Employment_Career':
				setKeyword('취업');
				break;
			case 'Hobbies':
				setKeyword('취미');
				break;
			case 'ETC':
				setKeyword('기타');
				break;
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

	const [isTitleEditing, setTitleEditing] = useState(false);
	const [isDscrpEditing, setDscrpEditing] = useState(false);
	const [isCtgEditing, setCtgEditing] = useState(false);

	// 한 줄 처방 수정 요청 보내기
	const editData = async () => {
		let editTitle = '';
		let editDescription = '';
		let editCategory = '';
		const inputTitle = document.getElementById('oneLine-prscr-title');

		const inputDescription = document.getElementById(
			'oneLine-prscr-description',
		);
		console.log(isTitleEditing);
		if (!isTitleEditing) {
			editTitle = inputTitle.placeholder;
			console.log('원래 제목: ', editTitle);
		} else {
			editTitle = inputTitle.value;
			console.log('바뀐 제목: ', editTitle);
		}

		if (!isDscrpEditing) {
			editDescription = inputDescription.placeholder;
			console.log('원래 설명: ', editDescription);
		} else {
			editDescription = inputDescription.value;
			console.log('바뀐 설명: ', editDescription);
		}

		if (!isCtgEditing) {
			editCategory = keyword;
			console.log('원래 카테고리: ', editCategory);
		} else {
			editCategory = category;
			console.log('바뀐 카테고리: ', editCategory);
		}
		try {
			if (category === null) {
				alert('카테고리를 지정해주세요');
			} else {
				// 처방제목이나 처방사유 둘 중 하나라도 바뀐 경우
				if (isTitleEditing || isDscrpEditing) {
					// 책은 그대로인 경우
					if (choiceItem.valueOf.length === 0) {
						api
							.put(
								`/api/oneline-prescriptions/${prscrId}`,
								{
									title: `${editTitle}`,
									description: `${editDescription}`,
									bookIsbn: `${bookIsbn}`,
									keyword: `${category}`,
								},
								{ withCredentials: true },
							)
							.then((res) => {
								if (res.status.success) {
									console.log('성공');
									alert('한 줄 처방전이 수정되었습니다.');
									// window.location.replace('/oneline/prescription');
								}
							});
					} else {
						// 책도 변경된 경우
						api
							.put(
								`/api/oneline-prescriptions/${prscrId}`,
								{
									title: `${editTitle}`,
									description: `${editDescription}`,
									bookIsbn: `${choiceItem.isbn}`,
									keyword: `${category}`,
								},
								{ withCredentials: true },
							)
							.then((res) => {
								alert('한 줄 처방전이 수정되었습니다.');
								// window.location.replace('/oneline/prescription');
								console.log(res.data);
							});
					}
				}
			}
		} catch (err) {
			window.location.replace('/login');
			console.log(err);
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(items) => {
				items.forEach((item) => {
					if (item.isIntersecting) {
						if (modalIsClick === true) {
							chTarget.classList.add('oneLine_visible');
							chTarget.classList.remove('no');
						} else {
							chTarget.classList.add('oneLine_visible');
							chTarget.classList.remove('no');
						}
					} else {
						if (modalIsClick === false) {
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
			window.location.replace('/login');
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
										: bookData.imageUrl
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
							) : (
								<div className="prscr_search_res_wrapper">
									<p className="search_res_bookTitle">{bookData.title}</p>
									<p className="search_res_bookAuthor">{bookData.author}</p>
									<p className="search_res_bookCompany">
										{bookData.publishingHouse}
									</p>
								</div>
							)}
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
									DropDownTitle={keyword}
									ctgType={ctgType}
									onClick={(ctg) => {
										setCtgEditing(true);
										ctgType(ctg);
									}}
								/>
							</div>
						</div>
						<label className="oneLine_prscr_writeBox_title_wrapper">
							<p>처방제목</p>
							{isShow === false && !modalIsClick ? (
								<input
									id="oneLine-prscr-title"
									placeholder={editablePrscrData.title}
									onChange={() => setTitleEditing(true)}
								/>
							) : (
								<input
									type="text"
									placeholder="한 줄 처방 제목을 작성하세요"
									id="oneLine-prscr-title"
									onChange={() => setTitleEditing(true)}
								/>
							)}
						</label>
						<label>
							<p>처방사유</p>
							<textarea
								type="text"
								placeholder={
									isShow === false && !modalIsClick
										? editablePrscrData.description
										: '처방사유를 작성하세요'
								}
								id="oneLine-prscr-description"
								onChange={() => setDscrpEditing(true)}
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
						editData();
					}}
				>
					처방전 수정하기
				</button>
			</div>
			{/* </form> */}
		</>
	);
};

export default OneLinePrscrEdit;

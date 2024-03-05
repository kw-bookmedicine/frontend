import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import Header from '../components/Header';
import SearchResultList from '../components/SearchResultList';

// STYLES
import '../styles/SearchStyles.css';
import bookImg1 from '../assets/category-book-총류.jpg';
import bookImg2 from '../assets/category-book-철학.jpg';
import bookImg3 from '../assets/category-book-종교.jpg';
import bookImg4 from '../assets/category-book-사회과학.jpg';
import bookImg5 from '../assets/category-book-자연과학.jpg';
import bookImg6 from '../assets/category-book-기술과학.jpg';
import bookImg7 from '../assets/category-book-예술.jpg';
import bookImg8 from '../assets/category-book-언어.jpg';
import bookImg9 from '../assets/category-book-문학.png';
import bookImg10 from '../assets/category-book-역사.jpg';

const Search = () => {
	const baseURL =
		'https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app';
	const [input, setInput] = useState(''); // 검색 데이터
	const [searchData, setSearchData] = useState([]); // 검색 결과 데이터
	const [categories, setCategories] = useState([]); // 카테고리 데이터
	const [isShow, setIsShow] = useState(false); // 검색창 모달창
	let accessToken = localStorage.getItem('accessToken');
	let refreshToken = localStorage.getItem('refreshToken');

	let id = localStorage.getItem('id');
	let pwd = localStorage.getItem('password');
	const loginData = { username: id, password: pwd };

	// 카테고리 배경 색상(10개) && 카테고리별 대표 책 이미지 정보
	const categoriesInfo = [
		{ color: '#D4F4FF', image: bookImg1 },
		{ color: '#FFF2EC', image: bookImg2 },
		{ color: '#FFE3B5', image: bookImg3 },
		{ color: '#FFF4B6', image: bookImg4 },
		{ color: '#D6D6D6', image: bookImg5 },
		{ color: '#C2E2FF', image: bookImg6 },
		{ color: '#FFCACD', image: bookImg7 },
		{ color: '#DFFFF8', image: bookImg8 },
		{ color: '#CBD4F0', image: bookImg9 },
		{ color: '#D6CABC', image: bookImg10 },
	];

	const getToken = async () => {
		axios
			.post(baseURL + '/login', loginData)
			.then((res) => {
				let token = res.headers.authorization;
				accessToken = 'Bearer' + token.split(' ')[1];
				refreshToken = 'Bearer' + token.split(' ')[2];
				localStorage.setItem('accessToken', accessToken); // 액세스 토큰 저장
				localStorage.setItem('refreshToken', refreshToken); // 리프레시 토큰 저장
			})
			.then(async () => {
				console.log('access:', accessToken);
				console.log('refresh:', refreshToken);
			});
	};

	const setCategory = async (res) => {
		const fetchedCategories = res.data;
		const transformedCategories = Object.keys(fetchedCategories).map(
			(key, index) => {
				const { color, image } = categoriesInfo[index % categoriesInfo.length]; // 객체에서 색상과 이미지를 가져옴
				return {
					title: key,
					subtitle: fetchedCategories[key].join(', '),
					image: image,
					color: color,
				};
			},
		);
		setCategories(transformedCategories);
	};

	const getCategory = async () => {
		axios
			.get(
				'https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/api/category/big',
				{
					// headers: { Authorization: accessToken },
					withCredentials: true,
				},
			)
			.then((res) => {
				console.log(res);
				// 정상처리
				// console.log('============ 1 =============');
				// console.log('access:', accessToken);
				// console.log('refresh:', refreshToken);
				// setCategory(res);
			})
			.catch(() => {
				// 토큰이 만료되었을 때, refresh token으로 카테고리 불러오기 다시 시도
				console.log('access만 만료');
				console.log(refreshToken);
				axios
					.get(
						'https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/api/category/big',
						{
							headers: { Authorization: refreshToken },
						},
					)
					.then((res) => {
						setCategory(res);
						getToken();
					})
					.catch(() => {
						console.log('전부 만료!');
						// alert('로그인 페이지로 이동합니다.');
						// window.location.replace('/login');
					});
			});
	};

	// 카테고리 대분류, 중분류 GET 요청 및 요청 데이터 사용하기 쉽게 처리
	useEffect(() => {
		let username = localStorage.getItem('id');
		let password = localStorage.getItem('password');

		const fetchCategories = async () => {
			try {
				axios
					.post(
						'https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/login',
						loginData,
						{ withCredentials: true },
					)
					.then((res) => {
						console.log('성공');
						axios
							.get(
								'https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/api/category/big',
								{
									// headers: { Authorization: accessToken },
									withCredentials: true,
								},
							)
							.then((res) => {
								console.log(res.data);
							});
						// let token = res.headers.authorization;
						// // localStorage.setItem('token', token); // 전체 토큰 저장
						// localStorage.setItem('accessToken', 'Bearer ' + token.split(' ')[1]); // 액세스 토큰 저장

						// localStorage.setItem('refreshToken', 'Bearer ' + token.split(' ')[2]); // 리프레시 토큰 저장

						// 받아온 token을 암호화 하는 방식에 대해 고민 필요함.

						// window.location.replace('/main');
					})
					.catch((err) => {
						console.log(err);
					});
				// getCategory();

				// const response = await axios.get(
				//   "https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/api/category/big", {
				//     headers:{Authorization: accessToken}
				//   }
				// ).then((res) => {
				//   console.log(res.data);
				// })
				// const fetchedCategories = response.data;
				// const transformedCategories = Object.keys(fetchedCategories).map(
				//   (key, index) => {
				//     const { color, image } =
				//       categoriesInfo[index % categoriesInfo.length]; // 객체에서 색상과 이미지를 가져옴
				//     return {
				//       title: key,
				//       subtitle: fetchedCategories[key].join(", "),
				//       image: image,
				//       color: color,
				//     };
				//   }
				// );
				// setCategories(transformedCategories);
			} catch (error) {
				console.error('Error fetching categories:', error);

				// axios
				// 	.post(
				// 		'https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/login',
				// 		{
				// 			username: username,
				// 			password: password,
				// 		},
				// 	)
				// 	.then((res) => {
				// 		let token = res.headers.authorization;

				// 		localStorage.setItem(
				// 			'accessToken',
				// 			'Bearer ' + token.split(' ')[1],
				// 		); // 액세스 토큰 저장
				// 		localStorage.setItem(
				// 			'refreshToken',
				// 			'Bearer ' + token.split(' ')[2],
				// 		); // 리프레시 토큰 저장
				// 	});
			}
		};

		fetchCategories();
	}, []);

	// 카테고리 아이템을 렌더링 함수
	const renderCategoryItem = ({ title, subtitle, image, color }, index) => (
		<Link to={`/book/list/${title}`} key={index}>
			<div className="category-item-wrapper">
				<div
					className="category-grid-item"
					style={{
						backgroundColor: color, // 여기서 색상 적용
					}}
				>
					<div className="category-grid-description">
						<h2 className="category-grid-item-title">{title}</h2>
						<h3 className="category-grid-item-subtitle">{subtitle}</h3>
					</div>
					<img
						src={image}
						alt="카테고리 대표 이미지"
						className="category-grid-item-image"
					/>
				</div>
			</div>
		</Link>
	);

	// 함수로 추천 키워드 리스트를 생성하는 함수
	const renderKeywordList = (title, keywords) => (
		<section className="recommend-word-wrapper">
			<h2 className="recommend-title">{title}</h2>
			<ul className="recommend-keyword-wrapper">
				{keywords.map((keyword, index) => (
					<li key={index}>
						<Link to={`/result/${keyword}-책목록-페이지`}>{keyword}</Link>
					</li>
				))}
			</ul>
		</section>
	);

	// 추천 검색어 리스트
	const recommendedSearchKeywords = [
		'감정',
		'해리포터',
		'화장품',
		'하늘 높이 비상',
		'감정',
		'해리포터',
		'화장품',
		'하늘 높이 비상',
		'감정',
		'해리포터',
		'화장품',
		'하늘 높이 비상',
		'감정',
		'해리포터',
		'화장품',
		'하늘 높이 비상',
		'감정',
		'해리포터',
		'화장품',
		'하늘 높이 비상',
		'감정',
		'해리포터',
		'화장품',
		'하늘 높이 비상',
		// Add more keywords as needed
	];

	// 사용자 추천 키워드 리스트
	const userRecommendedKeywords = [
		'#감정',
		'#해리포터',
		'#화장품',
		'#하늘 높이 비상',
		'#감정',
		'#해리포터',
		'#화장품',
		'#하늘 높이 비상',
		'#감정',
		'#해리포터',
		'#화장품',
		'#하늘 높이 비상',
		'#감정',
		'#해리포터',
		'#화장품',
		'#하늘 높이 비상',
		// Add more keywords as needed
	];

	// 검색할 때, 0.1초 딜레이 걸기 -> 끊기는 느낌을 방지
	useEffect(() => {
		const timer = setTimeout(() => {
			fetchBooks(input);
		}, 100);

		// cleanup 함수를 반환하여 컴포넌트가 언마운트될 때 타이머를 해제합니다.
		return () => clearTimeout(timer);
	}, [input]);

	const fetchBooks = async (searchInput) => {
		if (input.trim() === '') return; // 빈 문자열일 때 API 호출 방지

		try {
			const response = await axios.get(
				`https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=AIzaSyDUtFpAVpNPHCEW-pxSxpTHSACNjko_MCc&maxResults=10`,
			);
			const booksData = response.data.items
				? response.data.items.slice(0, 6)
				: []; // 검색창에서 6개의 데이터만 보여줌

			setSearchData(booksData);
		} catch (error) {
			console.error('Failed to fetch books:', error);
		}
	};

	// 검색창 엔터 및 버튼 이벤트 처리

	const searchBook = (evt) => {
		if (evt.key === 'Enter' || evt.target.name === 'search-button') {
			fetchBooks(input);
		}
	};

	const handleSearchResultClose = () => {
		setIsShow(false);
	};

	const handleSearchResultShow = () => {
		setIsShow(true);
	};

	return (
		<div onClick={handleSearchResultClose}>
			<Header />

			{/* 검색 페이지 전체 */}
			<section className="search-container">
				{/* 검색 창 */}
				<section
					className="search-wrapper"
					onClick={(e) => {
						e.stopPropagation();
						handleSearchResultShow();
					}}
				>
					<label>
						<div className="search-wrap-inner">
							{/* 검색창에 라벨 적용해보기 */}
							{/* 책 렌더링했던 유튜브 영상을 활용해서 검색창 누르면 밑에 책보여주는 방법으로 활용하기 */}
							<button
								className="search-button"
								onClick={searchBook}
								name="search-button"
							/>
							<input
								type="text"
								placeholder="검색어를 입력하세요"
								className="search-input"
								value={input}
								onChange={(e) => {
									setInput(e.target.value);
								}}
								onKeyPress={searchBook}
							/>
							{input.length > 0 ? (
								<button
									className="search-close-button"
									onClick={(e) => {
										setInput('');
									}}
								>
									X
								</button>
							) : null}
						</div>
					</label>
					{input.length > 0 && isShow ? (
						<SearchResultList
							book={searchData}
							onClick={(e) => {
								e.stopPropagation();
							}}
						/>
					) : null}
				</section>

				{/* 추천 검색어 */}
				{renderKeywordList('추천검색어', recommendedSearchKeywords)}

				{/* 사용자 추천 키워드 */}
				{renderKeywordList('사용자 추천 키워드', userRecommendedKeywords)}

				{/* 카테고리 */}
				<section className="category-wrapper">
					<h2 className="recommend-title">카테고리</h2>
					<div className="category-items">
						{categories.map((category, index) =>
							renderCategoryItem(category, index),
						)}
					</div>
				</section>
			</section>
		</div>
	);
};

export default Search;

import { useContext, useEffect, useState } from 'react';
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
import { LoginContext } from '../contexts/LoginContextProvider';

const Search = () => {
	const baseURL = 'https://api.bookpharmacy.store/api';
	const [input, setInput] = useState(''); // 검색 데이터
	const [searchData, setSearchData] = useState([]); // 검색 결과 데이터
	const [categories, setCategories] = useState([]); // 카테고리 데이터
	const [isShow, setIsShow] = useState(false); // 검색창 모달창

	const { userId, userPwd } = useContext(LoginContext);
	const loginData = { username: userId, password: userPwd };

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

<<<<<<< HEAD
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

	// const setCategory = async (res) => {
	// 	const fetchedCategories = res.data;
	// 	const transformedCategories = Object.keys(fetchedCategories).map(
	// 		(key, index) => {
	// 			const { color, image } = categoriesInfo[index % categoriesInfo.length]; // 객체에서 색상과 이미지를 가져옴
	// 			return {
	// 				title: key,
	// 				subtitle: fetchedCategories[key].join(', '),
	// 				image: image,
	// 				color: color,
	// 			};
	// 		},
	// 	);
	// 	setCategories(transformedCategories);
	// };

	const getCategory = async () => {
		axios
			.get(
				'https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/api/category/big',
				{withCredentials:true}
				// {
				// 	headers: { Authorization: accessToken },
			// },
				
			)
			.then((res) => {
				// 정상처리
				console.log('============ 1 =============');
				console.log('access:', accessToken);
				console.log('refresh:', refreshToken);
				setCategories(res.data);
				// res.data가 아래와 같다고 생각하고 로직을 짰습니다. postman의 응답으로 코드 작성
// 				{
//     "철학": [
//         "형이상학",
//         "인식론&인과론&인간학",
//         "철학의 체계",
//         "경학",
//         "동양철학/7사상",
//         "서양철학",
//         "논리학",
//         "심리학",
//         "윤리학&도덕철학"
//     ],
//     "예술": [
//         "건축물",
//         "조각&조형예술",
//         "공예&장식미술",
//         "서예",
//         "회화&도화",
//         "사진예술",
//         "음악",
//         "공연예술&매체예술",
//         "오락&스포츠"
//     ],
//     "기술과학": [
//         "의학",
//         "농업&농학",
//         "공학&공업일반&토목공학&환경공학",
//         "건축공학",
//         "기계공학",
//         "전기공학&전자공학",
//         "화학공학",
//         "제조업",
//         "생활과학"
//     ],
//     "총류": [
//         "도서학&서지학",
//         "문헌정보학",
//         "백과사전",
//         "강연집&수필집&연설문집",
//         "일반연속간행물",
//         "일반학회&단체&협회&기관",
//         "신문&언론&저널리즘",
//         "일반전집&총서",
//         "향토자료"
//     ],
//     "종교": [
//         "비교종교",
//         "불교",
//         "기독교",
//         "도교",
//         "천도교",
//         "신도",
//         "힌두교&브라만교",
//         "이슬람교(회교)",
//         "기타 제종교"
//     ],
//     "언어": [
//         "한국어",
//         "중국어",
//         "일본어&기타아시아제어",
//         "영어",
//         "독일어",
//         "프랑스어",
//         "스페인어&포르투갈어",
//         "이탈리아어",
//         "기타제어"
//     ],
//     "문학": [
//         "한국문학",
//         "중국문학",
//         "일본문학&기타아시아문학",
//         "영미문학",
//         "독일문학",
//         "프랑스문학",
//         "스페인&포르투갈문학",
//         "이탈리아문학",
//         "기타제문학"
//     ],
//     "역사": [
//         "아시아",
//         "유럽",
//         "아프리카",
//         "북아프리카",
//         "남아메리카",
//         "오세아니아",
//         "양극지방",
//         "지리",
//         "전기"
//     ],
//     "자연과학": [
//         "수학",
//         "물리학",
//         "화학",
//         "천문학",
//         "지학",
//         "광물학",
//         "생명과학",
//         "식물학",
//         "동물학"
//     ],
//     "사회과학": [
//         "통계학",
//         "경제학",
//         "사회학&사회문제",
//         "정치학",
//         "행정항",
//         "법학",
//         "교육학",
//         "풍속&예절&민속학",
//         "국방&군사학"
//     ]
// }

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
						setCategories(res.data);
						getToken();
					})
					.catch(() => {
						console.log('전부 만료!');
						// alert('로그인 페이지로 이동합니다.');
						// window.location.replace('/login');
					});
			});
=======
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
>>>>>>> 9d6c16c0f7943d58514fa86a5ed251d70f5a64d2
	};

	// 카테고리 대분류, 중분류 GET 요청 및 요청 데이터 사용하기 쉽게 처리
	useEffect(() => {
		let username = localStorage.getItem('id');
		let password = localStorage.getItem('password');

		const fetchCategories = async () => {
			try {
				axios
					.post(
						'https://api.bookpharmacy.store/login',
						{ username: username, password: password },
						{ withCredentials: true },
					)
					.then(async () => {
						// console.log('성공');
						axios
							.get('https://api.bookpharmacy.store/api/category/big', {
								// withCredentials: true,
							})
							.then((res) => {
								setCategories(res.data);
							});
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {
				console.error('Error fetching categories:', error);
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
						{Object.keys(categories).map((key, index) => {
							const title = key;
							const subtitle = categories[key].join(', ');
							const infoIndex = index % categoriesInfo.length; // 나머지로 0~9만 접근하도록 길이제한
							const color = categoriesInfo[infoIndex].color;
							const image = categoriesInfo[infoIndex].image;
							return renderCategoryItem(
								{ title, subtitle, color, image },
								index,
							);
						})}
					</div>
				</section>
			</section>
		</div>
	);
};

export default Search;

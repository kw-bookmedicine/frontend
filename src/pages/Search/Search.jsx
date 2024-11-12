import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchBox from '../../components/Search/SearchBox';

// SERVICES
import api from '../../services/api';

// STYLES
import '../../styles/SearchStyles.css';
import bookImg1 from '../../assets/category-book-총류.jpg';
import bookImg2 from '../../assets/category-book-철학.jpg';
import bookImg3 from '../../assets/category-book-종교.jpg';
import bookImg4 from '../../assets/category-book-사회과학.jpg';
import bookImg5 from '../../assets/category-book-자연과학.jpg';
import bookImg6 from '../../assets/category-book-기술과학.jpg';
import bookImg7 from '../../assets/category-book-예술.jpg';
import bookImg8 from '../../assets/category-book-언어.jpg';
import bookImg9 from '../../assets/category-book-문학.png';
import bookImg10 from '../../assets/category-book-역사.jpg';
import { LoginContext } from '../../contexts/LoginContextProvider';
import useLogin from '../../hooks/useLogin';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';

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

// 어떤게 어떠한 역할을 하는지 한눈에 파악하기 어려움
// 뭘 선택하든 책 제목만 넘긴다는 로직을 개선해야함

const Search = () => {
	const [categories, setCategories] = useState({}); // 카테고리 데이터
	const [isLoading, setIsLoading] = useState(true); // 로딩

	// 카테고리 대분류, 중분류 GET 요청 및 요청 데이터 사용하기 쉽게 처리
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				api
					.get('/api/category/big', {
						withCredentials: true,
					})
					.then((res) => {
						// response data 구조 변경으로 data를 기존 구조로 변환
						const transformedData = res.data.reduce((bigCtgTitle, category) => {
							bigCtgTitle[category.name] = category.items.map(
								(item) => item.name,
							);
							return bigCtgTitle;
						}, {});

						setCategories(transformedData);
					});
				setIsLoading(false);
			} catch (error) {
				window.location.replace('/login');
				console.error('Error fetching categories:', error);
				if (error.response && error.response.status === 401) {
					// loginUser(username, password);
				}
			}
		};
		fetchCategories();
	}, []);

	// 함수로 추천 키워드 리스트를 생성하는 함수
	const renderKeywordList = (title, keywords) => (
		<section className='recommend-word-wrapper'>
			<h2 className='recommend-title'>{title}</h2>
			<ul className='recommend-keyword-wrapper'>
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
		// Add more keywords as needed
	];

	// 사용자 추천 키워드 리스트
	const userRecommendedKeywords = [
		'#감정',
		'#해리포터',
		'#화장품',
		'#하늘 높이 비상',
		// Add more keywords as needed
	];

	return (
		<div className='spinner-container'>
			<Header />

			{/* 검색 페이지 전체 */}
			<section className='search-container '>
				{/* 검색 창 */}
				<SearchBox />

				{/* 추천 검색어 */}
				{/* {renderKeywordList("추천검색어", recommendedSearchKeywords)} */}

				{/* 사용자 추천 키워드 */}
				{/* {renderKeywordList("사용자 추천 키워드", userRecommendedKeywords)} */}

				{/* 카테고리 */}
				{isLoading && <LoadingSpinner />}
				{!isLoading && (
					<BookCategories
						categories={categories}
						renderCategoryItem={renderCategoryItem}
					/>
				)}
			</section>
			<Footer />
		</div>
	);
};

export default Search;

const BookCategories = ({ categories, renderCategoryItem }) => {
	return (
		<section className='category-wrapper'>
			<h2 className='recommend-title'>카테고리</h2>
			<div className='category-items'>
				{Object.keys(categories).map((key, index) => {
					const title = key;
					const subtitle = categories[key].join(', ');
					const infoIndex = index % categoriesInfo.length; // 나머지로 0~9만 접근하도록 길이제한
					const color = categoriesInfo[infoIndex].color;
					const image = categoriesInfo[infoIndex].image;
					return renderCategoryItem({ title, subtitle, color, image }, index);
				})}
			</div>
		</section>
	);
};

// 카테고리 아이템을 렌더링 함수
const renderCategoryItem = ({ title, subtitle, image, color }, index) => (
	<Link to={`/book/list/${title}/${index + 1}`} key={index}>
		<div className='category-item-wrapper'>
			<div
				className='category-grid-item'
				style={{
					backgroundColor: color, // 여기서 색상 적용
				}}
			>
				<div className='category-grid-description'>
					<h2 className='category-grid-item-title'>{title}</h2>
					<h3 className='category-grid-item-subtitle'>{subtitle}</h3>
				</div>
				<img
					src={image}
					alt='카테고리 대표 이미지'
					className='category-grid-item-image'
				/>
			</div>
		</div>
	</Link>
);

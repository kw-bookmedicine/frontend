import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import Header from '../components/Header';
import SearchResultList from '../components/SearchResultList';

// STYLES
import '../styles/SearchStyles.css';
import bookImg1 from '../assets/category-book-img1.png';
import bookImg2 from '../assets/category-book-img2.png';
import bookImg3 from '../assets/category-book-img3.png';
import bookImg4 from '../assets/category-book-img4.png';
import bookImg5 from '../assets/category-book-img5.png';
import bookImg6 from '../assets/category-book-img6.png';
import bookImg7 from '../assets/category-book-img7.png';
import bookImg8 from '../assets/category-book-img8.png';

const Search = () => {
	const [input, setInput] = useState('');
	const [bookData, setData] = useState([]);

	// 카테고리 배경 색상
	const categoryColors = [
		'#CBD4F0',
		'#FFDADF',
		'#FFFEF9',
		'#E8E8E8',
		'#C0E3E0',
		'#E3D4CB',
		'#FFE4CA',
		'#D9D1EB',
	];

	// 카테고리 아이템을 렌더링하는 함수
	const renderCategoryItem = ({ title, subtitle, image }, index) => (
		<Link to={`/book/list/${title}`} key={index}>
			<div className="category-item-wrapper">
				{/* 1~8색상으로 반복 적용*/}
				<div
					className="category-grid-item"
					style={{
						backgroundColor: categoryColors[index % categoryColors.length],
					}}
				>
					<div className="category-grid-description">
						<h2 className="category-grid-item-title">{title}</h2>
						<h3 className="category-grid-item-subtitle">{subtitle}</h3>
					</div>

					<img src={image} alt="" className="category-grid-item-image" />
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

	const handleKeywordClick = (keyword) => {
		// 키워드를 클릭하면 검색어를 업데이트
		setInput(keyword);
	};

	const categories = [
		// 		{
		// 			title: '총학',
		// 			subtitle:
		// '도서학·서지학, 문헌정보학, 백과사전, 강연집·수필집·연설문집, 일반연속간행물, 일반학회·단체·협회·기관,신문·언론·저널리즘,일반전집·총서,향토자료',},
		{
			title: '철학',
			subtitle:
				'형이상학, 인식론·인과론·인간학, 철학의 체계, 경학, 동양철학·7사상, 서양철학, 논리학, 심리학, 윤리학·도덕철학',
			image: bookImg1,
		},
		{
			title: '종교',
			subtitle:
				'비교종교, 불교, 기독교, 도교, 천도교, 신도, 힌두교·브라만교, 이슬람교(회교), 기타 제종교',
			image: bookImg2,
		},
		{
			title: '사회과학',
			subtitle:
				'통계학, 경제학, 사회학·사회문제, 정치학, 행정학, 법학, 교육학, 풍속·예절·민속학, 국방·군사학',
			image: bookImg3,
		},
		{
			title: '자연과학',
			subtitle:
				'수학, 물리학, 화학, 천문학, 지학, 광물학, 생명과학, 식물학, 동물학',
			image: bookImg4,
		},
		{
			title: '기술과학',
			subtitle:
				'의학, 농업·농학, 공학·공업일반·토목공학·환경, 건축공학, 기계공학, 전기공학·전자공학, 화학공학, 제조업, 생활과학',
			image: bookImg5,
		},
		{
			title: '예술',
			subtitle:
				'건축물, 조각·조형예술, 공예·장식미술, 서예, 회화·도화, 사진예술, 음악, 공연예술·매체예술, 오락·스포츠',
			image: bookImg6,
		},
		{
			title: '언어',
			subtitle:
				'한국어, 중국어, 일본어·기타 아시아제어, 영어, 독일어, 프랑스어, 스페인어·포르투갈어, 이탈리아어, 기타제어',
			image: bookImg7,
		},
		{
			title: '문학',
			subtitle:
				'한국문학, 중국문학, 일본문학·기타아시아문학, 영미문학, 독일문학, 프랑스문학, 스페인·포르투갈문학, 이탈리아문학, 기타제문학',
			image: bookImg8,
		},
		{
			title: '역사',
			subtitle:
				'아시아, 유럽, 아프리카, 북아프리카, 남아메리카, 오세아니아, 양극지방, 지리, 전기',
			image: bookImg8,
		},
	];

	const handleChange = (value) => {
		setInput(value);
	};

	const searchBook = (evt) => {
		// console.log(evt);
		// console.log(evt.target);
		// console.log(evt.target.name);
		if (evt.key === 'Enter' || evt.target.name === 'search-button') {
			console.log('hello');
			axios
				.get(
					`https://www.googleapis.com/books/v1/volumes?q=${input}&key=AIzaSyDUtFpAVpNPHCEW-pxSxpTHSACNjko_MCc` +
						'&maxResults=10',
				)
				.then((res) => {
					setData(res.data.items.slice(0, 7));
					// console.log("success");
				})
				.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			// 빈 문자열일 때 API 호출 방지
			if (input.trim() !== '') {
				axios
					.get(
						`https://www.googleapis.com/books/v1/volumes?q=${input}&key=AIzaSyDUtFpAVpNPHCEW-pxSxpTHSACNjko_MCc&maxResults=10`,
					)
					.then((res) => {
						setData(res.data.items ? res.data.items : []);
						console.log('success');
						console.log(input);
					})
					.catch((err) => console.log(err));
			}
		}, 100);

		// cleanup 함수를 반환하여 컴포넌트가 언마운트될 때 타이머를 해제합니다.
		return () => clearTimeout(timer);
	}, [input]);

	const [isShow, setIsShow] = useState(false);

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
							book={bookData}
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
						{categories.map((category, index) => {
							return renderCategoryItem(category, index);
						})}
					</div>
				</section>
			</section>
		</div>
	);
};

export default Search;

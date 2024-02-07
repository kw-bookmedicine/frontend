import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import Header from '../components/Header';
import Title from '../components/ArrowTitle';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import BookListSlide from '../components/BookListSlide';

// STYLES
import '../styles/BookList.css';

const BookList = () => {
	// 대분류
	let { title } = useParams();
	const [bigCategory, setBigCategory] = useState('');

	// 중분류
	const [midCategory, setMidCategory] = useState([]);

	const categories = [
		{
			총류: [
				'도서학·서지학',
				'문헌정보학',
				'백과사전',
				'강연집·수필집·연설문집',
				'일반연속간행물',
				'일반학회·단체·협회·기관',
				'신문·언론·저널리즘',
				'일반전집·총서',
				'향토자료',
			],
			철학: [
				'형이상학',
				'인식론·인과론·인간학',
				'철학의 체계',
				'경학',
				'동양철학·7사상',
				'서양철학',
				'논리학',
				'심리학',
				'윤리학·도덕철학',
			],
			종교: [
				'비교종교',
				'불교',
				'기독교',
				'도교',
				'천도교',
				'신도',
				'힌두교·브라만교',
				'이슬람교(회교)',
				'기타 제종교',
			],
			사회과학: [
				'통계학',
				'경제학',
				'사회학·사회문제',
				'정치학',
				'행정학',
				'법학',
				'교육학',
				'풍속·예절·민속학',
				'국방·군사학',
			],
			자연과학: [
				'수학',
				'물리학',
				'화학',
				'천문학',
				'지학',
				'광물학',
				'생명과학',
				'식물학',
				'동물학',
			],
			기술과학: [
				'의학',
				'농업·농학',
				'공학·공업일반·토목공학·환경',
				'건축공학',
				'기계공학',
				'전기공학·전자공학',
				'화학공학',
				'제조업',
				'생활과학',
			],
			예술: [
				'건축물',
				'조각·조형예술',
				'공예·장식미술',
				'서예',
				'회화·도화',
				'사진예술',
				'음악',
				'공연예술·매체예술',
				'오락·스포츠',
			],
			언어: [
				'한국어',
				'중국어',
				'일본어·기타아시아제어',
				'영어',
				'독일어',
				'프랑스어',
				'스페인어·포르투갈어',
				'이탈리아어',
				'기타제어',
			],
			문학: [
				// smallCategory 페이지 api 테스트 위해서 한국문학 -> 한국소설로 바꿈
				'한국소설',
				'중국문학',
				'일본문학·기타아시아문학',
				'영미문학',
				'독일문학',
				'프랑스문학',
				'스페인·포르투갈문학',
				'이탈리아문학',
				'기타제문학',
			],
			역사: [
				'아시아',
				'유럽',
				'아프리카',
				'북아프리카',
				'남아메리카',
				'오세아니아',
				'양극지방',
				'지리',
				'전기',
			],
		},
	];

	// 초기에 랜더링될 때 한 번만 실행
	useEffect(() => {
		// 대분류 지정
		setBigCategory(title);
		// {
		// 	smallCategory.map((e) => {
		// 		console.log(e);
		// 	});
		// }
		// setCategory(category[title]);
		// console.log(smallCategory);

		// 중분류 가져오기

		categories.map((res) => {
			console.log('대분류:', title);
			setMidCategory(res[title]);
		});
		// axios
		// 	.get(
		// 		'https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/api/category/big',
		// 	)
		// 	.then((res) => {
		// setMidCategory(res.data);
		// console.log(res.data);
		// console.log('대분류:', title);
		// setMidCategory(res.data[title]);
		// categories.map((result) => {
		// console.log(result);
		// if (result.big === title) {
		// 	console.log(result.big);
		// 	console.log(result.mid);
		// 	setMidCategory(result.mid);
		// setNameList(result.big);
		// console.log('name:', nameList);
		// }
		// console.log('yes');
		// });

		// console.log(res.data[title]);
		// });
	}, []);

	return (
		<>
			<section className="bookList_content">
				<div className="bookList_inner">
					<Header />
					<div className="bookList_title">{bigCategory}</div>
					<Title
						bigCategory={bigCategory}
						title={`${bigCategory} 전체보기`}
						type={'shadow'}
					/>
					<div className="bookList_wrapper">
						{midCategory.map((e) => {
							console.log(e);
							// setNameList(e.name);
							// key 값 중분류에 맞게 변경해야됨.
							return (
								<BookListSlide
									key={e}
									bigCategory={bigCategory}
									midCategoryTitle={e}
								/>
							);
						})}
					</div>
				</div>

				<Footer />
			</section>
		</>
	);
};

export default BookList;

import { Link } from 'react-router-dom';

//COMPONENTS
import HashTag from '../components/HashTag';

//STYLES
import '../styles/BookDetailCard.css';

const BookDetailCard = () => {
	return (
		<>
			<Link to={'/book-detail'}>
				<div className="bookCard_container">
					<div className="bookCard_wrapper">
						<div className="bookCard_left_wrapper">
							<div className="left_img_wrapper"></div>
						</div>
						<div className="bookCard_right_wrapper">
							<div className="bookCard_right_up_wrapper">
								<div className="right_up_title">책 제목</div>
								<div className="right_up_author">저자</div>
							</div>
							<div className="bookCard_right_bottom_wrapper">
								<HashTag text={'행복'} type="sm-category" />
								<HashTag text={'해피니스'} type="sm-category" />
								<HashTag text={'클로버'} type="sm-category" />
								<HashTag text={'해쉬태그4'} type="sm-category" />
								<HashTag text={'해쉬태그5'} type="sm-category" />
								<HashTag text={'해쉬6'} type="sm-category" />
							</div>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default BookDetailCard;

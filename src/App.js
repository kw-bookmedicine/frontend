import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// PAGES
import Home from './pages/Home';
import Main from './pages/LoginHome';
import Feed from './pages/Feed';
import MyFeed from './pages/MyFeed';
import Search from './pages/Search';
import Mypage from './pages/Mypage';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import Join from './pages/Join';
import Signup2 from './pages/Signup2';
import Signup3 from './pages/Signup3';
import Registration from './pages/Registration';
import BookList from './pages/BookList';
import SmallCategory from './pages/SmallCategory';
import Edit from './pages/Edit';
import UserInfo from './pages/UserInfo';

// 처방전 관련 페이지들
import Counseling from './pages/Counseling';
import MyWorry from './pages/MyWorry';
import WorryDetail from './pages/WorryDetail';
import PrescriptionWrite from './pages/PrescriptionWrite';
import PrescriptionWriteStep2 from './pages/PrescriptionWriteStep2';
import PrescriptionDetail from './pages/Prescription/PrescriptionDetail';

// STYLE
import GlobalStyles from './styles/GlobalStyles';
import './App.css';
import ScrollTop from './components/ScrollTop';
import LoginLayout from './components/LoginLayout';
import LoginFindResult from './pages/IdFindResult';
import PasswordFind from './pages/PasswordFind';
import PasswordFindResult from './pages/PasswordFindResult';
import IdFind from './pages/IdFind';
import LoginContextProvider from './contexts/LoginContextProvider';
import SearchResult from './pages/SearchResult';

function App() {
	// 브라우저 새로고침 스크롤 이벤트
	useEffect(() => {
		window.onbeforeunload = function pushRefresh() {
			window.scrollTo(0, 0);
		};
	}, []);

	https: return (
		<BrowserRouter>
			<LoginContextProvider>
				<div className="App">
					<GlobalStyles />
					<ScrollTop />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/logout" element={<Home />} />
						<Route path="/main" element={<Main />} />
						<Route path="/feed" element={<Feed />} />

						{/* 검색 */}
						<Route path="/search" element={<Search />} />
						<Route path="/search/result/:title" element={<SearchResult />} />

						{/* 마이페이지 */}
						<Route path="/mypage" element={<Mypage />} />
						<Route path="/myfeed" element={<MyFeed />} />
						<Route path="/edit" element={<Edit />} />
						<Route path="/edit/:page" element={<UserInfo />} />

						{/* 처방전 관련 */}
						<Route path="/counseling" element={<Counseling />} />
						<Route path="/worry/detail" element={<WorryDetail />} />
						<Route path="/prescription/write" element={<PrescriptionWrite />} />
						<Route
							path="/prescription/write/2"
							element={<PrescriptionWriteStep2 />}
						/>
						<Route
							path="/prescription/detail"
							element={<PrescriptionDetail />}
						/>
						<Route path="/myworry" element={<MyWorry />} />

						{/* 회원가입 및 로그인 */}
						<Route element={<LoginLayout />}>
							<Route path="/id-find" element={<IdFind />} />
							<Route path="/id-find-result" element={<LoginFindResult />} />
							<Route path="/password-find" element={<PasswordFind />} />
							<Route
								path="/password-find-result"
								element={<PasswordFindResult />}
							/>
						</Route>

						<Route path="/test" element={<Registration />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Join />} />
						<Route path="/signup/1" element={<Signup2 />} />
						<Route path="/signup/2" element={<Signup3 />} />
						<Route path="/test" element={<Registration />} />

						{/* 책 정보 */}
						<Route path="/book-detail" element={<BookDetail />} />
						<Route path="/book/list/:title" element={<BookList />} />
						<Route path="/book/:title/:category" element={<SmallCategory />} />
					</Routes>
				</div>
			</LoginContextProvider>
		</BrowserRouter>
	);
}

export default App;

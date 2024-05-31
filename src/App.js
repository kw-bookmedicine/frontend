import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// PAGES
import LandingPage from './pages/landingPage.jsx';
import Home from './pages/Home';
import Main from './pages/LoginHome';
import Feed from './pages/Feed';
import MyFeed from './pages/MyFeed';
import Search from './pages/Search/Search';
import Mypage from './pages/profile/Mypage';
import BookDetail from './pages/BookDetail';
import BookList from './pages/BookList';
import SmallCategory from './pages/SmallCategory';
import Edit from './pages/profile/Edit';
import UserInfo from './pages/profile/UserInfo';

// 로그인 관련 페이지들
import Login from './pages/Login/Login';
import Signup1 from './pages/Login/Signup1';
import Signup2 from './pages/Login/Signup2';
import Signup3 from './pages/Login/Signup3';
import Registration from './pages/Registration';
import LoginFindResult from './pages/Login/IdFindResult';
import PasswordFind from './pages/Login/PasswordFind';
import PasswordFindResult from './pages/Login/PasswordFindResult';
import IdFind from './pages/Login/IdFind';
import LoginContextProvider from './contexts/LoginContextProvider';

// 처방전 관련 페이지들
import Counseling from './pages/Prescription/Counseling';
import MyWorry from './pages/MyWorry';
import WorryWrite from './pages/Worry/WorryWrite';
import WorryDetail from './pages/Worry/WorryDetail';
import PrescriptionWrite from './pages/Prescription/PrescriptionWrite';
import PrescriptionWriteStep2 from './pages/PrescriptionWriteStep2';
import PrescriptionDetail from './pages/Prescription/PrescriptionDetail';
import OneLinePrescription from './pages/Prescription/OneLinePrescription';
import OneLinePrscrWrite from './pages/Prescription/OneLinePrscrWrite.jsx';
import OneLinePrscrEdit from './pages/Prescription/OneLinePrscrEdit.jsx';
import OneLinePrscrDetail from './pages/Prescription/OneLinePrscrDetail.jsx';

// 내 페이지들
import MyWorryPage from './pages/profile/MyWorryPage.jsx';

// STYLE
import GlobalStyles from './styles/GlobalStyles';
import './App.css';
import ScrollTop from './components/ScrollTop';
import LoginLayout from './components/LoginLayout';
import SearchResult from './pages/Search/SearchResult';
import LoadingPage from './pages/Worry/LoadingPage.jsx';

function App() {
	// 브라우저 새로고침 스크롤 이벤트
	useEffect(() => {
		window.onbeforeunload = function pushRefresh() {
			window.scrollTo(0, 0);
		};
	}, []);

	return (
		<BrowserRouter>
			<LoginContextProvider>
				<div className="App">
					<GlobalStyles />
					<ScrollTop />
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/logout" element={<Home />} />
						<Route path="/main" element={<Main />} />
						<Route path="/feed" element={<Feed />} />
						<Route path="/search" element={<Search />} />
						<Route path="/search/:result" element={<SearchResult />} />
						<Route path="/mypage" element={<Mypage />} />
						<Route path="/myfeed" element={<MyFeed />} />
						<Route path="/myworry" element={<MyWorry />} />
						<Route path="/edit" element={<Edit />} />
						<Route path="/edit/:page" element={<UserInfo />} />
						<Route path="/worry/write" element={<WorryWrite />} />
						<Route path="/counseling" element={<Counseling />} />
						<Route path="/worry-detail" element={<WorryDetail />} />
						<Route path="/prescription/write" element={<PrescriptionWrite />} />
						<Route
							path="/prescription/write/2"
							element={<PrescriptionWriteStep2 />}
						/>
						{/* 마이페이지 */}
						<Route path="/mypage" element={<Mypage />} />
						<Route path="/myfeed" element={<MyFeed />} />
						<Route path="/edit" element={<Edit />} />
						<Route path="/edit/:page" element={<UserInfo />} />
						{/* 처방전 관련 */}
						<Route path="/counseling" element={<Counseling />} />
						<Route path="/worry/detail" element={<WorryDetail />} />
						<Route
							path="/oneline/prescription"
							element={<OneLinePrescription />}
						/>
						<Route
							path="/oneline/prescription/write"
							element={<OneLinePrscrWrite />}
						/>
						<Route
							path="/oneline/prescription/edit"
							element={<OneLinePrscrEdit />}
						/>
						<Route path="/prescription/write" element={<PrescriptionWrite />} />
						{/* <Route
							path="/prescription/write/2"
							element={<PrescriptionWriteStep2 />}
						/> */}
						<Route
							path="/prescription/detail"
							element={<PrescriptionDetail />}
						/>
						<Route
							path="/oneline/prescription-detail"
							element={<OneLinePrscrDetail />}
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
						<Route path="/signup/1" element={<Signup1 />} />
						<Route path="/signup/2" element={<Signup2 />} />
						<Route path="/signup/3" element={<Signup3 />} />
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

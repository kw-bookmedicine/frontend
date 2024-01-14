import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Main from './pages/LoginHome';
import Feed from './pages/Feed';
import Search from './pages/Search';
import Mypage from './pages/Mypage';

import Login from './pages/Login';
import Join from './pages/Join';
import Join2 from './pages/Join2';
import Registration from './pages/Registration';

// COMPONENTS
import Header from './components/Header';

// STYLE
import GlobalStyles from './styles/GlobalStyles';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<GlobalStyles />

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/logout" element={<Home />} />
					<Route path="/main" element={<Main />} />
					<Route path="/feed" element={<Feed />} />
					<Route path="/search" element={<Search />} />
					<Route path="/mypage" element={<Mypage />} />

					<Route path="/login" element={<Login />} />
					<Route path="/join" element={<Join />} />
					<Route path="/join2" element={<Join2 />} />
					<Route path="/test" element={<Registration />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;

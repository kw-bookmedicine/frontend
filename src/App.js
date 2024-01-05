import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Main from './pages/LoginHome';
import Feed from './pages/Feed';
import Search from './pages/Search';
import Mypage from './pages/Mypage';

// COMPONENTS
import Header from './components/Header';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/main" element={<Main />} />
					<Route path="/feed" element={<Feed />} />
					<Route path="/search" element={<Search />} />
					<Route path="/mypage" element={<Mypage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;

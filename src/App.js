import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles';
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Join2 } from "./pages/Join2";
import Registration from "./pages/Registration";

function App() {
<<<<<<< HEAD
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join2" element={<Join2 />} />
        <Route path="/test" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
=======
	return (
		<div className="App">
			<h1>여기는 페이지입니다!! 수정</h1>
			<h2>Hello World!!</h2>
			<h3>😀😀hi hello</h3>
		</div>
	);
>>>>>>> 5a5c65e40b4ebf8a96b82b6b52086927f83e0733
}

export default App;

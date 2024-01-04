import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles';
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Join2 } from "./pages/Join2";
import Registration from "./pages/Registration";

function App() {
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
}

export default App;

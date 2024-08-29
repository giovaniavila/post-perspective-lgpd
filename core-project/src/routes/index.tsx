import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import SomePage from "../pages/somepage";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/somepage" element={<SomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;

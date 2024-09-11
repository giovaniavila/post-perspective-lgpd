import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import SomePage from "../pages/profile";
import UserProfile from "../pages/user";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/somepage" element={<SomePage />} />
        <Route path="/home/userprofile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;

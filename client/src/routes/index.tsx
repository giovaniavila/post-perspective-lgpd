import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import UserProfile from "../pages/user";
import PostSection from "../pages/posts";
import CardPostList from "../components/CardPost/list/PostList";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<CardPostList />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="posts/:id" element={<PostSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;

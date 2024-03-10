import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AddBlogPage from "./pages/blogs/AddBlogPage";
import ContributorsPage from "./pages/contributors/ContributorsPage";
import BlogsPage from "./pages/blogs/BlogsPage";
import LogInPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUp";
import OpenSourceProjectsPage from "./pages/projects/ProjectsPage";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/add-blog" element={<AddBlogPage />} />
        <Route path="/contributors" element={<ContributorsPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/open-source-projects" element={<OpenSourceProjectsPage />} />

      </Routes>
    </>
  );
}

export default App;

import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AdminPanel from "./pages/AdminPanel";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import PostArticlePage from "./pages/PostArticlePage";
import ProfilePage from "./pages/ProfilePage";
import ReviewerPage from "./pages/ReviewerPage";
import ReviewForm from "./components/Review/ReviewForm";
import ConfirmAcc from "./components/Auth/ConfirmAcc"
import AuthContext from "./store/auth-context";

function App() {
  const ctx = useContext(AuthContext);
  const { isAdmin, isLoggedIn, isReviewer } = ctx;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/auth" element={<AuthPage />} />
        {!isAdmin && isLoggedIn && (
          <Route path="/post" element={<PostArticlePage />} />
        )}
        {!isAdmin && isLoggedIn && (
          <Route path="/profile" element={<ProfilePage />} />
        )}
        {isAdmin && <Route path="/adminPanel" element={<AdminPanel />} />}
        {isLoggedIn && isReviewer && (
          <Route path="/articles" element={<ReviewerPage />} />
        )}
        {isLoggedIn && isReviewer && (
          <Route path="/articles/:id" element={<ReviewForm />} />
        )}
        {!isLoggedIn && <Route path="/confirm/:id" element={<ConfirmAcc/>}/>}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;

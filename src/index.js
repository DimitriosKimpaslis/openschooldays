import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/views/Home.jsx';
import SignIn from './components/views/SignIn.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import Profile from './components/views/Profile.jsx';
import BlogCreation from './components/userActions/BlogCreation.jsx';
import Preview from './components/userActions/Preview.jsx';
import EditProfile from './components/userActions/EditProfile.jsx';
import BlogPost from './components/views/BlogPost.jsx';
import Blogs from './components/views/Blogs.jsx';
import YourBlogs from './components/userActions/YourBlogs.jsx';
import EditPost from './components/userActions/EditPost.jsx';
import EditPreview from './components/userActions/EditPreview.jsx';
import Collaboration from './components/userActions/Collaboration.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<h1>About</h1>} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/preview' element={<Preview />} />
          <Route path='/edit-preview/:postId' element={<EditPreview />} />
          <Route path="/blog/:page" element={<Blogs />} />
          <Route path='/blog-post/:postId' element={<BlogPost />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/blog-creation' element={<BlogCreation />} />
            <Route path='/your-blogs/:page' element={<YourBlogs />} />
            <Route path='edit-post/:postId' element={<EditPost />} />
            <Route path='edit-profile' element={<EditProfile />} />
            <Route path="/collaboration" element={<Collaboration />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

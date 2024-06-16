import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Slideshow from './components/Slideshow.jsx';
import SignIn from './components/SignIn.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import Profile from './components/Profile.jsx';
import BlogCreation from './components/BlogCreation.jsx';
import Preview from './components/Preview.jsx';
import EditProfile from './components/EditProfile.jsx';

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
          <Route path='/slide' element={<Slideshow />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/preview' element={<Preview />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/blog-creation' element={<BlogCreation />} />
            <Route path='edit-profile' element={<EditProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

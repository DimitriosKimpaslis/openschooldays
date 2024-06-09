import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Slideshow from './components/Slideshow.jsx';
import SignIn from './components/SignIn.jsx';

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
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

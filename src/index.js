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
import Collaboration from './components/userActions/Collaboration.jsx';
import CreateCollaboration from './components/userActions/CreateCollaboration.jsx';
import CollaborationPage from './components/userActions/CollaborationPage.jsx';
import CollaborationPageEdit from './components/userActions/CollaborationPageEdit.jsx';
import AddPeople from './components/editCollaborationOutlets/AddPeople.jsx';
import Description from './components/editCollaborationOutlets/Description.jsx';
import ChangeStatus from './components/editCollaborationOutlets/ChangeStatus.jsx';
import HelpCreation from './components/editCollaborationOutlets/HelpCreation.jsx';
import HelpView from './components/views/HelpView.jsx';
import HelpManagment from './components/editCollaborationOutlets/HelpManagment.jsx';
import PostUpdate from './components/editCollaborationOutlets/PostUpdate.jsx';
import ManageUpdates from './components/editCollaborationOutlets/ManageUpdates.jsx';
import About from './components/views/About.jsx';
import Project from './components/views/Project.jsx';
import UpdateView from './components/views/UpdateView.jsx';


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
          <Route path='/about' element={<About />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/preview' element={<Preview />} />
          <Route path="/blog/:page" element={<Blogs />} />
          <Route path='/blog-post/:postId' element={<BlogPost />} />
          <Route path='/project' element={<Project />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/blog-creation' element={<BlogCreation />} />
            <Route path='/your-blogs/:page' element={<YourBlogs />} />
            <Route path='/edit-profile' element={<EditProfile />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path='/create-collaboration/:editMode/:id?' element={<CreateCollaboration />} />
            <Route path='/collaboration-page/:status/:id' element={<CollaborationPage />} />
            <Route path='/help-page/:id/:arrayId' element={<HelpView />} />
            <Route path='/update-page/:id/:arrayId' element={<UpdateView />} />
            <Route path='/collaboration-page-edit/:id' element={<CollaborationPageEdit />}>
              <Route index element={<Description />} />
              <Route path='change-content/:editMode/:id' element={<CreateCollaboration />} />
              <Route path='members' element={<AddPeople />} />
              <Route path='status' element={<ChangeStatus />} />
              <Route path='create-help' element={<HelpCreation />} />
              <Route path='manage-help' element={<HelpManagment />} />
              <Route path='post-update' element={<PostUpdate />} />
              <Route path='manage-updates' element={<ManageUpdates />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

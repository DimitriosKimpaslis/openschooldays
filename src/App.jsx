import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/etc/Header';
import { createContext, useEffect, useState } from 'react';
import { supabase } from './client';
import Footer from './components/etc/Footer';

export const UserContext = createContext()

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      setUser(user.data.user);
    };
    getUser();
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user)); // Save user to local storage
  }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Retrieve user from local storage
    }
  }, []);

  const location = useLocation();

  const checkForTransparentHeader = (pathname) => {
    return pathname === '/';
  }

  useEffect(() => {
    if (checkForTransparentHeader(location.pathname)) {
      document.getElementById('header-color').classList.add('hidden');
    } else {
      document.getElementById('header-color').classList.remove('hidden');
    }
  }, [location.pathname]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className='content'>
        <Header />
        <div id='header-color' className='h-[180px] bg-gradient mb-10'></div>
        <Outlet />
      </div>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;

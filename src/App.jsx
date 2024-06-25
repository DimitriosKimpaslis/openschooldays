import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/etc/Header';
import { createContext, useEffect, useState } from 'react';
import { supabase } from './client';
import Footer from './components/etc/Footer';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export const UserContext = createContext()
export const GlobalMessageContext = createContext()

function App() {

  const [user, setUser] = useState(null);
  const [globalMessage, setGlobalMessage] = useState({
    message: '',
    type: 'success',
    open: false,
    yes: () => { },
    no: () => { },
  });

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

  useEffect(() => {
    const body = document.querySelector('body');
    if (globalMessage.open) {
      body.style.overflow = 'hidden';
    }
    else {
      body.style.overflow = 'auto';
    } 
  }
  , [globalMessage.open]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GlobalMessageContext.Provider value={{ globalMessage, setGlobalMessage }}>
        {globalMessage.open && 
          <div className='absolute bg-black text-white bg-opacity-30 w-full h-full z-50 flex flex-col justify-center items-center overflow-y-hidden'>
            <div className='bg-neutral-800 w-80 p-10 rounded-lg space-y-5 shadow-lg'>
              <div className='flex justify-center'>
                <WarningAmberIcon className='text-red-500 text-6xl' fontSize='' />
              </div>
              <p className='text-xl font-normal text-center'>{globalMessage.message}</p>
              <div className='flex justify-center gap-2'>
                <button onClick={globalMessage.yes} className='bg-green-500 hover:bg-green-600 text-white px-10 py-1 rounded'>Yes</button>
                <button onClick={globalMessage.no} className='bg-red-500 hover:bg-red-600 text-white px-10 py-1 rounded'>No</button>
              </div>
            </div>
          </div>
        }

      <div className='content'>
        <Header />
        <div id='header-color' className='h-[180px] bg-gradient mb-10'></div>
        <Outlet />
      </div>
        <Footer />
      </GlobalMessageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

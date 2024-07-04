import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/etc/Header';
import { createContext, useEffect, useState } from 'react';
import { supabase } from './client';
import Footer from './components/etc/Footer';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CancelIcon from '@mui/icons-material/Cancel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Loader } from './components/etc/Loader';


export const UserContext = createContext()
export const GlobalMessageContext = createContext()
export const ImageViewerContext = createContext()
export const LoadingContext = createContext()

function App() {

  const [user, setUser] = useState(null);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [globalMessage, setGlobalMessage] = useState({
    message: '',
    type: 'success',
    open: false,
    yes: () => { },
    no: () => { },
  });


  const [imageViewer, setImageViewer] = useState({
    open: false,
    image: '',
    images: [],
    scroll: 0
  });

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      setUser(user.data.user);
    };
    getUser();
  }, []);

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 3000);
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


  const checkForTransparentHeader = (pathname) => {
    if (pathname === '/' || pathname === "/about" || pathname === "/project") {
      return true;
    }
  }

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      if (checkForTransparentHeader(location.pathname)) {
        document.getElementById('header-color').classList.add('hidden');
      } else {
        document.getElementById('header-color').classList.remove('hidden');
      }
    }

  }, [location.pathname]);

  useEffect(() => {
    const body = document.querySelector('body');
    if (globalMessage.open) {
      body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    }
    else {
      body.style.overflow = 'auto';
    }
  }
    , [globalMessage.open]);

  useEffect(() => {
    const body = document.querySelector('body');
    if (imageViewer.open) {
      body.style.overflow = 'hidden';
    }
    else {
      body.style.overflow = 'auto';
    }
  }, [imageViewer.open]);

  useEffect(() => {
    const body = document.querySelector('body');
    if (loading) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  }, [loading]);

  useEffect(() => {
    if (loading || location.pathname === '/' || location.pathname === "/project") {
      setTimeout(() => { window.scroll(0,0) }, 500);
    } 
  }, [location.pathname, loading]);


  const nextImage = () => {
    if (imageViewer.images.indexOf(imageViewer.image) === imageViewer.images.length - 1) return
    setImageViewer({ ...imageViewer, image: imageViewer.images[imageViewer.images.indexOf(imageViewer.image) + 1] })
  }

  const previousImage = () => {
    if (imageViewer.images.indexOf(imageViewer.image) === 0) return
    setImageViewer({ ...imageViewer, image: imageViewer.images[imageViewer.images.indexOf(imageViewer.image) - 1] })
  }


  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <ImageViewerContext.Provider value={{ imageViewer, setImageViewer }}>
        <UserContext.Provider value={{ user, setUser }}>
          <GlobalMessageContext.Provider value={{ globalMessage, setGlobalMessage }}>
            {loading && <Loader />}
            {globalMessage.open &&
              <div className='absolute bg-black text-white bg-opacity-30 w-full h-full z-50 flex flex-col justify-center items-center'>
                <div className='bg-neutral-800 w-80 p-10 rounded-lg space-y-5 shadow-lg'>
                  <div className='flex justify-center'>
                    <WarningAmberIcon className='text-red-500 text-6xl' fontSize='' />
                  </div>
                  <p className='text-xl font-normal text-center'>{globalMessage.message}</p>
                  <div className='flex justify-center gap-2'>
                    <button onClick={globalMessage.yes} className='bg-green-500 hover:bg-green-600 text-white px-14 py-2 rounded'>Yes</button>
                    <button onClick={globalMessage.no} className='bg-red-500 hover:bg-red-600 text-white px-14 py-2 rounded'>No</button>
                  </div>
                </div>
              </div>
            }
            {imageViewer.open &&
              (<div className='absolute bg-black text-white bg-opacity-30 w-full h-full z-50 flex flex-col justify-center items-center ' style={{ top: `${imageViewer.scroll}px` }}>
                <img src={imageViewer.image} alt='view' className='w-[80%] h-[80%] object-contain' />
                <NavigateBeforeIcon className='text-5xl cursor-pointer absolute top-[50%] left-0 hover:text-gray-300' fontSize='' onClick={previousImage} />
                <NavigateNextIcon className='text-5xl cursor-pointer absolute top-[50%] right-0 hover:text-gray-300' fontSize='' onClick={nextImage} />
                <CancelIcon className='text-5xl cursor-pointer absolute top-5 right-5 hover:text-gray-300' fontSize='' onClick={() => { setImageViewer({ ...imageViewer, open: false }) }} />
              </div>)
            }

            <div className='content'>
              <Header />
              <div id='header-color' className='h-[140px] bg-gradient hidden'></div>
              <Outlet />
            </div>
            <Footer />
          </GlobalMessageContext.Provider>
        </UserContext.Provider>
      </ImageViewerContext.Provider >
    </LoadingContext.Provider>

  );
}

export default App;

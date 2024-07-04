import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import birdLogo from '../../media/images/55.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { LoadingContext, UserContext } from '../../App';
import { supabase } from '../../client';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Close } from '@mui/icons-material';

const Header = () => {
    const navigate = useNavigate()
    const { setLoading } = useContext(LoadingContext)
    const { user } = useContext(UserContext)
    const [image, setImage] = useState('https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg')
    const getUserInformation = async () => {
        const { data, error } = await supabase
            .from('usersInfo')
            .select('image')
            .eq('uid', user.id)
        if (error) {
            console.error('Error fetching user information:', error.message)
            return
        }
        if (data[0].image !== null) {
            setImage(data[0].image)
        }
    }

    const [menu, setMenu] = useState(false)

    useEffect(() => {
        if (user) {
            getUserInformation()
        }
    }, [user])

    const goToProject = () => {
        setMenu(false)
        setLoading(true)
        navigate('/project')
    }

    const goToPage = (page) => {
        setMenu(false)
        navigate(page)
    }

    return (
        <div>
            <div className=' text-gray-50 w-full lg:flex hidden justify-between items-center py-6 px-10 absolute z-40 '>
                <img src={birdLogo}
                    alt='bird logo'
                    className='w-24 h-24 cursor-pointer'
                    onClick={() => navigate('/')}
                />
                <ul className='flex flex-grow items-center justify-between 2xl:px-52 lg:px-24 text-xl primary'>
                    <li className='font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/'}>HOME</NavLink></li>
                    <li className='relative font-semibold parent-li transition-colors duration-400'><NavLink to={'#'}>PROJECTS <KeyboardArrowDownIcon className='bottom-[2px] relative' /></NavLink>
                        <ul className='absolute w-40 space-y-2 hidden'>
                            <li className='hover:text-black text-gray-500 ' onClick={goToProject}><NavLink >PROJECT 1</NavLink></li>
                            <li className='hover:text-black text-gray-500' onClick={goToProject}><NavLink to={'/project'} >PROJECT 2</NavLink></li>
                            <li className='hover:text-black text-gray-500 ' onClick={goToProject}><NavLink to={'/project'} >PROJECT 3</NavLink></li>
                            <li className='hover:text-black text-gray-500' onClick={goToProject}><NavLink to={'/project'} >PROJECT 4</NavLink></li>
                        </ul>
                    </li>
                    <li className='font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/about'}>ABOUT</NavLink></li>
                    <li className='font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/blog/1'}>BLOG</NavLink></li>
                    <li className='font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/contact'}>CONTACT US</NavLink></li>
                </ul>
                {user ?
                    <div className='relative cursor-pointer rounded-full' onClick={() => navigate('/profile')}>
                        <img src={image} className='w-14 h-14 rounded-full cursor-pointer object-cover' alt='user profile' />
                        <div className='absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-200 rounded-full'></div>
                    </div>
                    : <button onClick={() => navigate('/signin')} className='bg-newSomon px-12 py-2 text-xl w-fit h-fit hover:bg-newPurple text-newPurple hover:text-newSomon transition-colors duration-400'>SIGN IN <TrendingFlatIcon className='relative bottom-[2px]' /></button>}
            </div>
            <div className='bg-newPink w-full h-20 lg:hidden flex justify-between items-center px-10 relative'>
                <img src={birdLogo}
                    alt='bird logo'
                    className='w-14 h-14 cursor-pointer'
                    onClick={() => navigate('/')}
                />
                <button className="text-white text-3xl" onClick={() => setMenu(!menu)}>
                    <MenuIcon className='text-white text-3xl' fontSize='' />
                </button>
            </div>
            <div className={`absolute z-40 w-full bg-newPink flex-col py-5 ${menu ? 'flex' : 'hidden'}`}>
                <CloseIcon className='absolute top-5 right-5 text-white text-3xl' onClick={() => setMenu(false)} />
                <ul className='space-y-6 text-xl primary text-center'>
                    <li className='font-semibold transition-colors duration-400' onClick={() => goToPage('/')}><NavLink >HOME</NavLink></li>
                    <li className='relative left-2 font-semibold parent-li'><NavLink to={'#'}>PROJECTS <KeyboardArrowDownIcon className='bottom-[2px] relative' /></NavLink>
                        <ul className=' space-y-2 hidden relative right-2'>
                            <li className='text-black ' onClick={goToProject}><NavLink >PROJECT 1</NavLink></li>
                            <li className='text-black' onClick={goToProject}><NavLink >PROJECT 2</NavLink></li>
                            <li className='text-black ' onClick={goToProject}><NavLink >PROJECT 3</NavLink></li>
                            <li className='text-black' onClick={goToProject}><NavLink >PROJECT 4</NavLink></li>
                        </ul>
                    </li>
                    <li className='font-semibold hover:text-gray-400 transition-colors duration-400' onClick={() => goToPage('/about')}><NavLink >ABOUT</NavLink></li>
                    <li className='font-semibold hover:text-gray-400 transition-colors duration-400' onClick={() => goToPage('/blog/1')}><NavLink >BLOG</NavLink></li>
                    <li className='font-semibold hover:text-gray-400 transition-colors duration-400' onClick={() => goToPage('/contact')}><NavLink>CONTACT US</NavLink></li>
                    {user ?
                        <li className='font-semibold hover:text-gray-400 transition-colors duration-400' onClick={() => goToPage('/profile')}><NavLink>PROFILE</NavLink></li>
                        :
                        <li className='text-black font-semibold' onClick={() => goToPage('/signin')}><NavLink >SIGN IN</NavLink></li>

                    }
                </ul>

            </div>
        </div >
    )
}

export default Header
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import birdLogo from '../../media/images/55.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { UserContext } from '../../App';
import { supabase } from '../../client';

const Header = () => {
    const navigate = useNavigate()
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

    useEffect(() => {
        if (user) {
            getUserInformation()
        }
    }, [user])

    return (
        <div className=' text-gray-50 w-full flex justify-between items-center py-6 px-10 absolute z-40'>
            <img src={birdLogo}
                alt='bird logo'
                className='w-32 h-32 cursor-pointer'
                onClick={() => navigate('/')}
            />
            <ul className='flex flex-grow items-center justify-between 2xl:px-52 lg:px-24 text-xl primary'>
                <li className='font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/'}>HOME</NavLink></li>
                <li className='relative font-semibold parent-li transition-colors duration-400'><NavLink to={'/post'}>PROJECTS <KeyboardArrowDownIcon className='bottom-[2px] relative' /></NavLink>
                    <ul className='absolute w-40 space-y-2 hidden'>
                        <li className='hover:text-black text-gray-500 '><NavLink to={'/post'}>PROJECT 1</NavLink></li>
                        <li className='hover:text-black text-gray-500'><NavLink to={'/post'}>PROJECT 2</NavLink></li>
                        <li className='hover:text-black text-gray-500 '><NavLink to={'/post'}>PROJECT 3</NavLink></li>
                        <li className='hover:text-black text-gray-500'><NavLink to={'/post'}>PROJECT 4</NavLink></li>
                    </ul>
                </li>
                <li className='font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/reviews'}>ABOUT</NavLink></li>
                <li className='font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/blog/1'}>BLOG</NavLink></li>
                <li className='font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/contact'}>CONTACT US</NavLink></li>
            </ul>
            {user ?
                <div className='relative cursor-pointer rounded-full' onClick={() => navigate('/profile')}>
                    <img src={image} className='w-14 h-14 rounded-full cursor-pointer object-cover' alt='user profile' />
                    <div className='absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-200 rounded-full'></div>
                </div>
                : <button onClick={() => navigate('/signin')} className='bg-newSomon px-12 py-2 text-xl w-fit h-fit hover:bg-newPurple text-newPurple hover:text-newSomon transition-colors duration-400'>REGISTER NOW <TrendingFlatIcon className='relative bottom-[2px]' /></button>}
        </div>
    )
}

export default Header
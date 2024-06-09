import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import birdLogo from '../media/images/55.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const Header = () => {
    const [projectsIsOpen, setProjectsIsOpen] = useState(false)
    return (
        <div className=' text-gray-50 w-full flex justify-between items-center py-6 px-10 absolute z-50'>
            <div className='flex items-center space-x-2'>
                <img src={birdLogo}
                    alt='bird logo'
                    className='w-32 h-32'
                />
            </div>
            <ul className='flex flex-grow items-center justify-between 2xl:px-52 lg:px-24 text-xl primary'>
                <li className='font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/'}>HOME</NavLink></li>
                <li className='relative font-semibold parent-li transition-colors duration-400'><NavLink to={'/post'}>PROJECTS <KeyboardArrowDownIcon className='bottom-[2px] relative'/></NavLink>
                    <ul className='absolute w-40 space-y-2 hidden'>
                        <li className='hover:text-white'><NavLink to={'/post'}>PROJECT 1</NavLink></li>
                        <li className='hover:text-white'><NavLink to={'/post'}>PROJECT 2</NavLink></li>
                        <li className='hover:text-white'><NavLink to={'/post'}>PROJECT 3</NavLink></li>
                        <li className='hover:text-white'><NavLink to={'/post'}>PROJECT 4</NavLink></li>
                    </ul>
                </li>
                <li className='font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/reviews'}>ABOUT</NavLink></li>

                <li className='font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/contact'}>BLOG</NavLink></li>
                <li className='font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/contact'}>CONTACT US</NavLink></li>
            </ul>
            <button className='bg-newSomon px-12 py-2 text-xl w-fit h-fit hover:bg-newPurple text-newPurple hover:text-newSomon transition-colors duration-400'>REGISTER NOW <TrendingFlatIcon className='relative bottom-[2px]'/></button>
        </div>
    )
}

export default Header
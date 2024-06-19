import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Tooltip } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import SosIcon from '@mui/icons-material/Sos';
import CategoryIcon from '@mui/icons-material/Category';
import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused';
import GradeIcon from '@mui/icons-material/Grade';
import { useNavigate } from 'react-router-dom';

const Collaboration = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className='h-[200px] bg-black'></div>
            <p className='text-8xl text-center'>Collaboration</p>
            <div className='flex justify-end items-center px-4'>
                <div className='flex flex-col items-center hover:text-gray-500 cursor-pointer' onClick={() => navigate('/your-collaborations')}>
                    <p className='text-xl font-bold'>Your Collaborations</p>
                    <ConnectWithoutContactIcon className='text-8xl' fontSize='' />
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='w-[80%]'>
                    <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black'>
                            <SosIcon className='text-4xl text-red-500 relative top-[2px]' fontSize='' />
                            <p className='text-2xl'>Help needed!</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black'>
                            <CategoryIcon className='text-3xl text-green-500 relative top-[1px]' fontSize='' />
                            <p className='text-2xl'>Active Collaborations</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black'>
                            <NotificationsPausedIcon className='text-3xl text-purple-600 relative top-[1px]' fontSize='' />
                            <p className='text-2xl'>Inactive Collaborations</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black'>
                            <GradeIcon className='text-3xl text-yellow-500 relative top-[1px]' fontSize='' />
                            <p className='text-2xl'>Completed Collaborations</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Collaboration
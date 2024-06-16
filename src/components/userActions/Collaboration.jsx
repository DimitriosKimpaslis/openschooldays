import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Tooltip } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const Collaboration = () => {
    return (
        <div>
            <div className='h-[200px] bg-black'></div>
            <p className='text-8xl text-center'>Collaboration</p>
            <div className='flex justify-between items-center px-4'>
                <div className='flex flex-col items-center'>
                    <p className='text-xl font-bold'>Create a new action</p>
                    <Tooltip title='Add a new idea' arrow>
                        <AddCircleIcon className='text-8xl cursor-pointer' fontSize='' />
                    </Tooltip>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-xl font-bold'>Your Collaborations</p>
                    <ConnectWithoutContactIcon className='text-8xl' fontSize='' />
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='w-[80%]'>
                    <div>
                        <p className=''>Help needed!</p>
                    </div>
                    <div>
                        <p className=''>Active Collaboration</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Collaboration
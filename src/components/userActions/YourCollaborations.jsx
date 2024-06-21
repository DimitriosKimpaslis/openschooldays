import React, { useContext, useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { supabase } from '../../client';


const YourCollaborations = () => {
    const { user } = useContext(UserContext)
    const [collaborations, setCollaborations] = useState([])
    const navigate = useNavigate()
    const getCollaborations = async () => {
        const { data, error } = await supabase
            .from('collaboration')
            .select('*')

        console.log(data)
        if (error) {
            console.log('error', error)
        }
        else {
            setCollaborations(data)
        }
    }

    useEffect(() => {  
        getCollaborations()
    }
        , [])
    
    return (
        <div>
            <div className='h-[200px] bg-black'></div>
            <p className='text-8xl text-center'>Collaboration</p>
            <div className='flex justify-end items-center px-4'>
                <div className='flex flex-col items-center hover:text-gray-500 cursor-pointer' onClick={() => navigate('/create-collaboration')}>
                    <p className='text-xl font-bold'>New Collaboration Idea</p>
                    <AddCircleIcon className='text-8xl' fontSize='' />
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='w-[80%]'>
                    <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black'>
                            <p className='text-2xl'>Your Active Collaborations</p>
                            <p className='text-xl text-gray-500'>Click on a collaboration to view more details</p>

                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black'>
                            <p className='text-2xl'>Your Inactive Collaborations</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default YourCollaborations
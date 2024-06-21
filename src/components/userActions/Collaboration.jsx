import React, { useContext, useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Tooltip } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import SosIcon from '@mui/icons-material/Sos';
import CategoryIcon from '@mui/icons-material/Category';
import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused';
import GradeIcon from '@mui/icons-material/Grade';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../client';

const Collaboration = () => {
    const [activeCollaborations, setActiveCollaborations] = useState([])
    const [inactiveCollaborations, setInactiveCollaborations] = useState([])
    const [completedCollaborations, setCompletedCollaborations] = useState([])
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
            let activeCollaborations = [];
            let inactiveCollaborations = [];
            let completedCollaborations = [];
            data.forEach((collaboration) => {
                if (collaboration.status === 'active') {
                    activeCollaborations.push(collaboration)
                } else if (collaboration.status === 'inactive') {
                    inactiveCollaborations.push(collaboration)
                }else if (collaboration.status === 'completed') {
                    completedCollaborations.push(collaboration)
                }
            })
            setActiveCollaborations(activeCollaborations)
            setInactiveCollaborations(inactiveCollaborations)
            setCompletedCollaborations(completedCollaborations)

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
                <div className='flex flex-col items-center hover:text-gray-500 cursor-pointer' onClick={() => navigate('/your-collaborations')}>
                    <p className='text-xl font-bold'>Your Collaborations</p>
                    <ConnectWithoutContactIcon className='text-8xl' fontSize='' />
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='w-[80%] space-y-2'>
                    <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black mb-3'>
                            <SosIcon className='text-4xl text-red-500 relative top-[2px]' fontSize='' />
                            <p className='text-2xl'>Help needed!</p>
                        </div>
                        <div className='grid grid-cols-3 items-center gap-1 h-64'>
                            {activeCollaborations.length === 0 ?
                                <div className='col-span-12'>
                                    <p className='text-4xl text-gray-700 text-center'>Empty...</p>
                                </div>
                                :
                                activeCollaborations.map((collaboration, index) => {
                                    return (
                                        <div className='w-full h-full flex flex-col items-center gap-1 shadow-md hover:shadow-xl cursor-pointer' key={index} onClick={() => navigate('/collaboration-page/' + collaboration.status + "/" + collaboration.id)}>
                                            <div className='w-full h-32 bg-gray-500'>
                                                <img src={collaboration.idea.thumbnail} alt='collaboration' className='w-full h-full object-cover' />
                                            </div>
                                            <p className='text-xl'>{collaboration.idea.title.length > 75 ? collaboration.idea.title.slice(0, 75) + "..." : collaboration.idea.title}</p>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black mb-3'>
                            <CategoryIcon className='text-3xl text-green-500 relative top-[1px]' fontSize='' />
                            <p className='text-2xl'>Active Collaborations</p>
                        </div>
                        <div className='grid grid-cols-3 items-center gap-1 h-64'>
                            {activeCollaborations.length === 0 ?
                                <div className='col-span-12'>
                                    <p className='text-4xl text-gray-700 text-center'>Empty...</p>
                                </div>
                                :
                                activeCollaborations.map((collaboration, index) => {
                                    return (
                                        <div className='w-full h-full flex flex-col items-center gap-1 shadow-md hover:shadow-xl cursor-pointer' key={index} onClick={() => navigate('/collaboration-page/' + collaboration.status + "/" + collaboration.id)}>
                                            <div className='w-full h-32 bg-gray-500'>
                                                <img src={collaboration.idea.thumbnail} alt='collaboration' className='w-full h-full object-cover' />
                                            </div>
                                            <p className='text-xl'>{collaboration.idea.title.length > 75 ? collaboration.idea.title.slice(0, 75) + "..." : collaboration.idea.title}</p>
                                        </div>
                                    )
                            })}
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black mb-3'>
                            <NotificationsPausedIcon className='text-3xl text-purple-600 relative top-[1px]' fontSize='' />
                            <p className='text-2xl'>Inactive Collaborations</p>
                        </div>
                        <div className='grid grid-cols-3 items-center gap-1 min-h-[350px]'>
                            {inactiveCollaborations.length === 0 ?
                                <div className='col-span-12'>
                                    <p className='text-4xl text-gray-700 text-center'>Empty...</p>
                                </div>
                                :
                                inactiveCollaborations.map((collaboration, index) => {
                                return (
                                    <div className='w-full h-full flex flex-col items-center gap-1 shadow-md hover:shadow-xl cursor-pointer' key={index} onClick={() => navigate('/collaboration-page/' + collaboration.status + "/" + collaboration.id)}>
                                        <div className='w-full h-64 bg-gray-500'>
                                            <img src={collaboration.idea.thumbnail} alt='collaboration' className='w-full h-full object-cover' />
                                        </div>
                                        <p className='text-xl'>{collaboration.idea.title.length > 75 ? collaboration.idea.title.slice(0, 75) + "..." : collaboration.idea.title}</p>
                                        <p className='text-bg text-gray-600'>Created by {collaboration.created_by_name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black mb-3'>
                            <GradeIcon className='text-3xl text-yellow-500 relative top-[1px]' fontSize='' />
                            <p className='text-2xl'>Completed Collaborations</p>
                        </div>
                        <div className='grid grid-cols-3 items-center gap-1 h-64'>
                            {completedCollaborations.length === 0 ?
                                <div className='col-span-12'>
                                    <p className='text-4xl text-gray-700 text-center'>Such empty...</p>
                                </div>
                                :
                                completedCollaborations.map((collaboration, index) => {
                                return (
                                    <div className='w-full h-full flex flex-col items-center gap-1 shadow-md hover:shadow-xl  cursor-pointer' key={index} onClick={() => navigate('/collaboration-page/' + collaboration.status + "/" + collaboration.id)}>
                                        <div className='w-full h-32 bg-gray-500'>
                                            <img src={collaboration.idea.thumbnail} alt='collaboration' className='w-full h-full object-cover' />
                                        </div>
                                        <p className='text-xl'>{collaboration.idea.title.length > 75 ? collaboration.idea.title.slice(0, 75) + "..." : collaboration.idea.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Collaboration
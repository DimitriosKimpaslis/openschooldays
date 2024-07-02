import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SosIcon from '@mui/icons-material/Sos';
import CategoryIcon from '@mui/icons-material/Category';
import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused';
import GradeIcon from '@mui/icons-material/Grade';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../client';
import CollaborationCard from '../etc/CollaborationCard';
import ArrowBack from '../etc/ArrowBack';

const Collaboration = () => {
    const [activeCollaborations, setActiveCollaborations] = useState([])
    const [inactiveCollaborations, setInactiveCollaborations] = useState([])
    const [completedCollaborations, setCompletedCollaborations] = useState([])
    const [helpNeeded, setHelpNeeded] = useState([])
    const navigate = useNavigate()

    const getCollaborations = async () => {
        const { data, error } = await supabase
            .from('collaboration')
            .select('*')

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
                } else if (collaboration.status === 'completed') {
                    completedCollaborations.push(collaboration)
                }
            })
            setActiveCollaborations(activeCollaborations)
            setInactiveCollaborations(inactiveCollaborations)
            setCompletedCollaborations(completedCollaborations)
            //now find if there is any collaboration that needs help
            const helpNeeded = data.filter((collaboration) => {
                if (collaboration.help_needed === null) return false
                return collaboration.help_needed.length > 0
            })
            setHelpNeeded(helpNeeded)
        }
    }

    useEffect(() => {
        getCollaborations()
    }
        , [])


    return (
        <div className='pt-32'>
            <div className='relative container mx-auto py-8'>
                <div className='lg:block hidden'>
                    <ArrowBack location="/profile" />
                </div>
                <p className='lg:text-6xl text-5xl text-center mb-10'>Collaboration</p>
                <div className='flex justify-end items-center px-4'>
                    <div className='flex flex-col items-center hover:text-gray-500 cursor-pointer' onClick={() => navigate('/create-collaboration/create-collaboration')}>
                        <p className='text-xl font-bold lg:block hidden'>Collaboration Creation</p>
                        <p className='text-xl font-bold lg:hidden block'>Add</p>
                        <AddCircleIcon className='lg:text-6xl text-5xl' fontSize='' />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='w-[80%] space-y-2'>
                        <div className='w-full'>
                            <div className='flex items-center gap-1 border-b-2 border-black mb-3'>
                                <SosIcon className='text-4xl text-red-500 relative top-[2px]' fontSize='' />
                                <p className='text-2xl'>Help needed!</p>
                            </div>
                            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-1 gap-y-3 min-h-[350px]'>
                                {helpNeeded.length === 0 ?
                                    <div className='col-span-12'>
                                        <p className='text-4xl text-gray-700 text-center'>No help currently needed</p>
                                    </div>
                                    :
                                    helpNeeded.map((collaboration, index) => {
                                        return collaboration.help_needed.map((help, helpIndex) => { // Renamed the inner index variable to helpIndex
                                            const readableDate = new Date(help.date).toDateString()
                                            return (
                                                <div className='w-full h-full gap-1 shadow-md hover:shadow-xl cursor-pointer text-center' key={helpIndex} onClick={() => navigate('/help-page/' + collaboration.id + "/" + helpIndex)}>
                                                    <div className='w-full h-32 bg-gray-500'>
                                                        <img src={collaboration.idea.thumbnail} alt='collaboration' className='w-full h-full object-cover' />
                                                    </div>
                                                    <div className='p-3'>
                                                        <p className='lg:text-xl text-lg font-bold'>{collaboration.idea.title.length > 75 ? collaboration.idea.title.slice(0, 75) + "..." : collaboration.idea.title}</p>
                                                        <p className='lg:text-xl text-lg'>{help.title}</p>
                                                        <p className='lg:text-xl text-base text-gray-500'>{readableDate}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    })}
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='flex items-center gap-1 border-b-2 border-black mb-3'>
                                <CategoryIcon className='text-3xl text-green-500 relative top-[1px]' fontSize='' />
                                <p className='text-2xl'>Active Collaborations</p>
                            </div>
                            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-1 gap-y-3 min-h-[350px]'>
                                {activeCollaborations.length === 0 ?
                                    <div className='col-span-12'>
                                        <p className='text-4xl text-gray-700 text-center'>Empty...</p>
                                    </div>
                                    :
                                    activeCollaborations.map((collaboration, index) => {
                                        return (
                                            <CollaborationCard collaboration={collaboration} key={index} />
                                        )
                                    })}
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='flex items-center gap-1 border-b-2 border-black mb-3'>
                                <NotificationsPausedIcon className='text-3xl text-purple-600 relative top-[1px]' fontSize='' />
                                <p className='text-2xl'>Inactive Collaborations</p>
                            </div>
                            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-1 gap-y-3 min-h-[350px]'>
                                {inactiveCollaborations.length === 0 ?
                                    <div className='col-span-12'>
                                        <p className='text-4xl text-gray-700 text-center'>Empty...</p>
                                    </div>
                                    :
                                    inactiveCollaborations.map((collaboration, index) => {
                                        return (
                                            <CollaborationCard collaboration={collaboration} key={index} />
                                        )
                                    })}
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='flex items-center gap-1 border-b-2 border-black mb-3'>
                                <GradeIcon className='text-3xl text-yellow-500 relative top-[1px]' fontSize='' />
                                <p className='text-2xl'>Completed Collaborations</p>
                            </div>
                            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-1 min-h-[350px]'>
                                {completedCollaborations.length === 0 ?
                                    <div className='col-span-12'>
                                        <p className='text-4xl text-gray-700 text-center'>Such empty...</p>
                                    </div>
                                    :
                                    completedCollaborations.map((collaboration, index) => {
                                        return (
                                            <CollaborationCard collaboration={collaboration} key={index} />
                                        )
                                    })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Collaboration
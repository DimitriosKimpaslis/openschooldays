import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../client'
import SettingsIcon from '@mui/icons-material/Settings';

const CollaborationPage = () => {
    const { id, status } = useParams()
    const [collaboration, setCollaboration] = useState({})
    const [ticketColor, setTicketColor] = useState('bg-gray-500')
    const getCollaborationData = async () => {
        const { data, error } = await supabase
            .from('collaboration')
            .select('*')
            .eq('id', id)
        if (error) {
            console.error('Error fetching collaborations:', error.message)
            return
        }
        setCollaboration(data[0])
        console.log(data[0])
    }

    useEffect(() => {
        const color = getCollaborationStatusColor()
        setTicketColor(color)
        getCollaborationData()
    }
        , [])
    
    const getCollaborationStatusColor = () => {
        switch (status) {
            case 'active':
                return 'bg-green-500'
            case 'inactive':
                return 'bg-purple-500'
            case 'deleted':
                return 'bg-red-500'
            case 'completed':
                return 'bg-yellow-500'
            default:
                return 'bg-gray-500'
        }
    }


    return (
        <div>
            <div className='bg-black h-[200px] mb-5'></div>
            <div className='flex justify-center'>
                <div className='w-[80%] space-y-2 relative'>
                    <div className='w-full'>
                        <img src={collaboration.idea && collaboration.idea.thumbnail} alt='collaboration' className='w-full h-[500px] object-contain' />
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black'>
                            <p className='text-2xl'>Collaboration Title: <span className='font-bold'>{collaboration.idea && collaboration.idea.title}</span></p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black'>
                            <p className='text-2xl'>Collaboration Description</p>
                        </div>
                    </div>
                    {/* <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black'>
                            <p className='text-2xl'>Collaboration Status</p>
                        </div>
                    </div> */}
                    <div className='w-full'>
                        <div className='flex items-center gap-1 border-b-2 border-black'>
                            <p className='text-2xl'>Collaboration Members</p>
                        </div>
                    </div>
                    <div className={"absolute flex items-center gap-2 top-0 right-0 p-2 " + ticketColor} onClick={() => console.log('edit')}>
                        <p className='font-semibold text-lg'>{collaboration.status}</p>
                        <SettingsIcon className='relative top-[1px]'/>
                    </div>
                </div>
            </div>
            <p>{status} collaboration</p>
        </div>
    )
}

export default CollaborationPage
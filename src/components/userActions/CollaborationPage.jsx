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
            <div className='container mx-auto space-y-4 relative'>


                <div>
                    <img src={collaboration.idea && collaboration.idea.thumbnail} alt='collaboration' className='w-full h-[500px] object-contain' />
                </div>


                <div>
                    <div className='flex items-center gap-1 border-b-2 border-black'>
                        <p className='text-2xl'>Title: <span className='font-bold'>{collaboration.idea && collaboration.idea.title}</span></p>
                    </div>
                </div>

                <div>
                    <div className='flex items-center gap-1 border-b-2 border-black'>
                        <p className='text-2xl'>Help Needed</p>
                    </div>
                    <div className='flex items-center justify-center h-32'>
                        <p className='text-xl text-gray-500 italic'>Currently no help needed</p>
                    </div>
                </div>

                <div className='space-y-4'>
                    <div className='flex gap-1 border-b-2 border-black'>
                        <p className='text-2xl'>Updates</p>
                    </div>
                    <div className='shadow-md hover:text-white hover:bg-black py-1 px-4 cursor-pointer'>
                        <p className='text-lg'>Changed trash cans around PAOK stadium at <span className='text-gray-500'>10/03/2021</span></p>
                    </div>
                    <div className='shadow-md hover:text-white hover:bg-black py-1 px-4 cursor-pointer'>
                        <p className='text-lg'>Talked with president for issue at <span className='text-gray-500'>23/08/2020</span></p>
                    </div>
                    <div className='shadow-md hover:text-white hover:bg-black py-1 px-4 cursor-pointer'>
                        <p className='text-lg'>Changed trash cans in Tirolois at <span className='text-gray-500'>23/05/2018</span></p>
                    </div>
                </div>


                <div className='space-y-4'>
                    <div className='flex items-center gap-1 border-b-2 border-black'>
                        <p className='text-2xl'>Executing Members</p>
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex flex-col items-center gap-1'>
                            <img src='https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/ProfileImages/1bbwcau78u4hp0mz9ybc2n1718552675807' alt='member' className='w-20 h-20 object-cover rounded-full' />
                            <p className='text-lg max-w-32  text-center'>Eleutherios Benizelos</p>
                        </div>
                        <div className='flex flex-col items-center gap-1'>
                            <img src='https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/ProfileImages/brexny8iuykqxpkdt1et6m1718552906890' alt='member' className='w-20 h-20 object-cover rounded-full' />
                            <p className='text-lg max-w-32  text-center'>Georgios Papandreou</p>
                        </div>
                        <div className='flex flex-col items-center gap-1'>
                            <img src='https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/ProfileImages/n2uizm0t6qsv6yk6lx03r1718553316373' alt='member' className='w-20 h-20 object-cover rounded-full' />
                            <p className='text-lg max-w-32  text-center'>Dora Bakogianni</p>
                        </div>
                    </div>
                </div>


                <div className='space-y-4'>
                    <div className='flex items-center gap-1 border-b-2 border-black'>
                        <p className='text-2xl'>Description</p>
                    </div>
                    <div className='space-y-1'>
                        {collaboration.idea && collaboration.idea.content.map((item, index) => {
                            if (item.type === 'paragraph' || item.type === 'bullets') {
                                return <p key={index} className='text-xl whitespace-pre-line'>{item.value}</p>
                            }
                            if (item.type === 'image') {
                                return <img key={index} src={item.value} alt={item.title} className='w-[800px] h-[500px] object-cover' />
                            }
                            return null
                        })}
                    </div>
                </div>
                <div className='space-y-2'>
                    <p className='text-2xl border-b-2 border-black'>Created at <span className='text-xl italic'>23/08/2015</span> By:</p>
                    <div className='flex flex-col w-fit items-center gap-1'>
                        <img src='https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/ProfileImages/n2uizm0t6qsv6yk6lx03r1718553316373' alt='member' className='w-20 h-20 object-cover rounded-full' />
                        <p className='text-lg max-w-32  text-center'>Dora Bakogianni</p>
                    </div>
                </div> 
                <div className={"absolute flex items-center gap-2 top-0 right-0 p-2 cursor-pointer hover:bg-black hover:text-white " + ticketColor} onClick={() => console.log('edit')}>
                    <p className='font-semibold text-lg'>{collaboration.status && collaboration.status[0].toUpperCase() + collaboration.status.slice(1,collaboration.status.length)}</p>
                    <SettingsIcon className='relative top-[1px]' />
                </div>
            </div>
        </div>
    )
}

export default CollaborationPage
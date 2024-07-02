import React from 'react'
import { useNavigate } from 'react-router-dom'

const CollaborationCard = ({ collaboration }) => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-[350px] flex flex-col items-center gap-1 shadow-md hover:shadow-xl cursor-pointer text-center' onClick={() => navigate('/collaboration-page/' + collaboration.status + "/" + collaboration.id)}>
            <div className='w-full h-64 bg-gray-500'>
                <img src={collaboration.idea.thumbnail} alt='collaboration' className='w-full h-full object-cover' />
            </div>
            <div className='px-2'>
                <p className='lg:text-xl text-lg'>{collaboration.idea.title.length > 75 ? collaboration.idea.title.slice(0, 75) + "..." : collaboration.idea.title}</p>
                <p className='text-base text-gray-600'>Created by {collaboration.created_by_name}</p>
            </div>
        </div>
    )
}

export default CollaborationCard
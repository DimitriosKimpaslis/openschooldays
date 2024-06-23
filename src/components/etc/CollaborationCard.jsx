import React from 'react'
import { useNavigate } from 'react-router-dom'

const CollaborationCard = ({ collaboration }) => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-[350px] flex flex-col items-center gap-1 shadow-md hover:shadow-xl cursor-pointer' onClick={() => navigate('/collaboration-page/' + collaboration.status + "/" + collaboration.id)}>
            <div className='w-full h-64 bg-gray-500'>
                <img src={collaboration.idea.thumbnail} alt='collaboration' className='w-full h-full object-cover' />
            </div>
            <p className='text-xl'>{collaboration.idea.title.length > 75 ? collaboration.idea.title.slice(0, 75) + "..." : collaboration.idea.title}</p>
            <p className='text-bg text-gray-600'>Created by {collaboration.created_by_name}</p>
        </div>
    )
}

export default CollaborationCard
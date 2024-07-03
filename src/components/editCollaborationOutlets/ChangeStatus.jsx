import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { supabase } from '../../client';

const ChangeStatus = () => {
    const collaboration = useOutletContext();
    const [status, setStatus] = useState(collaboration.status);
    const statusOptions = ['active', 'inactive', 'completed'];
    const navigate = useNavigate();
    const updateStatus = async () => {
        const {  error } = await supabase
            .from('collaboration')
            .update({ status: status })
            .eq('id', collaboration.id)
        if (error) {
            console.error('Error updating status:', error.message)
            return
        }
        navigate('/collaboration')
    }

    return (
        <div>
            <h1>Change Status</h1>
            <p className='pb-2'>Change the status of the collaboration</p>
            <p className='text-gray-500'>Active is for the currently running collaborations, Inactive for future ideas that are to be executed, and Completed for finished collaborations that no longer need our attention.</p>
            <div className='flex flex-wrap items-center gap-4 py-5'>
                {statusOptions.map((option, index) => {
                    return (
                        <button key={index} onClick={() => setStatus(option)} className={`bg-${option === status ? 'green' : 'gray'}-500 w-fit lg:hover:bg-gray-600 text-white px-8 py-4 text-xl`}>{option[0].toUpperCase() + option.slice(1,option.length)}</button>
                    )
                })
                }
            </div>
            <button onClick={updateStatus} className='bg-newSomon hover:bg-gray-600 text-newPink px-4 py-2 text-xl'>Update</button>
        </div>
    )
}

export default ChangeStatus
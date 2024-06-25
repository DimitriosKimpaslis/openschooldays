import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { supabase } from '../../client';

const ChangeStatus = () => {
    const collaboration = useOutletContext();
    const [status, setStatus] = useState(collaboration.status);
    const statusOptions = ['active', 'inactive', 'completed'];
    const navigate = useNavigate();
    const updateStatus = async () => {
        const { data, error } = await supabase
            .from('collaboration')
            .update({ status: status })
            .eq('id', collaboration.id)
        if (error) {
            console.error('Error updating status:', error.message)
            return
        }
        console.log(data)
        navigate('/collaboration')
    }

    return (
        <div>
            <h1>Change Status</h1>
            <div className='flex flex-col justify-center items-center gap-4 h-60 w-40'>
                {statusOptions.map((option, index) => {
                    return (
                        <button key={index} onClick={() => setStatus(option)} className={`bg-${option === status ? 'green' : 'gray'}-500 w-full hover:bg-gray-600 text-white px-8 py-4 text-xl`}>{option}</button>
                    )
                })
                }
            </div>
            <button onClick={updateStatus} className='bg-newSomon hover:bg-gray-600 text-newPink px-4 py-2 text-xl mt-10'>Update</button>
        </div>
    )
}

export default ChangeStatus
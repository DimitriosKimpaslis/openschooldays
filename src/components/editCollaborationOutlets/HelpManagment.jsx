import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from '../../client';
import { GlobalMessageContext } from '../../App';


const HelpManagment = () => {
    const collaboration = useOutletContext();
    const [helpNeeded, setHelpNeeded] = useState([])
    const { globalMessage, setGlobalMessage } = useContext(GlobalMessageContext)
    useEffect(() => {
        if (collaboration) {
            setHelpNeeded(collaboration.help_needed)
        }
    }, [collaboration])
    const navigate = useNavigate();

    const deleteHelp = async (helpIndex) => {
        const newHelpNeeded = helpNeeded.filter((help, index) => index !== helpIndex)
        const { error } = await supabase
            .from('collaboration')
            .update({
                help_needed: newHelpNeeded
            })
            .eq('id', collaboration.id)
        if (error) {
            console.error('Error deleting help:', error.message)
            return
        }
        setHelpNeeded(newHelpNeeded)
        setGlobalMessage({ ...globalMessage, open: false })
    }

    const cancelDelete = () => {
        setGlobalMessage({ ...globalMessage, open: false })
    }

    const deleteHelpQuestion = (helpIndex) => {
        setGlobalMessage({ message: "Are you sure you want to delete this help?", type: "warning", open: true, yes: () => deleteHelp(helpIndex), no: () => { cancelDelete() } })
    }

    return (
        <div>
            <h1>Help Posts</h1>
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-1 min-h-[300px]'>
                {(helpNeeded?.length === 0 || helpNeeded === null) ?
                    <div className='col-span-12'>
                        <p className='text-lg text-center text-gray-500'>No help posts in this collaboration</p>
                    </div>
                    :
                    helpNeeded?.map((help, helpIndex) => {
                        const readableDate = new Date(help.date).toDateString()
                        return (
                            <div className='w-full h-full gap-1 shadow-md hover:shadow-xl cursor-pointer relative' key={helpIndex} >
                                <div className='w-full h-32 bg-gray-500' onClick={() => navigate('/help-page/' + collaboration.id + "/" + helpIndex)}>
                                    <img src={collaboration.idea.thumbnail} alt='collaboration' className='w-full h-full object-cover' />
                                </div>
                                <div className='p-3' onClick={() => navigate('/help-page/' + collaboration.id + "/" + helpIndex)}>
                                    <p className='lg:text-xl text-lg font-bold'>{collaboration.idea.title.length > 75 ? collaboration.idea.title.slice(0, 75) + "..." : collaboration.idea.title}</p>
                                    <p className='lg:text-lg text-base'>{help.title}</p>
                                    <p className='lg:text-lg text-base text-gray-500'>{readableDate}</p>
                                </div>
                                <DeleteIcon className='absolute top-0 right-0 text-red-500 hover:text-red-800 cursor-pointer text-4xl bg-black' fontSize='' onClick={() => { deleteHelpQuestion(helpIndex) }} />
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default HelpManagment
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { GlobalMessageContext } from '../../App';
import { supabase } from '../../client';

const ManageUpdates = () => {
    const collaboration = useOutletContext();
    const [updates, setUpdates] = useState([])
    const navigate = useNavigate();
    const { globalMessage, setGlobalMessage } = useContext(GlobalMessageContext)

    useEffect(() => {
        setUpdates(collaboration.updates)
    }
        , [collaboration])
    
    const deleteUpdate = async (updateIndex) => {
        const newUpdates = updates.filter((update, index) => index !== updateIndex)
        const { error } = await supabase
            .from('collaboration')
            .update({
                updates: newUpdates
            })
            .eq('id', collaboration.id)
        if (error) {
            console.error('Error deleting update:', error.message)
            return
        }
        setUpdates(newUpdates)
        setGlobalMessage({ ...globalMessage, open: false })
    }

    const cancelDelete = () => {
        setGlobalMessage({ ...globalMessage, open: false })
    }

    const deleteUpdateQuestion = (updateIndex) => {
        setGlobalMessage({ message: "Are you sure you want to delete this update?", type: "warning", open: true, yes: () => deleteUpdate(updateIndex), no: () => { cancelDelete() } })
    }

  return (
      <div>
          <h1>Manage Updates</h1>
          <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-3 min-h-[300px]'>
              {(updates?.length === 0 || updates === null) ?
                  <div className='col-span-12'>
                      <p className='text-lg text-center text-gray-500'>No updates in this collaboration</p>
                  </div>
                  :
                  updates?.map((update, updateIndex) => {
                      const readableDate = new Date(update.date).toDateString()
                      return (
                          <div className='w-full h-full gap-1 shadow-md hover:shadow-xl cursor-pointer relative' key={updateIndex} >
                              <div className='w-full h-32 bg-gray-500' onClick={() => navigate('/help-page/' + collaboration.id + "/" + updateIndex)}>
                                  <img src={collaboration.idea.thumbnail} alt='collaboration' className='w-full h-full object-cover' />
                              </div>
                              <div className='p-3' onClick={() => navigate('/help-page/' + collaboration.id + "/" + updateIndex)}>
                                  <p className='lg:text-xl text-lg font-bold'>{collaboration.idea.title.length > 75 ? collaboration.idea.title.slice(0, 75) + "..." : collaboration.idea.title}</p>
                                  <p className='lg:text-lg text-base'>{update.title}</p>
                                  <p className='lg:text-lg text-base text-gray-500'>{readableDate}</p>
                              </div>
                              <DeleteIcon className='absolute top-0 right-0 text-red-500 hover:text-red-800 cursor-pointer text-4xl bg-black' fontSize='' onClick={() => { deleteUpdateQuestion(updateIndex) }} />
                          </div>
                      )
                  })
              }
          </div>
      </div>
  )
}

export default ManageUpdates
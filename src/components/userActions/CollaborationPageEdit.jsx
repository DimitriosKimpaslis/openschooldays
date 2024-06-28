import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../client'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { GlobalMessageContext, UserContext } from '../../App';
import ArrowBack from '../etc/ArrowBack';

const CollaborationPageEdit = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const [collaboration, setCollaboration] = useState({})

  const { globalMessage, setGlobalMessage } = useContext(GlobalMessageContext)
  const { user } = useContext(UserContext)
  console.log(globalMessage, "globalMessage")

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
    getCollaborationData()
  }
    , [])

  const leaveCollaborationQuestion = () => {

    const leaveCollaboration = async () => {
      if (collaboration.executed_by_uids === null) {
        console.error('Error leaving collaboration: No members to leave')
        setGlobalMessage({ ...globalMessage, open: false })
        return
      }
      const { error } = await supabase
        .from('collaboration')
        .update({
          executed_by_uids: collaboration.executed_by_uids.filter((uid) => uid !== user.id)
        })
        .eq('id', id)
      if (error) {
        console.error('Error leaving collaboration:', error.message)
        return
      }
      setGlobalMessage({ ...globalMessage, open: false })
      navigate('/collaboration')

    }

    setGlobalMessage({ message: "Are you sure you want to leave this collaboration?", type: "warning", open: true, yes: leaveCollaboration, no: () => { setGlobalMessage({ ...globalMessage, open: false }) } })
  }

  const deleteCollaborationQuestion = () => {

    const deleteCollaboration = async () => {
      const { error } = await supabase
        .from('collaboration')
        .update({ status: 'deleted by '.concat(user.id) })
        .eq('id', id)
      if (error) {
        console.error('Error deleting collaboration:', error.message)
        return
      }
      setGlobalMessage({ ...globalMessage, open: false })
      navigate('/collaboration')
    }

    setGlobalMessage({ message: "Are you sure you want to delete this collaboration? For security reasons, the collaboration will be temporarily disabled rather than permanently deleted, and the user executing this action will be recorded.", type: "warning", open: true, yes: deleteCollaboration, no: () => { setGlobalMessage({ ...globalMessage, open: false }) } })
  }



  return (
    <div className='relative container mx-auto'>
      <ArrowBack location={"/collaboration"} />
      <div className="flex justify-between items-center py-10">
        <div className='container mx-auto grid grid-cols-12 gap-4'>
          <div className='flex flex-col col-span-3 border-r-4 border-black py-1 mt-5 font-medium pr-1'>
            <p className=' px-10 py-3 text-xl hover:bg-black hover:text-white cursor-pointer' onClick={() => navigate("change-content/edit-collaboration/".concat(collaboration.id))}>Change Description</p>
            <p className=' px-10 py-3 text-xl hover:bg-black hover:text-white cursor-pointer' onClick={() => navigate('status')}>Change Status</p>
            <p className=' px-10 py-3 text-xl hover:bg-black hover:text-white cursor-pointer' onClick={() => navigate('members')}>Add people</p>
            <p className=' px-10 py-3 text-xl hover:bg-black hover:text-white cursor-pointer'>Post update</p>
            <p className=' px-10 py-3 text-xl hover:bg-black hover:text-white cursor-pointer' onClick={() => navigate("create-help")}>Alert for help</p>
            <p className=' px-10 py-3 text-xl hover:bg-black hover:text-white cursor-pointer' onClick={() => navigate("manage-help")}>Manage help</p>
            <div className='flex items-center gap-2 px-10 pt-16 pb-2'>
              <p className=' text-xl'>Dangerous Zone</p>
              <ReportProblemIcon className='text-red-500 relative top-[1px]' />
            </div>
            <p className=' px-10 py-3 text-xl bg-red-500 hover:bg-black hover:text-white cursor-pointer mb-1' onClick={leaveCollaborationQuestion}>Leave collaboration</p>
            <p className=' px-10 py-3 text-xl hover:bg-black hover:text-white cursor-pointer bg-red-500' onClick={deleteCollaborationQuestion}>Delete collaboration</p>
          </div>
          <div className='col-span-9'>
            <Outlet context={collaboration} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollaborationPageEdit
import React, { useEffect, useState } from 'react'
import { supabase } from '../../client'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const CollaborationPageEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [collaboration, setCollaboration] = useState({})
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

  return (
    <div className='relative'>
      <div className="flex justify-between items-center">
        <div className='container mx-auto grid grid-cols-12 gap-4'>
          <div className='flex flex-col col-span-3 border-r-4 border-black py-1 mt-5 font-medium'>
            <p className=' px-10 py-3 text-xl hover:bg-black hover:text-white cursor-pointer'>Change Title/Content/Thumbnail</p>
            <p className=' px-10 py-3 text-xl hover:bg-black hover:text-white cursor-pointer'>Change Collaboration Status {collaboration.status}</p>
            <p className=' px-10 py-3 text-xl hover:bg-black hover:text-white cursor-pointer' onClick={() => navigate('members')}>Add people to execution</p>
            <p className=' px-10 py-3 text-xl hover:bg-black hover:text-white cursor-pointer'>Post update</p>
            <p className=' px-10 py-3 text-xl hover:bg-black hover:text-white cursor-pointer'>Alert for help</p>
            <div className='flex items-center gap-2 px-10 pt-16 pb-2'>
              <p className=' text-xl'>Dangerous Zone</p>
              <ReportProblemIcon className='text-red-500 relative top-[1px]' />
            </div>
            <p className=' px-10 py-3 text-xl bg-red-500 hover:bg-black hover:text-white cursor-pointer mb-1'>Leave collaboration</p>
            <p className=' px-10 py-3 text-xl hover:bg-black hover:text-white cursor-pointer bg-red-500'>Delete collaboration</p>
          </div>
          <div className='col-span-9'>
            <Outlet context={collaboration}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollaborationPageEdit
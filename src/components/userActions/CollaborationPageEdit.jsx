import React, { useEffect, useState } from 'react'
import { supabase } from '../../client'
import { useParams } from 'react-router-dom'

const CollaborationPageEdit = () => {
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
    <div>
      <div className='h-[200px] bg-black'></div>
      <div className="flex justify-between items-center">
        <div className='container mx-auto'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold'>Edit Collaboration</h1>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CollaborationPageEdit
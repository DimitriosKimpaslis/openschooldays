import React from 'react'
import { supabase } from '../client'
import { useNavigate } from 'react-router-dom'

const Profile = () => {


    const navigate = useNavigate()
    
    const changeURL = () => {
        window.location.href = '/';
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        changeURL()
    }

    return (
        <div className='w-full bg-black h-screen'>
            <div className='h-[20%]'>

            </div>
            <div className='grid grid-cols-2 h-[80%]'>
                <div onClick={signOut} className='bg-red-600 hover:bg-red-700 flex justify-center items-center cursor-pointer'>
                    <p className='text-5xl'>Logout</p>
                </div>
                <div className='bg-blue-600 hover:bg-blue-700 flex justify-center items-center cursor-pointer' onClick={() => navigate('/edit-profile')}>
                    <p className='text-5xl'>Edit Profile</p>
                </div>
                <div onClick={() => navigate('/blog-creation')} className='bg-green-600  hover:bg-green-700 flex justify-center items-center cursor-pointer'>
                    <p className='text-5xl'>Create Blog Post</p>
                </div>
                <div className='bg-purple-600 hover:bg-purple-700 flex justify-center items-center cursor-pointer'>
                    <p className='text-5xl'>Collaboration Tool</p>
                </div>

            </div>
        </div>
    )
}

export default Profile
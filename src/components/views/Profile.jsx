import React from 'react'
import { supabase } from '../../client'
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
        <div className='conatiner lg:pt-32 pt-20 pb-10'>
            <div className='flex lg:flex-row flex-col lg:h-[500px]  justify-center items-center gap-3 font-light'>
                <div onClick={() => navigate('/edit-profile')} className='bg-newPink hover:bg-white hover:text-newPink transition-colors hover:shadow-newPink hover:shadow-md w-[200px] h-[200px] flex justify-center items-center cursor-pointer rounded-full border'>
                    <p className='text-3xl text-center'>Profile</p>
                </div>
                <div onClick={() => navigate('/collaboration')} className='bg-newPurple hover:bg-white hover:text-newPurple transition-colors hover:shadow-newPurple hover:shadow-md lg:w-[300px] lg:h-[300px] w-[200px] h-[200px] flex justify-center items-center cursor-pointer rounded-full border'>
                    <p className='text-3xl text-center'>Collaboration</p>
                </div>
                <div onClick={() => navigate('/blog-creation')} className='bg-newPurple2 hover:bg-white hover:text-newPurple2 transition-colors hover:shadow-newPurple2 hover:shadow-md lg:w-[250px] lg:h-[250px] w-[200px] h-[200px] flex justify-center items-center cursor-pointer rounded-full border'>
                    <p className='text-3xl text-center'>Create Blog</p>
                </div>
                <div onClick={() => navigate('/your-blogs/1')} className='bg-newPurple hover:bg-white hover:text-newPurple  transition-colors hover:shadow-newPurple hover:shadow-md lg:w-[220px] lg:h-[220px] w-[200px] h-[200px] flex justify-center items-center cursor-pointer rounded-full border'>
                    <p className='text-3xl text-center'>Blog Posts</p>
                </div>
                <div onClick={signOut} className='bg-red-600 hover:bg-white hover:text-red-600 transition-colors hover:shadow-red-600 hover:shadow-md w-[150px] h-[150px] flex justify-center items-center cursor-pointer rounded-full border'>
                    <p className='text-3xl text-center'>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default Profile
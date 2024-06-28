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
        <div className='conatiner'>

            <div className='grid grid-cols-2 text-white'>

                <div className='col-span-1 flex justify-end pr-6'>
                    <div onClick={() => navigate('/collaboration')} className='bg-newPurple hover:bg-white hover:text-newPurple transition-colors hover:shadow-newPurple hover:shadow-md w-[200px] h-[200px] flex justify-center items-center cursor-pointer rounded-full border'>
                        <p className='text-3xl text-center'>Collaboration</p>
                    </div>
                </div>
                <div className='col-span-1 flex justify-start pl-6'>
                    <div onClick={() => navigate('/edit-profile')} className='bg-newPink hover:bg-white hover:text-newPink transition-colors hover:shadow-newPink hover:shadow-md w-[200px] h-[200px] flex justify-center items-center cursor-pointer rounded-full border'>
                        <p className='text-3xl text-center'>Profile</p>
                    </div>
                </div>
                <div className='col-span-1 flex justify-end pr-20'>
                    <div onClick={() => navigate('/blog-creation')} className='bg-newPurple2 hover:bg-white hover:text-newPurple2 transition-colors hover:shadow-newPurple2 hover:shadow-md w-[200px] h-[200px] flex justify-center items-center cursor-pointer rounded-full border'>
                        <p className='text-3xl text-center'>Create Blog</p>
                    </div>
                </div>
                <div className='col-span-1 flex justify-start pl-20'>
                    <div onClick={() => navigate('/your-blogs/1')} className='bg-newPurple hover:bg-white hover:text-newPurple transition-colors hover:shadow-newPurple hover:shadow-md w-[200px] h-[200px] flex justify-center items-center cursor-pointer rounded-full border'>
                        <p className='text-3xl text-center'>Blog Posts</p>
                    </div>
                </div>
                
                <div className='col-span-2 flex justify-center bottom-5 relative'>
                    <div onClick={signOut} className='bg-red-600 hover:bg-white hover:text-red-600 transition-colors hover:shadow-red-600 hover:shadow-md w-[200px] h-[200px] flex justify-center items-center cursor-pointer rounded-full border'>
                        <p className='text-3xl text-center'>Logout</p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Profile
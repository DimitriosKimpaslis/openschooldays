import React, { useEffect, useState } from 'react'
import { supabase } from '../../client'

const BlogFooter = (props) => {
    const { user_uid } = props
    const [author, setAuthor] = useState({})

    const fetchAuthor = async () => {
        const { data, error } = await supabase
            .from('usersInfo')
            .select('*')
            .eq('uid', user_uid)
        if (error) {
            console.error('Error fetching author:', error.message)
            return
        }
        setAuthor(data[0])
    }

    useEffect(() => {
        fetchAuthor()
    }
        , [user_uid])

    return (
        <div className='shadow-lg p-4 w-[600px] h-fit mb-10'>
            <div className='flex items-center gap-4'>
                <img src={author.image} alt='author' className='w-14 h-14 rounded-full object-cover' />
                <div>
                    <h1 className='text-2xl font-semibold'>{author.name} {author.surname}</h1>
                    <p className='text-gray-500'>{author.description}</p>
                </div>
            </div>
        </div>
    )
}

export default BlogFooter
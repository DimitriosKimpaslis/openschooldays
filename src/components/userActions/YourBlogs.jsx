import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../client';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { UserContext } from '../../App';

const YourBlogs = () => {
    const [loading, setLoading] = useState(true)
    const { page } = useParams();
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [lastPageExists, setLastPageExists] = useState(true)
    const getPosts = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('author_uid', user.id)
            .range(page * 12 - 12, page * 12 - 1)
        if (error) {
            console.error('Error fetching posts:', error.message)
            return
        }
        if (data.length < 12) {
            setLastPageExists(false)
        } else {
            setLastPageExists(true)
        }
        setPosts(data)
        setLoading(false)
    }

    useEffect(() => {
        getPosts()
    }, [page])

    const goToNextPage = () => {
        navigate('/your-blogs/' + (parseInt(page) + 1))
    }

    const goToPreviousPage = () => {
        navigate('/your-blogs/' + (parseInt(page) - 1))
    }

    const editPost = (postId) => {
        navigate('/edit-post/' + postId)
    }

    return (
        <div>
            <div className='bg-black h-[200px]'>
            </div>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center gap-5 max-w-[1200px]'>
                    <h1 className='text-5xl text-center border-yellow-400 border-8 border-dashed p-4'>Edit Your Blogs</h1>
                    {loading ?
                        <div className='w-full h-[500px] flex justify-center items-center'>
                            <CircularProgress />
                        </div> :
                        <div className='grid grid-cols-3 gap-5'>
                            {posts.map((post, index) => {
                                let description = post.content.filter(item => item.type === 'paragraph').map(item => item.value)[0]
                                const readableDate = new Date(post.created_at).toDateString()
                                return (
                                    <div key={index} className='shadow-lg p-4 cursor-pointer overflow-hidden w-[400px] h-[450px] space-y-4' onClick={() => { editPost(post.id) }}>
                                        <img src={post.thumbnail} alt={post.title + " image"} className='w-full h-[200px] object-cover' />
                                        <h1 className='text-2xl font-semibold'>{post.title}</h1>
                                        <p className='text-gray-500'>{description && description.slice(0, 100) + '...'}</p>
                                        <div className='flex justify-between items-center'>
                                            <p className='text-gray-400'>{post.author}</p>
                                            <p className='text-gray-400'>{readableDate}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }<div className='flex justify-center items-center gap-5 mt-5 mb-10 w-full'>
                        {parseInt(page) !== 1 && <button className='bg-newSomon hover:bg-newPink text-white px-4 py-2 rounded-full' onClick={goToPreviousPage}>Previous Page</button>}
                        {lastPageExists && <button className='bg-newSomon hover:bg-newPink text-white px-4 py-2 rounded-full' onClick={goToNextPage}>Next Page</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourBlogs
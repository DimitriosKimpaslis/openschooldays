import React, { useEffect, useState } from 'react'
import { supabase } from '../../client';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Blogs = () => {
    const [loading, setLoading] = useState(true)
    const { page } = useParams();
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [lastPageExists, setLastPageExists] = useState(true)
    const getPosts = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('posts')
            .select('*')
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
        navigate('/blog/' + (parseInt(page) + 1))
    }

    const goToPreviousPage = () => {
        navigate('/blog/' + (parseInt(page) - 1))
    }

    return (
        <div>

                <div className='container mx-auto flex flex-col items-center gap-5'>
                    <h1 className='text-5xl text-center'>Blogs</h1>
                    {loading ?
                        <div className='w-full h-[500px] flex justify-center items-center'>
                            <CircularProgress />
                        </div> :
                        <div className='grid grid-cols-3 gap-5'>
                            {posts.map((post, index) => {
                                // have to store the name of the author in the posts table
                                let description = post.content.filter(item => item.type === 'paragraph').map(item => item.value)[0]
                                const readableDate = new Date(post.created_at).toDateString()
                                return (
                                    <div key={index} className='shadow-lg p-4 cursor-pointer overflow-hidden w-[400px] h-[450px] space-y-4' onClick={() => navigate('/blog-post/' + post.id)}>
                                        <img src={post.thumbnail} alt={post.title + " image"} className='w-full h-[200px] object-contain bg-black' />
                                        <p className='text-2xl font-semibold'>{post.title}</p>
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
    )
}

export default Blogs
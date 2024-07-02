import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../client';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { GlobalMessageContext, UserContext } from '../../App';
import DeleteIcon from '@mui/icons-material/Delete';

const YourBlogs = () => {
    const [loading, setLoading] = useState(true)
    const { page } = useParams();
    const { user } = useContext(UserContext)
    const { globalMessage, setGlobalMessage } = useContext(GlobalMessageContext)
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [lastPageExists, setLastPageExists] = useState(true)
    const getPosts = async () => {
        setLoading(true)
        if(!user) return
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
    }, [page, user])

    const goToNextPage = () => {
        navigate('/your-blogs/' + (parseInt(page) + 1))
    }

    const goToPreviousPage = () => {
        navigate('/your-blogs/' + (parseInt(page) - 1))
    }

    const editPost = (postId) => {
        navigate('/create-collaboration/edit-blog/'.concat(postId))
    }

    const deletePost = async (postId) => {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId)
        if (error) {
            console.error('Error deleting post:', error.message)
            return
        }
        setGlobalMessage({ ...globalMessage, open: false })
        getPosts()
    }

    const deletePostQuestion = (postId) => {
        setGlobalMessage({
            message: 'Are you sure you want to delete this post?',
            type: 'warning',
            open: true,
            yes: () => { deletePost(postId) },
            no: () => { setGlobalMessage({ ...globalMessage, open: false }) }
        })
    }


    return (
        <div>

            <div className='container mx-auto flex flex-col items-center gap-5 px-3 py-10'>
                <p className='lg:text-5xl text-3xl text-center border-yellow-400 border-8 border-dashed p-4'>Edit Your Blogs</p>
                {loading ?
                    <div className='w-full h-[500px] flex justify-center items-center'>
                        <CircularProgress />
                    </div> :
                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
                        {posts.map((post, index) => {
                            let description = post.content.filter(item => item.type === 'paragraph').map(item => item.value)[0]
                            const readableDate = new Date(post.created_at).toDateString()
                            return (
                                <div key={index} className='shadow-lg p-4 cursor-pointer overflow-hidden xl:w-[400px] lg:w-[300px]  space-y-4 relative' onClick={() => { editPost(post.id) }}>
                                    <img src={post.thumbnail} alt={post.title + " image"} className='w-full h-[200px] object-cover' />
                                    <p className='xl:text-2xl text-lg font-semibold'>{post.title}</p>
                                    <p className='text-gray-500 text-lg'>{description && description.slice(0, 100) + '...'}</p>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-gray-400'>{readableDate}</p>
                                    </div>
                                    <DeleteIcon className='absolute top-0 right-0 cursor-pointer text-red-500 hover:text-red-700 bg-black text-3xl' fontSize='' onClick={(e) => { e.stopPropagation(); deletePostQuestion(post.id) }} />
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

export default YourBlogs
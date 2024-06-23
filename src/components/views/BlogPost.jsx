import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../client'
import { useParams } from 'react-router-dom'
import BlogFooter from '../etc/BlogFooter'
import { CircularProgress } from '@mui/material'

const BlogPost = () => {
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)
    const { postId } = useParams()
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', postId)
            if (error) {
                console.error('Error fetching post:', error.message)
                return
            }
            setPost(data[0])
            setLoading(false)
        }
        fetchPost()
    }, [postId])

    return (
        <div>
            {loading ?
                <div className='w-full h-[500px] flex justify-center items-center'>
                    <CircularProgress />
                </div> :
                    <div className='container mx-auto flex flex-col items-center gap-5 max-w-[800px]'>
                        <h1 className='text-5xl font-bold'>{post.title}</h1>
                        {post.thumbnail && <img src={post.thumbnail} alt={post.title + " image"} className='w-[800px] h-[500px] object-contain' />}
                        <div>
                            {post.content && post.content.map((item, index) => {
                                if (item.type === 'title') {
                                    return <p key={index} className='text-3xl font-semibold'>{item.value}</p>
                                }
                                if (item.type === 'paragraph') {
                                    return <p key={index} className='text-xl'>{item.value}</p>
                                }
                                if (item.type === 'image') {
                                    return <img key={index} src={item.value} alt={post.title} className='w-[800px] h-[500px] object-cover' />
                                }
                                return null
                            })}
                        </div>
                        <BlogFooter user_uid={post.author_uid} />
                    </div>
            }
        </div>
    )
}

export default BlogPost
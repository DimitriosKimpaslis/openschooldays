import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { supabase } from '../../client'
import { useNavigate, useParams } from 'react-router-dom'

const EditPreview = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState([])
    const [thumbnail, setThumbnail] = useState('')
    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        let previewTitle = localStorage.getItem('edit-title')
        setTitle(JSON.parse(previewTitle).value)

        let previewContent = localStorage.getItem('edit-content')
        setContent(JSON.parse(previewContent))

        let previewThumbnail = localStorage.getItem('edit-thumbnail')
        setThumbnail(previewThumbnail)
    }, [])

    const { user } = useContext(UserContext)
    const userId = user.id

    const handleUpdateUpload = async () => {

        const { data, error } = await supabase
            .from('posts')
            .update({
                title: title,
                content: content,
                thumbnail: thumbnail,
            })
            .eq('id', postId)
        if (error) {
            console.error('Error inserting new post:', error.message)
            return
        }

        console.log('New post inserted:', data)
        localStorage.removeItem('edit-title')
        localStorage.removeItem('edit-content')
        localStorage.removeItem('edit-thumbnail')
        navigate('/')
    }

    return (
        <div>
                <div className='container mx-auto flex flex-col items-center gap-5'>
                    <h1 className='text-5xl font-bold'>{title}</h1>
                    {thumbnail && <img src={thumbnail} alt={title + " image"} className='w-[600px] h-[400px] object-cover' />}
                    <div>
                        {content.map((item, index) => {
                            if (item.type === 'title') {
                                return <p key={index} className='text-3xl font-semibold'>{item.value}</p>
                            }
                            if (item.type === 'paragraph') {
                                return <p key={index} className='text-xl'>{item.value}</p>
                            }
                            if (item.type === 'image') {
                                return <img key={index} src={item.value} alt={title} className='w-[600px] h-[400px] object-cover' />
                            }
                            return null
                        })}
                    </div>
                    <button onClick={handleUpdateUpload} className='bg-blue-500 text-white px-5 py-2 rounded-md'>Update</button>
                </div>

        </div>
    )
}

export default EditPreview
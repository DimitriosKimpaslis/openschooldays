import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { supabase } from '../client'

const Preview = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState([])
  const [thumbnail, setThumbnail] = useState('')

  useEffect(() => {
    let previewTitle = localStorage.getItem('title')
    setTitle(JSON.parse(previewTitle).value)

    let previewContent = localStorage.getItem('content')
    setContent(JSON.parse(previewContent))

    let previewThumbnail = localStorage.getItem('thumbnail')
    console.log(previewThumbnail, 'previewThumbnail', typeof previewThumbnail)
    setThumbnail(previewThumbnail)
  }, [])

  const { user } = useContext(UserContext)
  const userId = user.id

  const handleUpload = async () => {

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title: title,
          content: content,
          thumbnail: thumbnail,
          author: user.email,
          author_uid: userId
        }
      ])

    if (error) {
      console.error('Error inserting new post:', error.message)
      return
    }

    console.log('New post inserted:', data)
  }

  return (
    <div>
      <div className='h-[200px] bg-black'></div>
      <div className='flex flex-col items-center gap-5'>
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
        <button onClick={handleUpload} className='bg-blue-500 text-white px-5 py-2 rounded-md'>Publish</button>
      </div>
    </div>
  )
}

export default Preview
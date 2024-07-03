import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { supabase } from '../../client'
import { useNavigate } from 'react-router-dom'

const Preview = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState([])
  const [thumbnail, setThumbnail] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    let previewTitle = localStorage.getItem('title')
    setTitle(JSON.parse(previewTitle).value)

    let previewContent = localStorage.getItem('content')
    setContent(JSON.parse(previewContent))

    let previewThumbnail = localStorage.getItem('thumbnail')
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
    localStorage.removeItem('title')
    localStorage.removeItem('content')
    localStorage.removeItem('thumbnail')
    navigate('/')
  }

  return (
    <div className='lg:my-48 my-20'>
        {/* <div className='container mx-auto flex flex-col items-center gap-5'>
          <h1 className='text-5xl font-bold'>{title}</h1>
          {thumbnail && <img src={thumbnail} alt={title + " image"} className='w-[800px] h-[500px] object-contain' />}
          <div>
          {content.map((item, index) => {
              if (item.type === 'title') {
                return <p key={index} className='text-3xl font-semibold'>{item.value}</p>
              }
              if (item.type === 'paragraph') {
                return <p key={index} className='text-xl'>{item.value}</p>
              }
              if (item.type === "bullets") {
                return <p key={index} className='text-xl whitespace-pre-line'>{item.value}</p>
              }
              if (item.type === 'image') {
                return <img key={index} src={item.value} alt={title} className='w-[800px] h-[500px] object-cover' />
              }
              return null
            })}
          </div>
          <button onClick={handleUpload} className='bg-blue-500 text-white px-5 py-2 rounded-md'>Publish</button>
      </div> */}
      <div className='container mx-auto flex flex-col items-center gap-5 max-w-[800px] lg:px-0 px-4'>
        <p className='sm:text-5xl text-4xl font-bold'>{title}</p>
        {thumbnail && <img src={thumbnail} alt={title + " image"} className='sm:w-[800px] sm:h-[500px] object-contain bg-black' />}
        <div className='space-y-5'>
          {content && content.map((item, index) => {
            if (item.type === 'title') {
              return <p key={index} className='sm:text-3xl text-2xl font-semibold'>{item.value}</p>
            }
            if (item.type === 'paragraph') {
              return <p key={index} className='sm:text-xl text-lg'>{item.value}</p>
            }
            if (item.type === "bullets") {
              return <p key={index} className='sm:text-xl text-lg whitespace-pre-line'>{item.value}</p>
            }
            if (item.type === 'image') {
              return <img key={index} src={item.value} alt={title} className='sm:w-[800px] sm:h-[500px] object-contain' />
            }
            return null
          })}
        </div>
        <button onClick={handleUpload} className='bg-newSomon hover:bg-gray-600 text-newPink px-10 py-2 text-xl'>Update</button>
      </div>
    
    </div>
  )
}

export default Preview
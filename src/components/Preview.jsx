import React, { useEffect, useState } from 'react'

const Preview = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState([])
  const [thumbnail, setThumbnail] = useState()

  useEffect(() => {
    let previewTitle = localStorage.getItem('title')
    setTitle(JSON.parse(previewTitle).value)

    let previewContent = localStorage.getItem('content')
    setContent(JSON.parse(previewContent))

    let previewThumbnail = localStorage.getItem('thumbnail')
    setThumbnail(previewThumbnail)
  }, [])

  useEffect(() => {
    console.log(thumbnail)
  }
  , [thumbnail])


  return (
    <div>
      <div className='h-[200px] bg-black'></div>
      <h1 className='text-5xl font-bold'>{title}</h1>
      {thumbnail && <img src={thumbnail} alt={title + " image"} className='w-[600px] h-[400px] object-cover'/>}
      <div>
        {content.map((item, index) => {
          if (item.type === 'title') {
            return <p key={index} className='text-3xl font-semibold'>{item.value}</p>
          }
          if (item.type === 'paragraph') {
            return <p key={index} className='text-xl'>{item.value}</p>
          }
          if (item.type === 'image') {
            return <img key={index} src={item.value} alt={title} />
          }
          return null
        })}
      </div>
    </div>
  )
}

export default Preview
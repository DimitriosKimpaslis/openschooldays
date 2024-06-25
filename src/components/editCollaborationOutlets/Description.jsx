import React from 'react'
import { useOutletContext } from 'react-router-dom';

const Description = () => {
  const collaboration = useOutletContext();


  return (
    <div>
      <h1>Description</h1>
      <div className='space-y-1'>
        <p className='text-2xl font-semibold'>{collaboration.idea && collaboration.idea.title}</p>
        {collaboration.idea && collaboration.idea.content.map((item, index) => {
          if (item.type === 'paragraph' || item.type === 'bullets') {
            return <p key={index} className='text-xl whitespace-pre-line'>{item.value}</p>
          }
          if (item.type === 'image') {
            return <img key={index} src={item.value} alt={item.title} className='w-full h-[600px] object-left object-contain' />
          }
          return null
        })}
      </div>
    </div>
  )
}

export default Description
import React from 'react'

const Preview = () => {
  const postContent = localStorage.getItem('postContent');
  const { title, content } = JSON.parse(postContent);
  console.log(title)
  return (
    <div>
      <div className='h-[200px] bg-black'></div>
      <h1 className='text-5xl font-bold'>{title}</h1>
      <img src={'https://media.istockphoto.com/id/484296157/vector/highly-detailed-crowd.jpg?s=612x612&w=0&k=20&c=L_biErz4J2oP2ZG5Al3E5kbnBvbH-fJfND67wPcgXs8='} alt={title} />
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
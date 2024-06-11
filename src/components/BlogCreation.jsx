import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import TitleIcon from '@mui/icons-material/Title';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ImageIcon from '@mui/icons-material/Image';
import { Tooltip } from '@mui/material';

const BlogCreation = () => {
    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [content, setContent] = useState([])

    useEffect(() => {
        console.log(content)
    }, [content])


    const addNewRows = (e) => {
        const inputElement = e.target
        const lineHeight = parseInt(window.getComputedStyle(inputElement).lineHeight);
        const rows = Math.ceil(inputElement.scrollHeight / lineHeight);
        inputElement.rows = rows - 1;
    }

    const handleContentChange = (e, index) => {
        const updatedContent = [...content]
        updatedContent[index].value = e.target.value
        setContent(updatedContent)
        addNewRows(e)
    }



    const addNewField = (type) => {
        const updatedContent = [...content]
        switch (type) {
            case 'title':
                updatedContent.push({ type: 'title', value: '' })
                break
            case 'paragraph':
                updatedContent.push({ type: 'paragraph', value: '' })
                break
            case 'bullets':
                updatedContent.push({ type: 'bullets', value: [] })
                break
            case 'image':
                updatedContent.push({ type: 'image', value: '' })
                break
            default:
                break
        }

        setContent(updatedContent)
    }

    return (
        <div className='flex flex-col items-center text-2xl'>
            <div className='h-[300px]'></div>
            <h1>Blog Creation</h1>
            <form className='space-y-5'>
                <div>
                    <label>Title:</label>
                    <input className='' type="text" />
                </div>
                <div>
                    <label>Thumbnail:</label>
                    <input type="file" />
                </div>
                <div>
                    <label>Add Content:</label>
                    <div id='add-content' className='flex flex-col'>
                        {content.map((field, index) => {
                            switch (field.type) {
                                case 'title':
                                    return <textarea key={index} onChange={(e) => handleContentChange(e, index)} className='font-semibold text-5xl resize-none overflow-hidden focus:outline-none' rows={1} value={content[index].value} />
                                case 'paragraph':
                                    return <textarea key={index} onChange={(e) => handleContentChange(e, index)} className=' text-2xl resize-none overflow-hidden' rows={5} />
                                case 'bullets':
                                    return <ul key={index}>
                                        {field.value.map((bullet, i) => {
                                            return <li key={i}><input onChange={(e) => handleContentChange(e, index)} type='text' /></li>
                                        })}
                                    </ul>
                                case 'image':
                                    return <input key={index} onChange={(e) => handleContentChange(e, index)} type='file' />
                                default:
                                    return null
                            }
                        })}
                    </div>
                    <div className='flex space-x-3'>
                        <div className='bg-white flex items-center justify-center'><AddIcon className='text-4xl text-newPurple' fontSize='' /></div>
                        <div id='action-bar' className='w-64 bg-newPurple h-14 grid grid-cols-4 p-1 gap-1'>
                            <Tooltip title={<p className='text-base'>Title</p>}>
                                <div className='bg-white flex items-center justify-center hover:bg-newPurple hover:text-white cursor-pointer '  onClick={() => addNewField('title')}>
                                    <TitleIcon />
                                </div>
                            </Tooltip>
                            <Tooltip title={<p className='text-base'>Paragraph</p>}>
                                <div className='bg-white flex items-center justify-center hover:bg-newPurple hover:text-white cursor-pointer' onClick={() => addNewField('paragraph')}>
                                    <FormatAlignJustifyIcon />
                                </div>
                            </Tooltip>
                            <Tooltip title={<p className='text-base'>Bullets</p>}>
                                <div className='bg-white flex items-center justify-center hover:bg-newPurple hover:text-white cursor-pointer' onClick={() => addNewField('bullets')}>
                                    <FormatListBulletedIcon />
                                </div>
                            </Tooltip>
                            <Tooltip title={<p className='text-base'>Image</p>}>
                                <div className='bg-white flex items-center justify-center hover:bg-newPurple hover:text-white cursor-pointer' onClick={() => addNewField('image')}>
                                    <ImageIcon />
                                </div>
                            </Tooltip>
                        </div>
                    </div>

                </div>
                <button type='button' className='p-4 bg-newSomon text-newPurple2 hover:bg-newPurple2 hover:text-newSomon'>Preview</button>
            </form>
        </div>
    )
}

export default BlogCreation
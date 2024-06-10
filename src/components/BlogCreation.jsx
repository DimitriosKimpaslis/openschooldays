import React, { useState } from 'react'
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

    const addNewField = (type) => {
        const addContentField = document.getElementById('add-content')
        switch(type) {
            case 'title':
                setContent([...content, { type: 'title', value: '' }])
                addContentField.innerHTML += `<input type='text' class='font-semibold text-5xl'/>`
                break
            case 'paragraph':
                setContent([...content, { type: 'paragraph', value: '' }])
                addContentField.innerHTML += `<textarea></textarea>`
                break
            case 'bullets':
                setContent([...content, { type: 'bullets', value: [] }])
                addContentField.innerHTML += `<ul><li><input type='text' /></li></ul>`
                break
            case 'image':
                setContent([...content, { type: 'image', value: '' }])
                addContentField.innerHTML += `<input type='file' />`
                break
            default:
                break
        }
    }

    return (
        <div className='flex flex-col items-center text-2xl border'>
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

                    </div>
                    <div className='flex space-x-3'>
                        <div className='bg-white flex items-center justify-center'><AddIcon className='text-4xl text-newPurple' fontSize='' /></div>
                        <div id='action-bar' className='w-64 bg-newPurple h-14 grid grid-cols-4 p-1 gap-1'>
                            <Tooltip title={<p className='text-base'>Title</p>}>
                                <div className='bg-white flex items-center justify-center hover:bg-newPurple hover:text-white cursor-pointer' onClick={() => addNewField('title')}>
                                    <TitleIcon />
                                </div>
                            </Tooltip>
                            <Tooltip title={<p className='text-base'>Paragraph</p>}>
                                <div className='bg-white flex items-center justify-center hover:bg-newPurple hover:text-white cursor-pointer' onClick={() => addNewField('title')}>
                                    <FormatAlignJustifyIcon />
                                </div>
                            </Tooltip>
                            <Tooltip title={<p className='text-base'>Bullets</p>}>
                                <div className='bg-white flex items-center justify-center hover:bg-newPurple hover:text-white cursor-pointer' onClick={() => addNewField('title')}>
                                    <FormatListBulletedIcon />
                                </div>
                            </Tooltip>
                            <Tooltip title={<p className='text-base'>Image</p>}>
                                <div className='bg-white flex items-center justify-center hover:bg-newPurple hover:text-white cursor-pointer' onClick={() => addNewField('title')}>
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
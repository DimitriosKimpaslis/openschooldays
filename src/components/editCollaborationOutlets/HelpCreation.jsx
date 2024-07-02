import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { DynamicTextArea } from '../etc/DynamicTextArea';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { supabase } from '../../client';


const HelpCreation = () => {
    const collaboration = useOutletContext();
    const [content, setContent] = useState([]);
    const [title, setTitle] = useState('')
    const navigate = useNavigate();

    const addNewRows = (e) => {
        const inputElement = e.target
        const lineHeight = parseInt(window.getComputedStyle(inputElement).lineHeight, 10);
        const rows = Math.ceil(inputElement.scrollHeight / lineHeight);
        inputElement.rows = rows - 1// -1 to prevent the text area from scrolling down when the user types;
        return rows - 1;
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }


    const handleContentChange = (e, index) => {
        let inputRows
        if (e.target.value.length === 0) {
            e.target.rows = 1;
        } else {
            inputRows = addNewRows(e)
        }
        const updatedContent = [...content]
        updatedContent[index].value = e.target.value
        if (updatedContent[index].type === 'bullets' && e.target.value === '') {
            updatedContent[index].value = '• '
        }
        updatedContent[index].rows = inputRows
        setContent(updatedContent)
    }

    const checkEnter = (e, index) => {
        if (e.key === "Enter") {
            const updatedContent = [...content]
            updatedContent[index].value = updatedContent[index].value + "• "; // add a bullet point to the value string
            setContent(updatedContent)
        }
    };

    const addNewField = (type) => {
        const updatedContent = [...content]
        switch (type) {
            case 'title':
                updatedContent.push({ type: 'title', value: '', rows: 1 })
                break
            case 'paragraph':
                updatedContent.push({ type: 'paragraph', value: '', rows: 1 })
                break
            case 'bullets':
                updatedContent.push({ type: 'bullets', value: '• ', rows: 1 })
                break
            default:
                break
        }

        setContent(updatedContent)
    }

    const removeField = (index) => {
        const updatedContent = [...content]
        updatedContent.splice(index, 1)
        setContent(updatedContent)
    }

    const uploadHelp = async () => {
        if (title === '') {
            alert('Please add a title')
            return
        }
        if (collaboration.help_needed === null) {
            const { error } = await supabase
                .from('collaboration')
                .update({ help_needed: [{ title, content, date: new Date() }] })
                .eq('id', collaboration.id)
            if (error) {
                console.error('Error uploading help:', error.message)
                return
            }
        } else {
            const { error } = await supabase
                .from('collaboration')
                .update({ help_needed: [...collaboration.help_needed, { title, content, date: new Date() }] })
                .eq('id', collaboration.id)
            if (error) {
                console.error('Error uploading help:', error.message)
                return
            }
        }
        navigate('/collaboration')
    }

    return (
        <div>
            <h1>Help Creation</h1>
            <div className='flex flex-col gap-5 mb-10 h-fit'>
                <p className='text-2xl lg:text-3xl'>Title:</p>
                <DynamicTextArea onChange={handleTitleChange} value={title} styles='font-bold lg:text-2xl resize-none focus:outline-none overflow-hidden w-full' rows={1} />
                {content.map((field, index) => {
                    switch (field.type) {
                        case 'title':
                            return (
                                <div className='flex items-center' key={index}>
                                    <DynamicTextArea onChange={(e) => handleContentChange(e, index)} value={content[index].value} styles='lg:text-2xl text-xl resize-none focus:outline-none border-r-4 border-black overflow-hidden w-full' rows={content[index].rows} />
                                    <DeleteIcon className='cursor-pointer hover:text-red-600 text-3xl' fontSize='' onClick={() => removeField(index)} />
                                </div>
                            )
                        case 'paragraph':
                            return (
                                <div className='flex items-center' key={index}>
                                    <DynamicTextArea onChange={(e) => handleContentChange(e, index)} value={content[index].value} styles='lg:text-xl text-lg resize-none focus:outline-none border-r-4 border-black overflow-hidden w-full' rows={content[index].rows} />
                                    <DeleteIcon className='cursor-pointer hover:text-red-600 text-3xl' fontSize='' onClick={() => removeField(index)} />
                                </div>
                            )
                        case 'bullets':
                            return (
                                <div className='flex items-center' key={index}>
                                    <DynamicTextArea onChange={(e) => handleContentChange(e, index)} value={content[index].value} styles='lg:text-xl text-lg resize-none focus:outline-none border-r-4 border-black overflow-hidden w-full' rows={content[index].rows} onKeyUp={checkEnter} index={index} />
                                    <DeleteIcon className='cursor-pointer hover:text-red-600 text-3xl' fontSize='' onClick={() => removeField(index)} />
                                </div>
                            )
                        default:
                            return null
                    }
                }
                )}
            </div>
            <div className='flex space-x-1 justify-center'>
                <div id='action-bar' className='w-64 bg-newPurple h-14 grid grid-cols-3 p-1 gap-1'>
                    <Tooltip title={<p className='text-base'>Title</p>}>
                        <div className='bg-white flex items-center justify-center hover:bg-newPurple hover:text-white cursor-pointer ' onClick={() => addNewField('title')}>
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
                </div>
            </div>
            <div className='flex justify-center mb-10'>
                <button onClick={uploadHelp} className='bg-newSomon hover:bg-gray-600 text-newPink px-4 py-2 text-xl mt-10'>Upload</button>
            </div>
        </div>
    )
}

export default HelpCreation
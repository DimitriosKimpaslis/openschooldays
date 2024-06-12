import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import TitleIcon from '@mui/icons-material/Title';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ImageIcon from '@mui/icons-material/Image';
import { Tooltip } from '@mui/material';
import { DynamicTextArea } from './DynamicTextArea';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const BlogCreation = () => {
    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [content, setContent] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const postContent = localStorage.getItem('postContent');
        if (postContent) {
            const { title, content } = JSON.parse(postContent);
            setTitle(title)
            setContent(content)
        }
    }, [])


    const handleUploadImage = async (e) => {
        // setImageLoading(true)
        let file = e.target.files[0];
        const fileName = document.getElementById('file-name');
        if (file) {
            fileName.textContent = file.name;
        } else {
            fileName.textContent = 'No file selected';
        }
        const { data, error } = await supabase
            .storage
            .from('Media') // Specify the folder path here
            .upload('hello', file, {
            cacheControl: '3600',
            upsert: false
            })
        console.log(data, error)
        // if (data) {
        //     temp.image = 'https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/BlogPostsImages/' + data.path
        // }
        // else if (error.error === 'Duplicate') {
        //     let temp = { ...movieData };
        //     temp.image = 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Reviews/' + file.name
        //     setMovieData(temp)
        //     setImageLoading(false)
        // }
        // else {
        //     console.log(error)
        // }
    }



    const addNewRows = (e) => {
        const inputElement = e.target
        const lineHeight = parseInt(window.getComputedStyle(inputElement).lineHeight, 10);
        const rows = Math.ceil(inputElement.scrollHeight / lineHeight);
        console.log(lineHeight, inputElement.scrollHeight, rows)
        inputElement.rows = rows - 1// -1 to prevent the text area from scrolling down when the user types;
        return rows - 1;
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
        updatedContent[index].rows = inputRows
        setContent(updatedContent)
        const postContent = {
            title: title,
            content: updatedContent
        };
        localStorage.setItem('postContent', JSON.stringify(postContent));

    }

    // const handleBulletChange = (e, index, i) => {
    //     const updatedContent = [...content]
    //     updatedContent[index].value[i] = e.target.value
    //     setContent(updatedContent)
    // }



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
                updatedContent.push({ type: 'bullets', value: [], rows: 1 })
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
        <div>
            <div className='h-[200px] bg-black'></div>
            <div className='flex flex-col items-center text-2xl'>
                <h1>Blog Creation</h1>
                <form className='space-y-5'>
                    <div>
                        <label>Title:</label>
                        <input className='' type="text" value={title} onChange={(e) => {
                            setTitle(e.target.value)
                            const postContent = {
                                title: title,
                                content: content
                            };
                            localStorage.setItem('postContent', JSON.stringify(postContent));
                        }} />
                    </div>
                    <div>
                        <label>Thumbnail:</label>
                        <input type="file" onChange={(e) => handleUploadImage(e)} id='file-name'/>
                    </div>
                    <div>
                        <p className='mb-4'>Add Content:</p>
                        <div className='flex flex-col gap-5 mb-10 h-fit'>
                            {content.map((field, index) => {
                                switch (field.type) {
                                    case 'title':
                                        return <DynamicTextArea key={index} onChange={(e) => handleContentChange(e, index)} value={content[index].value} styles='font-semibold text-5xl resize-none focus:outline-none border-r-4 border-black overflow-hidden' rows={content[index].rows} />
                                    case 'paragraph':
                                        return <DynamicTextArea key={index} onChange={(e) => handleContentChange(e, index)} value={content[index].value} styles='text-xl resize-none focus:outline-none border-r-4 border-black overflow-hidden' rows={content[index].rows} />
                                    // case 'bullets':
                                    //     return (<div key={index}>
                                    //         {field.value.map((bullet, i) => {
                                    //             console.log(bullet)
                                    //             return <DynamicTextArea onChange={(e) => handleBulletChange(e, index, i)} type='text' value={bullet} key={i} />
                                    //         })}
                                    //     </div>)
                                    case 'image':
                                        return <input key={index} onChange={(e) => handleUploadImage(e)} type='file' />
                                    default:
                                        return null
                                }
                            })}
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
                                {/* <Tooltip title={<p className='text-base'>Bullets</p>}>
                                    <div className='bg-white flex items-center justify-center hover:bg-newPurple hover:text-white cursor-pointer' onClick={() => addNewField('bullets')}>
                                        <FormatListBulletedIcon />
                                    </div>
                                </Tooltip> */}
                                <Tooltip title={<p className='text-base'>Image</p>}>
                                    <div className='bg-white flex items-center justify-center hover:bg-newPurple hover:text-white cursor-pointer' onClick={() => addNewField('image')}>
                                        <ImageIcon />
                                    </div>
                                </Tooltip>
                            </div>
                        </div>

                    </div>
                    <button type='button' className='p-4 bg-newSomon text-newPurple2 hover:bg-newPurple2 hover:text-newSomon' onClick={() => navigate('/preview')}>Preview</button>
                </form>
            </div>
        </div>

    )
}

export default BlogCreation
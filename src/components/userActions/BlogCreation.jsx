import React, { useEffect, useState } from 'react'
import TitleIcon from '@mui/icons-material/Title';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ImageIcon from '@mui/icons-material/Image';
import { Tooltip } from '@mui/material';
import { DynamicTextArea } from '../etc/DynamicTextArea';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../client';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


const BlogCreation = () => {
    const [title, setTitle] = useState({ value: '', rows: 1 })
    const [thumbnail, setThumbnail] = useState('https://placehold.co/600x400/png')
    const [content, setContent] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const content = localStorage.getItem('content');
        const title = localStorage.getItem('title');
        const thumbnail = localStorage.getItem('thumbnail');
        if (content) {
            setContent(JSON.parse(content))
        }
        if (title) {
            setTitle(JSON.parse(title))
        }
        if (thumbnail) {
            setThumbnail(thumbnail)
        }
    }, [])



    useEffect(() => {
        if (content.length > 0) {
            localStorage.setItem('content', JSON.stringify(content));
        }
    }, [content])

    useEffect(() => {
        if (title.value.length > 0) {
            localStorage.setItem('title', JSON.stringify(title));
        }
    }, [title])

    useEffect(() => {
        if (thumbnail !== 'https://placehold.co/600x400/png') {
            localStorage.setItem('thumbnail', thumbnail);
        }
    }, [thumbnail])



    const handleUploadImage = async (e, index) => {
        let file = e.target.files[0];
        const timestamp = Date.now().toString();
        const imageNameRandomizer = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + timestamp;
        const { data, error } = await supabase
            .storage
            .from('Media/BlogPostsImages') // Specify the folder path here
            .upload(imageNameRandomizer, file, {
                cacheControl: '3600',
                upsert: false
            })
        //if the picture is uploaded successfully, the data object will contain the path to the image
        if (data) {
            const publicImageUrl = "https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/BlogPostsImages/" + data.path;
            const updatedContent = [...content]
            updatedContent[index].value = publicImageUrl
            setContent(updatedContent)
        } else if (error.error === 'Duplicate') { //if the image already exists in the storage bucket , find the url of the image
            console.log('Duplicate')
        } else {
            console.log(error)
        }
    }

    const handleThumbnailUpload = async (e) => {
        let file = e.target.files[0];
        const timestamp = Date.now().toString();
        const imageNameRandomizer = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + timestamp;
        const { data, error } = await supabase
            .storage
            .from('Media/BlogPostsImages') // Specify the folder path here
            .upload(imageNameRandomizer, file, {
                cacheControl: '3600',
                upsert: false
            })
        //if the picture is uploaded successfully, the data object will contain the path to the image
        if (data) {
            const publicImageUrl = "https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/BlogPostsImages/" + data.path;
            setThumbnail(publicImageUrl)
        } else if (error.error === 'Duplicate') { //if the image already exists in the storage bucket , find the url of the image
            console.log('Duplicate')
        } else {
            console.log(error)
        }
    }


    const addNewRows = (e) => {
        const inputElement = e.target
        const lineHeight = parseInt(window.getComputedStyle(inputElement).lineHeight, 10);
        const rows = Math.ceil(inputElement.scrollHeight / lineHeight);
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
        if (updatedContent[index].type === 'bullets' && e.target.value === '') {
            updatedContent[index].value = '• '
        }
        updatedContent[index].rows = inputRows
        setContent(updatedContent)
    }

    const handleTitleChange = (e) => {
        let inputRows
        if (e.target.value.length === 0) {
            e.target.rows = 1;
        } else {
            inputRows = addNewRows(e)
        }
        setTitle({ value: e.target.value, rows: inputRows })
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
            case 'image':
                updatedContent.push({ type: 'image', value: 'https://placehold.co/600x400/png' })
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

    const goToPreview = () => {
        if (title.value.length === 0 || content.length === 0 || thumbnail === 'https://placehold.co/600x400/png') {
            alert('Please fill in all fields')
        } else {
            navigate('/preview')
        }
    }

    return (
        <div>
                <div className='container mx-auto flex flex-col items-center text-2xl pb-10'>
                    <p className='lg:text-4xl text-3xl font-bold mt-20 mb-5'>Blog Creation</p>
                    <form className='flex flex-col gap-3 lg:px-0 px-3'>
                        <div className='space-y-5'>
                            <p className=' lg:text-3xl text-2xl font-extralight'>Title:</p>
                            <DynamicTextArea value={title.value} onChange={(e) => handleTitleChange(e)} styles=' text-xl lg:text-2xl resize-none focus:outline-none overflow-hidden w-full' rows={title.rows} />
                        </div>
                    <p className='  lg:text-3xl text-2xl font-extralight'>Thumbnail:</p>
                        <label className='w-fit relative'>
                            <img src={thumbnail} alt='imagePost' className='w-[600px] h-[400px] object-cover' />
                            <div className='flex items-center'>
                                {thumbnail !== 'https://placehold.co/600x400/png' ? null : <FileUploadIcon className='relative top-[1px]' />}
                                <div className='flex items-center gap-1'>
                                    {thumbnail !== 'https://placehold.co/600x400/png' && <CloudDoneIcon className='text-green-500 relative top-[1px]' />}
                                    <span className='text-lg'>{thumbnail !== 'https://placehold.co/600x400/png' ? "Image Uploaded" : "No image selected"}</span>
                                </div>
                            </div>
                            <input onChange={(e) => handleThumbnailUpload(e)} type='file' className='hidden' />
                            <div className='absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-150 w-full h-full flex justify-center items-center cursor-pointer'>
                                <FileUploadIcon className='text-white text-7xl' fontSize='' />
                            </div>
                        </label>
                        <div className='pb-10'>
                        <p className='mb-4 lg:text-3xl text-2xl font-extralight'>Add Content:</p>
                            <div className='flex flex-col gap-5 mb-10 h-fit'>
                                {content.map((field, index) => {
                                    switch (field.type) {
                                        case 'title':
                                            return (
                                                <div className='flex items-center' key={index}>
                                                    <DynamicTextArea onChange={(e) => handleContentChange(e, index)} value={content[index].value} styles='font-semibold text-xl lg:text-3xl resize-none focus:outline-none border-r-4 border-black overflow-hidden w-full' rows={content[index].rows} />
                                                    <DeleteIcon className='cursor-pointer hover:text-red-600 text-3xl' fontSize='' onClick={() => removeField(index)} />
                                                </div>
                                            )
                                        case 'paragraph':
                                            return (
                                                <div className='flex items-center' key={index}>
                                                    <DynamicTextArea onChange={(e) => handleContentChange(e, index)} value={content[index].value} styles='text-lg resize-none focus:outline-none border-r-4 border-black overflow-hidden w-full' rows={content[index].rows} />
                                                    <DeleteIcon className='cursor-pointer hover:text-red-600 text-3xl' fontSize='' onClick={() => removeField(index)} />
                                                </div>
                                            )
                                        case 'bullets':
                                            return (
                                                <div className='flex items-center' key={index}>
                                                    <DynamicTextArea onChange={(e) => handleContentChange(e, index)} value={content[index].value} styles='text-lg resize-none focus:outline-none border-r-4 border-black overflow-hidden w-full' rows={content[index].rows} onKeyUp={checkEnter} index={index} />
                                                    <DeleteIcon className='cursor-pointer hover:text-red-600 text-3xl' fontSize='' onClick={() => removeField(index)} />
                                                </div>
                                            )
                                        case 'image':
                                            let imageSelected = false;
                                            if (content[index].value !== 'https://placehold.co/600x400/png') {
                                                imageSelected = true;
                                            }
                                            return (
                                                <div key={index} className='flex items-center'>
                                                    <label className='w-fit relative'>
                                                        <img src={content[index].value} alt='imagePost' className='w-[600px] h-[400px] object-cover' />
                                                        <div className='flex items-center'>
                                                            {imageSelected ? null : <FileUploadIcon className='relative top-[1px]' />}
                                                            <div className='flex items-center gap-1'>
                                                                {imageSelected && <CloudDoneIcon className='text-green-500 relative top-[1px]' />}
                                                                <span className='text-lg'>{imageSelected ? "Image Uploaded" : "No image selected"}</span>
                                                            </div>
                                                        </div>
                                                        <input onChange={(e) => handleUploadImage(e, index)} type='file' className='hidden' />
                                                        <div className='absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-200 w-full h-full flex justify-center items-center cursor-pointer'>
                                                            <FileUploadIcon className='text-white text-7xl' fontSize='' />
                                                        </div>
                                                    </label>
                                                    <DeleteIcon className='cursor-pointer hover:text-red-600 text-3xl' fontSize='' onClick={() => removeField(index)} />
                                                </div>

                                            )
                                        default:
                                            return null
                                    }
                                })}
                            </div>
                            <div className='flex space-x-1 justify-center'>
                                <div id='action-bar' className='w-64 bg-newPurple h-14 grid grid-cols-4 p-1 gap-1'>
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
                                    <Tooltip title={<p className='text-base'>Image</p>}>
                                        <div className='bg-white flex items-center justify-center hover:bg-newPurple hover:text-white cursor-pointer' onClick={() => addNewField('image')}>
                                            <ImageIcon />
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>

                        </div>
                        <button type='button' className='p-4 bg-newSomon text-newPurple2 hover:bg-newPurple2 hover:text-newSomon' onClick={goToPreview}>Preview</button>
                    </form>
                </div>

        </div>

    )
}

export default BlogCreation
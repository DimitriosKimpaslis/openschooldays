import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../client';
import ArrowBack from '../etc/ArrowBack';

const UpdateView = () => {
    const { id, arrayId } = useParams();
    const [updateObject, setUpdateObject] = useState({})
    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')

    useEffect(() => {
        const getUpdateObject = async () => {
            const { data, error } = await supabase
                .from('collaboration')
                .select('updates, idea')
                .eq('id', id)
            if (error) {
                console.error('Error fetching help object:', error.message)
                return
            }
            setUpdateObject(data[0].updates[arrayId])
            setTitle(data[0].idea.title)
            setThumbnail(data[0].idea.thumbnail)
        }
        getUpdateObject()
    }
        , [id, arrayId])

    return (
        <div className='relative container mx-auto flex flex-col gap-5 px-3 mt-10 py-10'>
            <div className='lg:block hidden'>
                <ArrowBack location="goBack" />
            </div>
            <p className='lg:text-4xl text-2xl font-semibold text-center'>{title}</p>
            <div className='flex justify-center'>
                <img src={thumbnail} alt={updateObject.title} className='w-[500px] h-[300px] object-contain' />

            </div>
            <p className='lg:text-2xl text-xl'>{updateObject.title}</p>
            {updateObject.content?.map((item, index) => {
                if (item.type === 'paragraph' || item.type === 'bullets') {
                    return <p key={index} className='text-xl whitespace-pre-line'>{item.value}</p>
                }
                if (item.type === 'title') {
                    return <h2 key={index} className='text-2xl font-semibold'>{item.value}</h2>
                }
                return null
            }
            )}
            {/* time created at */}
            <p className='text-lg text-gray-500'>Created at: {new Date(updateObject.date).toDateString()}</p>
        </div>
    )
}

export default UpdateView
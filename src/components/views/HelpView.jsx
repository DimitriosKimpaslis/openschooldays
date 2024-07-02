import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../client';
import ArrowBack from '../etc/ArrowBack';

const HelpView = () => {
    const { id, arrayId } = useParams();
    const [helpObject, setHelpObject] = useState({})
    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')

    useEffect(() => {
        const getHelpObject = async () => {
            const { data, error } = await supabase
                .from('collaboration')
                .select('help_needed, idea')
                .eq('id', id)
            if (error) {
                console.error('Error fetching help object:', error.message)
                return
            }
            setHelpObject(data[0].help_needed[arrayId])
            setTitle(data[0].idea.title)
            setThumbnail(data[0].idea.thumbnail)
        }
        getHelpObject()
    }
        , [id, arrayId])

    return (
        <div className='relative container mx-auto flex flex-col items-center justify-center gap-5 px-3 lg:text-left text-center mt-10 py-10'>
            <div className='lg:block hidden'>
                <ArrowBack location="goBack" />
            </div>
            <p className='lg:text-4xl text-2xl font-semibold'>{title}</p>
            <img src={thumbnail} alt={helpObject.title} className='w-[500px] h-[300px] object-contain' />
            <p className='lg:text-2xl text-xl'>{helpObject.title}</p>
            {helpObject.content?.map((item, index) => {
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
            <p className='text-lg text-gray-500'>Created at: {new Date(helpObject.date).toDateString()}</p>
        </div>
    )
}

export default HelpView
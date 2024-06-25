import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../client';
import ArrowBack from '../etc/ArrowBack';

const HelpView = () => {
    const { id, arrayId } = useParams();
    const [helpObject, setHelpObject] = useState({})

    useEffect(() => {
        const getHelpObject = async () => {
            const { data, error } = await supabase
                .from('collaboration')
                .select('help_needed')
                .eq('id', id)
            if (error) {
                console.error('Error fetching help object:', error.message)
                return
            }
            setHelpObject(data[0].help_needed[arrayId])
        }
        getHelpObject()
    }
        , [id, arrayId])
    
    return (
        <div className='relative container mx-auto flex flex-col items-center'>
            <ArrowBack location="goBack"/>
            <h1>{helpObject.title}</h1>
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
        </div>
    )
}

export default HelpView
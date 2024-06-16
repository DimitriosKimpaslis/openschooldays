import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { supabase } from '../client'
import { Tooltip } from '@mui/material'

const EditProfile = () => {
    const { user } = useContext(UserContext)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [image, setImage] = useState('https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg')
    const [description, setDescription] = useState('')
    const getUserInformation = async () => {
        const { data, error } = await supabase
            .from('usersInfo')
            .select('*')
            .eq('uid', user.id)
        if (error) {
            console.error('Error fetching user information:', error.message)
            return
        }
        setName(data[0].name)
        setSurname(data[0].surname)
        if (data[0].image !== null) {
            setImage(data[0].image)
        }
        setDescription(data[0].description)
    }

    useEffect(() => {
        getUserInformation()
    }, [])


    return (
        <div>
            <div className='h-[200px] bg-black'></div>
            <div className='flex justify-center'>
                <div className='flex flex-col justify-center'>
                    <Tooltip title="Edit Profile" arrow>
                        <h1 className='text-center'>Profile Page</h1>
                    </Tooltip>
                    <img src={image} alt="a person" />
                    <p>Name: {name ? name : "Empty..."}</p>
                    <p>Surname: {surname ? surname : "Empty..."}</p>
                    <p>Description: {description ? description : "Empty..."}</p>
                </div>
            </div>


        </div>
    )
}

export default EditProfile
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { supabase } from '../../client'
import { CircularProgress, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

const EditProfile = () => {
    const { user } = useContext(UserContext)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [image, setImage] = useState('https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(true)

    const [tempUserDetails, setTempUserDetails] = useState({ name: '', surname: '', image: '', description: '' })

    const [edit, setEdit] = useState(false)


    const getUserInformation = async () => {
        setLoading(true)
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
        setTempUserDetails({ name: data[0].name, surname: data[0].surname, image: data[0].image !== null ? data[0].image : 'https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg', description: data[0].description })
        setLoading(false)
    }

    useEffect(() => {
        getUserInformation()
    }, [])



    const saveChanges = async () => {
        if (tempUserDetails.name === '' || tempUserDetails.surname === '' || tempUserDetails.description === '') {
            alert('Please fill in all the fields')
            return
        }
        const { data, error } = await supabase
            .from('usersInfo')
            .update([
                {
                    name: tempUserDetails.name,
                    surname: tempUserDetails.surname,
                    description: tempUserDetails.description,
                    image: tempUserDetails.image
                }
            ])
            .eq('uid', user.id)
        if (error) {
            console.error('Error updating user information:', error.message)
            return
        }
        console.log('User information updated:', data)
        getUserInformation()
        setEdit(false)
    }



    const cancelChanges = () => {
        setTempUserDetails({ name: name, surname: surname, image: image, description: description })
        setEdit(false)
    }

    const handleImageUpload = async (e) => {
        let file = e.target.files[0];
        const timestamp = Date.now().toString();
        const imageNameRandomizer = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + timestamp;
        const { data, error } = await supabase
            .storage
            .from('Media/ProfileImages') // Specify the folder path here
            .upload(imageNameRandomizer, file, {
                cacheControl: '3600',
                upsert: false
            })
        //if the picture is uploaded successfully, the data object will contain the path to the image
        if (data) {
            const publicImageUrl = "https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/ProfileImages/" + data.path;
            setTempUserDetails({ ...tempUserDetails, image: publicImageUrl })
        } else if (error.error === 'Duplicate') { //if the image already exists in the storage bucket , find the url of the image
            console.log('Duplicate')
        } else {
            console.log(error)
        }
    }


    return (
        <div >
            <div className='h-[200px] bg-black'></div>
            <div className='flex justify-center'>
                {edit ?
                    <div className='flex flex-col justify-center gap-3 relative p-4'>
                        <div className='flex gap-4 items-center justify-center'>
                            <p className='text-center text-3xl p-4 border-yellow-400 border-8 border-dashed'>Editing Profile Page</p>
                        </div>
                        <label className='w-fit h-fit relative'>
                            <img src={tempUserDetails.image} alt='imagePost' className='w-[500px] h-[500px] object-cover rounded-full' />
                            <div className='flex items-center'>
                                {tempUserDetails.image !== 'https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg' ? null : <FileUploadIcon className='relative top-[1px]' />}
                                <div className='flex items-center gap-1'>
                                    {tempUserDetails.image !== 'https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg' && <CloudDoneIcon className='text-green-500 relative top-[1px]' />}
                                    <span>{tempUserDetails.image !== 'https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg' ? "Image Uploaded" : "No image selected"}</span>
                                </div>
                            </div>
                            <input onChange={(e) => handleImageUpload(e)} type='file' className='hidden' />
                            <div className='absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-150 w-full h-full flex justify-center items-center cursor-pointer'>
                                <FileUploadIcon className='text-white text-7xl' fontSize='' />
                            </div>
                        </label>
                        <p className='font-bold'>Name:</p>
                        <input type='text' placeholder='Empty..' value={tempUserDetails.name} onChange={(e) => setTempUserDetails({ ...tempUserDetails, name: e.target.value })} className='border border-black p-2' />
                        <p className='font-bold'>Surname:</p>
                        <input type='text' placeholder='Empty..' value={tempUserDetails.surname} onChange={(e) => setTempUserDetails({ ...tempUserDetails, surname: e.target.value })} className='border border-black p-2' />
                        <p className='font-bold'>Description:</p>
                        <textarea placeholder='Empty..' value={tempUserDetails.description} onChange={(e) => setTempUserDetails({ ...tempUserDetails, description: e.target.value })} className='border border-black p-2' />
                        <div className='flex justify-center gap-3 text-lg'>
                            <button className='bg-green-500 w-full hover:bg-green-600 text-white font-bold py-2 px-4 rounded' onClick={saveChanges}>Save Changes</button>
                            <button className='bg-red-500 w-full hover:bg-red-600 text-white font-bold py-2 px-4 rounded' onClick={cancelChanges}>Cancel</button>
                        </div>
                        {loading &&
                            <div className='absolute top-0 right-0 bg-gray-200 opacity-70 flex justify-center items-center w-full h-full'>
                                <CircularProgress />
                            </div>
                        }
                    </div>

                    :

                    <div className='flex flex-col justify-center'>
                        <div className='flex gap-4 items-center justify-center'>
                            <p className='text-center text-3xl my-6'>Profile Page</p>
                            <Tooltip title="Edit Profile">
                                <EditIcon className='relative top-[1px] hover:text-gray-600 cursor-pointer text-2xl' fontSize='' onClick={() => setEdit(true)} />
                            </Tooltip>
                        </div>
                        <img src={image} className='w-[400px] h-[400px] rounded-full object-cover' alt="a person" />
                        <p>Name: {name ? name : "Empty..."}</p>
                        <p>Surname: {surname ? surname : "Empty..."}</p>
                        <p>Description: {description ? description : "Empty..."}</p>
                    </div>

                }
            </div>


        </div>
    )
}

export default EditProfile
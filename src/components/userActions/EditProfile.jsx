import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { supabase } from '../../client'
import { CircularProgress, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const EditProfile = () => {
    const { user } = useContext(UserContext)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [image, setImage] = useState('https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg')
    const [description, setDescription] = useState('')
    const [facebook, setFacebook] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
    const [instagram, setInstagram] = useState('')
    const [loading, setLoading] = useState(true)

    const [tempUserDetails, setTempUserDetails] = useState({ facebook: "", instagram: "", email: "", telephone: "", image: '', description: '' })

    const [edit, setEdit] = useState(false)


    const getUserInformation = async () => {
        setLoading(true)
        if (user === null) return
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
        setFacebook(data[0].facebook)
        setInstagram(data[0].instagram)
        setEmail(data[0].email)
        setTelephone(data[0].telephone)
        setTempUserDetails({ name: data[0].name, surname: data[0].surname, image: data[0].image !== null ? data[0].image : 'https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg', description: data[0].description, facebook: data[0].facebook, instagram: data[0].instagram, email: data[0].email, telephone: data[0].telephone })
        setLoading(false)
    }

    useEffect(() => {
        getUserInformation()
    }, [user])



    const saveChanges = async () => {
        if (tempUserDetails.description === '') {
            alert('Please fill in the description field')
            return
        }
        const { data, error } = await supabase
            .from('usersInfo')
            .update([
                {
                    description: tempUserDetails.description,
                    image: tempUserDetails.image,
                    facebook: tempUserDetails.facebook,
                    instagram: tempUserDetails.instagram,
                    email: tempUserDetails.email,
                    telephone: tempUserDetails.telephone
                }
            ])
            .eq('uid', user.id)
        if (error) {
            console.error('Error updating user information:', error.message)
            return
        }
        getUserInformation()
        setEdit(false)
    }



    const cancelChanges = () => {
        setTempUserDetails({ name: name, surname: surname, image: image, description: description, facebook: facebook, instagram: instagram, email: email, telephone: telephone })
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

    const openNewTab = (url) => {
        window
            .open(url, '_blank')
            .focus();
    }


    return (
        <div >
            <div className='flex justify-center items-center'>
                {edit ?
                    <div className='container flex flex-col items-center relative p-4 my-10'>
                        <div className='space-y-2'>
                            <div className='flex gap-4 items-center justify-center'>
                                <p className='text-center text-3xl p-4 border-yellow-400 border-8 border-dashed'>Editing Profile Page</p>
                            </div>
                            <div className='flex justify-center'>
                                <label className='w-fit h-fit relative mb-10'>
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
                            </div>

                            <p className='font-bold'>Facebook:</p>
                            <div className='flex items-center gap-1'>
                                <input type='text' placeholder='Empty..' value={tempUserDetails.facebook} onChange={(e) => setTempUserDetails({ ...tempUserDetails, facebook: e.target.value })} className='border border-black p-2 w-full' />
                                <FacebookIcon className='text-5xl text-blue-800 hover:text-blue-500 cursor-pointer' onClick={() => openNewTab(tempUserDetails.facebook)} fontSize='' />
                            </div>
                            <p className='font-bold'>Instagram:</p>
                            <div className='flex items-center gap-1'>
                                <input type='text' placeholder='Empty..' value={tempUserDetails.instagram} onChange={(e) => setTempUserDetails({ ...tempUserDetails, instagram: e.target.value })} className='border border-black p-2 w-full' />
                                <InstagramIcon className='text-5xl text-pink-600 hover:text-pink-400 cursor-pointer' onClick={() => openNewTab(tempUserDetails.instagram)} fontSize='' />
                            </div>
                            <p className='font-bold'>Email:</p>
                            <input type='text' placeholder='Empty..' value={tempUserDetails.email} onChange={(e) => setTempUserDetails({ ...tempUserDetails, email: e.target.value })} className='border border-black p-2 w-full' />
                            <p className='font-bold'>Telephone:</p>
                            <input type='number' placeholder='Empty..' value={tempUserDetails.telephone} onChange={(e) => setTempUserDetails({ ...tempUserDetails, telephone: e.target.value })} className='border border-black p-2 w-full' />
                            <p className='font-bold'>Description:</p>
                            <textarea placeholder='Empty..' value={tempUserDetails.description} onChange={(e) => setTempUserDetails({ ...tempUserDetails, description: e.target.value })} className='border border-black p-2 w-full' />

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

                    </div>

                    :
                    <div className='container lg:my-10 mt-32 mb-10'>
                        <div className=' my-10 grid lg:grid-cols-2 gap-10 px-3'>
                            <div className='space-y-3 flex flex-col justify-center items-center'>
                                <div className='px-4 text-xl space-y-3'>
                                    <p className='md:text-5xl text-3xl pb-12 font-bold'>{name} {surname}</p>
                                    <p><span className='font-semibold'>Description:</span> {description ? description : "Empty..."}</p>
                                    <p><span className='font-semibold'>Email:</span> {email ? email : "Empty..."}</p>
                                    <p><span className='font-semibold'>Tel:</span> {telephone ? telephone : "Empty..."}</p>
                                    <div className='flex gap-3'>
                                        {facebook && <FacebookIcon className='text-5xl text-blue-800 hover:text-blue-500 cursor-pointer' onClick={() => openNewTab(facebook)} fontSize='' />}
                                        {instagram && <InstagramIcon className='text-5xl text-pink-600 hover:text-pink-400 cursor-pointer' onClick={() => openNewTab(instagram)} fontSize='' />}
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center items-center bg-newSomon xl:p-52 md:p-32 p-20 w-full h-full relative'>
                                <img src={image} className='' alt="a person" />
                                <div className='absolute top-3 right-3 flex items-center gap-1 hover:text-gray-600 cursor-pointer' onClick={() => setEdit(true)}>
                                    <p className='text-lg font-semibold'>Edit Profile</p>
                                    <EditIcon className='relative text-2xl' fontSize='' />
                                </div>
                            </div>
                        </div>


                    </div>


                }
            </div>


        </div>
    )
}

export default EditProfile
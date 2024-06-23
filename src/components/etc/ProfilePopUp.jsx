import React from "react"

const ProfilePopUp = ({img,name,surname,description}) => {

    return (
        <div className='absolute w-[200px] p-4 bg-newSomon hidden hover:block profilePopup top-[-180%] right-[-100%] rounded-md shadow-lg'>
            <img src={img} alt='profile' className='w-[100px] h-[100px] object-cover rounded-full mx-auto' />
            <p className='text-center text-3xl'>{name} {surname}</p>
            <p className='text-center text-lg'>{description}</p>
        </div>
    )
}

//discord like popup when hovering the profile picture, no need for another page

export default ProfilePopUp
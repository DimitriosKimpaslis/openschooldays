import React from "react"

const ProfilePopUp = ({img,name,surname,description}) => {

    return (
        <div className='absolute w-[220px] text-white hidden hover:block profilePopup top-[-250%] right-[-130%] shadow-lg'>
            <div className="bg-newSomon p-2 w-full h-16 rounded-lg"></div>
            <div className="bg-neutral-800 h-80 pt-6 p-3 w-full rounded-lg">
                <div className="bg-black rounded-lg w-full relative mt-6 p-2">
                    <p className=' text-lg font-medium'>{name} {surname}</p>
                    <p className=' text-base font-extralight text-gray-200'>{description && description.slice(0, 75)}</p>
                </div>
            </div>
            <div className="absolute top-3 left-3 space-y-2">
                <div className="w-24 h-24 rounded-full border-[5px] border-neutral-800">
                    <img src={img} alt='profile' className='w-full h-full object-cover rounded-full mx-auto' />
                </div>

            </div>
        </div>
    )
}

//discord like popup when hovering the profile picture, no need for another page

export default ProfilePopUp
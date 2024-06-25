import React from "react"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

const ProfilePopUp = ({ img, name, surname, description, facebook, instagram, email, telephone }) => {

    const goToLink = (link) => {
        window.open(link, '_blank').focus();
    }

    return (
        <div className='absolute min-w-[250px] text-white hidden hover:block profilePopup top-[-210%] right-[-150%] shadow-lg z-50'>
            <div className="bg-newSomon p-2 w-full h-16 rounded-t-lg"></div>
            <div className="bg-neutral-800 h-64 pt-6 p-3 w-full rounded-b-lg">
                <div className="bg-black rounded-lg w-full h-48 relative mt-6 p-2">
                    <p className=' text-lg font-medium'>{name} {surname}</p>
                    <p className=' text-base font-extralight text-gray-200'>{description.length > 70 ? description.slice(0, 70) + '...' : description}</p>
                    {email &&
                        <div className="flex items-center gap-2">
                            <EmailIcon className="relative top-[1px]" />
                            <p className='font-extralight text-gray-200 text-base'>{email}</p>
                        </div>
                    }
                    {telephone &&
                        <div className="flex items-center gap-2">
                            <LocalPhoneIcon className="relative top-[1px]"/>
                            <p className='font-extralight text-gray-200 text-lg'>{telephone}</p>
                        </div>
                    }
                    <div className="absolute flex gap-2 bottom-1">
                        {facebook && <FacebookIcon className="cursor-pointer text-blue-500 hover:text-blue-700 text-3xl" fontSize="" onClick={() => {goToLink(facebook)}} />}
                        {instagram && <InstagramIcon className="cursor-pointer text-pink-500 hover:text-pink-700 text-3xl" fontSize="" onClick={() => { goToLink(instagram) }}  />}
                    </div>
                    
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
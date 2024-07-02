import React from 'react'
import ProfilePopUp from './ProfilePopUp'

const ProfileCard = ({ img, name, surname, description, facebook, instagram, email, telephone }) => {

  return (
      <div className='flex flex-col w-fit items-center gap-1 relative profileCard'>
          <img src={img} alt='member' className='w-20 h-20 object-cover rounded-full' />
          <p className='text-lg max-w-32 text-center'>{name + " " + surname}</p>
          <ProfilePopUp img={img} name={name} surname={surname} description={description} facebook={facebook} instagram={instagram} email={email} telephone={telephone}/>
      </div>
  )
}

export default ProfileCard
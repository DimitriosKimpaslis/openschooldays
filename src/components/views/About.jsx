import React from 'react'

const About = () => {
  return (
    <div>
      <div className='bg-newPink py-32'>
        <div className='container mx-auto pt-64'>
          <div className='flex'>
            <div className='flex flex-col justify-start pr-52 w-1/2'>
              <p className='text-lg text-white font-light'>About Us</p>
              <p className='text-3xl text-white font-semibold mb-5'>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
              <p className='text-lg text-white pb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <button className=' bg-newSomon w-96 h-fit py-3 text-xl hover:bg-newPurple2 text-newPurple2 hover:text-newSomon transition-colors duration-400 cursor-pointer'>
                Projects
              </button>
            </div>
            <div className='flex items-center justify-center w-1/2'>
              <img src='https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/SiteImages/omar-lopez-1qfy-jDc_jo-unsplash.jpg' alt='about' />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-neutral-900 py-36'>
        <div className='container mx-auto'>
          <div className='flex justify-center gap-10 text-white'>
            <p className='text-4xl font-semibold w-1/3 px-5'>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className=' w-2/3 px-10 space-y-4 '>
              <p className='text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p className='text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p className='text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <div className='flex justify-center pt-10'>
                <button className=' bg-newSomon w-96 h-fit py-3 text-xl hover:bg-newPurple2 text-newPurple2 hover:text-newSomon transition-colors duration-400 cursor-pointer'>
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default About

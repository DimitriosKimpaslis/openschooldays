import React from 'react'
import Slideshow from './Slideshow'
import arrow from '../media/images/up-left-arrow.png'
import bird from '../media/images/bird.png'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';


const Home = () => {
    return (
        <div>
            <div className='grid grid-cols-2'>
                <div className='bg-newPink flex justify-center pb-14'>
                    <div className='flex flex-col  w-[70%] space-y-14'>
                        <div className="h-[300px]"></div>
                        <div className='relative flex flex-col font-semibold w-fit'>
                            <p className='outline-text text-newPink text-8xl'>Open</p>
                            <img src={arrow} alt='arrow' className='w-20 h-20 absolute right-0 top-10' />
                            <p className=' text-newSomon text-8xl text-nowrap'>School Days</p>
                        </div>
                        <p className='text-xl text-newSomon'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className='flex items-center space-x-12'>
                            <div className='flex justify-around bg-newSomon w-96 h-fit py-3 text-xl hover:bg-newPurple2 text-newPurple2 hover:text-newSomon transition-colors duration-400 cursor-pointer'>
                                <p className='text-xl font-bold'>ΔΡΑΣΕΙΣ</p>
                                <TrendingFlatIcon className='text-4xl' fontSize='' />
                            </div>
                            <img src={bird} alt='arrow' className='w-28 h-28' />
                        </div>
                    </div>
                </div>
                <div>
                    <Slideshow />
                </div>
            </div>
            <div className='grid grid-cols-2 items-center bg-newSomon py-24 px-12 '>
                <div className=' flex justify-center'>
                    <div className='grid grid-cols-2  w-fit gap-20'>
                        <div className='bg-newPurple rounded-full w-52 h-52 flex flex-col justify-center items-center text-newSomon font-bold'>
                            <p className='text-4xl'>project</p>
                            <p className='text-4xl'>01</p>
                        </div>
                        <div className='bg-newPurple2 rounded-full w-52 h-52 flex flex-col justify-center items-center text-newSomon font-bold'>
                            <p className='text-4xl'>project</p>
                            <p className='text-4xl'>02</p>
                        </div>
                        <div className='bg-newPink rounded-full w-52 h-52 flex flex-col justify-center items-center text-newSomon font-bold'>
                            <p className='text-4xl'>project</p>
                            <p className='text-4xl'>03</p>
                        </div>
                        <div className='bg-newPurple rounded-full w-52 h-52 flex flex-col justify-center items-center text-newSomon font-bold'>
                            <p className='text-4xl'>project</p>
                            <p className='text-4xl'>04</p>
                        </div>
                    </div>   
                </div>
                
                <div className='text-right space-y-12'>
                    <p className='text-8xl text-newPurple font-bold'>All about us</p>
                    <p className='text-2xl text-newPurple'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
            <div className='bg-newPurple h-[300px]'>

            </div>
        </div>
        
    )
}

export default Home
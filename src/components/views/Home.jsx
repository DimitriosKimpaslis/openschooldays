import React from 'react'
import Slideshow from '../etc/Slideshow'
import arrow from '../../media/images/up-left-arrow.png'
import bird from '../../media/images/bird.png'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';


const Home = () => {
    return (
        <div>
            <div className='grid lg:grid-cols-2'>
                <div className='lg:hidden block'>
                    <Slideshow />
                </div>
                <div className='bg-newPink flex justify-center pb-14'>
                    <div className='flex flex-col lg:px-0 px-5  lg:w-[70%] space-y-14'>
                        <div className="lg:h-[300px] h-[100px]"></div>
                        <div className='relative flex flex-col font-semibold w-fit'>
                            <p className='outline-text text-newPink sm:text-8xl lg:text-6xl xl:text-8xl text-6xl'>Open</p>
                            <img src={arrow} alt='arrow' className='sm:w-20 sm:h-20 xl:w-20 xl:h-20 lg:w-14 lg:h-14 w-14 h-14 absolute right-0 top-3 sm:top-10 xl:top-6 lg:top-3' />
                            <p className=' text-newSomon sm:text-8xl lg:text-6xl xl:text-8xl text-6xl text-nowrap'>School Days</p>
                        </div>
                        <p className='text-xl text-newSomon'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className='flex items-center space-x-12'>
                            <div className='flex justify-around items-center bg-newSomon sm:w-96 w-64 h-fit py-3 text-xl hover:bg-newPurple2 text-newPurple2 hover:text-newSomon transition-colors duration-400 cursor-pointer'>
                                <p className='lg:text-xl text-lg font-bold'>ΔΡΑΣΕΙΣ</p>
                                <TrendingFlatIcon className='text-4xl' fontSize='' />
                            </div>
                            <img src={bird} alt='arrow' className='sm:w-28 sm:h-28 w-20 h-20' />
                        </div>
                    </div>
                </div>
                <div className='lg:block hidden'>
                    <Slideshow />
                </div>
            </div>
            <div className='grid lg:grid-cols-2 gap-y-20 items-center bg-newSomon py-24 sm:px-12 px-3 '>
                <div className='flex justify-center'>
                    <div className='grid grid-cols-2  sm:w-fit sm:gap-20 gap-10'>
                        <div className='bg-newPurple rounded-full sm:w-52 sm:h-52 w-32 h-32 flex flex-col justify-center items-center text-newSomon font-bold'>
                            <p className='lg:text-4xl text-xl'>project</p>
                            <p className='lg:text-4xl text-xl'>01</p>
                        </div>
                        <div className='bg-newPurple2 rounded-full sm:w-52 sm:h-52 w-32 h-32 flex flex-col justify-center items-center text-newSomon font-bold'>
                            <p className='lg:text-4xl text-xl'>project</p>
                            <p className='lg:text-4xl text-xl'>02</p>
                        </div>
                        <div className='bg-newPink rounded-full sm:w-52 sm:h-52 w-32 h-32 flex flex-col justify-center items-center text-newSomon font-bold'>
                            <p className='lg:text-4xl text-xl'>project</p>
                            <p className='lg:text-4xl text-xl'>03</p>
                        </div>
                        <div className='bg-newPurple rounded-full sm:w-52 sm:h-52 w-32 h-32 flex flex-col justify-center items-center text-newSomon font-bold'>
                            <p className='lg:text-4xl text-xl'>project</p>
                            <p className='lg:text-4xl text-xl'>04</p>
                        </div>
                    </div>
                </div>

                <div className='text-center lg:text-right space-y-12'>
                    <p className='lg:text-8xl text-5xl text-newPurple font-bold'>All about us</p>
                    <p className='lg:text-2xl text-lg text-newPurple'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
            <div className='bg-newPurple h-[300px]'>

            </div>
        </div>

    )
}

export default Home
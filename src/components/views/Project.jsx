import React, { useContext, useEffect } from 'react'
import { ImageViewerContext, LoadingContext } from '../../App'
import { useLocation } from 'react-router-dom'

const Project = () => {

    const images = ["https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/SiteImages/dylan_gillis_KdeqA3aTnBY_unsplash.jpg", "https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/SiteImages/helena_lopes_PGnqT0rXWLs_unsplash.jpg", "https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/SiteImages/john_cameron___5IRj1F2rY_unsplash.jpg", "https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/SiteImages/mauro_mora_31_pOduwZGE_unsplash.jpg", "https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/SiteImages/william_white_TZCppMjaOHU_unsplash.jpg","https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/SiteImages/youssef_naddam_iJ2IG8ckCpA_unsplash.jpg"]
    const { setImageViewer } = useContext(ImageViewerContext)

    const location = useLocation()

    const openImageViewer = (image) => {
        const scrollPosition = window.scrollY
        setImageViewer({ open: true, image: image, images: images, scroll: scrollPosition })
    }

    const { loading, setLoading } = useContext(LoadingContext)
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [location])

    return (
        <div className=''>
            <div className='relative flex justify-center items-center'>
                <img src='https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/SiteImages/natalie-pedigo-wJK9eTiEZHY-unsplash.jpg' alt='about' className='lg:h-full lg:w-full h-[700px]'/>
                <div className='absolute flex bg-black opacity-80 lg:w-[500px] lg:p-16 p-6'>
                    <div className='container mx-auto flex flex-col justify-center items-center space-y-10'>
                        <p className='lg:text-5xl text-2xl text-white'>Project 1</p>
                        <p className='lg:text-xl text-base text-white lg:w-full w-[300px]'>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                        <button className='bg-newSomon lg:w-96 px-10 h-fit py-3 text-xl hover:bg-newPurple2 text-newPurple2 hover:text-newSomon transition-colors duration-400 cursor-pointer'>
                            Contact
                        </button>
                    </div>
                </div>
            </div>
            <div className='bg-newSomon lg:py-36 py-24 px-3'>
                <h1 className='lg:text-5xl text-3xl text-white text-center font-semibold'>Some great momements</h1>
                <div className='container mx-auto grid grid-cols-3'>
                    {images.map((image, index) => {
                        return (
                            <div key={index} className='relative cursor-pointer' onClick={() => openImageViewer(image)}>
                                <img src={image} alt='project' className='w-full lg:h-[300px] sm:h-[250px] h-[180px] object-cover' />
                                <div className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200'>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='bg-black py-36 px-3'>
                <div className='container mx-auto'>
                    <div className='flex flex-col lg:flex-row justify-center gap-10 text-white'>
                        <p className='lg:text-4xl text-2xl font-semibold lg:w-1/3 px-5'>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className=' lg:w-2/3 px-10 space-y-4 '>
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

export default Project
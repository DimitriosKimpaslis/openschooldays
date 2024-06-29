import { CircularProgress } from "@mui/material";
import birdLogo from "../../media/images/55.png";

export const Loader = () => {
    return (
        <div className='absolute bg-newSomon text-white w-full h-full z-50 flex justify-center items-center'>
            <div className='bg-neutral-800 w-80 p-10 rounded-lg space-y-5 shadow-lg'>
                <div className='flex flex-col justify-center items-center space-y-5'>
                    <img src={birdLogo} alt='bird logo' className='w-32 h-32 object-contain' />
                    <CircularProgress />
                </div>
            </div>
        </div>
    )
}
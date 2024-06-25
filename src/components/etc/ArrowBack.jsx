import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ArrowBack = ({location}) => {
    const navigate = useNavigate();
    const goBack = () => {
        if (location === "goBack") {
            navigate(-1);
        } else {
            navigate(location)
        }
    }

  return (
      <div className='absolute left-0 top-0 bg-black text-white cursor-pointer hover:bg-neutral-800 rounded-lg px-4 py-2 flex justify-center items-center' onClick={goBack}>
        <ArrowBackIcon />
    </div>
  )
}

export default ArrowBack
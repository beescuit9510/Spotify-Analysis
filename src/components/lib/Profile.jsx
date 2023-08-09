import React from 'react'
import Skeleton from './Skeleton'
import { IoPersonCircleSharp } from 'react-icons/io5'

export default function Profile({ src, isLoading = true, handleOnClick }) {
  return (
    <div className='flex items-center justify-center relative'>
      <Skeleton
        isLoading={isLoading}
        className='aspect-square border rounded-full h-[3.5rem]'
      >
        <img
          className={`aspect-square object-cover rounded-full border shadow-lg cursor-pointer h-[3.5rem] ${
            src ? src : 'invisible'
          }`}
          src={src}
          onClick={handleOnClick}
        />
        <IoPersonCircleSharp
          className={`text-7xl rounded-full text-gray-300 cursor-pointer absolute ${
            src ? 'invisible' : ''
          }`}
          onClick={handleOnClick}
        />
      </Skeleton>
    </div>
  )
}

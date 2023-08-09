import React from 'react'
import Skeleton from './Skeleton'
import { IoPersonCircleSharp } from 'react-icons/io5'

export default function Profile({ src, isLoading = true, handleOnClick }) {
  return (
    <div>
      <Skeleton isLoading={isLoading} className='rounded-full'>
        {src ? (
          <img
            className='aspect-square object-cover rounded-full border shadow-lg cursor-pointer h-full w-full max-h-[3.5rem]'
            src={src}
            onClick={handleOnClick}
          />
        ) : (
          <IoPersonCircleSharp
            className='text-gray-300 cursor-pointer w-full h-[3.5rem]'
            onClick={handleOnClick}
          />
        )}
      </Skeleton>
    </div>
  )
}

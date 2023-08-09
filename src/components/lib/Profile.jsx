import React from 'react'
import Skeleton from './Skeleton'
import { IoPersonCircleSharp } from 'react-icons/io5'

export default function Profile({ src, isLoading = true, handleOnClick }) {
  return (
    <div>
      <Skeleton
        isLoading={isLoading}
        className='aspect-square border rounded-full h-[3.5rem]'
      >
        {src ? (
          <img
            className='aspect-square object-cover rounded-full border shadow-lg cursor-pointer h-full max-h-[3.5rem]'
            src={src}
            onClick={handleOnClick}
          />
        ) : (
          <IoPersonCircleSharp
            className='aspect-square text-gray-300 cursor-pointer h-[3.5rem]'
            onClick={handleOnClick}
          />
        )}
      </Skeleton>
    </div>
  )
}

import React from 'react'
import Skeleton from './Skeleton'

export default function Profile({ src, isLoading = true, handleOnClick }) {
  return (
    <div>
      <Skeleton isLoading={isLoading} className='h-[3.5rem] rounded-full'>
        <img
          className='aspect-square object-cover rounded-full border shadow-lg cursor-pointer h-full max-h-[3.5rem]'
          src={src}
          onClick={handleOnClick}
        />
      </Skeleton>
    </div>
  )
}

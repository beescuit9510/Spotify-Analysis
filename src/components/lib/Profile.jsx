import React from 'react'
import Skeleton from './Skeleton'

export default function Profile({ src, isLoading = false, handleOnClick }) {
  return (
    <div>
      <Skeleton isLoading={isLoading}>
        <img
          className='aspect-square object-cover rounded-full border shadow-lg cursor-pointer max-h-[3.5rem]'
          src={src}
          onClick={handleOnClick}
        />
      </Skeleton>
    </div>
  )
}

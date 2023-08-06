import React from 'react'
import Skeleton from './Skeleton'

function Avatar({ isLoading, name, profileUrl, userUrl, subhead }) {
  const handleOpenUser = () => window.open(userUrl)
  return (
    <div className='flex'>
      <div>
        <Skeleton isLoading={isLoading}>
          <img
            className='rounded-full border shadow-lg cursor-pointer max-h-[3.5rem]'
            src={profileUrl}
            onClick={handleOpenUser}
          />
        </Skeleton>
      </div>
      <div
        className='flex flex-col justify-center ml-2 cursor-pointer'
        onClick={handleOpenUser}
      >
        <Skeleton isLoading={isLoading}>
          <div className='font-medium'>{name}</div>
        </Skeleton>
        <Skeleton isLoading={isLoading}>
          <div className='text-xs'>{subhead}</div>
        </Skeleton>
      </div>
    </div>
  )
}

export default Avatar

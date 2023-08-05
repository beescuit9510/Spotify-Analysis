import React from 'react'

function Avatar({ name, profileUrl, userUrl, subhead }) {
  const handleOpenUser = () => window.open(userUrl)
  return (
    <div className='flex'>
      <div>
        <img
          className='rounded-full border shadow-lg cursor-pointer max-h-[3.5rem]'
          src={profileUrl}
          onClick={handleOpenUser}
        />
      </div>
      <div
        className='flex flex-col justify-center ml-2 cursor-pointer'
        onClick={handleOpenUser}
      >
        <div className='font-medium'>{name}</div>
        <div className='text-xs'>{subhead}</div>
      </div>
    </div>
  )
}

export default Avatar

import React from 'react'
import Skeleton from './Skeleton'
import { useQueryNoRefetch } from '../../hooks/useQueryNoRefetch'
import { getUserProfile } from '../../apis/spotify'
import Profile from './Profile'

function Avatar({ userId, subhead }) {
  const { data, isLoading } = useQueryNoRefetch({
    queryKey: [userId],
    queryFn: () => getUserProfile(userId),
  })

  const handleOpenUser = () => window.open(data?.external_urls?.spotify)
  return (
    <div className='flex'>
      <Profile
        isLoading={isLoading}
        src={data?.images?.[data?.images.length - 1]?.url}
        onClick={handleOpenUser}
      />
      <div
        className='flex flex-col justify-center ml-2 cursor-pointer'
        onClick={handleOpenUser}
      >
        <Skeleton isLoading={isLoading}>
          <div className='font-medium'>{data?.display_name}</div>
        </Skeleton>
        <Skeleton isLoading={isLoading}>
          <div className='text-xs'>{subhead}</div>
        </Skeleton>
      </div>
    </div>
  )
}

export default Avatar

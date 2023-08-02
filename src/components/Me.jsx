import React, { Suspense } from 'react'
import { getMe } from '../apis/spotify'
import { useQuery } from '@tanstack/react-query'
import SpotifyList from './SpotifyList.jsx'
import Avatar from './Avatar'

function Me() {
  useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    suspense: true,
    retry: false,
  })

  return (
    <div className='max-w-[700px] p-5 m-auto'>
      <SpotifyList />
    </div>
  )
}

export default Me

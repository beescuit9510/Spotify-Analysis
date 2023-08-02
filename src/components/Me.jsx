import React, { Suspense } from 'react'
import { getMe } from '../apis/spotify'
import { useQuery } from '@tanstack/react-query'
import SpotifyList from './SpotifyList.jsx'
import Avatar from './Avatar'

function Me() {
  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    suspense: true,
  })

  return (
    <div className='m-5 sm:mx-40 sm:my-10'>
      <SpotifyList />
    </div>
  )
}

export default Me

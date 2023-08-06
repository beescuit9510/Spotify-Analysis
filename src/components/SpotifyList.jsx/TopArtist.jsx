import React, { Suspense, useState } from 'react'
import MyAvatar from './MyAvatar'
import { useQueryCachedData } from '../../hooks/useQueryCachedData'
import Flex from '../lib/Flex'
import TopArtistList from './TopArtistList'
import TopArtistGallery from './TopArtistGallery'
import Skeleton from '../lib/Skeleton'
import Ranges from './Ranges'
import { ErrorBoundary } from '../lib/ErrorBoundary.js'

const TopArtistGalleryFallback = () => {
  return (
    <Flex className='gap-3'>
      {new Array(3).fill(0).map((v, i) => (
        <Skeleton key={i} className='aspect-square w-[32.5%]' />
      ))}
    </Flex>
  )
}

const TopArtistListFallback = () => {
  return (
    <div>
      {new Array(17).fill(0).map((v, i) => (
        <Skeleton key={i}></Skeleton>
      ))}
    </div>
  )
}

export default function TopArtist() {
  const [timeRange, setTimeRange] = useState('short_term')
  const me = useQueryCachedData(['me'])

  return (
    <Flex className='flex-col items-stretch gap-3'>
      <MyAvatar userId={me?.id} />

      <ErrorBoundary fallback={<>ERROR</>}>
        <Suspense fallback={<TopArtistGalleryFallback />}>
          <TopArtistGallery timeRange={timeRange} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<>ERROR</>}>
        <Ranges timeRange={timeRange} handleTimeRange={setTimeRange} />
      </ErrorBoundary>

      <ErrorBoundary fallback={<>ERROR</>}>
        <Suspense fallback={<TopArtistListFallback />}>
          <TopArtistList timeRange={timeRange} />
        </Suspense>
      </ErrorBoundary>
    </Flex>
  )
}

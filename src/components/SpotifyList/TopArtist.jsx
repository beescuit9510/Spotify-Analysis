import React, { Suspense, useState } from 'react'
import MyAvatar from './MyAvatar'
import { useQueryCachedData } from '../../hooks/useQueryCachedData'
import Flex from '../lib/Flex'
import TopArtistTable from './TopArtistTable'
import TopGallery from './TopGallery'
import Ranges from './Ranges'
import { ErrorBoundary } from '../lib/ErrorBoundary.js'
import GalleryLoadingFallback from '../lib/GalleryLoadingFallback'
import TableLoadingFallback from '../lib/TableLoadingFallback'

export default function TopArtist() {
  const [timeRange, setTimeRange] = useState('short_term')

  return (
    <Flex className='flex-col items-stretch gap-3'>
      <MyAvatar subhead={'Your Top Artists'} />

      <ErrorBoundary fallback={<>ERROR</>}>
        <Suspense fallback={<GalleryLoadingFallback />}>
          <TopGallery type={'artists'} timeRange={timeRange} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<>ERROR</>}>
        <Ranges timeRange={timeRange} handleTimeRange={setTimeRange} />
      </ErrorBoundary>

      <ErrorBoundary fallback={<>ERROR</>}>
        <Suspense fallback={<TableLoadingFallback />}>
          <TopArtistTable timeRange={timeRange} />
        </Suspense>
      </ErrorBoundary>
    </Flex>
  )
}

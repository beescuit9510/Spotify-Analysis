import React, { Suspense, useState } from 'react'
import MyAvatar from './MyAvatar'
import Flex from '../lib/Flex'
import TopArtistTable from './TopArtistTable'
import TopGallery from './TopGallery'
import Ranges from './Ranges'
import { ErrorBoundary } from '../lib/ErrorBoundary.js'
import GalleryLoadingFallback from '../lib/GalleryLoadingFallback'
import TableLoadingFallback from '../lib/TableLoadingFallback'
import useTopQueryCachedData from '../../hooks/useTopQueryCachedData'
import { useTopQuery } from '../../hooks/useTopQuery'

export default function TopArtist() {
  const [timeRange, setTimeRange] = useState('short_term')
  const data = useTopQueryCachedData('artists', timeRange)
  const query = data ? useTopQueryCachedData : useTopQuery

  return (
    <Flex className='flex-col gap-3'>
      <MyAvatar subhead={'Your Top Artists'} />

      <ErrorBoundary fallback={<>ERROR</>}>
        <Suspense fallback={<GalleryLoadingFallback />}>
          <TopGallery query={query} type={'artists'} timeRange={timeRange} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<>ERROR</>}>
        <Ranges timeRange={timeRange} handleTimeRange={setTimeRange} />
      </ErrorBoundary>

      <ErrorBoundary fallback={<>ERROR</>}>
        <Suspense fallback={<TableLoadingFallback />}>
          <TopArtistTable query={query} timeRange={timeRange} />
        </Suspense>
      </ErrorBoundary>
    </Flex>
  )
}

import React, { Suspense, useState } from 'react'
import Ranges from './Ranges'
import MyAvatar from './MyAvatar'
import TopGallery from './TopGallery'
import { ErrorBoundary } from '../lib/ErrorBoundary'
import TopTrackTable from './TopTrackTable'
import Flex from '../lib/Flex'
import GalleryLoadingFallback from '../lib/GalleryLoadingFallback'
import TableLoadingFallback from '../lib/TableLoadingFallback'
import useTopQueryCachedData from '../../hooks/useTopQueryCachedData'
import { useTopQuery } from '../../hooks/useTopQuery'

export default function TopTrack() {
  const [timeRange, setTimeRange] = useState('short_term')
  const data = useTopQueryCachedData('artists', timeRange)
  const query = data ? useTopQueryCachedData : useTopQuery

  return (
    <Flex className='flex-col gap-3'>
      <MyAvatar subhead={'Your Top Tracks'} />

      <ErrorBoundary fallback={<>ERROR</>}>
        <Suspense fallback={<GalleryLoadingFallback />}>
          <TopGallery query={query} type={'tracks'} timeRange={timeRange} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<>ERROR</>}>
        <Ranges timeRange={timeRange} handleTimeRange={setTimeRange} />
      </ErrorBoundary>

      <ErrorBoundary fallback={<>ERROR</>}>
        <Suspense fallback={<TableLoadingFallback />}>
          <TopTrackTable query={query} timeRange={timeRange} />
        </Suspense>
      </ErrorBoundary>
    </Flex>
  )
}

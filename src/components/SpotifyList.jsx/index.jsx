import React, { Suspense } from 'react'
import TopArtist from './TopArtist'
import TopTrack from './TopTrack'
import { ErrorBoundary } from '../lib/ErrorBoundary'

function SpotifyList() {
  return (
    <>
      <ErrorBoundary fallback={<>ERROR</>}>
        <Suspense fallback={<>Loading...</>}>
          <TopArtist />
        </Suspense>
      </ErrorBoundary>
      <br />
      <ErrorBoundary fallback={<>ERROR</>}>
        <Suspense fallback={<>Loading...</>}>
          <TopTrack />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default SpotifyList

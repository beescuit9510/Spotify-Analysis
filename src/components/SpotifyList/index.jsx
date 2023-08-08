import React from 'react'
import TopArtist from './TopArtist'
import TopTrack from './TopTrack'
import { ErrorBoundary } from '../lib/ErrorBoundary'
import FollowedArtists from './FollowedArtists'
import Flex from '../lib/Flex'

function SpotifyList() {
  return (
    <Flex className={'flex-col gap-10'}>
      <ErrorBoundary fallback={<>ERROR FROM TopArtist</>}>
        <TopArtist />
      </ErrorBoundary>

      <ErrorBoundary fallback={<>ERROR FROM TopTrack</>}>
        <TopTrack />
      </ErrorBoundary>

      <ErrorBoundary fallback={<>ERROR FROM ArtistGallery</>}>
        <FollowedArtists />
      </ErrorBoundary>
    </Flex>
  )
}

export default SpotifyList

import React, { Suspense } from 'react'
import ArtistGallery from './ArtistGallery'
import GalleryLoadingFallback from '../lib/GalleryLoadingFallback'

export default function FollowedArtists() {
  return (
    <div>
      <div className='text-2xl font-medium mb-2'>Followed Artists</div>
      <Suspense
        fallback={
          <>
            <GalleryLoadingFallback />
            <GalleryLoadingFallback />
            <GalleryLoadingFallback />
          </>
        }
      >
        <ArtistGallery />
      </Suspense>
    </div>
  )
}

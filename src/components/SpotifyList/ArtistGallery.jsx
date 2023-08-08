import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getFollowedArtists, getNext } from '../../apis/spotify'
import Loading from '../lib/Loading'
import ArtistGalleryItem from './ArtistGalleryItem'

export default function ArtistGallery() {
  const query = useInfiniteQuery({
    queryKey: ['followed artists'],
    queryFn: ({ pageParam }) => {
      if (pageParam) return getNext(pageParam)
      return getFollowedArtists({ after: null, limit: 9 })
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.artists.next) return lastPage.artists.next
      else return false
    },
    suspense: true,
    retry: false,
  })
  return (
    <>
      <div className='flex flex-wrap gap-3 justify-between'>
        {query?.data?.pages
          .flatMap((page) => page.artists.items)
          .map((item) => ({
            name: item.name,
            id: item.id,
            url: item.external_urls.spotify,
            image: item.images[0].url,
          }))
          .map((item) => {
            return <ArtistGalleryItem key={item.id} item={item} />
          })}
      </div>
      <button
        onClick={() => {
          if (query.hasNextPage) {
            query.fetchNextPage()
          }
        }}
      >
        {query.isFetching && (
          <div className=' w-6 mr-1'>
            <Loading />
          </div>
        )}
        show more
      </button>
    </>
  )
}

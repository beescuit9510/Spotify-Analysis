import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getFollowedArtists, getNext } from '../../apis/spotify'
import Loading from '../lib/Loading'
import ArtistGalleryItem from './ArtistGalleryItem'
import Flex from '../lib/Flex'

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
    <Flex className='flex-col gap-5 items-center justify-center'>
      <Flex className='flex-wrap gap-3 justify-between'>
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
      </Flex>
      <button
        onClick={() => {
          if (query.hasNextPage) {
            query.fetchNextPage()
          }
        }}
      >
        <div className='flex justify-center items-center'>
          {query.isFetching ? (
            <div className='w-6 mr-1'>
              <Loading className='text-indigo-500' />
            </div>
          ) : (
            <div className='text-indigo-700 hover:text-indigo-500 font-medium'>
              Show more
            </div>
          )}
        </div>
      </button>
    </Flex>
  )
}

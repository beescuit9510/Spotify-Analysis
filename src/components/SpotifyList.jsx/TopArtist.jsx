import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getTop } from '../../apis/spotify'
import Table from '../lib/Table'
import Gallery from '../lib/Gallery'
import Ranges from './Ranges'
import ListenOnSpotifyBtn from './ListenOnSpotifyBtn'
import MyAvatar from './MyAvatar'
import { useQueryCachedData } from '../../hooks/useQueryCachedData'
import Flex from '../lib/Flex'

export default function TopArtist() {
  const [timeRange, setTimeRange] = useState('short_term')
  const [page, setPage] = useState(0)

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['topArtists', timeRange],
    queryFn: ({ pageParam = 0 }) => {
      return getTop('artists', {
        limit: 10,
        offset: pageParam,
        time_range: timeRange,
      })
    },

    getNextPageParam: (lastPage) => {
      if (lastPage.offset + 10 >= lastPage.total) return false

      return lastPage.offset + 10
    },
    suspense: true,
  })

  const list = data.pages.slice(0, page + 1).flatMap((data) => data.items)

  const me = useQueryCachedData(['me'])

  return (
    <Flex className='flex-col items-stretch gap-3 '>
      <MyAvatar userId={me?.id} />
      <Ranges
        timeRange={timeRange}
        handleRange={(val) => {
          setTimeRange(val)
          setPage(0)
        }}
      />
      <Gallery
        data={list.map((item) => ({
          id: item.id,
          url: item.external_urls.spotify,
          image: item.images[0].url,
        }))}
        limit={3}
      />
      <Flex className={'flex-col items-stretch'}>
        <Table
          dataSource={list}
          columns={[
            {
              label: 'POS.',
              key: 'POSITION',
              render: (artist, index) => (
                <div className='text-gray-500 text-center max-w-[6rem]'>
                  {index + 1}
                </div>
              ),
            },
            {
              key: 'img',
              props: { hidden: true },
              render: (artist) => (
                <div className='py-2'>
                  <img
                    className='min-w-[3rem] w-20 cursor-pointer'
                    src={artist.images[0].url}
                    onClick={() => window.open(artist.external_urls.spotify)}
                  />
                </div>
              ),
            },
            {
              label: 'ARTIST',
              key: 'ARTIST',
              props: { colSpan: 3 },
              render: (artist) => (
                <div className='px-3 text-sm'>
                  <span
                    className='cursor-pointer'
                    onClick={() => window.open(artist.external_urls.spotify)}
                  >
                    {artist.name}
                  </span>
                </div>
              ),
            },
            {
              key: 'btn',
              props: { hidden: true },
              render: (artist) => (
                <div className='pr-2 '>
                  <div className='flex justify-end'>
                    <ListenOnSpotifyBtn
                      spotifyLink={artist.external_urls.spotify}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />
        <button
          className='shadow h-10 rounded-b-2xl bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-100'
          onClick={() => {
            if (hasNextPage) fetchNextPage() && setPage((prev) => prev + 1)
            else if (page === data.pageParams.length - 1) setPage(0)
            else setPage((prev) => prev + 1)
          }}
        >
          {hasNextPage || page !== data.pageParams.length - 1
            ? 'Show more'
            : 'Show less'}
        </button>
      </Flex>
    </Flex>
  )
}

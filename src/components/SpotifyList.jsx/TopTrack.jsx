import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getTop } from '../../apis/spotify'
import Table from '../lib/Table'
import Gallery from '../lib/Gallery'
import Ranges from './Ranges'
import ListenOnSpotifyBtn from './ListenOnSpotifyBtn'
import MyAvatar from './MyAvatar'
import { useQueryCachedData } from '../../hooks/useQueryCachedData'

export default function TopTrack() {
  const [timeRange, setTimeRange] = useState('short_term')
  const [page, setPage] = useState(0)

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['topTracks', timeRange],
    queryFn: ({ pageParam = 0 }) => {
      return getTop('tracks', {
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
    <div className='flex flex-col gap-3'>
      <MyAvatar userId={me.id} />
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
          image: item.album.images[0].url,
        }))}
        limit={3}
      />
      <div className='flex flex-col'>
        <Table
          dataSource={list}
          columns={[
            {
              label: 'POS.',
              key: 'POSITION',
              render: (item, index) => (
                <div className='text-gray-500 text-center w-20'>
                  {index + 1}
                </div>
              ),
            },
            {
              key: 'img',
              props: { hidden: true },
              render: (item) => (
                <div className='py-2'>
                  <img
                    className='min-w-[3rem] w-20 cursor-pointer'
                    src={item.album.images[0].url}
                    onClick={() => window.open(item.external_urls.spotify)}
                  />
                </div>
              ),
            },
            {
              label: 'SONG',
              key: 'SONG',
              props: { colSpan: 3 },
              render: (item) => (
                <div className='px-3'>
                  <div
                    className='cursor-pointer text-sm'
                    onClick={() => window.open(item.external_urls.spotify)}
                  >
                    {item.name}
                  </div>
                  <div className='cursor-pointer text-slate-500 text-xs'>
                    {item.artists.map((artist, index) => (
                      <a
                        key={index}
                        href={artist.external_urls.spotify}
                        target='_blank'
                      >
                        {artist.name}
                        {index !== item.artists.length - 1 ? ', ' : ''}
                      </a>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              key: 'btn',
              props: { hidden: true },
              render: (artist) => (
                <div className='pr-2'>
                  <ListenOnSpotifyBtn
                    spotifyLink={artist.external_urls.spotify}
                  />
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
      </div>
    </div>
  )
}

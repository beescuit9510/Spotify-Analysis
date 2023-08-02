import {
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import React, { useState } from 'react'
import { getTop } from '../../apis/spotify'
import Table from '../Table'
import Gallery from './Gallery'
import Ranges from './Ranges'
import ListenOnSpotifyBtn from './ListenOnSpotifyBtn'
import Avatar from '../Avatar'

export default function TopArtist() {
  const [timeRange, setTimeRange] = useState('short_term')
  const [page, setPage] = useState(1)

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['topArtists', timeRange],
    queryFn: ({ pageParam = page }) => {
      setPage(pageParam)
      const offset = pageParam * 10 - 10
      return getTop('artists', {
        limit: 10,
        offset: offset,
        time_range: timeRange,
      })
    },
    getNextPageParam: (lastPage) => {
      if (page * 10 >= lastPage.total) {
        return false
      } else {
        return page + 1
      }
    },
    suspense: true,
  })

  const list = data.pages.slice(0, page).flatMap((data) => data.items)

  const queryClient = useQueryClient()
  const me = queryClient.getQueryData(['me'])
  const { display_name: name, images, external_urls } = me
  const image = images[images.length - 1]

  return (
    <div className='flex flex-col gap-3'>
      <Avatar
        name={name}
        profileUrl={image.url}
        userUrl={external_urls.spotify}
        subhead={'Your Top Artists'}
      />
      <Ranges
        timeRange={timeRange}
        handleRange={(val) => {
          setTimeRange(val)
          setPage(1)
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
      <div className='flex flex-col'>
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
            if (hasNextPage) fetchNextPage()
            else setPage(1)
          }}
        >
          {hasNextPage ? 'Show more' : 'Show less'}
        </button>
      </div>
    </div>
  )
}

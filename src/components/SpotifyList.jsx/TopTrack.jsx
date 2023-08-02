import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getTop } from '../../apis/spotify'
import Table from '../Table'
import Gallery from './Gallery'
import Ranges from './Ranges'
import ListenOnSpotifyBtn from './ListenOnSpotifyBtn'
import Avatar from '../Avatar'

export default function TopTrack() {
  const [timeRange, setTimeRange] = useState('short_term')
  const [limit, setLimit] = useState(10)

  const { data } = useQuery({
    queryKey: ['topTracks', timeRange],
    queryFn: () => getTop('tracks', { limit, time_range: timeRange }),
    suspense: true,
  })

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
      <Ranges timeRange={timeRange} setTimeRange={setTimeRange} />
      <Gallery
        data={data.items.map((item) => ({
          id: item.id,
          url: item.external_urls.spotify,
          image: item.album.images[0].url,
        }))}
        limit={3}
      />
      <Table
        dataSource={data.items}
        columns={[
          {
            label: 'POS.',
            key: 'POSITION',
            render: (item, index) => (
              <div className='text-gray-500 text-center w-20'>{index + 1}</div>
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
    </div>
  )
}

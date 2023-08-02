import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getTop } from '../../apis/spotify'
import Table from '../Table'
import Gallery from './Gallery'
import Ranges from './Ranges'
import ListenOnSpotifyBtn from './ListenOnSpotifyBtn'
import Avatar from '../Avatar'

export default function TopArtist() {
  const [timeRange, setTimeRange] = useState('short_term')
  const [limit, setLimit] = useState(10)

  const { data } = useQuery({
    queryKey: ['topArtists', timeRange],
    queryFn: () => getTop('artists', { limit, time_range: timeRange }),
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
          url: item.external_urls.spotify,
          image: item.images[0].url,
        }))}
        limit={3}
      />
      <Table
        dataSource={data.items}
        columns={[
          {
            label: 'POS.',
            key: 'POSITION',
            render: (artist, index) => (
              <td className='text-gray-500 text-center'>{index + 1}</td>
            ),
          },
          {
            key: 'img',
            props: { hidden: true },
            render: (artist) => (
              <td className='py-2'>
                <img
                  className='min-w-[3rem] w-20 cursor-pointer'
                  src={artist.images[0].url}
                  onClick={() => window.open(artist.external_urls.spotify)}
                />
              </td>
            ),
          },
          {
            label: 'ARTIST',
            key: 'ARTIST',
            props: { colSpan: 3 },
            render: (artist) => (
              <td className='px-3 text-sm'>
                <span
                  className='cursor-pointer'
                  onClick={() => window.open(artist.external_urls.spotify)}
                >
                  {artist.name}
                </span>
              </td>
            ),
          },
          {
            key: 'btn',
            props: { hidden: true },
            render: (artist) => (
              <td className='pr-2'>
                <ListenOnSpotifyBtn
                  spotifyLink={artist.external_urls.spotify}
                />
              </td>
            ),
          },
        ]}
      />
    </div>
  )
}

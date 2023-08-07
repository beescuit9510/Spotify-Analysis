import React from 'react'
import Table from '../lib/Table'
import ListenOnSpotifyBtn from './ListenOnSpotifyBtn'
import { useTopQuery } from '../../hooks/useTopQuery'
import Flex from '../lib/Flex'
import { CgSpinner } from 'react-icons/cg'

export default function TopTrackTable({ timeRange }) {
  const { list, handleNext, hasNextPage, query } = useTopQuery({
    type: 'tracks',
    timeRange,
  })

  return (
    <Flex className={'flex-col items-stretch'}>
      <Table
        dataSource={list}
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
      <button
        className='shadow h-10 rounded-b-2xl bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-100'
        onClick={handleNext}
        hidden={!hasNextPage && query.data.pages.length === 1}
      >
        <div className='flex items-center justify-center'>
          {query.isFetching ? (
            <CgSpinner className='animate-spin text-2xl mr-1' />
          ) : hasNextPage ? (
            'Show more'
          ) : (
            'Show less'
          )}
        </div>
      </button>
    </Flex>
  )
}

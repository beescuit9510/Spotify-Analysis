import React from 'react'
import Table from '../lib/Table'
import ListenOnSpotifyBtn from './ListenOnSpotifyBtn'
import Flex from '../lib/Flex'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { LuEqual } from 'react-icons/lu'

export default function TopTrackTable({ query, timeRange }) {
  const { list, handleNext, hasNextPage, hasNoPages } = query({
    type: 'tracks',
    timeRange,
  })

  return (
    <Flex className={'flex-col'}>
      <Table
        dataSource={list}
        columns={[
          {
            label: 'POS.',
            key: 'POSITION',
            render: (item, index) => (
              <div className='text-gray-500 text-center'>
                <Flex className='items-center justify-center gap-1 sm:p-6'>
                  {index + 1}
                  {item.isDown && (
                    <AiFillCaretDown className=' text-red-500 text-lg' />
                  )}
                  {item.isUp && (
                    <AiFillCaretUp className=' text-green-500 text-lg' />
                  )}
                  {item.isStay && <LuEqual className=' text-slate-500' />}
                </Flex>
              </div>
            ),
          },
          {
            key: 'img',
            props: { hidden: true },
            render: (item) => (
              <div className='flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16'>
                <img
                  className='w-full h-full bg-cover bg-gray-50 cursor-pointer'
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
              <div className='pr-2 hidden sm:block'>
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
        hidden={hasNoPages}
      >
        <div className='flex items-center justify-center'>
          {hasNextPage ? 'Show more' : 'Show less'}
        </div>
      </button>
    </Flex>
  )
}

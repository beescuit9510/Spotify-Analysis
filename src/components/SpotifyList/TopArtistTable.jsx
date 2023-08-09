import React from 'react'
import Table from '../lib/Table'
import ListenOnSpotifyBtn from './ListenOnSpotifyBtn'
import Flex from '../lib/Flex'
import { useTopQuery } from '../../hooks/useTopQuery'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { LuEqual } from 'react-icons/lu'

export default function TopArtistTable({ timeRange }) {
  const { list, handleNext, hasNextPage, hasNoPages } = useTopQuery({
    type: 'artists',
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
                  className='w-full h-full bg-cover bg-gray-50'
                  src={item.images[0].url}
                  onClick={() => window.open(item.external_urls.spotify)}
                />
              </div>
            ),
          },
          {
            label: 'ARTIST',
            key: 'ARTIST',
            props: { colSpan: 3 },
            render: (item) => (
              <div className='px-3 text-sm sm:w-80'>
                <span
                  className='cursor-pointer'
                  onClick={() => window.open(item.external_urls.spotify)}
                >
                  {item.name}
                </span>
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

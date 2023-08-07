import React from 'react'
import Table from '../lib/Table'
import ListenOnSpotifyBtn from './ListenOnSpotifyBtn'
import Flex from '../lib/Flex'
import { useTopQuery } from '../../hooks/useTopQuery'
import { CgSpinner } from 'react-icons/cg'

export default function TopArtistTable({ timeRange }) {
  const { list, handleNext, hasNextPage, query } = useTopQuery({
    type: 'artists',
    timeRange,
  })

  return (
    <>
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
    </>
  )
}

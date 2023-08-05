import React, { Suspense } from 'react'
import Main from './lib/Main'
import { BsSpotify } from 'react-icons/bs'
import Flex from './lib/Flex'
import { handleSpotifyLogin, handleSpotifyLogout } from '../apis/spotify'
import { useQueryClient } from '@tanstack/react-query'
import Me from './Me.jsx'
import { ErrorBoundary } from './lib/ErrorBoundary'

export default function Header() {
  const client = useQueryClient()

  const handleLogout = () => {
    client.invalidateQueries(['me'])
    handleSpotifyLogout()
  }

  const handleLogin = () => handleSpotifyLogin()

  return (
    <div className='border-b'>
      <Main className={'py-4'}>
        <Flex className='justify-between'>
          <Flex className='justify-stretch gap-1'>
            <BsSpotify className='text-4xl text-indigo-600 cursor-pointer' />
            <Flex className='flex-col items-stretch text-xl  font-medium leading-5 cursor-pointer hidden sm:block'>
              <h1 className='font-bold text-slate-800'>Spotify Analysis</h1>
              <span className='text-xs text-slate-600'>Analyze your music</span>
            </Flex>
          </Flex>

          <button className='text-indigo-600 hover:text-indigo-500 font-medium'>
            <ErrorBoundary
              fallback={<div onClick={handleLogin}>See my Stats</div>}
            >
              <Me>
                <div onClick={handleLogout}>Log out</div>
              </Me>
            </ErrorBoundary>
          </button>
        </Flex>
      </Main>
    </div>
  )
}

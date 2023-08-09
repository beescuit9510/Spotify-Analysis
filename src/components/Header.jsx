import React, { Suspense, useState } from 'react'
import Main from './lib/Main'
import Button from './lib/Button'
import { BsSpotify } from 'react-icons/bs'
import Flex from './lib/Flex'
import { handleSpotifyLogin, handleSpotifyLogout } from '../apis/spotify'
import { useQueryClient } from '@tanstack/react-query'
import Me from './Me.jsx'

import { ErrorBoundary } from './lib/ErrorBoundary'

export default function Header() {
  const [isLoading, setIsLoading] = useState(false)
  const client = useQueryClient()

  const handleLogout = async () => {
    setIsLoading(true)
    client.invalidateQueries(['me'])
    handleSpotifyLogout()
    window.location.reload()
  }

  const handleLogin = () => {
    setIsLoading(true)
    handleSpotifyLogin()
  }

  return (
    <div className='border-b'>
      <Main className={'py-4'}>
        <Flex className='justify-between'>
          <Flex className='gap-1'>
            <BsSpotify className='text-4xl text-indigo-600 cursor-pointer' />
            <Flex className='flex-col text-xl font-medium leading-5 cursor-pointer hidden sm:block'>
              <h1 className='font-bold text-slate-800'>Spotify Analysis</h1>
              <span className='text-xs text-slate-600'>Analyze your music</span>
            </Flex>
          </Flex>

          <ErrorBoundary
            fallback={
              <Button
                className={'text-indigo-600 hover:text-indigo-500 font-medium'}
                onClick={handleLogin}
                isLoading={isLoading}
              >
                See my Stats
              </Button>
            }
          >
            <Me>
              <Button
                className={'text-indigo-600 hover:text-indigo-500 font-medium'}
                onClick={handleLogout}
                isLoading={isLoading}
              >
                Log out
              </Button>
            </Me>
          </ErrorBoundary>
        </Flex>
      </Main>
    </div>
  )
}

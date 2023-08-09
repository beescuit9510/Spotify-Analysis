import React from 'react'
import Button from '../lib/Button'
import { FaSpotify } from 'react-icons/fa'

export default function ListenOnSpotifyBtn({ spotifyLink }) {
  return (
    <Button
      className={
        'border rounded-md hover:shadow-none hover:bg-slate-50 mx-0 my-0 gap-0 py-0.5 px-1 md:gap-1.5 md:py-1 md:px-2 max-w-[6rem]'
      }
      onClick={() => window.open(spotifyLink)}
    >
      <div className='flex flex-row justify-center items-center leading-3 text-xs font-light sm:text-medium sm:font-normal'>
        <FaSpotify className='text-3xl mr-1' />
        <div>
          <span>Listen on </span>
          <span>Spotify</span>
        </div>
      </div>
    </Button>
  )
}

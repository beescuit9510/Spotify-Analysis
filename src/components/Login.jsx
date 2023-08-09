import { FaSpotify } from 'react-icons/fa'
import Button from './lib/Button'
import Flex from './lib/Flex'
import Main from './lib/Main'

import { handleSpotifyLogin } from '../apis/spotify'
import { useState } from 'react'

function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const handleLogin = () => {
    setIsLoading(true)
    handleSpotifyLogin()
  }

  return (
    <>
      <Main>
        <Flex className='flex-col gap-3'>
          <div>
            <h2 className='font-bold text-3xl'>Your Spotify Stats</h2>
          </div>
          <div className=' >text-lg text-gray-500'>
            <h3>
              Get statistics about your top artists, songs, and genres from
              Spotify.
            </h3>
            <h3>Updated daily. Easy to share.</h3>
          </div>
          <div>
            <Button
              className={
                'border rounded-md p-2 px-4 hover:shadow-md text-lg text-white bg-indigo-600  hover:bg-indigo-700 font-bold'
              }
              isLoading={isLoading}
              onClick={handleLogin}
            >
              <Flex className={'justify-center items-center gap-2'}>
                <FaSpotify />
                <div>Log in with Spotify</div>
              </Flex>
            </Button>
          </div>
        </Flex>
      </Main>
    </>
  )
}

export default Login

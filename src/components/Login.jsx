import { FaSpotify } from 'react-icons/fa'
import Button from './lib/Button'
import Flex from './lib/Flex'
import Main from './lib/Main'
import { handleSpotifyLogin } from '../apis/spotify'

function Login() {
  const handleLogin = () => handleSpotifyLogin()

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
                'text-lg text-white bg-indigo-600  hover:bg-indigo-700 p-2 font-bold'
              }
              onClick={handleLogin}
            >
              <FaSpotify className='text-2xl' />
              Log in with Spotify
            </Button>
          </div>
        </Flex>
      </Main>
    </>
  )
}

export default Login

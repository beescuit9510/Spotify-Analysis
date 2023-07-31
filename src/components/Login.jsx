import { FaSpotify } from 'react-icons/fa'
import Button from './Button'
import { handleSpotifyLogin } from '../apis/spotify'

function Login() {
  return (
    <>
      <section className='flex justify-center'>
        <div className='flex flex-col gap-5 m-20'>
          <div>
            <h2 className='font-extrabold text-5xl'>Your Spotify Stats</h2>
          </div>
          <div className=' > text-2xl text-gray-500'>
            <h3>
              Get statistics about your top artists, songs, and genres from
              Spotify.
            </h3>
            <h3>Updated daily. Easy to share.</h3>
          </div>
          <div>
            <Button
              className={
                'hover:bg-green-700 text-2xl font-medium text-white bg-green-600 '
              }
              onClick={handleSpotifyLogin}
            >
              <FaSpotify className='text-2xl' />
              Log in with Spotify
            </Button>
          </div>
          <div></div>
        </div>
      </section>
    </>
  )
}

export default Login

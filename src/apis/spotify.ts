import { http } from './http'

const redirectToLoginWithSpotify = async () => {
  const scope =
    'user-read-private user-read-email  ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control user-read-email user-read-private playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-library-modify user-library-read user-top-read user-read-playback-position user-read-recently-played user-follow-read user-follow-modify'
  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const redirect_uri = 'http://localhost:5173/'
  const url =
    `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(
      client_id
    )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}` as any
  //todo url += '&state=' + encodeURIComponent(state)

  window.location = url
}

const storeAccessToken = () => {
  const urlParams = new URLSearchParams(window.location.hash)
  localStorage.setItem('access_token', urlParams.get('#access_token') || '')
  localStorage.setItem('expires_in', urlParams.get('expires_in') || '')
  localStorage.setItem('token_type', urlParams.get('token_type') || '')
}

export const handleSpotifyLogin = () => {
  redirectToLoginWithSpotify()
  storeAccessToken()
}

export const getMe = () => http.get('/v1/me')

export const getTopArtists = (
  type: 'track' | 'artist',
  params: {
    time_range: 'long_term' | 'medium_term' | 'short_term'
    limit: 0 | 10 | 20 | 30 | 40 | 50
    offset: number
  }
) => http.get(`/v1/me/top/${type}`, { params })

export const getUserProfile = (userId: string) =>
  http.get(`/v1/users/${userId}`)

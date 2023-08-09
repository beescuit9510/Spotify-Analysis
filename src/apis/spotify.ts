import { http } from './http'

const redirectToLoginWithSpotify = async () => {
  const scope =
    'user-read-private user-read-email  ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control user-read-email user-read-private playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-library-modify user-library-read user-top-read user-read-playback-position user-read-recently-played user-follow-read user-follow-modify'
  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const redirect_uri = window.location.origin
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
  localStorage.clear()
  const { access_token, expires_in, token_type } = getToken()
  localStorage.setItem('access_token', access_token ?? '')
  localStorage.setItem('expires_in', expires_in ?? '')
  localStorage.setItem('token_type', token_type ?? '')
}

export const handleSpotifyLogin = async () => {
  await redirectToLoginWithSpotify()
  storeAccessToken()
}

export const handleSpotifyLogout = async () => localStorage.clear()

export const getToken = () => {
  const urlParams = new URLSearchParams(window.location.hash)
  const access_token = urlParams.get('#access_token')
  const expires_in = urlParams.get('expires_in')
  const token_type = urlParams.get('token_type')
  return { access_token, expires_in, token_type }
}

export const getMe = () => http.get('/v1/me')

export type TimeRange = 'long_term' | 'medium_term' | 'short_term'
export type Limit = 0 | 10 | 20 | 30 | 40 | 50
export type TopParams = {
  time_range?: TimeRange
  limit?: Limit
  offset?: number
}
export const getTop = (type: 'tracks' | 'artists', params: TopParams) =>
  http.get(`/v1/me/top/${type}`, { params })

export type FollowedArtistsParams = {
  after?: TimeRange
  limit?: Limit
}

export const getFollowedArtists = (params: FollowedArtistsParams) =>
  http.get('/v1/me/following', {
    params: { ...params, type: 'artist' },
  })

export const getPlaylists = (params: FollowedArtistsParams) =>
  http.get('/v1/me/playlists')

export const getPlaylistItems = (
  playlistId: number,
  params: FollowedArtistsParams
) => http.get(`/v1/playlists/${playlistId}`)

export const getRecentlyPlayed = (params: FollowedArtistsParams) =>
  http.get('/v1/me/player/recently-played')

export const getNext = (
  url: string,
  replace: string = 'https://api.spotify.com/'
) => http.get(url.replace(replace, '/'))

export const getUserProfile = (userId: string) =>
  http.get(`/v1/users/${userId}`)

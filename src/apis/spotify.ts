import { http } from './http'

export const handleSpotifyLogin = async () => {
  const popupWidth = 500
  const popupHeight = 700
  const left = window.innerWidth / 2 - popupWidth / 2 + window.screenX
  const top = window.innerHeight / 2 - popupHeight / 2 + window.screenY

  const popup = window.open(
    '',
    '_blank',
    `width=${popupWidth}, height=${popupHeight}, left=${left}, top=${top}`
  )

  const scope =
    'user-read-private user-read-email  ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control user-read-email user-read-private playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-library-modify user-library-read user-top-read user-read-playback-position user-read-recently-played user-follow-read user-follow-modify'
  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const redirect_uri = `${window.location.origin}/redirect-uri`

  const popupContent = `
<!DOCTYPE html>
<html>
  <head>
    <script>
      const redirectToLoginWithSpotify = async () => {
        const url =
          'https://accounts.spotify.com/authorize?response_type=token&client_id=' +
          encodeURIComponent('${client_id}') +
          '&scope=' +
          encodeURIComponent('${scope}') +
          '&redirect_uri=' +
          encodeURIComponent('${redirect_uri}')
        window.location = url
      }
      
      redirectToLoginWithSpotify()
    </script>
  </head>
</html>`

  const checkPopupLoaded = setInterval(function () {
    if (
      popup &&
      popup.window &&
      popup.window.document.readyState === 'complete'
    ) {
      clearInterval(checkPopupLoaded)
      popup.document.write(popupContent)
    }
  }, 100)
}

export const handleSpotifyLogout = async () => localStorage.clear()

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

export const unfollowArtists = (data: { ids: string[] }) =>
  http.delete('/v1/me/following', {
    params: { type: 'artist', ...data },
  })

export const followArtists = (data: { ids: string[] }) =>
  http.put({
    url: '/v1/me/following',
    config: { params: { type: 'artist', ...data } },
  })

export const getNext = (
  url: string,
  replace: string = 'https://api.spotify.com/'
) => http.get(url.replace(replace, '/'))

export const getUserProfile = (userId: string) =>
  http.get(`/v1/users/${userId}`)

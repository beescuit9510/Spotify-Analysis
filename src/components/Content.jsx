import React, { useEffect } from 'react'
import SpotifyList from './SpotifyList/index.jsx'
import Main from './lib/Main.jsx'
import Me from './Me.jsx'
import { ErrorBoundary } from './lib/ErrorBoundary.js'
import Login from './Login.jsx'

function Content() {
  useEffect(() => {
    const storeAccessToken = () => {
      const urlParams = new URLSearchParams(window.location.hash)
      const access_token = urlParams.get('#access_token')
      const expires_in = urlParams.get('expires_in')
      const token_type = urlParams.get('token_type')
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('expires_in', expires_in)
      localStorage.setItem('token_type', token_type)
    }

    if (window.location.pathname === '/redirect-uri') {
      storeAccessToken()
      window.close()
      window.opener.location.reload()
    }
  }, [])

  return (
    <>
      <ErrorBoundary fallback={<Login />}>
        <Me>
          <Main>
            <SpotifyList />
          </Main>
        </Me>
      </ErrorBoundary>
    </>
  )
}

export default Content

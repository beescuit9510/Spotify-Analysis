import React, { useEffect } from 'react'
import SpotifyList from './SpotifyList/index.jsx'
import Main from './lib/Main.jsx'
import Me from './Me.jsx'
import { ErrorBoundary } from './lib/ErrorBoundary.js'
import Login from './Login.jsx'

function Content() {
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

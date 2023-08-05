import React, { useEffect } from 'react'
import SpotifyList from './SpotifyList.jsx/index.jsx'
import Main from './lib/Main.jsx'
import Me from './Me.jsx'

function Content() {
  return (
    <>
      <Me>
        <Main>
          <SpotifyList />
        </Main>
      </Me>
    </>
  )
}

export default Content

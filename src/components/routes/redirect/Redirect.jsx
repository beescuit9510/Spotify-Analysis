import React, { useEffect } from 'react'

export default function Redirect() {
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

    storeAccessToken()
    window.close()
    window.opener.location.reload()
  }, [])

  return <div>Redirecting...</div>
}

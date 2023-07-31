import React, { useEffect, useState } from 'react'
import { getMe } from '../apis/spotify'

function Me() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    getMe().then((res) => {
      const { display_name, email, images } = res
      setName(display_name)
      setEmail(email)
      setImage(images.pop())
    })
  }, [])

  return (
    <div>
      <div>{name}</div>
      <div>{email}</div>
      <img src={image.url} />
    </div>
  )
}

export default Me

import React from 'react'
import Avatar from '../lib/Avatar'
import { useQueryCachedData } from '../../hooks/useQueryCachedData'

export default function MyAvatar({ subhead }) {
  const me = useQueryCachedData(['me'])

  return (
    <>
      <Avatar userId={me?.id} subhead={subhead} />
    </>
  )
}

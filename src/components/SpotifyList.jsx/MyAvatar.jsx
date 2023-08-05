import React from 'react'
import Avatar from '../lib/Avatar'
import { getUserProfile } from '../../apis/spotify'
import { useQueryNoRefetch } from '../../hooks/useQueryNoRefetch'

export default function MyAvatar({ userId }) {
  const { data } = useQueryNoRefetch({
    queryKey: [userId],
    queryFn: () => {
      return getUserProfile(userId)
    },
  })

  return (
    <>
      <Avatar
        name={data?.display_name}
        profileUrl={data?.images?.[data?.images.length - 1]?.url}
        userUrl={data?.external_urls?.spotify}
        subhead={'Your Top Artists'}
      />
    </>
  )
}

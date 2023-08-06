import React from 'react'
import Avatar from '../lib/Avatar'
import { getUserProfile } from '../../apis/spotify'
import { useQueryNoRefetch } from '../../hooks/useQueryNoRefetch'

export default function MyAvatar({ userId }) {
  const { data, isLoading } = useQueryNoRefetch({
    queryKey: [userId],
    queryFn: () => getUserProfile(userId),
  })

  return (
    <>
      <Avatar
        isLoading={isLoading}
        name={data?.display_name}
        profileUrl={data?.images?.[data?.images.length - 1]?.url}
        userUrl={data?.external_urls?.spotify}
        subhead={'Your Top Artists'}
      />
    </>
  )
}

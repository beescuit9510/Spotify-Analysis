import React from 'react'
import Gallery from '../lib/Gallery'
import { useTopQuery } from '../../hooks/useTopQuery'

export default function TopGallery({ type, timeRange }) {
  const { list } = useTopQuery({ type, timeRange })

  return (
    <Gallery
      data={list.map((item) => ({
        id: item.id,
        url: item.external_urls.spotify,
        image: item?.album?.images[0]?.url ?? item.images[0].url,
      }))}
      limit={3}
    />
  )
}
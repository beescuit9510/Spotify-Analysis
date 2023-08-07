import React from 'react'
import Flex from './Flex'
import Skeleton from './Skeleton'

export default function GalleryLoadingFallback() {
  return (
    <Flex className='gap-3'>
      {new Array(3).fill(0).map((v, i) => (
        <Skeleton key={i} className='aspect-square w-[32.5%]' />
      ))}
    </Flex>
  )
}

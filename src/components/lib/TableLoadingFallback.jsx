import React from 'react'
import Skeleton from './Skeleton'

export default function TableLoadingFallback() {
  return (
    <div>
      {new Array(17).fill(0).map((v, i) => (
        <Skeleton key={i}></Skeleton>
      ))}
    </div>
  )
}

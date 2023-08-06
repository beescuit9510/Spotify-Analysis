import React, { ReactNode } from 'react'

export default function Skeleton({
  isLoading = true,
  className,
  children = <div className='h-8'></div>,
}: {
  isLoading: boolean
  className?: string
  children?: ReactNode
}) {
  if (isLoading) {
    return (
      <div
        className={`animate-pulse bg-slate-200 h-11/12 my-1 ${
          className ? className : ''
        }`}
      >
        <div className='invisible w-full h-full'>{children}</div>
      </div>
    )
  }

  return <>{children}</>
}

import React from 'react'

export default function Main({ className, children, ...rest }) {
  return (
    <div
      className={`max-w-[700px] p-5 m-auto ${className ? className : ''}`}
      {...rest}
    >
      {children}
    </div>
  )
}

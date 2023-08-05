import React from 'react'

export default function Flex({ className, children, ...rest }) {
  return (
    <div
      className={`flex flex-row justify-center items-center ${
        className ? className : ''
      }`}
      {...rest}
    >
      {children}
    </div>
  )
}

import React from 'react'

const Button = ({ className, children, ...rest }) => {
  return (
    <button
      className={`border rounded-md p-2 px-4 hover:shadow-md flex justify-center items-center gap-2 cursor-pointer ${
        className ? className : ''
      }`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button

import React from 'react'
import { CgSpinner } from 'react-icons/cg'

export default function Loading({ className }) {
  return (
    <CgSpinner
      className={`animate-spin h-full w-full ${className ? className : ''}`}
    />
  )
}

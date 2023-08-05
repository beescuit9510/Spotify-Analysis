import React from 'react'
import { useMeQuery } from '../hooks/useMeQuery'

export default function Me({ children }) {
  useMeQuery()

  return <>{children}</>
}

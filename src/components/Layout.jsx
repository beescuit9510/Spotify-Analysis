import React, { Suspense } from 'react'
import Header from './Header'
import { ErrorBoundary } from './lib/ErrorBoundary'
import Login from './Login'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <ErrorBoundary fallback={<Login />}>{children}</ErrorBoundary>
    </>
  )
}

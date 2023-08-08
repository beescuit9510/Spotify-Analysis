import React, { Suspense } from 'react'
import Header from './Header'
import { ErrorBoundary } from './lib/ErrorBoundary'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <ErrorBoundary fallback={<div>ERROR</div>}>{children}</ErrorBoundary>
    </>
  )
}

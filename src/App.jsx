import { Suspense } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import Me from './components/Me'
import Login from './components/Login'

function App() {
  return (
    <>
      <ErrorBoundary fallback={<Login />}>
        <Suspense fallback={<div>Loading...</div>}>
          <Me />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default App

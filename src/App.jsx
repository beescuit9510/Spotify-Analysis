import { Suspense } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import Me from './components/Me'
import Login from './components/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={<Login />}>
          <Suspense fallback={<div>Loading...</div>}>
            <Me />
          </Suspense>
        </ErrorBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App

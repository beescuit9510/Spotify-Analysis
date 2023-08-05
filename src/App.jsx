import Content from './components/Content'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from './components/Layout'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Content />
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App

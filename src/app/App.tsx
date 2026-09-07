import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { ErrorBoundary } from '@components/ErrorBoundary'
import { AppRoutes } from '@/routes/Routes'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
      <Toaster position="bottom-right" richColors />
    </QueryClientProvider>
  )
}

export default App

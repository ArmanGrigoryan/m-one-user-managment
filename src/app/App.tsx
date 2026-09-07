import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { ErrorBoundary } from '@components/ErrorBoundary'
import { AppRoutes } from '@/routes/Routes'

const TOAST_DURATION_MS = 4000

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
      <Toaster position="top-right" richColors duration={TOAST_DURATION_MS} />
    </QueryClientProvider>
  )
}

export default App

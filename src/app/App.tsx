import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AppRoutes } from '@/routes/Routes'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Toaster position="bottom-right" richColors />
    </QueryClientProvider>
  )
}

export default App

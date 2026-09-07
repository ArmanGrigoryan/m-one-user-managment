import { Component } from 'react'
import type { ErrorInfo } from 'react'
import { RotateCcw } from 'lucide-react'
import { Alert } from '@components/design-system/Alert'
import { Button } from '@components/design-system/Button'
import { DEFAULT_ERROR_BOUNDARY_TITLE, UNKNOWN_ERROR_MESSAGE } from './constants'
import type { ErrorBoundaryProps, ErrorBoundaryState } from './types'

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled rendering error', error, errorInfo.componentStack)
  }

  handleRetry = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state
    const { children, title = DEFAULT_ERROR_BOUNDARY_TITLE } = this.props

    if (error === null) {
      return children
    }

    return (
      <div
        role="alert"
        className="rounded-2xl border border-border bg-card px-6 py-12 text-center"
      >
        <div className="mx-auto max-w-md space-y-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <Alert>{error.message.length > 0 ? error.message : UNKNOWN_ERROR_MESSAGE}</Alert>
          <p className="text-muted">
            The page ran into an unexpected problem. Try again, or reload if it keeps happening.
          </p>
          <Button onClick={this.handleRetry}>
            <RotateCcw className="h-4 w-4" />
            Try again
          </Button>
        </div>
      </div>
    )
  }
}

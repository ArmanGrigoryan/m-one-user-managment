import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { CheckCircle, AlertCircle, X } from 'lucide-react'
import { cn } from '@utils/cn'
import type { ToastProps } from './types'

const TOAST_DURATION_MS = 4000

export const Toast: FC<ToastProps> = ({ message, tone = 'error', onClose, className }) => {
  const [visible, setVisible] = useState(false)
  const [visibleMessage, setVisibleMessage] = useState(message)

  useEffect(() => {
    if (message !== null) {
      setVisibleMessage(message)
      requestAnimationFrame(() => setVisible(true))

      const timeoutId = window.setTimeout(() => setVisible(false), TOAST_DURATION_MS)
      return () => window.clearTimeout(timeoutId)
    }

    setVisible(false)
  }, [message])

  useEffect(() => {
    if (!visible && visibleMessage !== null && message === null) {
      const timeoutId = window.setTimeout(() => setVisibleMessage(null), 300)
      return () => window.clearTimeout(timeoutId)
    }
  }, [visible, visibleMessage, message])

  const handleClose = () => {
    setVisible(false)
    window.setTimeout(onClose, 300)
  }

  if (visibleMessage === null) {
    return null
  }

  const Icon = tone === 'success' ? CheckCircle : AlertCircle

  return (
    <div
      className={cn(
        'fixed right-4 bottom-4 left-4 z-50 transition-all duration-300 ease-out sm:left-auto sm:w-full sm:max-w-sm',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        className,
      )}
    >
      <div
        role="alert"
        className={cn(
          'flex items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg',
          tone === 'success'
            ? 'border-emerald-200 bg-white text-emerald-800'
            : 'border-red-200 bg-white text-red-800',
        )}
      >
        <Icon className={cn(
          'h-5 w-5 shrink-0',
          tone === 'success' ? 'text-emerald-500' : 'text-red-500',
        )} />
        <span className="flex-1">{visibleMessage}</span>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={handleClose}
          className="shrink-0 rounded p-0.5 hover:bg-slate-100"
        >
          <X className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </div>
  )
}

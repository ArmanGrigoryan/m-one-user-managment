import type { FC } from 'react'
import { Navigate } from 'react-router-dom'

export const NotFoundRedirect: FC = () => {
  return <Navigate to="/" replace />
}

export default NotFoundRedirect

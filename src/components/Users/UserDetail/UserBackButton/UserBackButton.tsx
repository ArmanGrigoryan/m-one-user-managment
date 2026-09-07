import type { FC } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@components/design-system/Button'
import { cn } from '@utils/cn'
import { INITIAL_LOCATION_KEY } from './constants'
import type { UserBackButtonProps } from './types'

export const UserBackButton: FC<UserBackButtonProps> = ({ className }) => {
  const navigate = useNavigate()
  const { key } = useLocation()

  const handleBack = () => {
    if (key === INITIAL_LOCATION_KEY) {
      navigate('/')
      return
    }

    navigate(-1)
  }

  return (
    <Button variant="ghost" className={cn('mb-4', className)} onClick={handleBack}>
      <ArrowLeft className="h-4 w-4" />
      Back to users
    </Button>
  )
}

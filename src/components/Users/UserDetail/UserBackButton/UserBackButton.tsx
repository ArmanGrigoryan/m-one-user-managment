import type { FC } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/design-system/Button'
import { cn } from '@utils/cn'
import type { UserBackButtonProps } from './types'

export const UserBackButton: FC<UserBackButtonProps> = ({ className }) => {
  const navigate = useNavigate()

  return (
    <Button variant="ghost" className={cn('mb-4', className)} onClick={() => navigate(-1)}>
      <ArrowLeft className="h-4 w-4" />
      Back to users
    </Button>
  )
}

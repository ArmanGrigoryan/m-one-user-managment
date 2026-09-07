import type { FC } from 'react'
import { cn } from '@utils/cn'
import type { SkeletonProps } from './types'

export const Skeleton: FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-[shimmer_1.8s_ease-in-out_infinite] rounded-lg bg-[linear-gradient(90deg,#e2e8f0_25%,#f8fafc_50%,#e2e8f0_75%)] bg-[length:200%_100%]',
        className,
      )}
    />
  )
}

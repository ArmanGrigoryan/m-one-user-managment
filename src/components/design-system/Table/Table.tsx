import type { FC } from 'react'
import { cn } from '@utils/cn'
import type {
  TableBodyProps,
  TableCellProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
} from './types'

export const Table: FC<TableProps> = ({ className, ...props }) => {
  return (
    <table
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  )
}

export const TableHeader: FC<TableHeaderProps> = (props) => {
  return <thead className="bg-slate-50 text-left text-muted" {...props} />
}

export const TableBody: FC<TableBodyProps> = (props) => {
  return <tbody className="divide-y divide-border" {...props} />
}

export const TableRow: FC<TableRowProps> = ({ className, ...props }) => {
  return (
    <tr className={cn('hover:bg-slate-50/80', className)} {...props} />
  )
}

export const TableHead: FC<TableHeadProps> = ({ className, ...props }) => {
  return (
    <th
      className={cn(
        'px-4 py-3 text-xs font-semibold tracking-wide uppercase',
        className,
      )}
      {...props}
    />
  )
}

export const TableCell: FC<TableCellProps> = ({ className, ...props }) => {
  return <td className={cn('px-4 py-3.5 align-middle', className)} {...props} />
}

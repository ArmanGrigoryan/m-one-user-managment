export type UsersPaginationOnPageChange = (page: number) => void

export interface UsersPaginationProps {
  readonly page: number
  readonly pageCount: number
  readonly onPageChange: UsersPaginationOnPageChange
  readonly className?: string
}

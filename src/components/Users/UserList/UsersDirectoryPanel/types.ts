import type { UseUserListStateResult } from '@hooks/useUserListState'

export interface UsersDirectoryPanelProps {
  readonly userList: UseUserListStateResult
  readonly className?: string
}

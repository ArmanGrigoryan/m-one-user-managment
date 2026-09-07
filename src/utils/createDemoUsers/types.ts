import type { User } from '@api/usersService'

export interface CreateDemoUsersArgs {
  readonly users: readonly User[]
  readonly count: number
}
export type CreateDemoUsersResult = User[]
export type CreateDemoUsers = (args: CreateDemoUsersArgs) => CreateDemoUsersResult

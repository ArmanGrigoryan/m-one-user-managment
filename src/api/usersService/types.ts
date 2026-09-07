export interface UserAddress {
  readonly street: string
  readonly suite: string
  readonly city: string
  readonly zipcode: string
  readonly geo: {
    readonly lat: string
    readonly lng: string
  }
}

export interface UserCompany {
  readonly name: string
  readonly catchPhrase: string
  readonly bs: string
}

export interface User {
  readonly id: number
  readonly name: string
  readonly username: string
  readonly email: string
  readonly address: UserAddress
  readonly phone: string
  readonly website: string
  readonly company: UserCompany
}

export type SortDirection = 'asc' | 'desc'

export type SortField = 'name' | 'email' | 'city' | 'company'

export type UserNameEdits = Readonly<Record<string, string>>

export interface FetchUsersArgs {
  readonly signal: AbortSignal
}
export type FetchUsersResult = Promise<User[]>
export type FetchUsers = (args: FetchUsersArgs) => FetchUsersResult

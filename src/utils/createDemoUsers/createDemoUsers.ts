import type { CreateDemoUsers } from './types'

export const createDemoUsers: CreateDemoUsers = ({ users, count }) => {
  if (users.length === 0 || count <= 0) {
    return []
  }

  return Array.from({ length: count }, (_, index) => {
    const sourceUser = users[index % users.length]
    const generation = Math.floor(index / users.length)

    if (generation === 0) {
      return sourceUser
    }

    const displayGeneration = generation + 1

    return {
      ...sourceUser,
      id: generation * 10_000 + sourceUser.id,
      name: `${sourceUser.name} ${displayGeneration}`,
      username: `${sourceUser.username}${displayGeneration}`,
      email: addEmailTag({
        email: sourceUser.email,
        tag: `demo${displayGeneration}`,
      }),
    }
  })
}

const addEmailTag = ({
  email,
  tag,
}: {
  readonly email: string
  readonly tag: string
}): string => {
  const separatorIndex = email.lastIndexOf('@')

  if (separatorIndex < 1) {
    return email
  }

  const localPart = email.slice(0, separatorIndex)
  const domain = email.slice(separatorIndex + 1)
  return `${localPart}+${tag}@${domain}`
}

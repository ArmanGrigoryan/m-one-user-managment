import type { User } from './types'
import type { FetchUsers } from './types'
import { INVALID_RESPONSE_MESSAGE, REQUEST_FAILED_MESSAGE, USERS_API_URL } from './constants'

export const fetchUsers: FetchUsers = async ({ signal }) => {
  const response = await fetch(USERS_API_URL, { signal })

  if (!response.ok) {
    throw new Error(`${REQUEST_FAILED_MESSAGE} (HTTP ${response.status}).`)
  }

  const responseBody: unknown = await response.json()

  if (!isUsers(responseBody)) {
    throw new Error(INVALID_RESPONSE_MESSAGE)
  }

  return responseBody
}

function isUsers(value: unknown): value is User[] {
  return Array.isArray(value) && value.every(isUser)
}

function isUser(value: unknown): value is User {
  if (!isRecord(value)) {
    return false
  }

  return (
    hasNumber(value, 'id') &&
    hasString(value, 'name') &&
    hasString(value, 'username') &&
    hasString(value, 'email') &&
    hasString(value, 'phone') &&
    hasString(value, 'website') &&
    hasAddress(value, 'address') &&
    hasCompany(value, 'company')
  )
}

function hasAddress(value: Readonly<Record<string, unknown>>, key: string): boolean {
  if (!(key in value)) {
    return false
  }

  const address: unknown = value[key]

  return (
    isRecord(address) &&
    hasString(address, 'street') &&
    hasString(address, 'suite') &&
    hasString(address, 'city') &&
    hasString(address, 'zipcode') &&
    hasGeo(address, 'geo')
  )
}

function hasGeo(value: Readonly<Record<string, unknown>>, key: string): boolean {
  if (!(key in value)) {
    return false
  }

  const geo: unknown = value[key]

  return (
    isRecord(geo) &&
    hasString(geo, 'lat') &&
    hasString(geo, 'lng')
  )
}

function hasCompany(
  value: Readonly<Record<string, unknown>>,
  key: string,
): boolean {
  if (!(key in value)) {
    return false
  }

  const company: unknown = value[key]

  return (
    isRecord(company) &&
    hasString(company, 'name') &&
    hasString(company, 'catchPhrase') &&
    hasString(company, 'bs')
  )
}

function hasString(
  value: Readonly<Record<string, unknown>>,
  key: string,
): boolean {
  return key in value && typeof value[key] === 'string'
}

function hasNumber(
  value: Readonly<Record<string, unknown>>,
  key: string,
): boolean {
  return key in value && typeof value[key] === 'number'
}

function isRecord(
  value: unknown,
): value is Readonly<Record<string, unknown>> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

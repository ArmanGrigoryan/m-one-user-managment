import type { FC } from 'react'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '@containers/Layout'

const UserListContainer = lazy(() => import('@containers/UserListContainer/UserListContainer'))
const UserDetailContainer = lazy(() => import('@containers/UserDetailContainer/UserDetailContainer'))
const NotFoundRedirect = lazy(() => import('@/routes/NotFoundRedirect'))

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<UserListContainer />} />
        <Route path="users/:userId" element={<UserDetailContainer />} />
        <Route path="*" element={<NotFoundRedirect />} />
      </Route>
    </Routes>
  )
}

import { Role, UserNotCreated, UserRoleNotCreated } from '@seg-apps-web/api-interfaces'

const roleTitles = ['Admin', 'Doctor', 'Patient']

export const ROLES: Role[] = roleTitles.map((title, i) => ({
  id: `role-${i}`,
  title
}))

const usersNotCreated: UserNotCreated[] = [
  // { username: 'skaplanski@frba.utn.edu.ar', password: 'admin123' },
  // { username: 'admin@gmail.com', password: 'admin123' },
]

export const USERS = usersNotCreated.map((user, i) => ({
  id: `user-${i}`,
  ...user
}))

const userRolesNotCreated: UserRoleNotCreated[] = [
  { userId: 'user-0', roleId: 'role-0' }
]

export const USER_ROLES = userRolesNotCreated.map((userRole, i) => ({
  id: `userRole-${i}`,
  ...userRole
}))
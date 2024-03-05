export type Role = {
  id: string
  title: string
}
export type RoleNotCreated = Omit<Role, 'id'>

export type User = {
  id: string
  username: string
  password: string
  name: string
  lastName: string
  age: string
  gender: string
}

export type UserNotCreated = Omit<User, 'id'>
export type UserWithoutPassword = Omit<User, 'password'>

export type UserRole = {
  id: string
  userId: User['id']
  roleId: Role['id']
}
export type UserRoleNotCreated = Omit<UserRole, 'id'>
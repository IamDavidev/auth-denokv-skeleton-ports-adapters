export interface User {
  id: string
  email: string
  name: string
  password: string
  confirmPassword: string
}

export type ExternalUser = Omit<User, 'password' | 'confirmPassword'>


import { AuthenticatedUser, RegisterUser } from '../../app/schemas/user.schema.ts'

export interface ForAuthenticating {
  login: (email: string, password: string) => Promise<AuthenticatedUser>
  register: (user: RegisterUser) => Promise<AuthenticatedUser>
}
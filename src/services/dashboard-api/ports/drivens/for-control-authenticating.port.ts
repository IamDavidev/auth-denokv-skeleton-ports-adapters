import type { UserAuthDetails, UserDetails, UserFeed } from '../../app/schemas/user.schema.ts'

export interface ForControlAuthenticating {
  getUserDetails: (email: string, password: string) => Promise<UserDetails>
  getUserFeed: (email: string, password: string) => Promise<UserFeed>
  getUserAuthDetails: (email: string, password: string) => Promise<UserAuthDetails>
}
import { ExternalUser, User } from '../../../repository/app/schemas/user.schema.ts'

export interface ForRepositoryQueryingUser {
  getOneByEmail: (email: string) => Promise<ExternalUser>

  createOne: (user: User) => Promise<ExternalUser>
}

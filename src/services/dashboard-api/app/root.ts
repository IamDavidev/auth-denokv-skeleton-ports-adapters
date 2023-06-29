import type { ForAuthenticating } from '../ports/drivers/for-authenticating.port.ts'
import type { ForControlAuthenticating } from '../ports/drivens/for-control-authenticating.port.ts'
import type { ForRepositoryQueryingUser } from '../ports/drivens/for-repository-querying-user.port.ts'
import type { AuthenticatedUser, RegisterUser } from './schemas/user.schema.ts'


export class DashboardApiRoot implements ForAuthenticating {

  constructor(
    private readonly controlAuthenticator: ForControlAuthenticating,
    private readonly repoQuerierUser: ForRepositoryQueryingUser
  ) {
  }

  async login(email: string, password: string): Promise<AuthenticatedUser> {

    const foundUser = await this.repoQuerierUser.getOneByEmail(email)
    if (!foundUser) {
      throw new Error('User not found')
    }

    const userDetails = await this.controlAuthenticator.getUserDetails(email, password)
    const userFeed = await this.controlAuthenticator.getUserFeed(email, password)
    const userAuthDetails = await this.controlAuthenticator.getUserAuthDetails(email, password)


    const authenticatedUser: AuthenticatedUser = {
      id: foundUser.id,
      details: userDetails,
      auth: userAuthDetails,
      feed: userFeed
    }

    return authenticatedUser
  }

  async register(user: RegisterUser): Promise<AuthenticatedUser> {
    const createdUser = await this.repoQuerierUser.createOne(user)

    const userDetails =
      await this.controlAuthenticator.getUserDetails(user.email, user.password)

    const userFeed =
      await this.controlAuthenticator.getUserFeed(user.email, user.password)

    const userAuthDetails =
      await this.controlAuthenticator.getUserAuthDetails(user.email, user.password)

    const authenticatedUser: AuthenticatedUser = {
      id: createdUser.id,
      details: userDetails,
      auth: userAuthDetails,
      feed: userFeed
    }
    return authenticatedUser
  }
}

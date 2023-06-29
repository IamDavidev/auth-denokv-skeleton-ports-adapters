import { ForAuthenticating } from '../../ports/drivers/for-authenticating.port.ts'
import { AuthenticatedUser, RegisterUser } from '../../app/schemas/user.schema.ts'


export class AuthenticatorProxyAdapter implements ForAuthenticating {
  constructor(
    private readonly dashboardApiRoot: ForAuthenticating
  ) {
  }


  async login(email: string, password: string): Promise<AuthenticatedUser> {
    return await this.dashboardApiRoot.login(email, password)
  }

  async register(user: RegisterUser): Promise<AuthenticatedUser> {
    return await this.dashboardApiRoot.register(user)
  }

}
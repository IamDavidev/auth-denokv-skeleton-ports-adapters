import { DashboardApiRoot } from './root.ts'
import { ControlAuthenticatorStub } from '../adapters/drivens/control-authenticator-stub.adapter.ts'
import { RepoQuerierUser } from '../adapters/drivens/repo-querier-user.adapter.ts'
import { AuthenticatorProxyAdapter } from '../adapters/drivers/authenticator-proxy.adapter.ts'
import { type ForAuthenticating } from '../ports/drivers/for-authenticating.port.ts'


interface CompositionRoot {
  authenticatorProxyAdapter: ForAuthenticating
}

export function compositionRoot(): CompositionRoot {

  const controlAuthenticator = new ControlAuthenticatorStub()
  const repoQuerierUser = new RepoQuerierUser()

  const dashboardApi = new DashboardApiRoot(controlAuthenticator, repoQuerierUser)

  const authenticatorProxyAdapter = new AuthenticatorProxyAdapter(dashboardApi)

  return {
    authenticatorProxyAdapter
  }
}


const {
  authenticatorProxyAdapter
} = compositionRoot()


const loggedUser = await authenticatorProxyAdapter.login('test@gmail.com', '123.45')

console.log('LOGGED USER: ', loggedUser)
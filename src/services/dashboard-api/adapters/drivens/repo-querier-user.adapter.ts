import { ForRepositoryQueryingUser } from '../../ports/drivens/for-repository-querying-user.port.ts'
import { ExternalUser, User } from '../../../repository/app/schemas/user.schema.ts'


const externalUserMock: ExternalUser = {
  email: 'external@user.mock',
  name: 'External User',
  id: 'external-user-id'
  
}


export class RepoQuerierUser implements ForRepositoryQueryingUser {

  getOneByEmail(_email: string): Promise<ExternalUser> {
    return Promise.resolve(externalUserMock)

  }

  createOne(_user: User): Promise<ExternalUser> {
    return Promise.resolve(externalUserMock)
  }
}
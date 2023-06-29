import { ForControlAuthenticating } from '../../ports/drivens/for-control-authenticating.port.ts'
import { UserAuthDetails, UserDetails, UserFeed } from '../../app/schemas/user.schema.ts'


const userAuthDetailsMock: UserAuthDetails = {
  token: 'token',
  refreshToken: 'refreshToken'
}

const userDetailsMock: UserDetails = {
  email: 'test@gmail.com',
  followers: [],
  name: 'test',
  nickname: 'tester',
  profilePic: 'https://www.google.com/image/test.png'
}

const userFeedMock: UserFeed = {
  publication: [],
  subscription: [],
  savedPublications: []
}

export class ControlAuthenticatorStub implements ForControlAuthenticating {
  getUserAuthDetails(): Promise<UserAuthDetails> {
    return Promise.resolve(userAuthDetailsMock)
  }

  getUserDetails(): Promise<UserDetails> {
    return Promise.resolve(userDetailsMock)
  }

  getUserFeed(): Promise<UserFeed> {
    return Promise.resolve(userFeedMock)
  }
}
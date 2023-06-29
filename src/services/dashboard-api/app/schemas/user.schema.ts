import { z } from 'https://deno.land/x/zod@v3.16.1/mod.ts'


export const NAME_MAX_LENGTH = 30
export const NAME_MIN_LENGTH = 2
export const NAME_ERROR_MESSAGE = `Name must be less than ${NAME_MAX_LENGTH} characters`
export const NAME_REGEX = /^(?!.*  )(?!.*--).*$/

export const NICKNAME_MAX_LENGTH = 30
export const NICKNAME_MIN_LENGTH = 3
export const NICKNAME_ERROR_MESSAGE = `Nickname must be less than ${NICKNAME_MAX_LENGTH} characters`


export const UUIDSchema = z.string().uuid()
export const EmailSchema = z.string().email('Invalid email address')
export const PasswordSchema = z.string().min(8, 'Password must be at least 8 characters long')

export const UserDetailsSchema = z.object({
  email: EmailSchema,
  profilePic: z.string().url('Invalid profile picture URL'),
  name: z.string().max(NAME_MAX_LENGTH, NAME_ERROR_MESSAGE).min(NAME_MIN_LENGTH).regex(NAME_REGEX, 'Invalid name'),
  nickname: z.string().max(NICKNAME_MAX_LENGTH, NICKNAME_ERROR_MESSAGE).min(NICKNAME_MIN_LENGTH),
  followers: z.array(UUIDSchema)
})

export const UserSecuritySchema = z.object({
  password: PasswordSchema
})

export const UserFeedSchema = z.object({
  publication: z.array(UUIDSchema),
  subscription: z.array(UUIDSchema),
  savedPublications: z.array(UUIDSchema)
})

export const UserAuthDetailsSchema = z.object({
  token: z.string(),
  refreshToken: z.string()
})

export const AuthenticatedUserSchema = z.object({
  id: UUIDSchema,
  details: UserDetailsSchema,
  feed: UserFeedSchema,
  auth: UserAuthDetailsSchema
})

export const RegisterUserSchema = z.object({
  id: UUIDSchema,
  name: z.string().max(NAME_MAX_LENGTH, NAME_ERROR_MESSAGE).min(NAME_MIN_LENGTH).regex(NAME_REGEX, 'Invalid name'),
  email: EmailSchema,
  password: PasswordSchema,
  confirmPassword: PasswordSchema
})


export const LoginUserSchema = z.object({
  email: PasswordSchema,
  password: PasswordSchema
})

export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>
export type UserAuthDetails = z.infer<typeof UserAuthDetailsSchema>
export type UserFeed = z.infer<typeof UserFeedSchema>
export type UserSecurity = z.infer<typeof UserSecuritySchema>
export type UserDetails = z.infer<typeof UserDetailsSchema>
export type RegisterUser = z.infer<typeof RegisterUserSchema>
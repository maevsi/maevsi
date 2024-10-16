/* eslint-disable no-use-before-define */
import { cacheExchange } from '@urql/exchange-graphcache'
import type {
  Resolver as GraphCacheResolver,
  UpdateResolver as GraphCacheUpdateResolver,
  OptimisticMutationResolver as GraphCacheOptimisticMutationResolver,
} from '@urql/exchange-graphcache'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  BigInt: { input: any; output: any }
  Cursor: { input: any; output: any }
  Datetime: { input: any; output: any }
  Jwt: { input: any; output: any }
  UUID: { input: any; output: any }
}

/** Public account data. */
export type Account = Node & {
  __typename?: 'Account'
  /** Reads and enables pagination through a set of `Achievement`. */
  achievementsByAccountId: AchievementsConnection
  /** Reads and enables pagination through a set of `Contact`. */
  contactsByAccountId: ContactsConnection
  /** Reads and enables pagination through a set of `Contact`. */
  contactsByAuthorAccountId: ContactsConnection
  /** Reads and enables pagination through a set of `EventGroup`. */
  eventGroupsByAuthorAccountId: EventGroupsConnection
  /** Reads and enables pagination through a set of `Event`. */
  eventsByAuthorAccountId: EventsConnection
  /** The account's internal id. */
  id: Scalars['UUID']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads a single `ProfilePicture` that is related to this `Account`. */
  profilePictureByAccountId?: Maybe<ProfilePicture>
  /**
   * Reads and enables pagination through a set of `ProfilePicture`.
   * @deprecated Please use profilePictureByAccountId instead
   */
  profilePicturesByAccountId: ProfilePicturesConnection
  /** Reads and enables pagination through a set of `Upload`. */
  uploadsByAccountId: UploadsConnection
  /** The account's username. */
  username: Scalars['String']['output']
}

/** Public account data. */
export type AccountAchievementsByAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<AchievementCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<AchievementsOrderBy>>
}

/** Public account data. */
export type AccountContactsByAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<ContactCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ContactsOrderBy>>
}

/** Public account data. */
export type AccountContactsByAuthorAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<ContactCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ContactsOrderBy>>
}

/** Public account data. */
export type AccountEventGroupsByAuthorAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventGroupCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventGroupsOrderBy>>
}

/** Public account data. */
export type AccountEventsByAuthorAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventsOrderBy>>
}

/** Public account data. */
export type AccountProfilePicturesByAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<ProfilePictureCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ProfilePicturesOrderBy>>
}

/** Public account data. */
export type AccountUploadsByAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<UploadCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<UploadsOrderBy>>
}

/** A condition to be used against `Account` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AccountCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `username` field. */
  username?: InputMaybe<Scalars['String']['input']>
}

/** All input for the `accountDelete` mutation. */
export type AccountDeleteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  password: Scalars['String']['input']
}

/** The output of our `accountDelete` mutation. */
export type AccountDeletePayload = {
  __typename?: 'AccountDeletePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `accountEmailAddressVerification` mutation. */
export type AccountEmailAddressVerificationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  code: Scalars['UUID']['input']
}

/** The output of our `accountEmailAddressVerification` mutation. */
export type AccountEmailAddressVerificationPayload = {
  __typename?: 'AccountEmailAddressVerificationPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** An input for mutations affecting `Account` */
export type AccountInput = {
  /** The account's internal id. */
  id: Scalars['UUID']['input']
  /** The account's username. */
  username: Scalars['String']['input']
}

/** All input for the `accountPasswordChange` mutation. */
export type AccountPasswordChangeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  passwordCurrent: Scalars['String']['input']
  passwordNew: Scalars['String']['input']
}

/** The output of our `accountPasswordChange` mutation. */
export type AccountPasswordChangePayload = {
  __typename?: 'AccountPasswordChangePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `accountPasswordReset` mutation. */
export type AccountPasswordResetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  code: Scalars['UUID']['input']
  password: Scalars['String']['input']
}

/** The output of our `accountPasswordReset` mutation. */
export type AccountPasswordResetPayload = {
  __typename?: 'AccountPasswordResetPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `accountPasswordResetRequest` mutation. */
export type AccountPasswordResetRequestInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  emailAddress: Scalars['String']['input']
  language: Scalars['String']['input']
}

/** The output of our `accountPasswordResetRequest` mutation. */
export type AccountPasswordResetRequestPayload = {
  __typename?: 'AccountPasswordResetRequestPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** Represents an update to a `Account`. Fields that are set will be updated. */
export type AccountPatch = {
  /** The account's internal id. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** The account's username. */
  username?: InputMaybe<Scalars['String']['input']>
}

/** All input for the `accountRegistration` mutation. */
export type AccountRegistrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  emailAddress: Scalars['String']['input']
  language: Scalars['String']['input']
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

/** The output of our `accountRegistration` mutation. */
export type AccountRegistrationPayload = {
  __typename?: 'AccountRegistrationPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  uuid?: Maybe<Scalars['UUID']['output']>
}

/** All input for the `accountRegistrationRefresh` mutation. */
export type AccountRegistrationRefreshInput = {
  accountId: Scalars['UUID']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  language: Scalars['String']['input']
}

/** The output of our `accountRegistrationRefresh` mutation. */
export type AccountRegistrationRefreshPayload = {
  __typename?: 'AccountRegistrationRefreshPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** A connection to a list of `Account` values. */
export type AccountsConnection = {
  __typename?: 'AccountsConnection'
  /** A list of edges which contains the `Account` and cursor to aid in pagination. */
  edges: Array<AccountsEdge>
  /** A list of `Account` objects. */
  nodes: Array<Account>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `Account` edge in the connection. */
export type AccountsEdge = {
  __typename?: 'AccountsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `Account` at the end of the edge. */
  node: Account
}

/** Methods to use when ordering `Account`. */
export enum AccountsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
}

/** Achievements unlocked by users. */
export type Achievement = Node & {
  __typename?: 'Achievement'
  /** Reads a single `Account` that is related to this `Achievement`. */
  accountByAccountId?: Maybe<Account>
  /** The account which unlocked the achievement. */
  accountId: Scalars['UUID']['output']
  /** The unlock's achievement. */
  achievement: AchievementType
  /** The achievement unlock's internal id. */
  id: Scalars['UUID']['output']
  /** The achievement unlock's level. */
  level: Scalars['Int']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
}

/**
 * A condition to be used against `Achievement` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AchievementCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `achievement` field. */
  achievement?: InputMaybe<AchievementType>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `level` field. */
  level?: InputMaybe<Scalars['Int']['input']>
}

/** An input for mutations affecting `Achievement` */
export type AchievementInput = {
  /** The account which unlocked the achievement. */
  accountId: Scalars['UUID']['input']
  /** The unlock's achievement. */
  achievement: AchievementType
  /** The achievement unlock's internal id. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** The achievement unlock's level. */
  level?: InputMaybe<Scalars['Int']['input']>
}

/** Represents an update to a `Achievement`. Fields that are set will be updated. */
export type AchievementPatch = {
  /** The account which unlocked the achievement. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** The unlock's achievement. */
  achievement?: InputMaybe<AchievementType>
  /** The achievement unlock's internal id. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** The achievement unlock's level. */
  level?: InputMaybe<Scalars['Int']['input']>
}

/** Achievements that can be unlocked by users. */
export enum AchievementType {
  MeetTheTeam = 'MEET_THE_TEAM',
}

/** All input for the `achievementUnlock` mutation. */
export type AchievementUnlockInput = {
  alias: Scalars['String']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  code: Scalars['UUID']['input']
}

/** The output of our `achievementUnlock` mutation. */
export type AchievementUnlockPayload = {
  __typename?: 'AchievementUnlockPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  uuid?: Maybe<Scalars['UUID']['output']>
}

/** A connection to a list of `Achievement` values. */
export type AchievementsConnection = {
  __typename?: 'AchievementsConnection'
  /** A list of edges which contains the `Achievement` and cursor to aid in pagination. */
  edges: Array<AchievementsEdge>
  /** A list of `Achievement` objects. */
  nodes: Array<Achievement>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Achievement` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `Achievement` edge in the connection. */
export type AchievementsEdge = {
  __typename?: 'AchievementsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `Achievement` at the end of the edge. */
  node: Achievement
}

/** Methods to use when ordering `Achievement`. */
export enum AchievementsOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  AchievementAsc = 'ACHIEVEMENT_ASC',
  AchievementDesc = 'ACHIEVEMENT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
}

/** All input for the `authenticate` mutation. */
export type AuthenticateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

/** The output of our `authenticate` mutation. */
export type AuthenticatePayload = {
  __typename?: 'AuthenticatePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  jwt?: Maybe<Scalars['Jwt']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** Contact data. */
export type Contact = Node & {
  __typename?: 'Contact'
  /** Reads a single `Account` that is related to this `Contact`. */
  accountByAccountId?: Maybe<Account>
  /** Reads a single `Account` that is related to this `Contact`. */
  accountByAuthorAccountId?: Maybe<Account>
  /** The contact account's id. */
  accountId?: Maybe<Scalars['UUID']['output']>
  /** The contact's physical address. */
  address?: Maybe<Scalars['String']['output']>
  /** The contact author's id. */
  authorAccountId: Scalars['UUID']['output']
  /** The contact's email address. */
  emailAddress?: Maybe<Scalars['String']['output']>
  /** The contact's email address's md5 hash. */
  emailAddressHash?: Maybe<Scalars['String']['output']>
  /** The contact's first name. */
  firstName?: Maybe<Scalars['String']['output']>
  /** The contact's internal id. */
  id: Scalars['UUID']['output']
  /** Reads and enables pagination through a set of `Invitation`. */
  invitationsByContactId: InvitationsConnection
  /** The contact's last name. */
  lastName?: Maybe<Scalars['String']['output']>
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** The contact's international phone number. */
  phoneNumber?: Maybe<Scalars['String']['output']>
  /** The contact's website url. */
  url?: Maybe<Scalars['String']['output']>
}

/** Contact data. */
export type ContactInvitationsByContactIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<InvitationCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<InvitationsOrderBy>>
}

/** A condition to be used against `Contact` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ContactCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `address` field. */
  address?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `authorAccountId` field. */
  authorAccountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `emailAddress` field. */
  emailAddress?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `emailAddressHash` field. */
  emailAddressHash?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `phoneNumber` field. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']['input']>
}

/** An input for mutations affecting `Contact` */
export type ContactInput = {
  /** The contact account's id. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** The contact's physical address. */
  address?: InputMaybe<Scalars['String']['input']>
  /** The contact author's id. */
  authorAccountId: Scalars['UUID']['input']
  /** The contact's email address. */
  emailAddress?: InputMaybe<Scalars['String']['input']>
  /** The contact's first name. */
  firstName?: InputMaybe<Scalars['String']['input']>
  /** The contact's last name. */
  lastName?: InputMaybe<Scalars['String']['input']>
  /** The contact's international phone number. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>
  /** The contact's website url. */
  url?: InputMaybe<Scalars['String']['input']>
}

/** Represents an update to a `Contact`. Fields that are set will be updated. */
export type ContactPatch = {
  /** The contact account's id. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** The contact's physical address. */
  address?: InputMaybe<Scalars['String']['input']>
  /** The contact author's id. */
  authorAccountId?: InputMaybe<Scalars['UUID']['input']>
  /** The contact's email address. */
  emailAddress?: InputMaybe<Scalars['String']['input']>
  /** The contact's first name. */
  firstName?: InputMaybe<Scalars['String']['input']>
  /** The contact's last name. */
  lastName?: InputMaybe<Scalars['String']['input']>
  /** The contact's international phone number. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>
  /** The contact's website url. */
  url?: InputMaybe<Scalars['String']['input']>
}

/** A connection to a list of `Contact` values. */
export type ContactsConnection = {
  __typename?: 'ContactsConnection'
  /** A list of edges which contains the `Contact` and cursor to aid in pagination. */
  edges: Array<ContactsEdge>
  /** A list of `Contact` objects. */
  nodes: Array<Contact>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Contact` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `Contact` edge in the connection. */
export type ContactsEdge = {
  __typename?: 'ContactsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `Contact` at the end of the edge. */
  node: Contact
}

/** Methods to use when ordering `Contact`. */
export enum ContactsOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  AddressAsc = 'ADDRESS_ASC',
  AddressDesc = 'ADDRESS_DESC',
  AuthorAccountIdAsc = 'AUTHOR_ACCOUNT_ID_ASC',
  AuthorAccountIdDesc = 'AUTHOR_ACCOUNT_ID_DESC',
  EmailAddressAsc = 'EMAIL_ADDRESS_ASC',
  EmailAddressDesc = 'EMAIL_ADDRESS_DESC',
  EmailAddressHashAsc = 'EMAIL_ADDRESS_HASH_ASC',
  EmailAddressHashDesc = 'EMAIL_ADDRESS_HASH_DESC',
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
  Natural = 'NATURAL',
  PhoneNumberAsc = 'PHONE_NUMBER_ASC',
  PhoneNumberDesc = 'PHONE_NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC',
}

/** All input for the create `Account` mutation. */
export type CreateAccountInput = {
  /** The `Account` to be created by this mutation. */
  account: AccountInput
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** The output of our create `Account` mutation. */
export type CreateAccountPayload = {
  __typename?: 'CreateAccountPayload'
  /** The `Account` that was created by this mutation. */
  account?: Maybe<Account>
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `Account` mutation. */
export type CreateAccountPayloadAccountEdgeArgs = {
  orderBy?: InputMaybe<Array<AccountsOrderBy>>
}

/** All input for the create `Achievement` mutation. */
export type CreateAchievementInput = {
  /** The `Achievement` to be created by this mutation. */
  achievement: AchievementInput
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** The output of our create `Achievement` mutation. */
export type CreateAchievementPayload = {
  __typename?: 'CreateAchievementPayload'
  /** Reads a single `Account` that is related to this `Achievement`. */
  accountByAccountId?: Maybe<Account>
  /** The `Achievement` that was created by this mutation. */
  achievement?: Maybe<Achievement>
  /** An edge for our `Achievement`. May be used by Relay 1. */
  achievementEdge?: Maybe<AchievementsEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `Achievement` mutation. */
export type CreateAchievementPayloadAchievementEdgeArgs = {
  orderBy?: InputMaybe<Array<AchievementsOrderBy>>
}

/** All input for the create `Contact` mutation. */
export type CreateContactInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `Contact` to be created by this mutation. */
  contact: ContactInput
}

/** The output of our create `Contact` mutation. */
export type CreateContactPayload = {
  __typename?: 'CreateContactPayload'
  /** Reads a single `Account` that is related to this `Contact`. */
  accountByAccountId?: Maybe<Account>
  /** Reads a single `Account` that is related to this `Contact`. */
  accountByAuthorAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `Contact` that was created by this mutation. */
  contact?: Maybe<Contact>
  /** An edge for our `Contact`. May be used by Relay 1. */
  contactEdge?: Maybe<ContactsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `Contact` mutation. */
export type CreateContactPayloadContactEdgeArgs = {
  orderBy?: InputMaybe<Array<ContactsOrderBy>>
}

/** All input for the create `EventGroup` mutation. */
export type CreateEventGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `EventGroup` to be created by this mutation. */
  eventGroup: EventGroupInput
}

/** The output of our create `EventGroup` mutation. */
export type CreateEventGroupPayload = {
  __typename?: 'CreateEventGroupPayload'
  /** Reads a single `Account` that is related to this `EventGroup`. */
  accountByAuthorAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `EventGroup` that was created by this mutation. */
  eventGroup?: Maybe<EventGroup>
  /** An edge for our `EventGroup`. May be used by Relay 1. */
  eventGroupEdge?: Maybe<EventGroupsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `EventGroup` mutation. */
export type CreateEventGroupPayloadEventGroupEdgeArgs = {
  orderBy?: InputMaybe<Array<EventGroupsOrderBy>>
}

/** All input for the create `EventGrouping` mutation. */
export type CreateEventGroupingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `EventGrouping` to be created by this mutation. */
  eventGrouping: EventGroupingInput
}

/** The output of our create `EventGrouping` mutation. */
export type CreateEventGroupingPayload = {
  __typename?: 'CreateEventGroupingPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Event` that is related to this `EventGrouping`. */
  eventByEventId?: Maybe<Event>
  /** Reads a single `EventGroup` that is related to this `EventGrouping`. */
  eventGroupByEventGroupId?: Maybe<EventGroup>
  /** The `EventGrouping` that was created by this mutation. */
  eventGrouping?: Maybe<EventGrouping>
  /** An edge for our `EventGrouping`. May be used by Relay 1. */
  eventGroupingEdge?: Maybe<EventGroupingsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `EventGrouping` mutation. */
export type CreateEventGroupingPayloadEventGroupingEdgeArgs = {
  orderBy?: InputMaybe<Array<EventGroupingsOrderBy>>
}

/** All input for the create `Event` mutation. */
export type CreateEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `Event` to be created by this mutation. */
  event: EventInput
}

/** The output of our create `Event` mutation. */
export type CreateEventPayload = {
  __typename?: 'CreateEventPayload'
  /** Reads a single `Account` that is related to this `Event`. */
  accountByAuthorAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `Event` that was created by this mutation. */
  event?: Maybe<Event>
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `Event` mutation. */
export type CreateEventPayloadEventEdgeArgs = {
  orderBy?: InputMaybe<Array<EventsOrderBy>>
}

/** All input for the create `Invitation` mutation. */
export type CreateInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `Invitation` to be created by this mutation. */
  invitation: InvitationInput
}

/** The output of our create `Invitation` mutation. */
export type CreateInvitationPayload = {
  __typename?: 'CreateInvitationPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Contact` that is related to this `Invitation`. */
  contactByContactId?: Maybe<Contact>
  /** Reads a single `Event` that is related to this `Invitation`. */
  eventByEventId?: Maybe<Event>
  /** The `Invitation` that was created by this mutation. */
  invitation?: Maybe<Invitation>
  /** An edge for our `Invitation`. May be used by Relay 1. */
  invitationEdge?: Maybe<InvitationsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `Invitation` mutation. */
export type CreateInvitationPayloadInvitationEdgeArgs = {
  orderBy?: InputMaybe<Array<InvitationsOrderBy>>
}

/** All input for the create `ProfilePicture` mutation. */
export type CreateProfilePictureInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `ProfilePicture` to be created by this mutation. */
  profilePicture: ProfilePictureInput
}

/** The output of our create `ProfilePicture` mutation. */
export type CreateProfilePicturePayload = {
  __typename?: 'CreateProfilePicturePayload'
  /** Reads a single `Account` that is related to this `ProfilePicture`. */
  accountByAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `ProfilePicture` that was created by this mutation. */
  profilePicture?: Maybe<ProfilePicture>
  /** An edge for our `ProfilePicture`. May be used by Relay 1. */
  profilePictureEdge?: Maybe<ProfilePicturesEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Upload` that is related to this `ProfilePicture`. */
  uploadByUploadId?: Maybe<Upload>
}

/** The output of our create `ProfilePicture` mutation. */
export type CreateProfilePicturePayloadProfilePictureEdgeArgs = {
  orderBy?: InputMaybe<Array<ProfilePicturesOrderBy>>
}

/** All input for the create `Upload` mutation. */
export type CreateUploadInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `Upload` to be created by this mutation. */
  upload: UploadInput
}

/** The output of our create `Upload` mutation. */
export type CreateUploadPayload = {
  __typename?: 'CreateUploadPayload'
  /** Reads a single `Account` that is related to this `Upload`. */
  accountByAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Upload` that was created by this mutation. */
  upload?: Maybe<Upload>
  /** An edge for our `Upload`. May be used by Relay 1. */
  uploadEdge?: Maybe<UploadsEdge>
}

/** The output of our create `Upload` mutation. */
export type CreateUploadPayloadUploadEdgeArgs = {
  orderBy?: InputMaybe<Array<UploadsOrderBy>>
}

/** All input for the `deleteAccountById` mutation. */
export type DeleteAccountByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The account's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `deleteAccountByUsername` mutation. */
export type DeleteAccountByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The account's username. */
  username: Scalars['String']['input']
}

/** All input for the `deleteAccount` mutation. */
export type DeleteAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Account` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `Account` mutation. */
export type DeleteAccountPayload = {
  __typename?: 'DeleteAccountPayload'
  /** The `Account` that was deleted by this mutation. */
  account?: Maybe<Account>
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedAccountId?: Maybe<Scalars['ID']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `Account` mutation. */
export type DeleteAccountPayloadAccountEdgeArgs = {
  orderBy?: InputMaybe<Array<AccountsOrderBy>>
}

/** All input for the `deleteAchievementByAccountIdAndAchievement` mutation. */
export type DeleteAchievementByAccountIdAndAchievementInput = {
  /** The account which unlocked the achievement. */
  accountId: Scalars['UUID']['input']
  /** The unlock's achievement. */
  achievement: AchievementType
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** All input for the `deleteAchievementById` mutation. */
export type DeleteAchievementByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The achievement unlock's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `deleteAchievement` mutation. */
export type DeleteAchievementInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Achievement` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `Achievement` mutation. */
export type DeleteAchievementPayload = {
  __typename?: 'DeleteAchievementPayload'
  /** Reads a single `Account` that is related to this `Achievement`. */
  accountByAccountId?: Maybe<Account>
  /** The `Achievement` that was deleted by this mutation. */
  achievement?: Maybe<Achievement>
  /** An edge for our `Achievement`. May be used by Relay 1. */
  achievementEdge?: Maybe<AchievementsEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedAchievementId?: Maybe<Scalars['ID']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `Achievement` mutation. */
export type DeleteAchievementPayloadAchievementEdgeArgs = {
  orderBy?: InputMaybe<Array<AchievementsOrderBy>>
}

/** All input for the `deleteContactByAuthorAccountIdAndAccountId` mutation. */
export type DeleteContactByAuthorAccountIdAndAccountIdInput = {
  /** The contact account's id. */
  accountId: Scalars['UUID']['input']
  /** The contact author's id. */
  authorAccountId: Scalars['UUID']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** All input for the `deleteContactById` mutation. */
export type DeleteContactByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The contact's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `deleteContact` mutation. */
export type DeleteContactInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Contact` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `Contact` mutation. */
export type DeleteContactPayload = {
  __typename?: 'DeleteContactPayload'
  /** Reads a single `Account` that is related to this `Contact`. */
  accountByAccountId?: Maybe<Account>
  /** Reads a single `Account` that is related to this `Contact`. */
  accountByAuthorAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `Contact` that was deleted by this mutation. */
  contact?: Maybe<Contact>
  /** An edge for our `Contact`. May be used by Relay 1. */
  contactEdge?: Maybe<ContactsEdge>
  deletedContactId?: Maybe<Scalars['ID']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `Contact` mutation. */
export type DeleteContactPayloadContactEdgeArgs = {
  orderBy?: InputMaybe<Array<ContactsOrderBy>>
}

/** All input for the `deleteEventByAuthorAccountIdAndSlug` mutation. */
export type DeleteEventByAuthorAccountIdAndSlugInput = {
  /** The event author's id. */
  authorAccountId: Scalars['UUID']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The event's name, slugified. */
  slug: Scalars['String']['input']
}

/** All input for the `deleteEventById` mutation. */
export type DeleteEventByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The event's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `deleteEventGroupByAuthorAccountIdAndSlug` mutation. */
export type DeleteEventGroupByAuthorAccountIdAndSlugInput = {
  /** The event group author's id. */
  authorAccountId: Scalars['UUID']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The event group's name, slugified. */
  slug: Scalars['String']['input']
}

/** All input for the `deleteEventGroupById` mutation. */
export type DeleteEventGroupByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The event group's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `deleteEventGroup` mutation. */
export type DeleteEventGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `EventGroup` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `EventGroup` mutation. */
export type DeleteEventGroupPayload = {
  __typename?: 'DeleteEventGroupPayload'
  /** Reads a single `Account` that is related to this `EventGroup`. */
  accountByAuthorAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedEventGroupId?: Maybe<Scalars['ID']['output']>
  /** The `EventGroup` that was deleted by this mutation. */
  eventGroup?: Maybe<EventGroup>
  /** An edge for our `EventGroup`. May be used by Relay 1. */
  eventGroupEdge?: Maybe<EventGroupsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `EventGroup` mutation. */
export type DeleteEventGroupPayloadEventGroupEdgeArgs = {
  orderBy?: InputMaybe<Array<EventGroupsOrderBy>>
}

/** All input for the `deleteEventGroupingByEventIdAndEventGroupId` mutation. */
export type DeleteEventGroupingByEventIdAndEventGroupIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The event grouping's internal event group id. */
  eventGroupId: Scalars['UUID']['input']
  /** The event grouping's internal event id. */
  eventId: Scalars['UUID']['input']
}

/** All input for the `deleteEventGroupingById` mutation. */
export type DeleteEventGroupingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The event grouping's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `deleteEventGrouping` mutation. */
export type DeleteEventGroupingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `EventGrouping` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `EventGrouping` mutation. */
export type DeleteEventGroupingPayload = {
  __typename?: 'DeleteEventGroupingPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedEventGroupingId?: Maybe<Scalars['ID']['output']>
  /** Reads a single `Event` that is related to this `EventGrouping`. */
  eventByEventId?: Maybe<Event>
  /** Reads a single `EventGroup` that is related to this `EventGrouping`. */
  eventGroupByEventGroupId?: Maybe<EventGroup>
  /** The `EventGrouping` that was deleted by this mutation. */
  eventGrouping?: Maybe<EventGrouping>
  /** An edge for our `EventGrouping`. May be used by Relay 1. */
  eventGroupingEdge?: Maybe<EventGroupingsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `EventGrouping` mutation. */
export type DeleteEventGroupingPayloadEventGroupingEdgeArgs = {
  orderBy?: InputMaybe<Array<EventGroupingsOrderBy>>
}

/** All input for the `deleteEvent` mutation. */
export type DeleteEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Event` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `Event` mutation. */
export type DeleteEventPayload = {
  __typename?: 'DeleteEventPayload'
  /** Reads a single `Account` that is related to this `Event`. */
  accountByAuthorAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedEventId?: Maybe<Scalars['ID']['output']>
  /** The `Event` that was deleted by this mutation. */
  event?: Maybe<Event>
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `Event` mutation. */
export type DeleteEventPayloadEventEdgeArgs = {
  orderBy?: InputMaybe<Array<EventsOrderBy>>
}

/** All input for the `deleteInvitationByEventIdAndContactId` mutation. */
export type DeleteInvitationByEventIdAndContactIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The contact's internal id for which the invitation is valid. */
  contactId: Scalars['UUID']['input']
  /** The event's internal id for which the invitation is valid. */
  eventId: Scalars['UUID']['input']
}

/** All input for the `deleteInvitationById` mutation. */
export type DeleteInvitationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The invitations's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `deleteInvitation` mutation. */
export type DeleteInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Invitation` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `Invitation` mutation. */
export type DeleteInvitationPayload = {
  __typename?: 'DeleteInvitationPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Contact` that is related to this `Invitation`. */
  contactByContactId?: Maybe<Contact>
  deletedInvitationId?: Maybe<Scalars['ID']['output']>
  /** Reads a single `Event` that is related to this `Invitation`. */
  eventByEventId?: Maybe<Event>
  /** The `Invitation` that was deleted by this mutation. */
  invitation?: Maybe<Invitation>
  /** An edge for our `Invitation`. May be used by Relay 1. */
  invitationEdge?: Maybe<InvitationsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `Invitation` mutation. */
export type DeleteInvitationPayloadInvitationEdgeArgs = {
  orderBy?: InputMaybe<Array<InvitationsOrderBy>>
}

/** All input for the `deleteProfilePictureByAccountId` mutation. */
export type DeleteProfilePictureByAccountIdInput = {
  /** The account's id. */
  accountId: Scalars['UUID']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** All input for the `deleteProfilePictureById` mutation. */
export type DeleteProfilePictureByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The profile picture's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `deleteProfilePicture` mutation. */
export type DeleteProfilePictureInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `ProfilePicture` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `ProfilePicture` mutation. */
export type DeleteProfilePicturePayload = {
  __typename?: 'DeleteProfilePicturePayload'
  /** Reads a single `Account` that is related to this `ProfilePicture`. */
  accountByAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedProfilePictureId?: Maybe<Scalars['ID']['output']>
  /** The `ProfilePicture` that was deleted by this mutation. */
  profilePicture?: Maybe<ProfilePicture>
  /** An edge for our `ProfilePicture`. May be used by Relay 1. */
  profilePictureEdge?: Maybe<ProfilePicturesEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Upload` that is related to this `ProfilePicture`. */
  uploadByUploadId?: Maybe<Upload>
}

/** The output of our delete `ProfilePicture` mutation. */
export type DeleteProfilePicturePayloadProfilePictureEdgeArgs = {
  orderBy?: InputMaybe<Array<ProfilePicturesOrderBy>>
}

/** All input for the `deleteUploadById` mutation. */
export type DeleteUploadByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The upload's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `deleteUploadByStorageKey` mutation. */
export type DeleteUploadByStorageKeyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The upload's storage key. */
  storageKey: Scalars['String']['input']
}

/** All input for the `deleteUpload` mutation. */
export type DeleteUploadInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Upload` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `Upload` mutation. */
export type DeleteUploadPayload = {
  __typename?: 'DeleteUploadPayload'
  /** Reads a single `Account` that is related to this `Upload`. */
  accountByAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedUploadId?: Maybe<Scalars['ID']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Upload` that was deleted by this mutation. */
  upload?: Maybe<Upload>
  /** An edge for our `Upload`. May be used by Relay 1. */
  uploadEdge?: Maybe<UploadsEdge>
}

/** The output of our delete `Upload` mutation. */
export type DeleteUploadPayloadUploadEdgeArgs = {
  orderBy?: InputMaybe<Array<UploadsOrderBy>>
}

/** An event. */
export type Event = Node & {
  __typename?: 'Event'
  /** Reads a single `Account` that is related to this `Event`. */
  accountByAuthorAccountId?: Maybe<Account>
  /** The event author's id. */
  authorAccountId: Scalars['UUID']['output']
  /** The event's description. */
  description?: Maybe<Scalars['String']['output']>
  /** The event's end date and time, with timezone. */
  end?: Maybe<Scalars['Datetime']['output']>
  /** Reads and enables pagination through a set of `EventGrouping`. */
  eventGroupingsByEventId: EventGroupingsConnection
  /** The event's internal id. */
  id: Scalars['UUID']['output']
  /** Reads and enables pagination through a set of `Invitation`. */
  invitationsByEventId: InvitationsConnection
  /** The event's maximum invitee count. */
  inviteeCountMaximum?: Maybe<Scalars['Int']['output']>
  /** Indicates whether the event is archived. */
  isArchived: Scalars['Boolean']['output']
  /** Indicates whether the event takes place in person. */
  isInPerson?: Maybe<Scalars['Boolean']['output']>
  /** Indicates whether the event takes place remotely. */
  isRemote?: Maybe<Scalars['Boolean']['output']>
  /** The event's location as it can be shown on a map. */
  location?: Maybe<Scalars['String']['output']>
  /** The event's name. */
  name: Scalars['String']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** The event's name, slugified. */
  slug: Scalars['String']['output']
  /** The event's start date and time, with timezone. */
  start: Scalars['Datetime']['output']
  /** The event's unified resource locator. */
  url?: Maybe<Scalars['String']['output']>
  /** The event's visibility. */
  visibility: EventVisibility
}

/** An event. */
export type EventEventGroupingsByEventIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventGroupingCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventGroupingsOrderBy>>
}

/** An event. */
export type EventInvitationsByEventIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<InvitationCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<InvitationsOrderBy>>
}

/** A condition to be used against `Event` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EventCondition = {
  /** Checks for equality with the object’s `authorAccountId` field. */
  authorAccountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `end` field. */
  end?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `inviteeCountMaximum` field. */
  inviteeCountMaximum?: InputMaybe<Scalars['Int']['input']>
  /** Checks for equality with the object’s `isArchived` field. */
  isArchived?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks for equality with the object’s `isInPerson` field. */
  isInPerson?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks for equality with the object’s `isRemote` field. */
  isRemote?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks for equality with the object’s `location` field. */
  location?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `start` field. */
  start?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `visibility` field. */
  visibility?: InputMaybe<EventVisibility>
}

/** All input for the `eventDelete` mutation. */
export type EventDeleteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['UUID']['input']
  password: Scalars['String']['input']
}

/** The output of our `eventDelete` mutation. */
export type EventDeletePayload = {
  __typename?: 'EventDeletePayload'
  /** Reads a single `Account` that is related to this `Event`. */
  accountByAuthorAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  event?: Maybe<Event>
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our `eventDelete` mutation. */
export type EventDeletePayloadEventEdgeArgs = {
  orderBy?: InputMaybe<Array<EventsOrderBy>>
}

/** A group of events. */
export type EventGroup = Node & {
  __typename?: 'EventGroup'
  /** Reads a single `Account` that is related to this `EventGroup`. */
  accountByAuthorAccountId?: Maybe<Account>
  /** The event group author's id. */
  authorAccountId: Scalars['UUID']['output']
  /** The event group's description. */
  description?: Maybe<Scalars['String']['output']>
  /** Reads and enables pagination through a set of `EventGrouping`. */
  eventGroupingsByEventGroupId: EventGroupingsConnection
  /** The event group's internal id. */
  id: Scalars['UUID']['output']
  /** Indicates whether the event group is archived. */
  isArchived: Scalars['Boolean']['output']
  /** The event group's name. */
  name: Scalars['String']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** The event group's name, slugified. */
  slug: Scalars['String']['output']
}

/** A group of events. */
export type EventGroupEventGroupingsByEventGroupIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventGroupingCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventGroupingsOrderBy>>
}

/**
 * A condition to be used against `EventGroup` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type EventGroupCondition = {
  /** Checks for equality with the object’s `authorAccountId` field. */
  authorAccountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `isArchived` field. */
  isArchived?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>
}

/** An input for mutations affecting `EventGroup` */
export type EventGroupInput = {
  /** The event group author's id. */
  authorAccountId: Scalars['UUID']['input']
  /** The event group's description. */
  description?: InputMaybe<Scalars['String']['input']>
  /** Indicates whether the event group is archived. */
  isArchived?: InputMaybe<Scalars['Boolean']['input']>
  /** The event group's name. */
  name: Scalars['String']['input']
}

/** Represents an update to a `EventGroup`. Fields that are set will be updated. */
export type EventGroupPatch = {
  /** The event group author's id. */
  authorAccountId?: InputMaybe<Scalars['UUID']['input']>
  /** The event group's description. */
  description?: InputMaybe<Scalars['String']['input']>
  /** Indicates whether the event group is archived. */
  isArchived?: InputMaybe<Scalars['Boolean']['input']>
  /** The event group's name. */
  name?: InputMaybe<Scalars['String']['input']>
}

/** A bidirectional mapping between an event and an event group. */
export type EventGrouping = Node & {
  __typename?: 'EventGrouping'
  /** Reads a single `Event` that is related to this `EventGrouping`. */
  eventByEventId?: Maybe<Event>
  /** Reads a single `EventGroup` that is related to this `EventGrouping`. */
  eventGroupByEventGroupId?: Maybe<EventGroup>
  /** The event grouping's internal event group id. */
  eventGroupId: Scalars['UUID']['output']
  /** The event grouping's internal event id. */
  eventId: Scalars['UUID']['output']
  /** The event grouping's internal id. */
  id: Scalars['UUID']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
}

/**
 * A condition to be used against `EventGrouping` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EventGroupingCondition = {
  /** Checks for equality with the object’s `eventGroupId` field. */
  eventGroupId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
}

/** An input for mutations affecting `EventGrouping` */
export type EventGroupingInput = {
  /** The event grouping's internal event group id. */
  eventGroupId: Scalars['UUID']['input']
  /** The event grouping's internal event id. */
  eventId: Scalars['UUID']['input']
}

/** Represents an update to a `EventGrouping`. Fields that are set will be updated. */
export type EventGroupingPatch = {
  /** The event grouping's internal event group id. */
  eventGroupId?: InputMaybe<Scalars['UUID']['input']>
  /** The event grouping's internal event id. */
  eventId?: InputMaybe<Scalars['UUID']['input']>
}

/** A connection to a list of `EventGrouping` values. */
export type EventGroupingsConnection = {
  __typename?: 'EventGroupingsConnection'
  /** A list of edges which contains the `EventGrouping` and cursor to aid in pagination. */
  edges: Array<EventGroupingsEdge>
  /** A list of `EventGrouping` objects. */
  nodes: Array<EventGrouping>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `EventGrouping` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `EventGrouping` edge in the connection. */
export type EventGroupingsEdge = {
  __typename?: 'EventGroupingsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `EventGrouping` at the end of the edge. */
  node: EventGrouping
}

/** Methods to use when ordering `EventGrouping`. */
export enum EventGroupingsOrderBy {
  EventGroupIdAsc = 'EVENT_GROUP_ID_ASC',
  EventGroupIdDesc = 'EVENT_GROUP_ID_DESC',
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
}

/** A connection to a list of `EventGroup` values. */
export type EventGroupsConnection = {
  __typename?: 'EventGroupsConnection'
  /** A list of edges which contains the `EventGroup` and cursor to aid in pagination. */
  edges: Array<EventGroupsEdge>
  /** A list of `EventGroup` objects. */
  nodes: Array<EventGroup>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `EventGroup` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `EventGroup` edge in the connection. */
export type EventGroupsEdge = {
  __typename?: 'EventGroupsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `EventGroup` at the end of the edge. */
  node: EventGroup
}

/** Methods to use when ordering `EventGroup`. */
export enum EventGroupsOrderBy {
  AuthorAccountIdAsc = 'AUTHOR_ACCOUNT_ID_ASC',
  AuthorAccountIdDesc = 'AUTHOR_ACCOUNT_ID_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsArchivedAsc = 'IS_ARCHIVED_ASC',
  IsArchivedDesc = 'IS_ARCHIVED_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
}

/** An input for mutations affecting `Event` */
export type EventInput = {
  /** The event author's id. */
  authorAccountId: Scalars['UUID']['input']
  /** The event's description. */
  description?: InputMaybe<Scalars['String']['input']>
  /** The event's end date and time, with timezone. */
  end?: InputMaybe<Scalars['Datetime']['input']>
  /** The event's maximum invitee count. */
  inviteeCountMaximum?: InputMaybe<Scalars['Int']['input']>
  /** Indicates whether the event is archived. */
  isArchived?: InputMaybe<Scalars['Boolean']['input']>
  /** Indicates whether the event takes place in person. */
  isInPerson?: InputMaybe<Scalars['Boolean']['input']>
  /** Indicates whether the event takes place remotely. */
  isRemote?: InputMaybe<Scalars['Boolean']['input']>
  /** The event's location as it can be shown on a map. */
  location?: InputMaybe<Scalars['String']['input']>
  /** The event's name. */
  name: Scalars['String']['input']
  /** The event's name, slugified. */
  slug: Scalars['String']['input']
  /** The event's start date and time, with timezone. */
  start: Scalars['Datetime']['input']
  /** The event's unified resource locator. */
  url?: InputMaybe<Scalars['String']['input']>
  /** The event's visibility. */
  visibility: EventVisibility
}

/** Represents an update to a `Event`. Fields that are set will be updated. */
export type EventPatch = {
  /** The event author's id. */
  authorAccountId?: InputMaybe<Scalars['UUID']['input']>
  /** The event's description. */
  description?: InputMaybe<Scalars['String']['input']>
  /** The event's end date and time, with timezone. */
  end?: InputMaybe<Scalars['Datetime']['input']>
  /** The event's maximum invitee count. */
  inviteeCountMaximum?: InputMaybe<Scalars['Int']['input']>
  /** Indicates whether the event is archived. */
  isArchived?: InputMaybe<Scalars['Boolean']['input']>
  /** Indicates whether the event takes place in person. */
  isInPerson?: InputMaybe<Scalars['Boolean']['input']>
  /** Indicates whether the event takes place remotely. */
  isRemote?: InputMaybe<Scalars['Boolean']['input']>
  /** The event's location as it can be shown on a map. */
  location?: InputMaybe<Scalars['String']['input']>
  /** The event's name. */
  name?: InputMaybe<Scalars['String']['input']>
  /** The event's name, slugified. */
  slug?: InputMaybe<Scalars['String']['input']>
  /** The event's start date and time, with timezone. */
  start?: InputMaybe<Scalars['Datetime']['input']>
  /** The event's unified resource locator. */
  url?: InputMaybe<Scalars['String']['input']>
  /** The event's visibility. */
  visibility?: InputMaybe<EventVisibility>
}

/** All input for the `eventUnlock` mutation. */
export type EventUnlockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  invitationId: Scalars['UUID']['input']
}

/** The output of our `eventUnlock` mutation. */
export type EventUnlockPayload = {
  __typename?: 'EventUnlockPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  eventUnlockResponse?: Maybe<EventUnlockResponse>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

export type EventUnlockResponse = {
  __typename?: 'EventUnlockResponse'
  authorAccountUsername?: Maybe<Scalars['String']['output']>
  eventSlug?: Maybe<Scalars['String']['output']>
  jwt?: Maybe<Scalars['Jwt']['output']>
}

/** Possible visibilities of events and event groups: public, private. */
export enum EventVisibility {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

/** A connection to a list of `Event` values. */
export type EventsConnection = {
  __typename?: 'EventsConnection'
  /** A list of edges which contains the `Event` and cursor to aid in pagination. */
  edges: Array<EventsEdge>
  /** A list of `Event` objects. */
  nodes: Array<Event>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Event` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `Event` edge in the connection. */
export type EventsEdge = {
  __typename?: 'EventsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `Event` at the end of the edge. */
  node: Event
}

/** Methods to use when ordering `Event`. */
export enum EventsOrderBy {
  AuthorAccountIdAsc = 'AUTHOR_ACCOUNT_ID_ASC',
  AuthorAccountIdDesc = 'AUTHOR_ACCOUNT_ID_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  EndAsc = 'END_ASC',
  EndDesc = 'END_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  InviteeCountMaximumAsc = 'INVITEE_COUNT_MAXIMUM_ASC',
  InviteeCountMaximumDesc = 'INVITEE_COUNT_MAXIMUM_DESC',
  IsArchivedAsc = 'IS_ARCHIVED_ASC',
  IsArchivedDesc = 'IS_ARCHIVED_DESC',
  IsInPersonAsc = 'IS_IN_PERSON_ASC',
  IsInPersonDesc = 'IS_IN_PERSON_DESC',
  IsRemoteAsc = 'IS_REMOTE_ASC',
  IsRemoteDesc = 'IS_REMOTE_DESC',
  LocationAsc = 'LOCATION_ASC',
  LocationDesc = 'LOCATION_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  StartAsc = 'START_ASC',
  StartDesc = 'START_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC',
  VisibilityAsc = 'VISIBILITY_ASC',
  VisibilityDesc = 'VISIBILITY_DESC',
}

/** A connection to a list of `UUID` values. */
export type EventsOrganizedConnection = {
  __typename?: 'EventsOrganizedConnection'
  /** A list of edges which contains the `UUID` and cursor to aid in pagination. */
  edges: Array<EventsOrganizedEdge>
  /** A list of `UUID` objects. */
  nodes: Array<Maybe<Scalars['UUID']['output']>>
  /** The count of *all* `UUID` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `UUID` edge in the connection. */
export type EventsOrganizedEdge = {
  __typename?: 'EventsOrganizedEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `UUID` at the end of the edge. */
  node?: Maybe<Scalars['UUID']['output']>
}

/** An invitation for a contact. A bidirectional mapping between an event and a contact. */
export type Invitation = Node & {
  __typename?: 'Invitation'
  /** Reads a single `Contact` that is related to this `Invitation`. */
  contactByContactId?: Maybe<Contact>
  /** The contact's internal id for which the invitation is valid. */
  contactId: Scalars['UUID']['output']
  /** Reads a single `Event` that is related to this `Invitation`. */
  eventByEventId?: Maybe<Event>
  /** The event's internal id for which the invitation is valid. */
  eventId: Scalars['UUID']['output']
  /** The invitation's general feedback status. */
  feedback?: Maybe<InvitationFeedback>
  /** The invitation's paper feedback status. */
  feedbackPaper?: Maybe<InvitationFeedbackPaper>
  /** The invitations's internal id. */
  id: Scalars['UUID']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
}

/**
 * A condition to be used against `Invitation` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type InvitationCondition = {
  /** Checks for equality with the object’s `contactId` field. */
  contactId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `feedback` field. */
  feedback?: InputMaybe<InvitationFeedback>
  /** Checks for equality with the object’s `feedbackPaper` field. */
  feedbackPaper?: InputMaybe<InvitationFeedbackPaper>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
}

/** A `UUID` edge in the connection. */
export type InvitationContactIdEdge = {
  __typename?: 'InvitationContactIdEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `UUID` at the end of the edge. */
  node?: Maybe<Scalars['UUID']['output']>
}

/** A connection to a list of `UUID` values. */
export type InvitationContactIdsConnection = {
  __typename?: 'InvitationContactIdsConnection'
  /** A list of edges which contains the `UUID` and cursor to aid in pagination. */
  edges: Array<InvitationContactIdEdge>
  /** A list of `UUID` objects. */
  nodes: Array<Maybe<Scalars['UUID']['output']>>
  /** The count of *all* `UUID` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** Possible answers to an invitation: accepted, canceled. */
export enum InvitationFeedback {
  Accepted = 'ACCEPTED',
  Canceled = 'CANCELED',
}

/** Possible choices on how to receive a paper invitation: none, paper, digital. */
export enum InvitationFeedbackPaper {
  Digital = 'DIGITAL',
  None = 'NONE',
  Paper = 'PAPER',
}

/** An input for mutations affecting `Invitation` */
export type InvitationInput = {
  /** The contact's internal id for which the invitation is valid. */
  contactId: Scalars['UUID']['input']
  /** The event's internal id for which the invitation is valid. */
  eventId: Scalars['UUID']['input']
  /** The invitation's general feedback status. */
  feedback?: InputMaybe<InvitationFeedback>
  /** The invitation's paper feedback status. */
  feedbackPaper?: InputMaybe<InvitationFeedbackPaper>
}

/** Represents an update to a `Invitation`. Fields that are set will be updated. */
export type InvitationPatch = {
  /** The contact's internal id for which the invitation is valid. */
  contactId?: InputMaybe<Scalars['UUID']['input']>
  /** The event's internal id for which the invitation is valid. */
  eventId?: InputMaybe<Scalars['UUID']['input']>
  /** The invitation's general feedback status. */
  feedback?: InputMaybe<InvitationFeedback>
  /** The invitation's paper feedback status. */
  feedbackPaper?: InputMaybe<InvitationFeedbackPaper>
}

/** A connection to a list of `Invitation` values. */
export type InvitationsConnection = {
  __typename?: 'InvitationsConnection'
  /** A list of edges which contains the `Invitation` and cursor to aid in pagination. */
  edges: Array<InvitationsEdge>
  /** A list of `Invitation` objects. */
  nodes: Array<Invitation>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Invitation` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `Invitation` edge in the connection. */
export type InvitationsEdge = {
  __typename?: 'InvitationsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `Invitation` at the end of the edge. */
  node: Invitation
}

/** Methods to use when ordering `Invitation`. */
export enum InvitationsOrderBy {
  ContactIdAsc = 'CONTACT_ID_ASC',
  ContactIdDesc = 'CONTACT_ID_DESC',
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
  FeedbackAsc = 'FEEDBACK_ASC',
  FeedbackDesc = 'FEEDBACK_DESC',
  FeedbackPaperAsc = 'FEEDBACK_PAPER_ASC',
  FeedbackPaperDesc = 'FEEDBACK_PAPER_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
}

/** All input for the `invite` mutation. */
export type InviteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  invitationId: Scalars['UUID']['input']
  language: Scalars['String']['input']
}

/** The output of our `invite` mutation. */
export type InvitePayload = {
  __typename?: 'InvitePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `jwtRefresh` mutation. */
export type JwtRefreshInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  jwtId: Scalars['UUID']['input']
}

/** The output of our `jwtRefresh` mutation. */
export type JwtRefreshPayload = {
  __typename?: 'JwtRefreshPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  jwt?: Maybe<Scalars['Jwt']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation'
  /** Allows to delete an account. */
  accountDelete?: Maybe<AccountDeletePayload>
  /** Sets the account's email address verification code to `NULL` for which the email address verification code equals the one passed and is up to date. */
  accountEmailAddressVerification?: Maybe<AccountEmailAddressVerificationPayload>
  /** Allows to change an account's password. */
  accountPasswordChange?: Maybe<AccountPasswordChangePayload>
  /** Sets a new password for an account if there was a request to do so before that's still up to date. */
  accountPasswordReset?: Maybe<AccountPasswordResetPayload>
  /** Sets a new password reset verification code for an account. */
  accountPasswordResetRequest?: Maybe<AccountPasswordResetRequestPayload>
  /** Creates a contact and registers an account referencing it. */
  accountRegistration?: Maybe<AccountRegistrationPayload>
  /** Refreshes an account's email address verification validity period. */
  accountRegistrationRefresh?: Maybe<AccountRegistrationRefreshPayload>
  /** Inserts an achievement unlock for the user that gave an existing achievement code. */
  achievementUnlock?: Maybe<AchievementUnlockPayload>
  /** Creates a JWT token that will securely identify an account and give it certain permissions. */
  authenticate?: Maybe<AuthenticatePayload>
  /** Creates a single `Account`. */
  createAccount?: Maybe<CreateAccountPayload>
  /** Creates a single `Achievement`. */
  createAchievement?: Maybe<CreateAchievementPayload>
  /** Creates a single `Contact`. */
  createContact?: Maybe<CreateContactPayload>
  /** Creates a single `Event`. */
  createEvent?: Maybe<CreateEventPayload>
  /** Creates a single `EventGroup`. */
  createEventGroup?: Maybe<CreateEventGroupPayload>
  /** Creates a single `EventGrouping`. */
  createEventGrouping?: Maybe<CreateEventGroupingPayload>
  /** Creates a single `Invitation`. */
  createInvitation?: Maybe<CreateInvitationPayload>
  /** Creates a single `ProfilePicture`. */
  createProfilePicture?: Maybe<CreateProfilePicturePayload>
  /** Creates a single `Upload`. */
  createUpload?: Maybe<CreateUploadPayload>
  /** Deletes a single `Account` using its globally unique id. */
  deleteAccount?: Maybe<DeleteAccountPayload>
  /** Deletes a single `Account` using a unique key. */
  deleteAccountById?: Maybe<DeleteAccountPayload>
  /** Deletes a single `Account` using a unique key. */
  deleteAccountByUsername?: Maybe<DeleteAccountPayload>
  /** Deletes a single `Achievement` using its globally unique id. */
  deleteAchievement?: Maybe<DeleteAchievementPayload>
  /** Deletes a single `Achievement` using a unique key. */
  deleteAchievementByAccountIdAndAchievement?: Maybe<DeleteAchievementPayload>
  /** Deletes a single `Achievement` using a unique key. */
  deleteAchievementById?: Maybe<DeleteAchievementPayload>
  /** Deletes a single `Contact` using its globally unique id. */
  deleteContact?: Maybe<DeleteContactPayload>
  /** Deletes a single `Contact` using a unique key. */
  deleteContactByAuthorAccountIdAndAccountId?: Maybe<DeleteContactPayload>
  /** Deletes a single `Contact` using a unique key. */
  deleteContactById?: Maybe<DeleteContactPayload>
  /** Deletes a single `Event` using its globally unique id. */
  deleteEvent?: Maybe<DeleteEventPayload>
  /** Deletes a single `Event` using a unique key. */
  deleteEventByAuthorAccountIdAndSlug?: Maybe<DeleteEventPayload>
  /** Deletes a single `Event` using a unique key. */
  deleteEventById?: Maybe<DeleteEventPayload>
  /** Deletes a single `EventGroup` using its globally unique id. */
  deleteEventGroup?: Maybe<DeleteEventGroupPayload>
  /** Deletes a single `EventGroup` using a unique key. */
  deleteEventGroupByAuthorAccountIdAndSlug?: Maybe<DeleteEventGroupPayload>
  /** Deletes a single `EventGroup` using a unique key. */
  deleteEventGroupById?: Maybe<DeleteEventGroupPayload>
  /** Deletes a single `EventGrouping` using its globally unique id. */
  deleteEventGrouping?: Maybe<DeleteEventGroupingPayload>
  /** Deletes a single `EventGrouping` using a unique key. */
  deleteEventGroupingByEventIdAndEventGroupId?: Maybe<DeleteEventGroupingPayload>
  /** Deletes a single `EventGrouping` using a unique key. */
  deleteEventGroupingById?: Maybe<DeleteEventGroupingPayload>
  /** Deletes a single `Invitation` using its globally unique id. */
  deleteInvitation?: Maybe<DeleteInvitationPayload>
  /** Deletes a single `Invitation` using a unique key. */
  deleteInvitationByEventIdAndContactId?: Maybe<DeleteInvitationPayload>
  /** Deletes a single `Invitation` using a unique key. */
  deleteInvitationById?: Maybe<DeleteInvitationPayload>
  /** Deletes a single `ProfilePicture` using its globally unique id. */
  deleteProfilePicture?: Maybe<DeleteProfilePicturePayload>
  /** Deletes a single `ProfilePicture` using a unique key. */
  deleteProfilePictureByAccountId?: Maybe<DeleteProfilePicturePayload>
  /** Deletes a single `ProfilePicture` using a unique key. */
  deleteProfilePictureById?: Maybe<DeleteProfilePicturePayload>
  /** Deletes a single `Upload` using its globally unique id. */
  deleteUpload?: Maybe<DeleteUploadPayload>
  /** Deletes a single `Upload` using a unique key. */
  deleteUploadById?: Maybe<DeleteUploadPayload>
  /** Deletes a single `Upload` using a unique key. */
  deleteUploadByStorageKey?: Maybe<DeleteUploadPayload>
  /** Allows to delete an event. */
  eventDelete?: Maybe<EventDeletePayload>
  /** Assigns an invitation to the current session. */
  eventUnlock?: Maybe<EventUnlockPayload>
  /** Adds a notification for the invitation channel. */
  invite?: Maybe<InvitePayload>
  /** Refreshes a JWT. */
  jwtRefresh?: Maybe<JwtRefreshPayload>
  /** Allows to set the acknowledgement state of a notification. */
  notificationAcknowledge?: Maybe<NotificationAcknowledgePayload>
  /** Sets the picture with the given upload id as the invoker's profile picture. */
  profilePictureSet?: Maybe<ProfilePictureSetPayload>
  /** Updates a single `Account` using its globally unique id and a patch. */
  updateAccount?: Maybe<UpdateAccountPayload>
  /** Updates a single `Account` using a unique key and a patch. */
  updateAccountById?: Maybe<UpdateAccountPayload>
  /** Updates a single `Account` using a unique key and a patch. */
  updateAccountByUsername?: Maybe<UpdateAccountPayload>
  /** Updates a single `Achievement` using its globally unique id and a patch. */
  updateAchievement?: Maybe<UpdateAchievementPayload>
  /** Updates a single `Achievement` using a unique key and a patch. */
  updateAchievementByAccountIdAndAchievement?: Maybe<UpdateAchievementPayload>
  /** Updates a single `Achievement` using a unique key and a patch. */
  updateAchievementById?: Maybe<UpdateAchievementPayload>
  /** Updates a single `Contact` using its globally unique id and a patch. */
  updateContact?: Maybe<UpdateContactPayload>
  /** Updates a single `Contact` using a unique key and a patch. */
  updateContactByAuthorAccountIdAndAccountId?: Maybe<UpdateContactPayload>
  /** Updates a single `Contact` using a unique key and a patch. */
  updateContactById?: Maybe<UpdateContactPayload>
  /** Updates a single `Event` using its globally unique id and a patch. */
  updateEvent?: Maybe<UpdateEventPayload>
  /** Updates a single `Event` using a unique key and a patch. */
  updateEventByAuthorAccountIdAndSlug?: Maybe<UpdateEventPayload>
  /** Updates a single `Event` using a unique key and a patch. */
  updateEventById?: Maybe<UpdateEventPayload>
  /** Updates a single `EventGroup` using its globally unique id and a patch. */
  updateEventGroup?: Maybe<UpdateEventGroupPayload>
  /** Updates a single `EventGroup` using a unique key and a patch. */
  updateEventGroupByAuthorAccountIdAndSlug?: Maybe<UpdateEventGroupPayload>
  /** Updates a single `EventGroup` using a unique key and a patch. */
  updateEventGroupById?: Maybe<UpdateEventGroupPayload>
  /** Updates a single `EventGrouping` using its globally unique id and a patch. */
  updateEventGrouping?: Maybe<UpdateEventGroupingPayload>
  /** Updates a single `EventGrouping` using a unique key and a patch. */
  updateEventGroupingByEventIdAndEventGroupId?: Maybe<UpdateEventGroupingPayload>
  /** Updates a single `EventGrouping` using a unique key and a patch. */
  updateEventGroupingById?: Maybe<UpdateEventGroupingPayload>
  /** Updates a single `Invitation` using its globally unique id and a patch. */
  updateInvitation?: Maybe<UpdateInvitationPayload>
  /** Updates a single `Invitation` using a unique key and a patch. */
  updateInvitationByEventIdAndContactId?: Maybe<UpdateInvitationPayload>
  /** Updates a single `Invitation` using a unique key and a patch. */
  updateInvitationById?: Maybe<UpdateInvitationPayload>
  /** Updates a single `ProfilePicture` using its globally unique id and a patch. */
  updateProfilePicture?: Maybe<UpdateProfilePicturePayload>
  /** Updates a single `ProfilePicture` using a unique key and a patch. */
  updateProfilePictureByAccountId?: Maybe<UpdateProfilePicturePayload>
  /** Updates a single `ProfilePicture` using a unique key and a patch. */
  updateProfilePictureById?: Maybe<UpdateProfilePicturePayload>
  /** Updates a single `Upload` using its globally unique id and a patch. */
  updateUpload?: Maybe<UpdateUploadPayload>
  /** Updates a single `Upload` using a unique key and a patch. */
  updateUploadById?: Maybe<UpdateUploadPayload>
  /** Updates a single `Upload` using a unique key and a patch. */
  updateUploadByStorageKey?: Maybe<UpdateUploadPayload>
  /** Creates an upload with the given size if quota is available. */
  uploadCreate?: Maybe<UploadCreatePayload>
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationAccountDeleteArgs = {
  input: AccountDeleteInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationAccountEmailAddressVerificationArgs = {
  input: AccountEmailAddressVerificationInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationAccountPasswordChangeArgs = {
  input: AccountPasswordChangeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationAccountPasswordResetArgs = {
  input: AccountPasswordResetInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationAccountPasswordResetRequestArgs = {
  input: AccountPasswordResetRequestInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationAccountRegistrationArgs = {
  input: AccountRegistrationInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationAccountRegistrationRefreshArgs = {
  input: AccountRegistrationRefreshInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationAchievementUnlockArgs = {
  input: AchievementUnlockInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateArgs = {
  input: AuthenticateInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAccountArgs = {
  input: CreateAccountInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAchievementArgs = {
  input: CreateAchievementInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateContactArgs = {
  input: CreateContactInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEventArgs = {
  input: CreateEventInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEventGroupArgs = {
  input: CreateEventGroupInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEventGroupingArgs = {
  input: CreateEventGroupingInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateInvitationArgs = {
  input: CreateInvitationInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProfilePictureArgs = {
  input: CreateProfilePictureInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUploadArgs = {
  input: CreateUploadInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountArgs = {
  input: DeleteAccountInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountByIdArgs = {
  input: DeleteAccountByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountByUsernameArgs = {
  input: DeleteAccountByUsernameInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAchievementArgs = {
  input: DeleteAchievementInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAchievementByAccountIdAndAchievementArgs = {
  input: DeleteAchievementByAccountIdAndAchievementInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAchievementByIdArgs = {
  input: DeleteAchievementByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteContactArgs = {
  input: DeleteContactInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteContactByAuthorAccountIdAndAccountIdArgs = {
  input: DeleteContactByAuthorAccountIdAndAccountIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteContactByIdArgs = {
  input: DeleteContactByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventArgs = {
  input: DeleteEventInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventByAuthorAccountIdAndSlugArgs = {
  input: DeleteEventByAuthorAccountIdAndSlugInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventByIdArgs = {
  input: DeleteEventByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventGroupArgs = {
  input: DeleteEventGroupInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventGroupByAuthorAccountIdAndSlugArgs = {
  input: DeleteEventGroupByAuthorAccountIdAndSlugInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventGroupByIdArgs = {
  input: DeleteEventGroupByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventGroupingArgs = {
  input: DeleteEventGroupingInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventGroupingByEventIdAndEventGroupIdArgs = {
  input: DeleteEventGroupingByEventIdAndEventGroupIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventGroupingByIdArgs = {
  input: DeleteEventGroupingByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteInvitationArgs = {
  input: DeleteInvitationInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteInvitationByEventIdAndContactIdArgs = {
  input: DeleteInvitationByEventIdAndContactIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteInvitationByIdArgs = {
  input: DeleteInvitationByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProfilePictureArgs = {
  input: DeleteProfilePictureInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProfilePictureByAccountIdArgs = {
  input: DeleteProfilePictureByAccountIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProfilePictureByIdArgs = {
  input: DeleteProfilePictureByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUploadArgs = {
  input: DeleteUploadInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUploadByIdArgs = {
  input: DeleteUploadByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUploadByStorageKeyArgs = {
  input: DeleteUploadByStorageKeyInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationEventDeleteArgs = {
  input: EventDeleteInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationEventUnlockArgs = {
  input: EventUnlockInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationInviteArgs = {
  input: InviteInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationJwtRefreshArgs = {
  input: JwtRefreshInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationNotificationAcknowledgeArgs = {
  input: NotificationAcknowledgeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationProfilePictureSetArgs = {
  input: ProfilePictureSetInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountByIdArgs = {
  input: UpdateAccountByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountByUsernameArgs = {
  input: UpdateAccountByUsernameInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAchievementArgs = {
  input: UpdateAchievementInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAchievementByAccountIdAndAchievementArgs = {
  input: UpdateAchievementByAccountIdAndAchievementInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAchievementByIdArgs = {
  input: UpdateAchievementByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateContactArgs = {
  input: UpdateContactInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateContactByAuthorAccountIdAndAccountIdArgs = {
  input: UpdateContactByAuthorAccountIdAndAccountIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateContactByIdArgs = {
  input: UpdateContactByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventArgs = {
  input: UpdateEventInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventByAuthorAccountIdAndSlugArgs = {
  input: UpdateEventByAuthorAccountIdAndSlugInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventByIdArgs = {
  input: UpdateEventByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventGroupArgs = {
  input: UpdateEventGroupInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventGroupByAuthorAccountIdAndSlugArgs = {
  input: UpdateEventGroupByAuthorAccountIdAndSlugInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventGroupByIdArgs = {
  input: UpdateEventGroupByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventGroupingArgs = {
  input: UpdateEventGroupingInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventGroupingByEventIdAndEventGroupIdArgs = {
  input: UpdateEventGroupingByEventIdAndEventGroupIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventGroupingByIdArgs = {
  input: UpdateEventGroupingByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateInvitationArgs = {
  input: UpdateInvitationInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateInvitationByEventIdAndContactIdArgs = {
  input: UpdateInvitationByEventIdAndContactIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateInvitationByIdArgs = {
  input: UpdateInvitationByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProfilePictureArgs = {
  input: UpdateProfilePictureInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProfilePictureByAccountIdArgs = {
  input: UpdateProfilePictureByAccountIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProfilePictureByIdArgs = {
  input: UpdateProfilePictureByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUploadArgs = {
  input: UpdateUploadInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUploadByIdArgs = {
  input: UpdateUploadByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUploadByStorageKeyArgs = {
  input: UpdateUploadByStorageKeyInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUploadCreateArgs = {
  input: UploadCreateInput
}

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
}

/** All input for the `notificationAcknowledge` mutation. */
export type NotificationAcknowledgeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['UUID']['input']
  isAcknowledged: Scalars['Boolean']['input']
}

/** The output of our `notificationAcknowledge` mutation. */
export type NotificationAcknowledgePayload = {
  __typename?: 'NotificationAcknowledgePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo'
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output']
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output']
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>
}

/** Mapping of account ids to upload ids. */
export type ProfilePicture = Node & {
  __typename?: 'ProfilePicture'
  /** Reads a single `Account` that is related to this `ProfilePicture`. */
  accountByAccountId?: Maybe<Account>
  /** The account's id. */
  accountId: Scalars['UUID']['output']
  /** The profile picture's internal id. */
  id: Scalars['UUID']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads a single `Upload` that is related to this `ProfilePicture`. */
  uploadByUploadId?: Maybe<Upload>
  /** The upload's id. */
  uploadId: Scalars['UUID']['output']
}

/**
 * A condition to be used against `ProfilePicture` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ProfilePictureCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `uploadId` field. */
  uploadId?: InputMaybe<Scalars['UUID']['input']>
}

/** An input for mutations affecting `ProfilePicture` */
export type ProfilePictureInput = {
  /** The account's id. */
  accountId: Scalars['UUID']['input']
  /** The upload's id. */
  uploadId: Scalars['UUID']['input']
}

/** Represents an update to a `ProfilePicture`. Fields that are set will be updated. */
export type ProfilePicturePatch = {
  /** The account's id. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** The upload's id. */
  uploadId?: InputMaybe<Scalars['UUID']['input']>
}

/** All input for the `profilePictureSet` mutation. */
export type ProfilePictureSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  uploadId: Scalars['UUID']['input']
}

/** The output of our `profilePictureSet` mutation. */
export type ProfilePictureSetPayload = {
  __typename?: 'ProfilePictureSetPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** A connection to a list of `ProfilePicture` values. */
export type ProfilePicturesConnection = {
  __typename?: 'ProfilePicturesConnection'
  /** A list of edges which contains the `ProfilePicture` and cursor to aid in pagination. */
  edges: Array<ProfilePicturesEdge>
  /** A list of `ProfilePicture` objects. */
  nodes: Array<ProfilePicture>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `ProfilePicture` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `ProfilePicture` edge in the connection. */
export type ProfilePicturesEdge = {
  __typename?: 'ProfilePicturesEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `ProfilePicture` at the end of the edge. */
  node: ProfilePicture
}

/** Methods to use when ordering `ProfilePicture`. */
export enum ProfilePicturesOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UploadIdAsc = 'UPLOAD_ID_ASC',
  UploadIdDesc = 'UPLOAD_ID_DESC',
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query'
  /** Reads a single `Account` using its globally unique `ID`. */
  account?: Maybe<Account>
  accountById?: Maybe<Account>
  accountByUsername?: Maybe<Account>
  /** Gets the total upload quota in bytes for the invoking account. */
  accountUploadQuotaBytes?: Maybe<Scalars['BigInt']['output']>
  /** Reads a single `Achievement` using its globally unique `ID`. */
  achievement?: Maybe<Achievement>
  achievementByAccountIdAndAchievement?: Maybe<Achievement>
  achievementById?: Maybe<Achievement>
  /** Reads and enables pagination through a set of `Account`. */
  allAccounts?: Maybe<AccountsConnection>
  /** Reads and enables pagination through a set of `Achievement`. */
  allAchievements?: Maybe<AchievementsConnection>
  /** Reads and enables pagination through a set of `Contact`. */
  allContacts?: Maybe<ContactsConnection>
  /** Reads and enables pagination through a set of `EventGrouping`. */
  allEventGroupings?: Maybe<EventGroupingsConnection>
  /** Reads and enables pagination through a set of `EventGroup`. */
  allEventGroups?: Maybe<EventGroupsConnection>
  /** Reads and enables pagination through a set of `Event`. */
  allEvents?: Maybe<EventsConnection>
  /** Reads and enables pagination through a set of `Invitation`. */
  allInvitations?: Maybe<InvitationsConnection>
  /** Reads and enables pagination through a set of `ProfilePicture`. */
  allProfilePictures?: Maybe<ProfilePicturesConnection>
  /** Reads and enables pagination through a set of `Upload`. */
  allUploads?: Maybe<UploadsConnection>
  /** Reads a single `Contact` using its globally unique `ID`. */
  contact?: Maybe<Contact>
  contactByAuthorAccountIdAndAccountId?: Maybe<Contact>
  contactById?: Maybe<Contact>
  /** Reads a single `Event` using its globally unique `ID`. */
  event?: Maybe<Event>
  eventByAuthorAccountIdAndSlug?: Maybe<Event>
  eventById?: Maybe<Event>
  /** Reads a single `EventGroup` using its globally unique `ID`. */
  eventGroup?: Maybe<EventGroup>
  eventGroupByAuthorAccountIdAndSlug?: Maybe<EventGroup>
  eventGroupById?: Maybe<EventGroup>
  /** Reads a single `EventGrouping` using its globally unique `ID`. */
  eventGrouping?: Maybe<EventGrouping>
  eventGroupingByEventIdAndEventGroupId?: Maybe<EventGrouping>
  eventGroupingById?: Maybe<EventGrouping>
  /** Add a function that returns the maximum invitee count of an accessible event. */
  eventInviteeCountMaximum?: Maybe<Scalars['Int']['output']>
  /** Shows if an event exists. */
  eventIsExisting?: Maybe<Scalars['Boolean']['output']>
  /** Add a function that returns all event ids for which the invoker is the author. */
  eventsOrganized?: Maybe<EventsOrganizedConnection>
  /** Reads a single `Invitation` using its globally unique `ID`. */
  invitation?: Maybe<Invitation>
  invitationByEventIdAndContactId?: Maybe<Invitation>
  invitationById?: Maybe<Invitation>
  /** Returns the current invitation claims as UUID array. */
  invitationClaimArray?: Maybe<Array<Maybe<Scalars['UUID']['output']>>>
  /** Returns contact ids that are accessible through invitations. */
  invitationContactIds?: Maybe<InvitationContactIdsConnection>
  /** Returns the invitee count for an event. */
  inviteeCount?: Maybe<Scalars['Int']['output']>
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output']
  /** Reads a single `ProfilePicture` using its globally unique `ID`. */
  profilePicture?: Maybe<ProfilePicture>
  profilePictureByAccountId?: Maybe<ProfilePicture>
  profilePictureById?: Maybe<ProfilePicture>
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query
  /** Reads a single `Upload` using its globally unique `ID`. */
  upload?: Maybe<Upload>
  uploadById?: Maybe<Upload>
  uploadByStorageKey?: Maybe<Upload>
}

/** The root query type which gives access points into the data universe. */
export type QueryAccountArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryAccountByIdArgs = {
  id: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryAccountByUsernameArgs = {
  username: Scalars['String']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryAchievementArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryAchievementByAccountIdAndAchievementArgs = {
  accountId: Scalars['UUID']['input']
  achievement: AchievementType
}

/** The root query type which gives access points into the data universe. */
export type QueryAchievementByIdArgs = {
  id: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryAllAccountsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<AccountCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<AccountsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllAchievementsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<AchievementCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<AchievementsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllContactsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<ContactCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ContactsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllEventGroupingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventGroupingCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventGroupingsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllEventGroupsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventGroupCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventGroupsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllInvitationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<InvitationCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<InvitationsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllProfilePicturesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<ProfilePictureCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ProfilePicturesOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllUploadsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<UploadCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<UploadsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryContactArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryContactByAuthorAccountIdAndAccountIdArgs = {
  accountId: Scalars['UUID']['input']
  authorAccountId: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryContactByIdArgs = {
  id: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventByAuthorAccountIdAndSlugArgs = {
  authorAccountId: Scalars['UUID']['input']
  slug: Scalars['String']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventByIdArgs = {
  id: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventGroupArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventGroupByAuthorAccountIdAndSlugArgs = {
  authorAccountId: Scalars['UUID']['input']
  slug: Scalars['String']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventGroupByIdArgs = {
  id: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventGroupingArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventGroupingByEventIdAndEventGroupIdArgs = {
  eventGroupId: Scalars['UUID']['input']
  eventId: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventGroupingByIdArgs = {
  id: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventInviteeCountMaximumArgs = {
  eventId: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventIsExistingArgs = {
  authorAccountId: Scalars['UUID']['input']
  slug: Scalars['String']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventsOrganizedArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}

/** The root query type which gives access points into the data universe. */
export type QueryInvitationArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryInvitationByEventIdAndContactIdArgs = {
  contactId: Scalars['UUID']['input']
  eventId: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryInvitationByIdArgs = {
  id: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryInvitationContactIdsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}

/** The root query type which gives access points into the data universe. */
export type QueryInviteeCountArgs = {
  eventId: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryProfilePictureArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryProfilePictureByAccountIdArgs = {
  accountId: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryProfilePictureByIdArgs = {
  id: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryUploadArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryUploadByIdArgs = {
  id: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryUploadByStorageKeyArgs = {
  storageKey: Scalars['String']['input']
}

/** All input for the `updateAccountById` mutation. */
export type UpdateAccountByIdInput = {
  /** An object where the defined keys will be set on the `Account` being updated. */
  accountPatch: AccountPatch
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The account's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `updateAccountByUsername` mutation. */
export type UpdateAccountByUsernameInput = {
  /** An object where the defined keys will be set on the `Account` being updated. */
  accountPatch: AccountPatch
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The account's username. */
  username: Scalars['String']['input']
}

/** All input for the `updateAccount` mutation. */
export type UpdateAccountInput = {
  /** An object where the defined keys will be set on the `Account` being updated. */
  accountPatch: AccountPatch
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Account` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `Account` mutation. */
export type UpdateAccountPayload = {
  __typename?: 'UpdateAccountPayload'
  /** The `Account` that was updated by this mutation. */
  account?: Maybe<Account>
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `Account` mutation. */
export type UpdateAccountPayloadAccountEdgeArgs = {
  orderBy?: InputMaybe<Array<AccountsOrderBy>>
}

/** All input for the `updateAchievementByAccountIdAndAchievement` mutation. */
export type UpdateAchievementByAccountIdAndAchievementInput = {
  /** The account which unlocked the achievement. */
  accountId: Scalars['UUID']['input']
  /** The unlock's achievement. */
  achievement: AchievementType
  /** An object where the defined keys will be set on the `Achievement` being updated. */
  achievementPatch: AchievementPatch
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** All input for the `updateAchievementById` mutation. */
export type UpdateAchievementByIdInput = {
  /** An object where the defined keys will be set on the `Achievement` being updated. */
  achievementPatch: AchievementPatch
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The achievement unlock's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `updateAchievement` mutation. */
export type UpdateAchievementInput = {
  /** An object where the defined keys will be set on the `Achievement` being updated. */
  achievementPatch: AchievementPatch
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Achievement` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `Achievement` mutation. */
export type UpdateAchievementPayload = {
  __typename?: 'UpdateAchievementPayload'
  /** Reads a single `Account` that is related to this `Achievement`. */
  accountByAccountId?: Maybe<Account>
  /** The `Achievement` that was updated by this mutation. */
  achievement?: Maybe<Achievement>
  /** An edge for our `Achievement`. May be used by Relay 1. */
  achievementEdge?: Maybe<AchievementsEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `Achievement` mutation. */
export type UpdateAchievementPayloadAchievementEdgeArgs = {
  orderBy?: InputMaybe<Array<AchievementsOrderBy>>
}

/** All input for the `updateContactByAuthorAccountIdAndAccountId` mutation. */
export type UpdateContactByAuthorAccountIdAndAccountIdInput = {
  /** The contact account's id. */
  accountId: Scalars['UUID']['input']
  /** The contact author's id. */
  authorAccountId: Scalars['UUID']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `Contact` being updated. */
  contactPatch: ContactPatch
}

/** All input for the `updateContactById` mutation. */
export type UpdateContactByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `Contact` being updated. */
  contactPatch: ContactPatch
  /** The contact's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `updateContact` mutation. */
export type UpdateContactInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `Contact` being updated. */
  contactPatch: ContactPatch
  /** The globally unique `ID` which will identify a single `Contact` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `Contact` mutation. */
export type UpdateContactPayload = {
  __typename?: 'UpdateContactPayload'
  /** Reads a single `Account` that is related to this `Contact`. */
  accountByAccountId?: Maybe<Account>
  /** Reads a single `Account` that is related to this `Contact`. */
  accountByAuthorAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `Contact` that was updated by this mutation. */
  contact?: Maybe<Contact>
  /** An edge for our `Contact`. May be used by Relay 1. */
  contactEdge?: Maybe<ContactsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `Contact` mutation. */
export type UpdateContactPayloadContactEdgeArgs = {
  orderBy?: InputMaybe<Array<ContactsOrderBy>>
}

/** All input for the `updateEventByAuthorAccountIdAndSlug` mutation. */
export type UpdateEventByAuthorAccountIdAndSlugInput = {
  /** The event author's id. */
  authorAccountId: Scalars['UUID']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `Event` being updated. */
  eventPatch: EventPatch
  /** The event's name, slugified. */
  slug: Scalars['String']['input']
}

/** All input for the `updateEventById` mutation. */
export type UpdateEventByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `Event` being updated. */
  eventPatch: EventPatch
  /** The event's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `updateEventGroupByAuthorAccountIdAndSlug` mutation. */
export type UpdateEventGroupByAuthorAccountIdAndSlugInput = {
  /** The event group author's id. */
  authorAccountId: Scalars['UUID']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `EventGroup` being updated. */
  eventGroupPatch: EventGroupPatch
  /** The event group's name, slugified. */
  slug: Scalars['String']['input']
}

/** All input for the `updateEventGroupById` mutation. */
export type UpdateEventGroupByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `EventGroup` being updated. */
  eventGroupPatch: EventGroupPatch
  /** The event group's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `updateEventGroup` mutation. */
export type UpdateEventGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `EventGroup` being updated. */
  eventGroupPatch: EventGroupPatch
  /** The globally unique `ID` which will identify a single `EventGroup` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `EventGroup` mutation. */
export type UpdateEventGroupPayload = {
  __typename?: 'UpdateEventGroupPayload'
  /** Reads a single `Account` that is related to this `EventGroup`. */
  accountByAuthorAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `EventGroup` that was updated by this mutation. */
  eventGroup?: Maybe<EventGroup>
  /** An edge for our `EventGroup`. May be used by Relay 1. */
  eventGroupEdge?: Maybe<EventGroupsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `EventGroup` mutation. */
export type UpdateEventGroupPayloadEventGroupEdgeArgs = {
  orderBy?: InputMaybe<Array<EventGroupsOrderBy>>
}

/** All input for the `updateEventGroupingByEventIdAndEventGroupId` mutation. */
export type UpdateEventGroupingByEventIdAndEventGroupIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The event grouping's internal event group id. */
  eventGroupId: Scalars['UUID']['input']
  /** An object where the defined keys will be set on the `EventGrouping` being updated. */
  eventGroupingPatch: EventGroupingPatch
  /** The event grouping's internal event id. */
  eventId: Scalars['UUID']['input']
}

/** All input for the `updateEventGroupingById` mutation. */
export type UpdateEventGroupingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `EventGrouping` being updated. */
  eventGroupingPatch: EventGroupingPatch
  /** The event grouping's internal id. */
  id: Scalars['UUID']['input']
}

/** All input for the `updateEventGrouping` mutation. */
export type UpdateEventGroupingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `EventGrouping` being updated. */
  eventGroupingPatch: EventGroupingPatch
  /** The globally unique `ID` which will identify a single `EventGrouping` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `EventGrouping` mutation. */
export type UpdateEventGroupingPayload = {
  __typename?: 'UpdateEventGroupingPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Event` that is related to this `EventGrouping`. */
  eventByEventId?: Maybe<Event>
  /** Reads a single `EventGroup` that is related to this `EventGrouping`. */
  eventGroupByEventGroupId?: Maybe<EventGroup>
  /** The `EventGrouping` that was updated by this mutation. */
  eventGrouping?: Maybe<EventGrouping>
  /** An edge for our `EventGrouping`. May be used by Relay 1. */
  eventGroupingEdge?: Maybe<EventGroupingsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `EventGrouping` mutation. */
export type UpdateEventGroupingPayloadEventGroupingEdgeArgs = {
  orderBy?: InputMaybe<Array<EventGroupingsOrderBy>>
}

/** All input for the `updateEvent` mutation. */
export type UpdateEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `Event` being updated. */
  eventPatch: EventPatch
  /** The globally unique `ID` which will identify a single `Event` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `Event` mutation. */
export type UpdateEventPayload = {
  __typename?: 'UpdateEventPayload'
  /** Reads a single `Account` that is related to this `Event`. */
  accountByAuthorAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `Event` that was updated by this mutation. */
  event?: Maybe<Event>
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `Event` mutation. */
export type UpdateEventPayloadEventEdgeArgs = {
  orderBy?: InputMaybe<Array<EventsOrderBy>>
}

/** All input for the `updateInvitationByEventIdAndContactId` mutation. */
export type UpdateInvitationByEventIdAndContactIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The contact's internal id for which the invitation is valid. */
  contactId: Scalars['UUID']['input']
  /** The event's internal id for which the invitation is valid. */
  eventId: Scalars['UUID']['input']
  /** An object where the defined keys will be set on the `Invitation` being updated. */
  invitationPatch: InvitationPatch
}

/** All input for the `updateInvitationById` mutation. */
export type UpdateInvitationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The invitations's internal id. */
  id: Scalars['UUID']['input']
  /** An object where the defined keys will be set on the `Invitation` being updated. */
  invitationPatch: InvitationPatch
}

/** All input for the `updateInvitation` mutation. */
export type UpdateInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `Invitation` being updated. */
  invitationPatch: InvitationPatch
  /** The globally unique `ID` which will identify a single `Invitation` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `Invitation` mutation. */
export type UpdateInvitationPayload = {
  __typename?: 'UpdateInvitationPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Contact` that is related to this `Invitation`. */
  contactByContactId?: Maybe<Contact>
  /** Reads a single `Event` that is related to this `Invitation`. */
  eventByEventId?: Maybe<Event>
  /** The `Invitation` that was updated by this mutation. */
  invitation?: Maybe<Invitation>
  /** An edge for our `Invitation`. May be used by Relay 1. */
  invitationEdge?: Maybe<InvitationsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `Invitation` mutation. */
export type UpdateInvitationPayloadInvitationEdgeArgs = {
  orderBy?: InputMaybe<Array<InvitationsOrderBy>>
}

/** All input for the `updateProfilePictureByAccountId` mutation. */
export type UpdateProfilePictureByAccountIdInput = {
  /** The account's id. */
  accountId: Scalars['UUID']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `ProfilePicture` being updated. */
  profilePicturePatch: ProfilePicturePatch
}

/** All input for the `updateProfilePictureById` mutation. */
export type UpdateProfilePictureByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The profile picture's internal id. */
  id: Scalars['UUID']['input']
  /** An object where the defined keys will be set on the `ProfilePicture` being updated. */
  profilePicturePatch: ProfilePicturePatch
}

/** All input for the `updateProfilePicture` mutation. */
export type UpdateProfilePictureInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `ProfilePicture` to be updated. */
  nodeId: Scalars['ID']['input']
  /** An object where the defined keys will be set on the `ProfilePicture` being updated. */
  profilePicturePatch: ProfilePicturePatch
}

/** The output of our update `ProfilePicture` mutation. */
export type UpdateProfilePicturePayload = {
  __typename?: 'UpdateProfilePicturePayload'
  /** Reads a single `Account` that is related to this `ProfilePicture`. */
  accountByAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `ProfilePicture` that was updated by this mutation. */
  profilePicture?: Maybe<ProfilePicture>
  /** An edge for our `ProfilePicture`. May be used by Relay 1. */
  profilePictureEdge?: Maybe<ProfilePicturesEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Upload` that is related to this `ProfilePicture`. */
  uploadByUploadId?: Maybe<Upload>
}

/** The output of our update `ProfilePicture` mutation. */
export type UpdateProfilePicturePayloadProfilePictureEdgeArgs = {
  orderBy?: InputMaybe<Array<ProfilePicturesOrderBy>>
}

/** All input for the `updateUploadById` mutation. */
export type UpdateUploadByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The upload's internal id. */
  id: Scalars['UUID']['input']
  /** An object where the defined keys will be set on the `Upload` being updated. */
  uploadPatch: UploadPatch
}

/** All input for the `updateUploadByStorageKey` mutation. */
export type UpdateUploadByStorageKeyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The upload's storage key. */
  storageKey: Scalars['String']['input']
  /** An object where the defined keys will be set on the `Upload` being updated. */
  uploadPatch: UploadPatch
}

/** All input for the `updateUpload` mutation. */
export type UpdateUploadInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Upload` to be updated. */
  nodeId: Scalars['ID']['input']
  /** An object where the defined keys will be set on the `Upload` being updated. */
  uploadPatch: UploadPatch
}

/** The output of our update `Upload` mutation. */
export type UpdateUploadPayload = {
  __typename?: 'UpdateUploadPayload'
  /** Reads a single `Account` that is related to this `Upload`. */
  accountByAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Upload` that was updated by this mutation. */
  upload?: Maybe<Upload>
  /** An edge for our `Upload`. May be used by Relay 1. */
  uploadEdge?: Maybe<UploadsEdge>
}

/** The output of our update `Upload` mutation. */
export type UpdateUploadPayloadUploadEdgeArgs = {
  orderBy?: InputMaybe<Array<UploadsOrderBy>>
}

/** An upload. */
export type Upload = Node & {
  __typename?: 'Upload'
  /** Reads a single `Account` that is related to this `Upload`. */
  accountByAccountId?: Maybe<Account>
  /** The uploader's account id. */
  accountId: Scalars['UUID']['output']
  /** The upload's internal id. */
  id: Scalars['UUID']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads and enables pagination through a set of `ProfilePicture`. */
  profilePicturesByUploadId: ProfilePicturesConnection
  /** The upload's size in bytes. */
  sizeByte: Scalars['BigInt']['output']
  /** The upload's storage key. */
  storageKey?: Maybe<Scalars['String']['output']>
}

/** An upload. */
export type UploadProfilePicturesByUploadIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<ProfilePictureCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ProfilePicturesOrderBy>>
}

/** A condition to be used against `Upload` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UploadCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `sizeByte` field. */
  sizeByte?: InputMaybe<Scalars['BigInt']['input']>
  /** Checks for equality with the object’s `storageKey` field. */
  storageKey?: InputMaybe<Scalars['String']['input']>
}

/** All input for the `uploadCreate` mutation. */
export type UploadCreateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  sizeByte: Scalars['BigInt']['input']
}

/** The output of our `uploadCreate` mutation. */
export type UploadCreatePayload = {
  __typename?: 'UploadCreatePayload'
  /** Reads a single `Account` that is related to this `Upload`. */
  accountByAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  upload?: Maybe<Upload>
  /** An edge for our `Upload`. May be used by Relay 1. */
  uploadEdge?: Maybe<UploadsEdge>
}

/** The output of our `uploadCreate` mutation. */
export type UploadCreatePayloadUploadEdgeArgs = {
  orderBy?: InputMaybe<Array<UploadsOrderBy>>
}

/** An input for mutations affecting `Upload` */
export type UploadInput = {
  /** The uploader's account id. */
  accountId: Scalars['UUID']['input']
  /** The upload's size in bytes. */
  sizeByte: Scalars['BigInt']['input']
  /** The upload's storage key. */
  storageKey?: InputMaybe<Scalars['String']['input']>
}

/** Represents an update to a `Upload`. Fields that are set will be updated. */
export type UploadPatch = {
  /** The uploader's account id. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** The upload's size in bytes. */
  sizeByte?: InputMaybe<Scalars['BigInt']['input']>
  /** The upload's storage key. */
  storageKey?: InputMaybe<Scalars['String']['input']>
}

/** A connection to a list of `Upload` values. */
export type UploadsConnection = {
  __typename?: 'UploadsConnection'
  /** A list of edges which contains the `Upload` and cursor to aid in pagination. */
  edges: Array<UploadsEdge>
  /** A list of `Upload` objects. */
  nodes: Array<Upload>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Upload` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `Upload` edge in the connection. */
export type UploadsEdge = {
  __typename?: 'UploadsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `Upload` at the end of the edge. */
  node: Upload
}

/** Methods to use when ordering `Upload`. */
export enum UploadsOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SizeByteAsc = 'SIZE_BYTE_ASC',
  SizeByteDesc = 'SIZE_BYTE_DESC',
  StorageKeyAsc = 'STORAGE_KEY_ASC',
  StorageKeyDesc = 'STORAGE_KEY_DESC',
}

export type WithTypename<T extends { __typename?: any }> = Partial<T> & {
  __typename: NonNullable<T['__typename']>
}

export type GraphCacheKeysConfig = {
  Account?: (data: WithTypename<Account>) => null | string
  AccountDeletePayload?: (
    data: WithTypename<AccountDeletePayload>,
  ) => null | string
  AccountEmailAddressVerificationPayload?: (
    data: WithTypename<AccountEmailAddressVerificationPayload>,
  ) => null | string
  AccountPasswordChangePayload?: (
    data: WithTypename<AccountPasswordChangePayload>,
  ) => null | string
  AccountPasswordResetPayload?: (
    data: WithTypename<AccountPasswordResetPayload>,
  ) => null | string
  AccountPasswordResetRequestPayload?: (
    data: WithTypename<AccountPasswordResetRequestPayload>,
  ) => null | string
  AccountRegistrationPayload?: (
    data: WithTypename<AccountRegistrationPayload>,
  ) => null | string
  AccountRegistrationRefreshPayload?: (
    data: WithTypename<AccountRegistrationRefreshPayload>,
  ) => null | string
  AccountsConnection?: (data: WithTypename<AccountsConnection>) => null | string
  AccountsEdge?: (data: WithTypename<AccountsEdge>) => null | string
  Achievement?: (data: WithTypename<Achievement>) => null | string
  AchievementUnlockPayload?: (
    data: WithTypename<AchievementUnlockPayload>,
  ) => null | string
  AchievementsConnection?: (
    data: WithTypename<AchievementsConnection>,
  ) => null | string
  AchievementsEdge?: (data: WithTypename<AchievementsEdge>) => null | string
  AuthenticatePayload?: (
    data: WithTypename<AuthenticatePayload>,
  ) => null | string
  Contact?: (data: WithTypename<Contact>) => null | string
  ContactsConnection?: (data: WithTypename<ContactsConnection>) => null | string
  ContactsEdge?: (data: WithTypename<ContactsEdge>) => null | string
  CreateAccountPayload?: (
    data: WithTypename<CreateAccountPayload>,
  ) => null | string
  CreateAchievementPayload?: (
    data: WithTypename<CreateAchievementPayload>,
  ) => null | string
  CreateContactPayload?: (
    data: WithTypename<CreateContactPayload>,
  ) => null | string
  CreateEventGroupPayload?: (
    data: WithTypename<CreateEventGroupPayload>,
  ) => null | string
  CreateEventGroupingPayload?: (
    data: WithTypename<CreateEventGroupingPayload>,
  ) => null | string
  CreateEventPayload?: (data: WithTypename<CreateEventPayload>) => null | string
  CreateInvitationPayload?: (
    data: WithTypename<CreateInvitationPayload>,
  ) => null | string
  CreateProfilePicturePayload?: (
    data: WithTypename<CreateProfilePicturePayload>,
  ) => null | string
  CreateUploadPayload?: (
    data: WithTypename<CreateUploadPayload>,
  ) => null | string
  DeleteAccountPayload?: (
    data: WithTypename<DeleteAccountPayload>,
  ) => null | string
  DeleteAchievementPayload?: (
    data: WithTypename<DeleteAchievementPayload>,
  ) => null | string
  DeleteContactPayload?: (
    data: WithTypename<DeleteContactPayload>,
  ) => null | string
  DeleteEventGroupPayload?: (
    data: WithTypename<DeleteEventGroupPayload>,
  ) => null | string
  DeleteEventGroupingPayload?: (
    data: WithTypename<DeleteEventGroupingPayload>,
  ) => null | string
  DeleteEventPayload?: (data: WithTypename<DeleteEventPayload>) => null | string
  DeleteInvitationPayload?: (
    data: WithTypename<DeleteInvitationPayload>,
  ) => null | string
  DeleteProfilePicturePayload?: (
    data: WithTypename<DeleteProfilePicturePayload>,
  ) => null | string
  DeleteUploadPayload?: (
    data: WithTypename<DeleteUploadPayload>,
  ) => null | string
  Event?: (data: WithTypename<Event>) => null | string
  EventDeletePayload?: (data: WithTypename<EventDeletePayload>) => null | string
  EventGroup?: (data: WithTypename<EventGroup>) => null | string
  EventGrouping?: (data: WithTypename<EventGrouping>) => null | string
  EventGroupingsConnection?: (
    data: WithTypename<EventGroupingsConnection>,
  ) => null | string
  EventGroupingsEdge?: (data: WithTypename<EventGroupingsEdge>) => null | string
  EventGroupsConnection?: (
    data: WithTypename<EventGroupsConnection>,
  ) => null | string
  EventGroupsEdge?: (data: WithTypename<EventGroupsEdge>) => null | string
  EventUnlockPayload?: (data: WithTypename<EventUnlockPayload>) => null | string
  EventUnlockResponse?: (
    data: WithTypename<EventUnlockResponse>,
  ) => null | string
  EventsConnection?: (data: WithTypename<EventsConnection>) => null | string
  EventsEdge?: (data: WithTypename<EventsEdge>) => null | string
  EventsOrganizedConnection?: (
    data: WithTypename<EventsOrganizedConnection>,
  ) => null | string
  EventsOrganizedEdge?: (
    data: WithTypename<EventsOrganizedEdge>,
  ) => null | string
  Invitation?: (data: WithTypename<Invitation>) => null | string
  InvitationContactIdEdge?: (
    data: WithTypename<InvitationContactIdEdge>,
  ) => null | string
  InvitationContactIdsConnection?: (
    data: WithTypename<InvitationContactIdsConnection>,
  ) => null | string
  InvitationsConnection?: (
    data: WithTypename<InvitationsConnection>,
  ) => null | string
  InvitationsEdge?: (data: WithTypename<InvitationsEdge>) => null | string
  InvitePayload?: (data: WithTypename<InvitePayload>) => null | string
  JwtRefreshPayload?: (data: WithTypename<JwtRefreshPayload>) => null | string
  NotificationAcknowledgePayload?: (
    data: WithTypename<NotificationAcknowledgePayload>,
  ) => null | string
  PageInfo?: (data: WithTypename<PageInfo>) => null | string
  ProfilePicture?: (data: WithTypename<ProfilePicture>) => null | string
  ProfilePictureSetPayload?: (
    data: WithTypename<ProfilePictureSetPayload>,
  ) => null | string
  ProfilePicturesConnection?: (
    data: WithTypename<ProfilePicturesConnection>,
  ) => null | string
  ProfilePicturesEdge?: (
    data: WithTypename<ProfilePicturesEdge>,
  ) => null | string
  UpdateAccountPayload?: (
    data: WithTypename<UpdateAccountPayload>,
  ) => null | string
  UpdateAchievementPayload?: (
    data: WithTypename<UpdateAchievementPayload>,
  ) => null | string
  UpdateContactPayload?: (
    data: WithTypename<UpdateContactPayload>,
  ) => null | string
  UpdateEventGroupPayload?: (
    data: WithTypename<UpdateEventGroupPayload>,
  ) => null | string
  UpdateEventGroupingPayload?: (
    data: WithTypename<UpdateEventGroupingPayload>,
  ) => null | string
  UpdateEventPayload?: (data: WithTypename<UpdateEventPayload>) => null | string
  UpdateInvitationPayload?: (
    data: WithTypename<UpdateInvitationPayload>,
  ) => null | string
  UpdateProfilePicturePayload?: (
    data: WithTypename<UpdateProfilePicturePayload>,
  ) => null | string
  UpdateUploadPayload?: (
    data: WithTypename<UpdateUploadPayload>,
  ) => null | string
  Upload?: (data: WithTypename<Upload>) => null | string
  UploadCreatePayload?: (
    data: WithTypename<UploadCreatePayload>,
  ) => null | string
  UploadsConnection?: (data: WithTypename<UploadsConnection>) => null | string
  UploadsEdge?: (data: WithTypename<UploadsEdge>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    account?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAccountArgs,
      WithTypename<Account> | string
    >
    accountById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAccountByIdArgs,
      WithTypename<Account> | string
    >
    accountByUsername?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAccountByUsernameArgs,
      WithTypename<Account> | string
    >
    accountUploadQuotaBytes?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      Scalars['BigInt'] | string
    >
    achievement?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAchievementArgs,
      WithTypename<Achievement> | string
    >
    achievementByAccountIdAndAchievement?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAchievementByAccountIdAndAchievementArgs,
      WithTypename<Achievement> | string
    >
    achievementById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAchievementByIdArgs,
      WithTypename<Achievement> | string
    >
    allAccounts?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllAccountsArgs,
      WithTypename<AccountsConnection> | string
    >
    allAchievements?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllAchievementsArgs,
      WithTypename<AchievementsConnection> | string
    >
    allContacts?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllContactsArgs,
      WithTypename<ContactsConnection> | string
    >
    allEventGroupings?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllEventGroupingsArgs,
      WithTypename<EventGroupingsConnection> | string
    >
    allEventGroups?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllEventGroupsArgs,
      WithTypename<EventGroupsConnection> | string
    >
    allEvents?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllEventsArgs,
      WithTypename<EventsConnection> | string
    >
    allInvitations?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllInvitationsArgs,
      WithTypename<InvitationsConnection> | string
    >
    allProfilePictures?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllProfilePicturesArgs,
      WithTypename<ProfilePicturesConnection> | string
    >
    allUploads?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllUploadsArgs,
      WithTypename<UploadsConnection> | string
    >
    contact?: GraphCacheResolver<
      WithTypename<Query>,
      QueryContactArgs,
      WithTypename<Contact> | string
    >
    contactByAuthorAccountIdAndAccountId?: GraphCacheResolver<
      WithTypename<Query>,
      QueryContactByAuthorAccountIdAndAccountIdArgs,
      WithTypename<Contact> | string
    >
    contactById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryContactByIdArgs,
      WithTypename<Contact> | string
    >
    event?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventArgs,
      WithTypename<Event> | string
    >
    eventByAuthorAccountIdAndSlug?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventByAuthorAccountIdAndSlugArgs,
      WithTypename<Event> | string
    >
    eventById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventByIdArgs,
      WithTypename<Event> | string
    >
    eventGroup?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventGroupArgs,
      WithTypename<EventGroup> | string
    >
    eventGroupByAuthorAccountIdAndSlug?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventGroupByAuthorAccountIdAndSlugArgs,
      WithTypename<EventGroup> | string
    >
    eventGroupById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventGroupByIdArgs,
      WithTypename<EventGroup> | string
    >
    eventGrouping?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventGroupingArgs,
      WithTypename<EventGrouping> | string
    >
    eventGroupingByEventIdAndEventGroupId?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventGroupingByEventIdAndEventGroupIdArgs,
      WithTypename<EventGrouping> | string
    >
    eventGroupingById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventGroupingByIdArgs,
      WithTypename<EventGrouping> | string
    >
    eventInviteeCountMaximum?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventInviteeCountMaximumArgs,
      Scalars['Int'] | string
    >
    eventIsExisting?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventIsExistingArgs,
      Scalars['Boolean'] | string
    >
    eventsOrganized?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventsOrganizedArgs,
      WithTypename<EventsOrganizedConnection> | string
    >
    invitation?: GraphCacheResolver<
      WithTypename<Query>,
      QueryInvitationArgs,
      WithTypename<Invitation> | string
    >
    invitationByEventIdAndContactId?: GraphCacheResolver<
      WithTypename<Query>,
      QueryInvitationByEventIdAndContactIdArgs,
      WithTypename<Invitation> | string
    >
    invitationById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryInvitationByIdArgs,
      WithTypename<Invitation> | string
    >
    invitationClaimArray?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      Array<Scalars['UUID'] | string>
    >
    invitationContactIds?: GraphCacheResolver<
      WithTypename<Query>,
      QueryInvitationContactIdsArgs,
      WithTypename<InvitationContactIdsConnection> | string
    >
    inviteeCount?: GraphCacheResolver<
      WithTypename<Query>,
      QueryInviteeCountArgs,
      Scalars['Int'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<Query>,
      QueryNodeArgs,
      | WithTypename<Account>
      | WithTypename<Achievement>
      | WithTypename<Contact>
      | WithTypename<Event>
      | WithTypename<EventGroup>
      | WithTypename<EventGrouping>
      | WithTypename<Invitation>
      | WithTypename<ProfilePicture>
      | WithTypename<Query>
      | WithTypename<Upload>
      | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    profilePicture?: GraphCacheResolver<
      WithTypename<Query>,
      QueryProfilePictureArgs,
      WithTypename<ProfilePicture> | string
    >
    profilePictureByAccountId?: GraphCacheResolver<
      WithTypename<Query>,
      QueryProfilePictureByAccountIdArgs,
      WithTypename<ProfilePicture> | string
    >
    profilePictureById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryProfilePictureByIdArgs,
      WithTypename<ProfilePicture> | string
    >
    query?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      WithTypename<Query> | string
    >
    upload?: GraphCacheResolver<
      WithTypename<Query>,
      QueryUploadArgs,
      WithTypename<Upload> | string
    >
    uploadById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryUploadByIdArgs,
      WithTypename<Upload> | string
    >
    uploadByStorageKey?: GraphCacheResolver<
      WithTypename<Query>,
      QueryUploadByStorageKeyArgs,
      WithTypename<Upload> | string
    >
  }
  Account?: {
    achievementsByAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountAchievementsByAccountIdArgs,
      WithTypename<AchievementsConnection> | string
    >
    contactsByAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountContactsByAccountIdArgs,
      WithTypename<ContactsConnection> | string
    >
    contactsByAuthorAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountContactsByAuthorAccountIdArgs,
      WithTypename<ContactsConnection> | string
    >
    eventGroupsByAuthorAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountEventGroupsByAuthorAccountIdArgs,
      WithTypename<EventGroupsConnection> | string
    >
    eventsByAuthorAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountEventsByAuthorAccountIdArgs,
      WithTypename<EventsConnection> | string
    >
    id?: GraphCacheResolver<
      WithTypename<Account>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<Account>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    profilePictureByAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      Record<string, never>,
      WithTypename<ProfilePicture> | string
    >
    profilePicturesByAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountProfilePicturesByAccountIdArgs,
      WithTypename<ProfilePicturesConnection> | string
    >
    uploadsByAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountUploadsByAccountIdArgs,
      WithTypename<UploadsConnection> | string
    >
    username?: GraphCacheResolver<
      WithTypename<Account>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
  AccountDeletePayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<AccountDeletePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<AccountDeletePayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  AccountEmailAddressVerificationPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<AccountEmailAddressVerificationPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<AccountEmailAddressVerificationPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  AccountPasswordChangePayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<AccountPasswordChangePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<AccountPasswordChangePayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  AccountPasswordResetPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<AccountPasswordResetPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<AccountPasswordResetPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  AccountPasswordResetRequestPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<AccountPasswordResetRequestPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<AccountPasswordResetRequestPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  AccountRegistrationPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<AccountRegistrationPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<AccountRegistrationPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
    uuid?: GraphCacheResolver<
      WithTypename<AccountRegistrationPayload>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
  }
  AccountRegistrationRefreshPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<AccountRegistrationRefreshPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<AccountRegistrationRefreshPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  AccountsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<AccountsConnection>,
      Record<string, never>,
      Array<WithTypename<AccountsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<AccountsConnection>,
      Record<string, never>,
      Array<WithTypename<Account> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<AccountsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<AccountsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  AccountsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<AccountsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<AccountsEdge>,
      Record<string, never>,
      WithTypename<Account> | string
    >
  }
  Achievement?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<Achievement>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountId?: GraphCacheResolver<
      WithTypename<Achievement>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    achievement?: GraphCacheResolver<
      WithTypename<Achievement>,
      Record<string, never>,
      AchievementType | string
    >
    id?: GraphCacheResolver<
      WithTypename<Achievement>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    level?: GraphCacheResolver<
      WithTypename<Achievement>,
      Record<string, never>,
      Scalars['Int'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<Achievement>,
      Record<string, never>,
      Scalars['ID'] | string
    >
  }
  AchievementUnlockPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<AchievementUnlockPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<AchievementUnlockPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
    uuid?: GraphCacheResolver<
      WithTypename<AchievementUnlockPayload>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
  }
  AchievementsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<AchievementsConnection>,
      Record<string, never>,
      Array<WithTypename<AchievementsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<AchievementsConnection>,
      Record<string, never>,
      Array<WithTypename<Achievement> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<AchievementsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<AchievementsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  AchievementsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<AchievementsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<AchievementsEdge>,
      Record<string, never>,
      WithTypename<Achievement> | string
    >
  }
  AuthenticatePayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<AuthenticatePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    jwt?: GraphCacheResolver<
      WithTypename<AuthenticatePayload>,
      Record<string, never>,
      Scalars['Jwt'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<AuthenticatePayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  Contact?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountId?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    address?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['String'] | string
    >
    authorAccountId?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    emailAddress?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['String'] | string
    >
    emailAddressHash?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['String'] | string
    >
    firstName?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['String'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    invitationsByContactId?: GraphCacheResolver<
      WithTypename<Contact>,
      ContactInvitationsByContactIdArgs,
      WithTypename<InvitationsConnection> | string
    >
    lastName?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['String'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    phoneNumber?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['String'] | string
    >
    url?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
  ContactsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<ContactsConnection>,
      Record<string, never>,
      Array<WithTypename<ContactsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<ContactsConnection>,
      Record<string, never>,
      Array<WithTypename<Contact> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<ContactsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<ContactsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  ContactsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<ContactsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<ContactsEdge>,
      Record<string, never>,
      WithTypename<Contact> | string
    >
  }
  CreateAccountPayload?: {
    account?: GraphCacheResolver<
      WithTypename<CreateAccountPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountEdge?: GraphCacheResolver<
      WithTypename<CreateAccountPayload>,
      CreateAccountPayloadAccountEdgeArgs,
      WithTypename<AccountsEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateAccountPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateAccountPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  CreateAchievementPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<CreateAchievementPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    achievement?: GraphCacheResolver<
      WithTypename<CreateAchievementPayload>,
      Record<string, never>,
      WithTypename<Achievement> | string
    >
    achievementEdge?: GraphCacheResolver<
      WithTypename<CreateAchievementPayload>,
      CreateAchievementPayloadAchievementEdgeArgs,
      WithTypename<AchievementsEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateAchievementPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateAchievementPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  CreateContactPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<CreateContactPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<CreateContactPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateContactPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    contact?: GraphCacheResolver<
      WithTypename<CreateContactPayload>,
      Record<string, never>,
      WithTypename<Contact> | string
    >
    contactEdge?: GraphCacheResolver<
      WithTypename<CreateContactPayload>,
      CreateContactPayloadContactEdgeArgs,
      WithTypename<ContactsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateContactPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  CreateEventGroupPayload?: {
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<CreateEventGroupPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateEventGroupPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventGroup?: GraphCacheResolver<
      WithTypename<CreateEventGroupPayload>,
      Record<string, never>,
      WithTypename<EventGroup> | string
    >
    eventGroupEdge?: GraphCacheResolver<
      WithTypename<CreateEventGroupPayload>,
      CreateEventGroupPayloadEventGroupEdgeArgs,
      WithTypename<EventGroupsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateEventGroupPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  CreateEventGroupingPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateEventGroupingPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<CreateEventGroupingPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventGroupByEventGroupId?: GraphCacheResolver<
      WithTypename<CreateEventGroupingPayload>,
      Record<string, never>,
      WithTypename<EventGroup> | string
    >
    eventGrouping?: GraphCacheResolver<
      WithTypename<CreateEventGroupingPayload>,
      Record<string, never>,
      WithTypename<EventGrouping> | string
    >
    eventGroupingEdge?: GraphCacheResolver<
      WithTypename<CreateEventGroupingPayload>,
      CreateEventGroupingPayloadEventGroupingEdgeArgs,
      WithTypename<EventGroupingsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateEventGroupingPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  CreateEventPayload?: {
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<CreateEventPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateEventPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    event?: GraphCacheResolver<
      WithTypename<CreateEventPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventEdge?: GraphCacheResolver<
      WithTypename<CreateEventPayload>,
      CreateEventPayloadEventEdgeArgs,
      WithTypename<EventsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateEventPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  CreateInvitationPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateInvitationPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    contactByContactId?: GraphCacheResolver<
      WithTypename<CreateInvitationPayload>,
      Record<string, never>,
      WithTypename<Contact> | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<CreateInvitationPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    invitation?: GraphCacheResolver<
      WithTypename<CreateInvitationPayload>,
      Record<string, never>,
      WithTypename<Invitation> | string
    >
    invitationEdge?: GraphCacheResolver<
      WithTypename<CreateInvitationPayload>,
      CreateInvitationPayloadInvitationEdgeArgs,
      WithTypename<InvitationsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateInvitationPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  CreateProfilePicturePayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<CreateProfilePicturePayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateProfilePicturePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    profilePicture?: GraphCacheResolver<
      WithTypename<CreateProfilePicturePayload>,
      Record<string, never>,
      WithTypename<ProfilePicture> | string
    >
    profilePictureEdge?: GraphCacheResolver<
      WithTypename<CreateProfilePicturePayload>,
      CreateProfilePicturePayloadProfilePictureEdgeArgs,
      WithTypename<ProfilePicturesEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateProfilePicturePayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
    uploadByUploadId?: GraphCacheResolver<
      WithTypename<CreateProfilePicturePayload>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
  }
  CreateUploadPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<CreateUploadPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateUploadPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateUploadPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
    upload?: GraphCacheResolver<
      WithTypename<CreateUploadPayload>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
    uploadEdge?: GraphCacheResolver<
      WithTypename<CreateUploadPayload>,
      CreateUploadPayloadUploadEdgeArgs,
      WithTypename<UploadsEdge> | string
    >
  }
  DeleteAccountPayload?: {
    account?: GraphCacheResolver<
      WithTypename<DeleteAccountPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountEdge?: GraphCacheResolver<
      WithTypename<DeleteAccountPayload>,
      DeleteAccountPayloadAccountEdgeArgs,
      WithTypename<AccountsEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteAccountPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedAccountId?: GraphCacheResolver<
      WithTypename<DeleteAccountPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteAccountPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  DeleteAchievementPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<DeleteAchievementPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    achievement?: GraphCacheResolver<
      WithTypename<DeleteAchievementPayload>,
      Record<string, never>,
      WithTypename<Achievement> | string
    >
    achievementEdge?: GraphCacheResolver<
      WithTypename<DeleteAchievementPayload>,
      DeleteAchievementPayloadAchievementEdgeArgs,
      WithTypename<AchievementsEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteAchievementPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedAchievementId?: GraphCacheResolver<
      WithTypename<DeleteAchievementPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteAchievementPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  DeleteContactPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<DeleteContactPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<DeleteContactPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteContactPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    contact?: GraphCacheResolver<
      WithTypename<DeleteContactPayload>,
      Record<string, never>,
      WithTypename<Contact> | string
    >
    contactEdge?: GraphCacheResolver<
      WithTypename<DeleteContactPayload>,
      DeleteContactPayloadContactEdgeArgs,
      WithTypename<ContactsEdge> | string
    >
    deletedContactId?: GraphCacheResolver<
      WithTypename<DeleteContactPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteContactPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  DeleteEventGroupPayload?: {
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<DeleteEventGroupPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteEventGroupPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedEventGroupId?: GraphCacheResolver<
      WithTypename<DeleteEventGroupPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    eventGroup?: GraphCacheResolver<
      WithTypename<DeleteEventGroupPayload>,
      Record<string, never>,
      WithTypename<EventGroup> | string
    >
    eventGroupEdge?: GraphCacheResolver<
      WithTypename<DeleteEventGroupPayload>,
      DeleteEventGroupPayloadEventGroupEdgeArgs,
      WithTypename<EventGroupsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteEventGroupPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  DeleteEventGroupingPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteEventGroupingPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedEventGroupingId?: GraphCacheResolver<
      WithTypename<DeleteEventGroupingPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<DeleteEventGroupingPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventGroupByEventGroupId?: GraphCacheResolver<
      WithTypename<DeleteEventGroupingPayload>,
      Record<string, never>,
      WithTypename<EventGroup> | string
    >
    eventGrouping?: GraphCacheResolver<
      WithTypename<DeleteEventGroupingPayload>,
      Record<string, never>,
      WithTypename<EventGrouping> | string
    >
    eventGroupingEdge?: GraphCacheResolver<
      WithTypename<DeleteEventGroupingPayload>,
      DeleteEventGroupingPayloadEventGroupingEdgeArgs,
      WithTypename<EventGroupingsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteEventGroupingPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  DeleteEventPayload?: {
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<DeleteEventPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteEventPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedEventId?: GraphCacheResolver<
      WithTypename<DeleteEventPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    event?: GraphCacheResolver<
      WithTypename<DeleteEventPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventEdge?: GraphCacheResolver<
      WithTypename<DeleteEventPayload>,
      DeleteEventPayloadEventEdgeArgs,
      WithTypename<EventsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteEventPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  DeleteInvitationPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteInvitationPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    contactByContactId?: GraphCacheResolver<
      WithTypename<DeleteInvitationPayload>,
      Record<string, never>,
      WithTypename<Contact> | string
    >
    deletedInvitationId?: GraphCacheResolver<
      WithTypename<DeleteInvitationPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<DeleteInvitationPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    invitation?: GraphCacheResolver<
      WithTypename<DeleteInvitationPayload>,
      Record<string, never>,
      WithTypename<Invitation> | string
    >
    invitationEdge?: GraphCacheResolver<
      WithTypename<DeleteInvitationPayload>,
      DeleteInvitationPayloadInvitationEdgeArgs,
      WithTypename<InvitationsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteInvitationPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  DeleteProfilePicturePayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<DeleteProfilePicturePayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteProfilePicturePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedProfilePictureId?: GraphCacheResolver<
      WithTypename<DeleteProfilePicturePayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    profilePicture?: GraphCacheResolver<
      WithTypename<DeleteProfilePicturePayload>,
      Record<string, never>,
      WithTypename<ProfilePicture> | string
    >
    profilePictureEdge?: GraphCacheResolver<
      WithTypename<DeleteProfilePicturePayload>,
      DeleteProfilePicturePayloadProfilePictureEdgeArgs,
      WithTypename<ProfilePicturesEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteProfilePicturePayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
    uploadByUploadId?: GraphCacheResolver<
      WithTypename<DeleteProfilePicturePayload>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
  }
  DeleteUploadPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<DeleteUploadPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteUploadPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedUploadId?: GraphCacheResolver<
      WithTypename<DeleteUploadPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteUploadPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
    upload?: GraphCacheResolver<
      WithTypename<DeleteUploadPayload>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
    uploadEdge?: GraphCacheResolver<
      WithTypename<DeleteUploadPayload>,
      DeleteUploadPayloadUploadEdgeArgs,
      WithTypename<UploadsEdge> | string
    >
  }
  Event?: {
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    authorAccountId?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    description?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['String'] | string
    >
    end?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['Datetime'] | string
    >
    eventGroupingsByEventId?: GraphCacheResolver<
      WithTypename<Event>,
      EventEventGroupingsByEventIdArgs,
      WithTypename<EventGroupingsConnection> | string
    >
    id?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    invitationsByEventId?: GraphCacheResolver<
      WithTypename<Event>,
      EventInvitationsByEventIdArgs,
      WithTypename<InvitationsConnection> | string
    >
    inviteeCountMaximum?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['Int'] | string
    >
    isArchived?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['Boolean'] | string
    >
    isInPerson?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['Boolean'] | string
    >
    isRemote?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['Boolean'] | string
    >
    location?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['String'] | string
    >
    name?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['String'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    slug?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['String'] | string
    >
    start?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['Datetime'] | string
    >
    url?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['String'] | string
    >
    visibility?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      EventVisibility | string
    >
  }
  EventDeletePayload?: {
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<EventDeletePayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<EventDeletePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    event?: GraphCacheResolver<
      WithTypename<EventDeletePayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventEdge?: GraphCacheResolver<
      WithTypename<EventDeletePayload>,
      EventDeletePayloadEventEdgeArgs,
      WithTypename<EventsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<EventDeletePayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  EventGroup?: {
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<EventGroup>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    authorAccountId?: GraphCacheResolver<
      WithTypename<EventGroup>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    description?: GraphCacheResolver<
      WithTypename<EventGroup>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventGroupingsByEventGroupId?: GraphCacheResolver<
      WithTypename<EventGroup>,
      EventGroupEventGroupingsByEventGroupIdArgs,
      WithTypename<EventGroupingsConnection> | string
    >
    id?: GraphCacheResolver<
      WithTypename<EventGroup>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    isArchived?: GraphCacheResolver<
      WithTypename<EventGroup>,
      Record<string, never>,
      Scalars['Boolean'] | string
    >
    name?: GraphCacheResolver<
      WithTypename<EventGroup>,
      Record<string, never>,
      Scalars['String'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<EventGroup>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    slug?: GraphCacheResolver<
      WithTypename<EventGroup>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
  EventGrouping?: {
    eventByEventId?: GraphCacheResolver<
      WithTypename<EventGrouping>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventGroupByEventGroupId?: GraphCacheResolver<
      WithTypename<EventGrouping>,
      Record<string, never>,
      WithTypename<EventGroup> | string
    >
    eventGroupId?: GraphCacheResolver<
      WithTypename<EventGrouping>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    eventId?: GraphCacheResolver<
      WithTypename<EventGrouping>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<EventGrouping>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<EventGrouping>,
      Record<string, never>,
      Scalars['ID'] | string
    >
  }
  EventGroupingsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<EventGroupingsConnection>,
      Record<string, never>,
      Array<WithTypename<EventGroupingsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<EventGroupingsConnection>,
      Record<string, never>,
      Array<WithTypename<EventGrouping> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<EventGroupingsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<EventGroupingsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  EventGroupingsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<EventGroupingsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<EventGroupingsEdge>,
      Record<string, never>,
      WithTypename<EventGrouping> | string
    >
  }
  EventGroupsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<EventGroupsConnection>,
      Record<string, never>,
      Array<WithTypename<EventGroupsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<EventGroupsConnection>,
      Record<string, never>,
      Array<WithTypename<EventGroup> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<EventGroupsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<EventGroupsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  EventGroupsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<EventGroupsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<EventGroupsEdge>,
      Record<string, never>,
      WithTypename<EventGroup> | string
    >
  }
  EventUnlockPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<EventUnlockPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventUnlockResponse?: GraphCacheResolver<
      WithTypename<EventUnlockPayload>,
      Record<string, never>,
      WithTypename<EventUnlockResponse> | string
    >
    query?: GraphCacheResolver<
      WithTypename<EventUnlockPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  EventUnlockResponse?: {
    authorAccountUsername?: GraphCacheResolver<
      WithTypename<EventUnlockResponse>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventSlug?: GraphCacheResolver<
      WithTypename<EventUnlockResponse>,
      Record<string, never>,
      Scalars['String'] | string
    >
    jwt?: GraphCacheResolver<
      WithTypename<EventUnlockResponse>,
      Record<string, never>,
      Scalars['Jwt'] | string
    >
  }
  EventsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<EventsConnection>,
      Record<string, never>,
      Array<WithTypename<EventsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<EventsConnection>,
      Record<string, never>,
      Array<WithTypename<Event> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<EventsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<EventsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  EventsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<EventsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<EventsEdge>,
      Record<string, never>,
      WithTypename<Event> | string
    >
  }
  EventsOrganizedConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<EventsOrganizedConnection>,
      Record<string, never>,
      Array<WithTypename<EventsOrganizedEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<EventsOrganizedConnection>,
      Record<string, never>,
      Array<Scalars['UUID'] | string>
    >
    totalCount?: GraphCacheResolver<
      WithTypename<EventsOrganizedConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  EventsOrganizedEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<EventsOrganizedEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<EventsOrganizedEdge>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
  }
  Invitation?: {
    contactByContactId?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      WithTypename<Contact> | string
    >
    contactId?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventId?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    feedback?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      InvitationFeedback | string
    >
    feedbackPaper?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      InvitationFeedbackPaper | string
    >
    id?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      Scalars['ID'] | string
    >
  }
  InvitationContactIdEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<InvitationContactIdEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<InvitationContactIdEdge>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
  }
  InvitationContactIdsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<InvitationContactIdsConnection>,
      Record<string, never>,
      Array<WithTypename<InvitationContactIdEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<InvitationContactIdsConnection>,
      Record<string, never>,
      Array<Scalars['UUID'] | string>
    >
    totalCount?: GraphCacheResolver<
      WithTypename<InvitationContactIdsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  InvitationsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<InvitationsConnection>,
      Record<string, never>,
      Array<WithTypename<InvitationsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<InvitationsConnection>,
      Record<string, never>,
      Array<WithTypename<Invitation> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<InvitationsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<InvitationsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  InvitationsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<InvitationsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<InvitationsEdge>,
      Record<string, never>,
      WithTypename<Invitation> | string
    >
  }
  InvitePayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<InvitePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<InvitePayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  JwtRefreshPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<JwtRefreshPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    jwt?: GraphCacheResolver<
      WithTypename<JwtRefreshPayload>,
      Record<string, never>,
      Scalars['Jwt'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<JwtRefreshPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  NotificationAcknowledgePayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<NotificationAcknowledgePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<NotificationAcknowledgePayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  PageInfo?: {
    endCursor?: GraphCacheResolver<
      WithTypename<PageInfo>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    hasNextPage?: GraphCacheResolver<
      WithTypename<PageInfo>,
      Record<string, never>,
      Scalars['Boolean'] | string
    >
    hasPreviousPage?: GraphCacheResolver<
      WithTypename<PageInfo>,
      Record<string, never>,
      Scalars['Boolean'] | string
    >
    startCursor?: GraphCacheResolver<
      WithTypename<PageInfo>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
  }
  ProfilePicture?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<ProfilePicture>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountId?: GraphCacheResolver<
      WithTypename<ProfilePicture>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<ProfilePicture>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<ProfilePicture>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    uploadByUploadId?: GraphCacheResolver<
      WithTypename<ProfilePicture>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
    uploadId?: GraphCacheResolver<
      WithTypename<ProfilePicture>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
  }
  ProfilePictureSetPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<ProfilePictureSetPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<ProfilePictureSetPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  ProfilePicturesConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<ProfilePicturesConnection>,
      Record<string, never>,
      Array<WithTypename<ProfilePicturesEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<ProfilePicturesConnection>,
      Record<string, never>,
      Array<WithTypename<ProfilePicture> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<ProfilePicturesConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<ProfilePicturesConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  ProfilePicturesEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<ProfilePicturesEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<ProfilePicturesEdge>,
      Record<string, never>,
      WithTypename<ProfilePicture> | string
    >
  }
  UpdateAccountPayload?: {
    account?: GraphCacheResolver<
      WithTypename<UpdateAccountPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountEdge?: GraphCacheResolver<
      WithTypename<UpdateAccountPayload>,
      UpdateAccountPayloadAccountEdgeArgs,
      WithTypename<AccountsEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateAccountPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateAccountPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  UpdateAchievementPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<UpdateAchievementPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    achievement?: GraphCacheResolver<
      WithTypename<UpdateAchievementPayload>,
      Record<string, never>,
      WithTypename<Achievement> | string
    >
    achievementEdge?: GraphCacheResolver<
      WithTypename<UpdateAchievementPayload>,
      UpdateAchievementPayloadAchievementEdgeArgs,
      WithTypename<AchievementsEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateAchievementPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateAchievementPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  UpdateContactPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<UpdateContactPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<UpdateContactPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateContactPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    contact?: GraphCacheResolver<
      WithTypename<UpdateContactPayload>,
      Record<string, never>,
      WithTypename<Contact> | string
    >
    contactEdge?: GraphCacheResolver<
      WithTypename<UpdateContactPayload>,
      UpdateContactPayloadContactEdgeArgs,
      WithTypename<ContactsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateContactPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  UpdateEventGroupPayload?: {
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<UpdateEventGroupPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateEventGroupPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventGroup?: GraphCacheResolver<
      WithTypename<UpdateEventGroupPayload>,
      Record<string, never>,
      WithTypename<EventGroup> | string
    >
    eventGroupEdge?: GraphCacheResolver<
      WithTypename<UpdateEventGroupPayload>,
      UpdateEventGroupPayloadEventGroupEdgeArgs,
      WithTypename<EventGroupsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateEventGroupPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  UpdateEventGroupingPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateEventGroupingPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<UpdateEventGroupingPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventGroupByEventGroupId?: GraphCacheResolver<
      WithTypename<UpdateEventGroupingPayload>,
      Record<string, never>,
      WithTypename<EventGroup> | string
    >
    eventGrouping?: GraphCacheResolver<
      WithTypename<UpdateEventGroupingPayload>,
      Record<string, never>,
      WithTypename<EventGrouping> | string
    >
    eventGroupingEdge?: GraphCacheResolver<
      WithTypename<UpdateEventGroupingPayload>,
      UpdateEventGroupingPayloadEventGroupingEdgeArgs,
      WithTypename<EventGroupingsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateEventGroupingPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  UpdateEventPayload?: {
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<UpdateEventPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateEventPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    event?: GraphCacheResolver<
      WithTypename<UpdateEventPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventEdge?: GraphCacheResolver<
      WithTypename<UpdateEventPayload>,
      UpdateEventPayloadEventEdgeArgs,
      WithTypename<EventsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateEventPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  UpdateInvitationPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateInvitationPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    contactByContactId?: GraphCacheResolver<
      WithTypename<UpdateInvitationPayload>,
      Record<string, never>,
      WithTypename<Contact> | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<UpdateInvitationPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    invitation?: GraphCacheResolver<
      WithTypename<UpdateInvitationPayload>,
      Record<string, never>,
      WithTypename<Invitation> | string
    >
    invitationEdge?: GraphCacheResolver<
      WithTypename<UpdateInvitationPayload>,
      UpdateInvitationPayloadInvitationEdgeArgs,
      WithTypename<InvitationsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateInvitationPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  UpdateProfilePicturePayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<UpdateProfilePicturePayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateProfilePicturePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    profilePicture?: GraphCacheResolver<
      WithTypename<UpdateProfilePicturePayload>,
      Record<string, never>,
      WithTypename<ProfilePicture> | string
    >
    profilePictureEdge?: GraphCacheResolver<
      WithTypename<UpdateProfilePicturePayload>,
      UpdateProfilePicturePayloadProfilePictureEdgeArgs,
      WithTypename<ProfilePicturesEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateProfilePicturePayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
    uploadByUploadId?: GraphCacheResolver<
      WithTypename<UpdateProfilePicturePayload>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
  }
  UpdateUploadPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<UpdateUploadPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateUploadPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateUploadPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
    upload?: GraphCacheResolver<
      WithTypename<UpdateUploadPayload>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
    uploadEdge?: GraphCacheResolver<
      WithTypename<UpdateUploadPayload>,
      UpdateUploadPayloadUploadEdgeArgs,
      WithTypename<UploadsEdge> | string
    >
  }
  Upload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<Upload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountId?: GraphCacheResolver<
      WithTypename<Upload>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<Upload>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<Upload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    profilePicturesByUploadId?: GraphCacheResolver<
      WithTypename<Upload>,
      UploadProfilePicturesByUploadIdArgs,
      WithTypename<ProfilePicturesConnection> | string
    >
    sizeByte?: GraphCacheResolver<
      WithTypename<Upload>,
      Record<string, never>,
      Scalars['BigInt'] | string
    >
    storageKey?: GraphCacheResolver<
      WithTypename<Upload>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
  UploadCreatePayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<UploadCreatePayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<UploadCreatePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<UploadCreatePayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
    upload?: GraphCacheResolver<
      WithTypename<UploadCreatePayload>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
    uploadEdge?: GraphCacheResolver<
      WithTypename<UploadCreatePayload>,
      UploadCreatePayloadUploadEdgeArgs,
      WithTypename<UploadsEdge> | string
    >
  }
  UploadsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<UploadsConnection>,
      Record<string, never>,
      Array<WithTypename<UploadsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<UploadsConnection>,
      Record<string, never>,
      Array<WithTypename<Upload> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<UploadsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<UploadsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  UploadsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<UploadsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<UploadsEdge>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
  }
}

export type GraphCacheOptimisticUpdaters = {
  accountDelete?: GraphCacheOptimisticMutationResolver<
    MutationAccountDeleteArgs,
    Maybe<WithTypename<AccountDeletePayload>>
  >
  accountEmailAddressVerification?: GraphCacheOptimisticMutationResolver<
    MutationAccountEmailAddressVerificationArgs,
    Maybe<WithTypename<AccountEmailAddressVerificationPayload>>
  >
  accountPasswordChange?: GraphCacheOptimisticMutationResolver<
    MutationAccountPasswordChangeArgs,
    Maybe<WithTypename<AccountPasswordChangePayload>>
  >
  accountPasswordReset?: GraphCacheOptimisticMutationResolver<
    MutationAccountPasswordResetArgs,
    Maybe<WithTypename<AccountPasswordResetPayload>>
  >
  accountPasswordResetRequest?: GraphCacheOptimisticMutationResolver<
    MutationAccountPasswordResetRequestArgs,
    Maybe<WithTypename<AccountPasswordResetRequestPayload>>
  >
  accountRegistration?: GraphCacheOptimisticMutationResolver<
    MutationAccountRegistrationArgs,
    Maybe<WithTypename<AccountRegistrationPayload>>
  >
  accountRegistrationRefresh?: GraphCacheOptimisticMutationResolver<
    MutationAccountRegistrationRefreshArgs,
    Maybe<WithTypename<AccountRegistrationRefreshPayload>>
  >
  achievementUnlock?: GraphCacheOptimisticMutationResolver<
    MutationAchievementUnlockArgs,
    Maybe<WithTypename<AchievementUnlockPayload>>
  >
  authenticate?: GraphCacheOptimisticMutationResolver<
    MutationAuthenticateArgs,
    Maybe<WithTypename<AuthenticatePayload>>
  >
  createAccount?: GraphCacheOptimisticMutationResolver<
    MutationCreateAccountArgs,
    Maybe<WithTypename<CreateAccountPayload>>
  >
  createAchievement?: GraphCacheOptimisticMutationResolver<
    MutationCreateAchievementArgs,
    Maybe<WithTypename<CreateAchievementPayload>>
  >
  createContact?: GraphCacheOptimisticMutationResolver<
    MutationCreateContactArgs,
    Maybe<WithTypename<CreateContactPayload>>
  >
  createEvent?: GraphCacheOptimisticMutationResolver<
    MutationCreateEventArgs,
    Maybe<WithTypename<CreateEventPayload>>
  >
  createEventGroup?: GraphCacheOptimisticMutationResolver<
    MutationCreateEventGroupArgs,
    Maybe<WithTypename<CreateEventGroupPayload>>
  >
  createEventGrouping?: GraphCacheOptimisticMutationResolver<
    MutationCreateEventGroupingArgs,
    Maybe<WithTypename<CreateEventGroupingPayload>>
  >
  createInvitation?: GraphCacheOptimisticMutationResolver<
    MutationCreateInvitationArgs,
    Maybe<WithTypename<CreateInvitationPayload>>
  >
  createProfilePicture?: GraphCacheOptimisticMutationResolver<
    MutationCreateProfilePictureArgs,
    Maybe<WithTypename<CreateProfilePicturePayload>>
  >
  createUpload?: GraphCacheOptimisticMutationResolver<
    MutationCreateUploadArgs,
    Maybe<WithTypename<CreateUploadPayload>>
  >
  deleteAccount?: GraphCacheOptimisticMutationResolver<
    MutationDeleteAccountArgs,
    Maybe<WithTypename<DeleteAccountPayload>>
  >
  deleteAccountById?: GraphCacheOptimisticMutationResolver<
    MutationDeleteAccountByIdArgs,
    Maybe<WithTypename<DeleteAccountPayload>>
  >
  deleteAccountByUsername?: GraphCacheOptimisticMutationResolver<
    MutationDeleteAccountByUsernameArgs,
    Maybe<WithTypename<DeleteAccountPayload>>
  >
  deleteAchievement?: GraphCacheOptimisticMutationResolver<
    MutationDeleteAchievementArgs,
    Maybe<WithTypename<DeleteAchievementPayload>>
  >
  deleteAchievementByAccountIdAndAchievement?: GraphCacheOptimisticMutationResolver<
    MutationDeleteAchievementByAccountIdAndAchievementArgs,
    Maybe<WithTypename<DeleteAchievementPayload>>
  >
  deleteAchievementById?: GraphCacheOptimisticMutationResolver<
    MutationDeleteAchievementByIdArgs,
    Maybe<WithTypename<DeleteAchievementPayload>>
  >
  deleteContact?: GraphCacheOptimisticMutationResolver<
    MutationDeleteContactArgs,
    Maybe<WithTypename<DeleteContactPayload>>
  >
  deleteContactByAuthorAccountIdAndAccountId?: GraphCacheOptimisticMutationResolver<
    MutationDeleteContactByAuthorAccountIdAndAccountIdArgs,
    Maybe<WithTypename<DeleteContactPayload>>
  >
  deleteContactById?: GraphCacheOptimisticMutationResolver<
    MutationDeleteContactByIdArgs,
    Maybe<WithTypename<DeleteContactPayload>>
  >
  deleteEvent?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventArgs,
    Maybe<WithTypename<DeleteEventPayload>>
  >
  deleteEventByAuthorAccountIdAndSlug?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventByAuthorAccountIdAndSlugArgs,
    Maybe<WithTypename<DeleteEventPayload>>
  >
  deleteEventById?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventByIdArgs,
    Maybe<WithTypename<DeleteEventPayload>>
  >
  deleteEventGroup?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventGroupArgs,
    Maybe<WithTypename<DeleteEventGroupPayload>>
  >
  deleteEventGroupByAuthorAccountIdAndSlug?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventGroupByAuthorAccountIdAndSlugArgs,
    Maybe<WithTypename<DeleteEventGroupPayload>>
  >
  deleteEventGroupById?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventGroupByIdArgs,
    Maybe<WithTypename<DeleteEventGroupPayload>>
  >
  deleteEventGrouping?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventGroupingArgs,
    Maybe<WithTypename<DeleteEventGroupingPayload>>
  >
  deleteEventGroupingByEventIdAndEventGroupId?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventGroupingByEventIdAndEventGroupIdArgs,
    Maybe<WithTypename<DeleteEventGroupingPayload>>
  >
  deleteEventGroupingById?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventGroupingByIdArgs,
    Maybe<WithTypename<DeleteEventGroupingPayload>>
  >
  deleteInvitation?: GraphCacheOptimisticMutationResolver<
    MutationDeleteInvitationArgs,
    Maybe<WithTypename<DeleteInvitationPayload>>
  >
  deleteInvitationByEventIdAndContactId?: GraphCacheOptimisticMutationResolver<
    MutationDeleteInvitationByEventIdAndContactIdArgs,
    Maybe<WithTypename<DeleteInvitationPayload>>
  >
  deleteInvitationById?: GraphCacheOptimisticMutationResolver<
    MutationDeleteInvitationByIdArgs,
    Maybe<WithTypename<DeleteInvitationPayload>>
  >
  deleteProfilePicture?: GraphCacheOptimisticMutationResolver<
    MutationDeleteProfilePictureArgs,
    Maybe<WithTypename<DeleteProfilePicturePayload>>
  >
  deleteProfilePictureByAccountId?: GraphCacheOptimisticMutationResolver<
    MutationDeleteProfilePictureByAccountIdArgs,
    Maybe<WithTypename<DeleteProfilePicturePayload>>
  >
  deleteProfilePictureById?: GraphCacheOptimisticMutationResolver<
    MutationDeleteProfilePictureByIdArgs,
    Maybe<WithTypename<DeleteProfilePicturePayload>>
  >
  deleteUpload?: GraphCacheOptimisticMutationResolver<
    MutationDeleteUploadArgs,
    Maybe<WithTypename<DeleteUploadPayload>>
  >
  deleteUploadById?: GraphCacheOptimisticMutationResolver<
    MutationDeleteUploadByIdArgs,
    Maybe<WithTypename<DeleteUploadPayload>>
  >
  deleteUploadByStorageKey?: GraphCacheOptimisticMutationResolver<
    MutationDeleteUploadByStorageKeyArgs,
    Maybe<WithTypename<DeleteUploadPayload>>
  >
  eventDelete?: GraphCacheOptimisticMutationResolver<
    MutationEventDeleteArgs,
    Maybe<WithTypename<EventDeletePayload>>
  >
  eventUnlock?: GraphCacheOptimisticMutationResolver<
    MutationEventUnlockArgs,
    Maybe<WithTypename<EventUnlockPayload>>
  >
  invite?: GraphCacheOptimisticMutationResolver<
    MutationInviteArgs,
    Maybe<WithTypename<InvitePayload>>
  >
  jwtRefresh?: GraphCacheOptimisticMutationResolver<
    MutationJwtRefreshArgs,
    Maybe<WithTypename<JwtRefreshPayload>>
  >
  notificationAcknowledge?: GraphCacheOptimisticMutationResolver<
    MutationNotificationAcknowledgeArgs,
    Maybe<WithTypename<NotificationAcknowledgePayload>>
  >
  profilePictureSet?: GraphCacheOptimisticMutationResolver<
    MutationProfilePictureSetArgs,
    Maybe<WithTypename<ProfilePictureSetPayload>>
  >
  updateAccount?: GraphCacheOptimisticMutationResolver<
    MutationUpdateAccountArgs,
    Maybe<WithTypename<UpdateAccountPayload>>
  >
  updateAccountById?: GraphCacheOptimisticMutationResolver<
    MutationUpdateAccountByIdArgs,
    Maybe<WithTypename<UpdateAccountPayload>>
  >
  updateAccountByUsername?: GraphCacheOptimisticMutationResolver<
    MutationUpdateAccountByUsernameArgs,
    Maybe<WithTypename<UpdateAccountPayload>>
  >
  updateAchievement?: GraphCacheOptimisticMutationResolver<
    MutationUpdateAchievementArgs,
    Maybe<WithTypename<UpdateAchievementPayload>>
  >
  updateAchievementByAccountIdAndAchievement?: GraphCacheOptimisticMutationResolver<
    MutationUpdateAchievementByAccountIdAndAchievementArgs,
    Maybe<WithTypename<UpdateAchievementPayload>>
  >
  updateAchievementById?: GraphCacheOptimisticMutationResolver<
    MutationUpdateAchievementByIdArgs,
    Maybe<WithTypename<UpdateAchievementPayload>>
  >
  updateContact?: GraphCacheOptimisticMutationResolver<
    MutationUpdateContactArgs,
    Maybe<WithTypename<UpdateContactPayload>>
  >
  updateContactByAuthorAccountIdAndAccountId?: GraphCacheOptimisticMutationResolver<
    MutationUpdateContactByAuthorAccountIdAndAccountIdArgs,
    Maybe<WithTypename<UpdateContactPayload>>
  >
  updateContactById?: GraphCacheOptimisticMutationResolver<
    MutationUpdateContactByIdArgs,
    Maybe<WithTypename<UpdateContactPayload>>
  >
  updateEvent?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventArgs,
    Maybe<WithTypename<UpdateEventPayload>>
  >
  updateEventByAuthorAccountIdAndSlug?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventByAuthorAccountIdAndSlugArgs,
    Maybe<WithTypename<UpdateEventPayload>>
  >
  updateEventById?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventByIdArgs,
    Maybe<WithTypename<UpdateEventPayload>>
  >
  updateEventGroup?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventGroupArgs,
    Maybe<WithTypename<UpdateEventGroupPayload>>
  >
  updateEventGroupByAuthorAccountIdAndSlug?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventGroupByAuthorAccountIdAndSlugArgs,
    Maybe<WithTypename<UpdateEventGroupPayload>>
  >
  updateEventGroupById?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventGroupByIdArgs,
    Maybe<WithTypename<UpdateEventGroupPayload>>
  >
  updateEventGrouping?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventGroupingArgs,
    Maybe<WithTypename<UpdateEventGroupingPayload>>
  >
  updateEventGroupingByEventIdAndEventGroupId?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventGroupingByEventIdAndEventGroupIdArgs,
    Maybe<WithTypename<UpdateEventGroupingPayload>>
  >
  updateEventGroupingById?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventGroupingByIdArgs,
    Maybe<WithTypename<UpdateEventGroupingPayload>>
  >
  updateInvitation?: GraphCacheOptimisticMutationResolver<
    MutationUpdateInvitationArgs,
    Maybe<WithTypename<UpdateInvitationPayload>>
  >
  updateInvitationByEventIdAndContactId?: GraphCacheOptimisticMutationResolver<
    MutationUpdateInvitationByEventIdAndContactIdArgs,
    Maybe<WithTypename<UpdateInvitationPayload>>
  >
  updateInvitationById?: GraphCacheOptimisticMutationResolver<
    MutationUpdateInvitationByIdArgs,
    Maybe<WithTypename<UpdateInvitationPayload>>
  >
  updateProfilePicture?: GraphCacheOptimisticMutationResolver<
    MutationUpdateProfilePictureArgs,
    Maybe<WithTypename<UpdateProfilePicturePayload>>
  >
  updateProfilePictureByAccountId?: GraphCacheOptimisticMutationResolver<
    MutationUpdateProfilePictureByAccountIdArgs,
    Maybe<WithTypename<UpdateProfilePicturePayload>>
  >
  updateProfilePictureById?: GraphCacheOptimisticMutationResolver<
    MutationUpdateProfilePictureByIdArgs,
    Maybe<WithTypename<UpdateProfilePicturePayload>>
  >
  updateUpload?: GraphCacheOptimisticMutationResolver<
    MutationUpdateUploadArgs,
    Maybe<WithTypename<UpdateUploadPayload>>
  >
  updateUploadById?: GraphCacheOptimisticMutationResolver<
    MutationUpdateUploadByIdArgs,
    Maybe<WithTypename<UpdateUploadPayload>>
  >
  updateUploadByStorageKey?: GraphCacheOptimisticMutationResolver<
    MutationUpdateUploadByStorageKeyArgs,
    Maybe<WithTypename<UpdateUploadPayload>>
  >
  uploadCreate?: GraphCacheOptimisticMutationResolver<
    MutationUploadCreateArgs,
    Maybe<WithTypename<UploadCreatePayload>>
  >
}

export type GraphCacheUpdaters = {
  Query?: {
    account?: GraphCacheUpdateResolver<
      { account: Maybe<WithTypename<Account>> },
      QueryAccountArgs
    >
    accountById?: GraphCacheUpdateResolver<
      { accountById: Maybe<WithTypename<Account>> },
      QueryAccountByIdArgs
    >
    accountByUsername?: GraphCacheUpdateResolver<
      { accountByUsername: Maybe<WithTypename<Account>> },
      QueryAccountByUsernameArgs
    >
    accountUploadQuotaBytes?: GraphCacheUpdateResolver<
      { accountUploadQuotaBytes: Maybe<Scalars['BigInt']> },
      Record<string, never>
    >
    achievement?: GraphCacheUpdateResolver<
      { achievement: Maybe<WithTypename<Achievement>> },
      QueryAchievementArgs
    >
    achievementByAccountIdAndAchievement?: GraphCacheUpdateResolver<
      {
        achievementByAccountIdAndAchievement: Maybe<WithTypename<Achievement>>
      },
      QueryAchievementByAccountIdAndAchievementArgs
    >
    achievementById?: GraphCacheUpdateResolver<
      { achievementById: Maybe<WithTypename<Achievement>> },
      QueryAchievementByIdArgs
    >
    allAccounts?: GraphCacheUpdateResolver<
      { allAccounts: Maybe<WithTypename<AccountsConnection>> },
      QueryAllAccountsArgs
    >
    allAchievements?: GraphCacheUpdateResolver<
      { allAchievements: Maybe<WithTypename<AchievementsConnection>> },
      QueryAllAchievementsArgs
    >
    allContacts?: GraphCacheUpdateResolver<
      { allContacts: Maybe<WithTypename<ContactsConnection>> },
      QueryAllContactsArgs
    >
    allEventGroupings?: GraphCacheUpdateResolver<
      { allEventGroupings: Maybe<WithTypename<EventGroupingsConnection>> },
      QueryAllEventGroupingsArgs
    >
    allEventGroups?: GraphCacheUpdateResolver<
      { allEventGroups: Maybe<WithTypename<EventGroupsConnection>> },
      QueryAllEventGroupsArgs
    >
    allEvents?: GraphCacheUpdateResolver<
      { allEvents: Maybe<WithTypename<EventsConnection>> },
      QueryAllEventsArgs
    >
    allInvitations?: GraphCacheUpdateResolver<
      { allInvitations: Maybe<WithTypename<InvitationsConnection>> },
      QueryAllInvitationsArgs
    >
    allProfilePictures?: GraphCacheUpdateResolver<
      { allProfilePictures: Maybe<WithTypename<ProfilePicturesConnection>> },
      QueryAllProfilePicturesArgs
    >
    allUploads?: GraphCacheUpdateResolver<
      { allUploads: Maybe<WithTypename<UploadsConnection>> },
      QueryAllUploadsArgs
    >
    contact?: GraphCacheUpdateResolver<
      { contact: Maybe<WithTypename<Contact>> },
      QueryContactArgs
    >
    contactByAuthorAccountIdAndAccountId?: GraphCacheUpdateResolver<
      { contactByAuthorAccountIdAndAccountId: Maybe<WithTypename<Contact>> },
      QueryContactByAuthorAccountIdAndAccountIdArgs
    >
    contactById?: GraphCacheUpdateResolver<
      { contactById: Maybe<WithTypename<Contact>> },
      QueryContactByIdArgs
    >
    event?: GraphCacheUpdateResolver<
      { event: Maybe<WithTypename<Event>> },
      QueryEventArgs
    >
    eventByAuthorAccountIdAndSlug?: GraphCacheUpdateResolver<
      { eventByAuthorAccountIdAndSlug: Maybe<WithTypename<Event>> },
      QueryEventByAuthorAccountIdAndSlugArgs
    >
    eventById?: GraphCacheUpdateResolver<
      { eventById: Maybe<WithTypename<Event>> },
      QueryEventByIdArgs
    >
    eventGroup?: GraphCacheUpdateResolver<
      { eventGroup: Maybe<WithTypename<EventGroup>> },
      QueryEventGroupArgs
    >
    eventGroupByAuthorAccountIdAndSlug?: GraphCacheUpdateResolver<
      { eventGroupByAuthorAccountIdAndSlug: Maybe<WithTypename<EventGroup>> },
      QueryEventGroupByAuthorAccountIdAndSlugArgs
    >
    eventGroupById?: GraphCacheUpdateResolver<
      { eventGroupById: Maybe<WithTypename<EventGroup>> },
      QueryEventGroupByIdArgs
    >
    eventGrouping?: GraphCacheUpdateResolver<
      { eventGrouping: Maybe<WithTypename<EventGrouping>> },
      QueryEventGroupingArgs
    >
    eventGroupingByEventIdAndEventGroupId?: GraphCacheUpdateResolver<
      {
        eventGroupingByEventIdAndEventGroupId: Maybe<
          WithTypename<EventGrouping>
        >
      },
      QueryEventGroupingByEventIdAndEventGroupIdArgs
    >
    eventGroupingById?: GraphCacheUpdateResolver<
      { eventGroupingById: Maybe<WithTypename<EventGrouping>> },
      QueryEventGroupingByIdArgs
    >
    eventInviteeCountMaximum?: GraphCacheUpdateResolver<
      { eventInviteeCountMaximum: Maybe<Scalars['Int']> },
      QueryEventInviteeCountMaximumArgs
    >
    eventIsExisting?: GraphCacheUpdateResolver<
      { eventIsExisting: Maybe<Scalars['Boolean']> },
      QueryEventIsExistingArgs
    >
    eventsOrganized?: GraphCacheUpdateResolver<
      { eventsOrganized: Maybe<WithTypename<EventsOrganizedConnection>> },
      QueryEventsOrganizedArgs
    >
    invitation?: GraphCacheUpdateResolver<
      { invitation: Maybe<WithTypename<Invitation>> },
      QueryInvitationArgs
    >
    invitationByEventIdAndContactId?: GraphCacheUpdateResolver<
      { invitationByEventIdAndContactId: Maybe<WithTypename<Invitation>> },
      QueryInvitationByEventIdAndContactIdArgs
    >
    invitationById?: GraphCacheUpdateResolver<
      { invitationById: Maybe<WithTypename<Invitation>> },
      QueryInvitationByIdArgs
    >
    invitationClaimArray?: GraphCacheUpdateResolver<
      { invitationClaimArray: Maybe<Array<Scalars['UUID']>> },
      Record<string, never>
    >
    invitationContactIds?: GraphCacheUpdateResolver<
      {
        invitationContactIds: Maybe<
          WithTypename<InvitationContactIdsConnection>
        >
      },
      QueryInvitationContactIdsArgs
    >
    inviteeCount?: GraphCacheUpdateResolver<
      { inviteeCount: Maybe<Scalars['Int']> },
      QueryInviteeCountArgs
    >
    node?: GraphCacheUpdateResolver<
      {
        node: Maybe<
          | WithTypename<Account>
          | WithTypename<Achievement>
          | WithTypename<Contact>
          | WithTypename<Event>
          | WithTypename<EventGroup>
          | WithTypename<EventGrouping>
          | WithTypename<Invitation>
          | WithTypename<ProfilePicture>
          | WithTypename<Query>
          | WithTypename<Upload>
        >
      },
      QueryNodeArgs
    >
    nodeId?: GraphCacheUpdateResolver<
      { nodeId: Scalars['ID'] },
      Record<string, never>
    >
    profilePicture?: GraphCacheUpdateResolver<
      { profilePicture: Maybe<WithTypename<ProfilePicture>> },
      QueryProfilePictureArgs
    >
    profilePictureByAccountId?: GraphCacheUpdateResolver<
      { profilePictureByAccountId: Maybe<WithTypename<ProfilePicture>> },
      QueryProfilePictureByAccountIdArgs
    >
    profilePictureById?: GraphCacheUpdateResolver<
      { profilePictureById: Maybe<WithTypename<ProfilePicture>> },
      QueryProfilePictureByIdArgs
    >
    query?: GraphCacheUpdateResolver<
      { query: WithTypename<Query> },
      Record<string, never>
    >
    upload?: GraphCacheUpdateResolver<
      { upload: Maybe<WithTypename<Upload>> },
      QueryUploadArgs
    >
    uploadById?: GraphCacheUpdateResolver<
      { uploadById: Maybe<WithTypename<Upload>> },
      QueryUploadByIdArgs
    >
    uploadByStorageKey?: GraphCacheUpdateResolver<
      { uploadByStorageKey: Maybe<WithTypename<Upload>> },
      QueryUploadByStorageKeyArgs
    >
  }
  Mutation?: {
    accountDelete?: GraphCacheUpdateResolver<
      { accountDelete: Maybe<WithTypename<AccountDeletePayload>> },
      MutationAccountDeleteArgs
    >
    accountEmailAddressVerification?: GraphCacheUpdateResolver<
      {
        accountEmailAddressVerification: Maybe<
          WithTypename<AccountEmailAddressVerificationPayload>
        >
      },
      MutationAccountEmailAddressVerificationArgs
    >
    accountPasswordChange?: GraphCacheUpdateResolver<
      {
        accountPasswordChange: Maybe<WithTypename<AccountPasswordChangePayload>>
      },
      MutationAccountPasswordChangeArgs
    >
    accountPasswordReset?: GraphCacheUpdateResolver<
      {
        accountPasswordReset: Maybe<WithTypename<AccountPasswordResetPayload>>
      },
      MutationAccountPasswordResetArgs
    >
    accountPasswordResetRequest?: GraphCacheUpdateResolver<
      {
        accountPasswordResetRequest: Maybe<
          WithTypename<AccountPasswordResetRequestPayload>
        >
      },
      MutationAccountPasswordResetRequestArgs
    >
    accountRegistration?: GraphCacheUpdateResolver<
      { accountRegistration: Maybe<WithTypename<AccountRegistrationPayload>> },
      MutationAccountRegistrationArgs
    >
    accountRegistrationRefresh?: GraphCacheUpdateResolver<
      {
        accountRegistrationRefresh: Maybe<
          WithTypename<AccountRegistrationRefreshPayload>
        >
      },
      MutationAccountRegistrationRefreshArgs
    >
    achievementUnlock?: GraphCacheUpdateResolver<
      { achievementUnlock: Maybe<WithTypename<AchievementUnlockPayload>> },
      MutationAchievementUnlockArgs
    >
    authenticate?: GraphCacheUpdateResolver<
      { authenticate: Maybe<WithTypename<AuthenticatePayload>> },
      MutationAuthenticateArgs
    >
    createAccount?: GraphCacheUpdateResolver<
      { createAccount: Maybe<WithTypename<CreateAccountPayload>> },
      MutationCreateAccountArgs
    >
    createAchievement?: GraphCacheUpdateResolver<
      { createAchievement: Maybe<WithTypename<CreateAchievementPayload>> },
      MutationCreateAchievementArgs
    >
    createContact?: GraphCacheUpdateResolver<
      { createContact: Maybe<WithTypename<CreateContactPayload>> },
      MutationCreateContactArgs
    >
    createEvent?: GraphCacheUpdateResolver<
      { createEvent: Maybe<WithTypename<CreateEventPayload>> },
      MutationCreateEventArgs
    >
    createEventGroup?: GraphCacheUpdateResolver<
      { createEventGroup: Maybe<WithTypename<CreateEventGroupPayload>> },
      MutationCreateEventGroupArgs
    >
    createEventGrouping?: GraphCacheUpdateResolver<
      { createEventGrouping: Maybe<WithTypename<CreateEventGroupingPayload>> },
      MutationCreateEventGroupingArgs
    >
    createInvitation?: GraphCacheUpdateResolver<
      { createInvitation: Maybe<WithTypename<CreateInvitationPayload>> },
      MutationCreateInvitationArgs
    >
    createProfilePicture?: GraphCacheUpdateResolver<
      {
        createProfilePicture: Maybe<WithTypename<CreateProfilePicturePayload>>
      },
      MutationCreateProfilePictureArgs
    >
    createUpload?: GraphCacheUpdateResolver<
      { createUpload: Maybe<WithTypename<CreateUploadPayload>> },
      MutationCreateUploadArgs
    >
    deleteAccount?: GraphCacheUpdateResolver<
      { deleteAccount: Maybe<WithTypename<DeleteAccountPayload>> },
      MutationDeleteAccountArgs
    >
    deleteAccountById?: GraphCacheUpdateResolver<
      { deleteAccountById: Maybe<WithTypename<DeleteAccountPayload>> },
      MutationDeleteAccountByIdArgs
    >
    deleteAccountByUsername?: GraphCacheUpdateResolver<
      { deleteAccountByUsername: Maybe<WithTypename<DeleteAccountPayload>> },
      MutationDeleteAccountByUsernameArgs
    >
    deleteAchievement?: GraphCacheUpdateResolver<
      { deleteAchievement: Maybe<WithTypename<DeleteAchievementPayload>> },
      MutationDeleteAchievementArgs
    >
    deleteAchievementByAccountIdAndAchievement?: GraphCacheUpdateResolver<
      {
        deleteAchievementByAccountIdAndAchievement: Maybe<
          WithTypename<DeleteAchievementPayload>
        >
      },
      MutationDeleteAchievementByAccountIdAndAchievementArgs
    >
    deleteAchievementById?: GraphCacheUpdateResolver<
      { deleteAchievementById: Maybe<WithTypename<DeleteAchievementPayload>> },
      MutationDeleteAchievementByIdArgs
    >
    deleteContact?: GraphCacheUpdateResolver<
      { deleteContact: Maybe<WithTypename<DeleteContactPayload>> },
      MutationDeleteContactArgs
    >
    deleteContactByAuthorAccountIdAndAccountId?: GraphCacheUpdateResolver<
      {
        deleteContactByAuthorAccountIdAndAccountId: Maybe<
          WithTypename<DeleteContactPayload>
        >
      },
      MutationDeleteContactByAuthorAccountIdAndAccountIdArgs
    >
    deleteContactById?: GraphCacheUpdateResolver<
      { deleteContactById: Maybe<WithTypename<DeleteContactPayload>> },
      MutationDeleteContactByIdArgs
    >
    deleteEvent?: GraphCacheUpdateResolver<
      { deleteEvent: Maybe<WithTypename<DeleteEventPayload>> },
      MutationDeleteEventArgs
    >
    deleteEventByAuthorAccountIdAndSlug?: GraphCacheUpdateResolver<
      {
        deleteEventByAuthorAccountIdAndSlug: Maybe<
          WithTypename<DeleteEventPayload>
        >
      },
      MutationDeleteEventByAuthorAccountIdAndSlugArgs
    >
    deleteEventById?: GraphCacheUpdateResolver<
      { deleteEventById: Maybe<WithTypename<DeleteEventPayload>> },
      MutationDeleteEventByIdArgs
    >
    deleteEventGroup?: GraphCacheUpdateResolver<
      { deleteEventGroup: Maybe<WithTypename<DeleteEventGroupPayload>> },
      MutationDeleteEventGroupArgs
    >
    deleteEventGroupByAuthorAccountIdAndSlug?: GraphCacheUpdateResolver<
      {
        deleteEventGroupByAuthorAccountIdAndSlug: Maybe<
          WithTypename<DeleteEventGroupPayload>
        >
      },
      MutationDeleteEventGroupByAuthorAccountIdAndSlugArgs
    >
    deleteEventGroupById?: GraphCacheUpdateResolver<
      { deleteEventGroupById: Maybe<WithTypename<DeleteEventGroupPayload>> },
      MutationDeleteEventGroupByIdArgs
    >
    deleteEventGrouping?: GraphCacheUpdateResolver<
      { deleteEventGrouping: Maybe<WithTypename<DeleteEventGroupingPayload>> },
      MutationDeleteEventGroupingArgs
    >
    deleteEventGroupingByEventIdAndEventGroupId?: GraphCacheUpdateResolver<
      {
        deleteEventGroupingByEventIdAndEventGroupId: Maybe<
          WithTypename<DeleteEventGroupingPayload>
        >
      },
      MutationDeleteEventGroupingByEventIdAndEventGroupIdArgs
    >
    deleteEventGroupingById?: GraphCacheUpdateResolver<
      {
        deleteEventGroupingById: Maybe<WithTypename<DeleteEventGroupingPayload>>
      },
      MutationDeleteEventGroupingByIdArgs
    >
    deleteInvitation?: GraphCacheUpdateResolver<
      { deleteInvitation: Maybe<WithTypename<DeleteInvitationPayload>> },
      MutationDeleteInvitationArgs
    >
    deleteInvitationByEventIdAndContactId?: GraphCacheUpdateResolver<
      {
        deleteInvitationByEventIdAndContactId: Maybe<
          WithTypename<DeleteInvitationPayload>
        >
      },
      MutationDeleteInvitationByEventIdAndContactIdArgs
    >
    deleteInvitationById?: GraphCacheUpdateResolver<
      { deleteInvitationById: Maybe<WithTypename<DeleteInvitationPayload>> },
      MutationDeleteInvitationByIdArgs
    >
    deleteProfilePicture?: GraphCacheUpdateResolver<
      {
        deleteProfilePicture: Maybe<WithTypename<DeleteProfilePicturePayload>>
      },
      MutationDeleteProfilePictureArgs
    >
    deleteProfilePictureByAccountId?: GraphCacheUpdateResolver<
      {
        deleteProfilePictureByAccountId: Maybe<
          WithTypename<DeleteProfilePicturePayload>
        >
      },
      MutationDeleteProfilePictureByAccountIdArgs
    >
    deleteProfilePictureById?: GraphCacheUpdateResolver<
      {
        deleteProfilePictureById: Maybe<
          WithTypename<DeleteProfilePicturePayload>
        >
      },
      MutationDeleteProfilePictureByIdArgs
    >
    deleteUpload?: GraphCacheUpdateResolver<
      { deleteUpload: Maybe<WithTypename<DeleteUploadPayload>> },
      MutationDeleteUploadArgs
    >
    deleteUploadById?: GraphCacheUpdateResolver<
      { deleteUploadById: Maybe<WithTypename<DeleteUploadPayload>> },
      MutationDeleteUploadByIdArgs
    >
    deleteUploadByStorageKey?: GraphCacheUpdateResolver<
      { deleteUploadByStorageKey: Maybe<WithTypename<DeleteUploadPayload>> },
      MutationDeleteUploadByStorageKeyArgs
    >
    eventDelete?: GraphCacheUpdateResolver<
      { eventDelete: Maybe<WithTypename<EventDeletePayload>> },
      MutationEventDeleteArgs
    >
    eventUnlock?: GraphCacheUpdateResolver<
      { eventUnlock: Maybe<WithTypename<EventUnlockPayload>> },
      MutationEventUnlockArgs
    >
    invite?: GraphCacheUpdateResolver<
      { invite: Maybe<WithTypename<InvitePayload>> },
      MutationInviteArgs
    >
    jwtRefresh?: GraphCacheUpdateResolver<
      { jwtRefresh: Maybe<WithTypename<JwtRefreshPayload>> },
      MutationJwtRefreshArgs
    >
    notificationAcknowledge?: GraphCacheUpdateResolver<
      {
        notificationAcknowledge: Maybe<
          WithTypename<NotificationAcknowledgePayload>
        >
      },
      MutationNotificationAcknowledgeArgs
    >
    profilePictureSet?: GraphCacheUpdateResolver<
      { profilePictureSet: Maybe<WithTypename<ProfilePictureSetPayload>> },
      MutationProfilePictureSetArgs
    >
    updateAccount?: GraphCacheUpdateResolver<
      { updateAccount: Maybe<WithTypename<UpdateAccountPayload>> },
      MutationUpdateAccountArgs
    >
    updateAccountById?: GraphCacheUpdateResolver<
      { updateAccountById: Maybe<WithTypename<UpdateAccountPayload>> },
      MutationUpdateAccountByIdArgs
    >
    updateAccountByUsername?: GraphCacheUpdateResolver<
      { updateAccountByUsername: Maybe<WithTypename<UpdateAccountPayload>> },
      MutationUpdateAccountByUsernameArgs
    >
    updateAchievement?: GraphCacheUpdateResolver<
      { updateAchievement: Maybe<WithTypename<UpdateAchievementPayload>> },
      MutationUpdateAchievementArgs
    >
    updateAchievementByAccountIdAndAchievement?: GraphCacheUpdateResolver<
      {
        updateAchievementByAccountIdAndAchievement: Maybe<
          WithTypename<UpdateAchievementPayload>
        >
      },
      MutationUpdateAchievementByAccountIdAndAchievementArgs
    >
    updateAchievementById?: GraphCacheUpdateResolver<
      { updateAchievementById: Maybe<WithTypename<UpdateAchievementPayload>> },
      MutationUpdateAchievementByIdArgs
    >
    updateContact?: GraphCacheUpdateResolver<
      { updateContact: Maybe<WithTypename<UpdateContactPayload>> },
      MutationUpdateContactArgs
    >
    updateContactByAuthorAccountIdAndAccountId?: GraphCacheUpdateResolver<
      {
        updateContactByAuthorAccountIdAndAccountId: Maybe<
          WithTypename<UpdateContactPayload>
        >
      },
      MutationUpdateContactByAuthorAccountIdAndAccountIdArgs
    >
    updateContactById?: GraphCacheUpdateResolver<
      { updateContactById: Maybe<WithTypename<UpdateContactPayload>> },
      MutationUpdateContactByIdArgs
    >
    updateEvent?: GraphCacheUpdateResolver<
      { updateEvent: Maybe<WithTypename<UpdateEventPayload>> },
      MutationUpdateEventArgs
    >
    updateEventByAuthorAccountIdAndSlug?: GraphCacheUpdateResolver<
      {
        updateEventByAuthorAccountIdAndSlug: Maybe<
          WithTypename<UpdateEventPayload>
        >
      },
      MutationUpdateEventByAuthorAccountIdAndSlugArgs
    >
    updateEventById?: GraphCacheUpdateResolver<
      { updateEventById: Maybe<WithTypename<UpdateEventPayload>> },
      MutationUpdateEventByIdArgs
    >
    updateEventGroup?: GraphCacheUpdateResolver<
      { updateEventGroup: Maybe<WithTypename<UpdateEventGroupPayload>> },
      MutationUpdateEventGroupArgs
    >
    updateEventGroupByAuthorAccountIdAndSlug?: GraphCacheUpdateResolver<
      {
        updateEventGroupByAuthorAccountIdAndSlug: Maybe<
          WithTypename<UpdateEventGroupPayload>
        >
      },
      MutationUpdateEventGroupByAuthorAccountIdAndSlugArgs
    >
    updateEventGroupById?: GraphCacheUpdateResolver<
      { updateEventGroupById: Maybe<WithTypename<UpdateEventGroupPayload>> },
      MutationUpdateEventGroupByIdArgs
    >
    updateEventGrouping?: GraphCacheUpdateResolver<
      { updateEventGrouping: Maybe<WithTypename<UpdateEventGroupingPayload>> },
      MutationUpdateEventGroupingArgs
    >
    updateEventGroupingByEventIdAndEventGroupId?: GraphCacheUpdateResolver<
      {
        updateEventGroupingByEventIdAndEventGroupId: Maybe<
          WithTypename<UpdateEventGroupingPayload>
        >
      },
      MutationUpdateEventGroupingByEventIdAndEventGroupIdArgs
    >
    updateEventGroupingById?: GraphCacheUpdateResolver<
      {
        updateEventGroupingById: Maybe<WithTypename<UpdateEventGroupingPayload>>
      },
      MutationUpdateEventGroupingByIdArgs
    >
    updateInvitation?: GraphCacheUpdateResolver<
      { updateInvitation: Maybe<WithTypename<UpdateInvitationPayload>> },
      MutationUpdateInvitationArgs
    >
    updateInvitationByEventIdAndContactId?: GraphCacheUpdateResolver<
      {
        updateInvitationByEventIdAndContactId: Maybe<
          WithTypename<UpdateInvitationPayload>
        >
      },
      MutationUpdateInvitationByEventIdAndContactIdArgs
    >
    updateInvitationById?: GraphCacheUpdateResolver<
      { updateInvitationById: Maybe<WithTypename<UpdateInvitationPayload>> },
      MutationUpdateInvitationByIdArgs
    >
    updateProfilePicture?: GraphCacheUpdateResolver<
      {
        updateProfilePicture: Maybe<WithTypename<UpdateProfilePicturePayload>>
      },
      MutationUpdateProfilePictureArgs
    >
    updateProfilePictureByAccountId?: GraphCacheUpdateResolver<
      {
        updateProfilePictureByAccountId: Maybe<
          WithTypename<UpdateProfilePicturePayload>
        >
      },
      MutationUpdateProfilePictureByAccountIdArgs
    >
    updateProfilePictureById?: GraphCacheUpdateResolver<
      {
        updateProfilePictureById: Maybe<
          WithTypename<UpdateProfilePicturePayload>
        >
      },
      MutationUpdateProfilePictureByIdArgs
    >
    updateUpload?: GraphCacheUpdateResolver<
      { updateUpload: Maybe<WithTypename<UpdateUploadPayload>> },
      MutationUpdateUploadArgs
    >
    updateUploadById?: GraphCacheUpdateResolver<
      { updateUploadById: Maybe<WithTypename<UpdateUploadPayload>> },
      MutationUpdateUploadByIdArgs
    >
    updateUploadByStorageKey?: GraphCacheUpdateResolver<
      { updateUploadByStorageKey: Maybe<WithTypename<UpdateUploadPayload>> },
      MutationUpdateUploadByStorageKeyArgs
    >
    uploadCreate?: GraphCacheUpdateResolver<
      { uploadCreate: Maybe<WithTypename<UploadCreatePayload>> },
      MutationUploadCreateArgs
    >
  }
  Subscription?: {}
  Account?: {
    achievementsByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountAchievementsByAccountIdArgs
    >
    contactsByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountContactsByAccountIdArgs
    >
    contactsByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountContactsByAuthorAccountIdArgs
    >
    eventGroupsByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountEventGroupsByAuthorAccountIdArgs
    >
    eventsByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountEventsByAuthorAccountIdArgs
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      Record<string, never>
    >
    profilePictureByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      Record<string, never>
    >
    profilePicturesByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountProfilePicturesByAccountIdArgs
    >
    uploadsByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountUploadsByAccountIdArgs
    >
    username?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      Record<string, never>
    >
  }
  AccountDeletePayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountDeletePayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountDeletePayload>>,
      Record<string, never>
    >
  }
  AccountEmailAddressVerificationPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountEmailAddressVerificationPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountEmailAddressVerificationPayload>>,
      Record<string, never>
    >
  }
  AccountPasswordChangePayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPasswordChangePayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPasswordChangePayload>>,
      Record<string, never>
    >
  }
  AccountPasswordResetPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPasswordResetPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPasswordResetPayload>>,
      Record<string, never>
    >
  }
  AccountPasswordResetRequestPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPasswordResetRequestPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPasswordResetRequestPayload>>,
      Record<string, never>
    >
  }
  AccountRegistrationPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountRegistrationPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountRegistrationPayload>>,
      Record<string, never>
    >
    uuid?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountRegistrationPayload>>,
      Record<string, never>
    >
  }
  AccountRegistrationRefreshPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountRegistrationRefreshPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountRegistrationRefreshPayload>>,
      Record<string, never>
    >
  }
  AccountsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountsConnection>>,
      Record<string, never>
    >
  }
  AccountsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountsEdge>>,
      Record<string, never>
    >
  }
  Achievement?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Achievement>>,
      Record<string, never>
    >
    accountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Achievement>>,
      Record<string, never>
    >
    achievement?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Achievement>>,
      Record<string, never>
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Achievement>>,
      Record<string, never>
    >
    level?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Achievement>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Achievement>>,
      Record<string, never>
    >
  }
  AchievementUnlockPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AchievementUnlockPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AchievementUnlockPayload>>,
      Record<string, never>
    >
    uuid?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AchievementUnlockPayload>>,
      Record<string, never>
    >
  }
  AchievementsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AchievementsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AchievementsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AchievementsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AchievementsConnection>>,
      Record<string, never>
    >
  }
  AchievementsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AchievementsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AchievementsEdge>>,
      Record<string, never>
    >
  }
  AuthenticatePayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AuthenticatePayload>>,
      Record<string, never>
    >
    jwt?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AuthenticatePayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AuthenticatePayload>>,
      Record<string, never>
    >
  }
  Contact?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    accountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    address?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    authorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    emailAddress?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    emailAddressHash?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    firstName?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    invitationsByContactId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      ContactInvitationsByContactIdArgs
    >
    lastName?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    phoneNumber?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    url?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
  }
  ContactsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ContactsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ContactsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ContactsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ContactsConnection>>,
      Record<string, never>
    >
  }
  ContactsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ContactsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ContactsEdge>>,
      Record<string, never>
    >
  }
  CreateAccountPayload?: {
    account?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountPayload>>,
      Record<string, never>
    >
    accountEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountPayload>>,
      CreateAccountPayloadAccountEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountPayload>>,
      Record<string, never>
    >
  }
  CreateAchievementPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAchievementPayload>>,
      Record<string, never>
    >
    achievement?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAchievementPayload>>,
      Record<string, never>
    >
    achievementEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAchievementPayload>>,
      CreateAchievementPayloadAchievementEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAchievementPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAchievementPayload>>,
      Record<string, never>
    >
  }
  CreateContactPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateContactPayload>>,
      Record<string, never>
    >
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateContactPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateContactPayload>>,
      Record<string, never>
    >
    contact?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateContactPayload>>,
      Record<string, never>
    >
    contactEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateContactPayload>>,
      CreateContactPayloadContactEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateContactPayload>>,
      Record<string, never>
    >
  }
  CreateEventGroupPayload?: {
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventGroupPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventGroupPayload>>,
      Record<string, never>
    >
    eventGroup?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventGroupPayload>>,
      Record<string, never>
    >
    eventGroupEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventGroupPayload>>,
      CreateEventGroupPayloadEventGroupEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventGroupPayload>>,
      Record<string, never>
    >
  }
  CreateEventGroupingPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventGroupingPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventGroupingPayload>>,
      Record<string, never>
    >
    eventGroupByEventGroupId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventGroupingPayload>>,
      Record<string, never>
    >
    eventGrouping?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventGroupingPayload>>,
      Record<string, never>
    >
    eventGroupingEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventGroupingPayload>>,
      CreateEventGroupingPayloadEventGroupingEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventGroupingPayload>>,
      Record<string, never>
    >
  }
  CreateEventPayload?: {
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventPayload>>,
      Record<string, never>
    >
    event?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventPayload>>,
      Record<string, never>
    >
    eventEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventPayload>>,
      CreateEventPayloadEventEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventPayload>>,
      Record<string, never>
    >
  }
  CreateInvitationPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateInvitationPayload>>,
      Record<string, never>
    >
    contactByContactId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateInvitationPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateInvitationPayload>>,
      Record<string, never>
    >
    invitation?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateInvitationPayload>>,
      Record<string, never>
    >
    invitationEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateInvitationPayload>>,
      CreateInvitationPayloadInvitationEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateInvitationPayload>>,
      Record<string, never>
    >
  }
  CreateProfilePicturePayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateProfilePicturePayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateProfilePicturePayload>>,
      Record<string, never>
    >
    profilePicture?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateProfilePicturePayload>>,
      Record<string, never>
    >
    profilePictureEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateProfilePicturePayload>>,
      CreateProfilePicturePayloadProfilePictureEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateProfilePicturePayload>>,
      Record<string, never>
    >
    uploadByUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateProfilePicturePayload>>,
      Record<string, never>
    >
  }
  CreateUploadPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateUploadPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateUploadPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateUploadPayload>>,
      Record<string, never>
    >
    upload?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateUploadPayload>>,
      Record<string, never>
    >
    uploadEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateUploadPayload>>,
      CreateUploadPayloadUploadEdgeArgs
    >
  }
  DeleteAccountPayload?: {
    account?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountPayload>>,
      Record<string, never>
    >
    accountEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountPayload>>,
      DeleteAccountPayloadAccountEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountPayload>>,
      Record<string, never>
    >
    deletedAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountPayload>>,
      Record<string, never>
    >
  }
  DeleteAchievementPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAchievementPayload>>,
      Record<string, never>
    >
    achievement?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAchievementPayload>>,
      Record<string, never>
    >
    achievementEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAchievementPayload>>,
      DeleteAchievementPayloadAchievementEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAchievementPayload>>,
      Record<string, never>
    >
    deletedAchievementId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAchievementPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAchievementPayload>>,
      Record<string, never>
    >
  }
  DeleteContactPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteContactPayload>>,
      Record<string, never>
    >
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteContactPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteContactPayload>>,
      Record<string, never>
    >
    contact?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteContactPayload>>,
      Record<string, never>
    >
    contactEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteContactPayload>>,
      DeleteContactPayloadContactEdgeArgs
    >
    deletedContactId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteContactPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteContactPayload>>,
      Record<string, never>
    >
  }
  DeleteEventGroupPayload?: {
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventGroupPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventGroupPayload>>,
      Record<string, never>
    >
    deletedEventGroupId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventGroupPayload>>,
      Record<string, never>
    >
    eventGroup?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventGroupPayload>>,
      Record<string, never>
    >
    eventGroupEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventGroupPayload>>,
      DeleteEventGroupPayloadEventGroupEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventGroupPayload>>,
      Record<string, never>
    >
  }
  DeleteEventGroupingPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventGroupingPayload>>,
      Record<string, never>
    >
    deletedEventGroupingId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventGroupingPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventGroupingPayload>>,
      Record<string, never>
    >
    eventGroupByEventGroupId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventGroupingPayload>>,
      Record<string, never>
    >
    eventGrouping?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventGroupingPayload>>,
      Record<string, never>
    >
    eventGroupingEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventGroupingPayload>>,
      DeleteEventGroupingPayloadEventGroupingEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventGroupingPayload>>,
      Record<string, never>
    >
  }
  DeleteEventPayload?: {
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventPayload>>,
      Record<string, never>
    >
    deletedEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventPayload>>,
      Record<string, never>
    >
    event?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventPayload>>,
      Record<string, never>
    >
    eventEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventPayload>>,
      DeleteEventPayloadEventEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventPayload>>,
      Record<string, never>
    >
  }
  DeleteInvitationPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteInvitationPayload>>,
      Record<string, never>
    >
    contactByContactId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteInvitationPayload>>,
      Record<string, never>
    >
    deletedInvitationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteInvitationPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteInvitationPayload>>,
      Record<string, never>
    >
    invitation?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteInvitationPayload>>,
      Record<string, never>
    >
    invitationEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteInvitationPayload>>,
      DeleteInvitationPayloadInvitationEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteInvitationPayload>>,
      Record<string, never>
    >
  }
  DeleteProfilePicturePayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteProfilePicturePayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteProfilePicturePayload>>,
      Record<string, never>
    >
    deletedProfilePictureId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteProfilePicturePayload>>,
      Record<string, never>
    >
    profilePicture?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteProfilePicturePayload>>,
      Record<string, never>
    >
    profilePictureEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteProfilePicturePayload>>,
      DeleteProfilePicturePayloadProfilePictureEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteProfilePicturePayload>>,
      Record<string, never>
    >
    uploadByUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteProfilePicturePayload>>,
      Record<string, never>
    >
  }
  DeleteUploadPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteUploadPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteUploadPayload>>,
      Record<string, never>
    >
    deletedUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteUploadPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteUploadPayload>>,
      Record<string, never>
    >
    upload?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteUploadPayload>>,
      Record<string, never>
    >
    uploadEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteUploadPayload>>,
      DeleteUploadPayloadUploadEdgeArgs
    >
  }
  Event?: {
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    authorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    description?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    end?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    eventGroupingsByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      EventEventGroupingsByEventIdArgs
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    invitationsByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      EventInvitationsByEventIdArgs
    >
    inviteeCountMaximum?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    isArchived?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    isInPerson?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    isRemote?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    location?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    name?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    slug?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    start?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    url?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
    visibility?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      Record<string, never>
    >
  }
  EventDeletePayload?: {
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventDeletePayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventDeletePayload>>,
      Record<string, never>
    >
    event?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventDeletePayload>>,
      Record<string, never>
    >
    eventEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventDeletePayload>>,
      EventDeletePayloadEventEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventDeletePayload>>,
      Record<string, never>
    >
  }
  EventGroup?: {
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroup>>,
      Record<string, never>
    >
    authorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroup>>,
      Record<string, never>
    >
    description?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroup>>,
      Record<string, never>
    >
    eventGroupingsByEventGroupId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroup>>,
      EventGroupEventGroupingsByEventGroupIdArgs
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroup>>,
      Record<string, never>
    >
    isArchived?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroup>>,
      Record<string, never>
    >
    name?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroup>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroup>>,
      Record<string, never>
    >
    slug?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroup>>,
      Record<string, never>
    >
  }
  EventGrouping?: {
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGrouping>>,
      Record<string, never>
    >
    eventGroupByEventGroupId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGrouping>>,
      Record<string, never>
    >
    eventGroupId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGrouping>>,
      Record<string, never>
    >
    eventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGrouping>>,
      Record<string, never>
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGrouping>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGrouping>>,
      Record<string, never>
    >
  }
  EventGroupingsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroupingsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroupingsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroupingsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroupingsConnection>>,
      Record<string, never>
    >
  }
  EventGroupingsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroupingsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroupingsEdge>>,
      Record<string, never>
    >
  }
  EventGroupsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroupsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroupsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroupsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroupsConnection>>,
      Record<string, never>
    >
  }
  EventGroupsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroupsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventGroupsEdge>>,
      Record<string, never>
    >
  }
  EventUnlockPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUnlockPayload>>,
      Record<string, never>
    >
    eventUnlockResponse?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUnlockPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUnlockPayload>>,
      Record<string, never>
    >
  }
  EventUnlockResponse?: {
    authorAccountUsername?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUnlockResponse>>,
      Record<string, never>
    >
    eventSlug?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUnlockResponse>>,
      Record<string, never>
    >
    jwt?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUnlockResponse>>,
      Record<string, never>
    >
  }
  EventsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventsConnection>>,
      Record<string, never>
    >
  }
  EventsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventsEdge>>,
      Record<string, never>
    >
  }
  EventsOrganizedConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventsOrganizedConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventsOrganizedConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventsOrganizedConnection>>,
      Record<string, never>
    >
  }
  EventsOrganizedEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventsOrganizedEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventsOrganizedEdge>>,
      Record<string, never>
    >
  }
  Invitation?: {
    contactByContactId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Invitation>>,
      Record<string, never>
    >
    contactId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Invitation>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Invitation>>,
      Record<string, never>
    >
    eventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Invitation>>,
      Record<string, never>
    >
    feedback?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Invitation>>,
      Record<string, never>
    >
    feedbackPaper?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Invitation>>,
      Record<string, never>
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Invitation>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Invitation>>,
      Record<string, never>
    >
  }
  InvitationContactIdEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationContactIdEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationContactIdEdge>>,
      Record<string, never>
    >
  }
  InvitationContactIdsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationContactIdsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationContactIdsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationContactIdsConnection>>,
      Record<string, never>
    >
  }
  InvitationsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationsConnection>>,
      Record<string, never>
    >
  }
  InvitationsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationsEdge>>,
      Record<string, never>
    >
  }
  InvitePayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitePayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitePayload>>,
      Record<string, never>
    >
  }
  JwtRefreshPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<JwtRefreshPayload>>,
      Record<string, never>
    >
    jwt?: GraphCacheUpdateResolver<
      Maybe<WithTypename<JwtRefreshPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<JwtRefreshPayload>>,
      Record<string, never>
    >
  }
  NotificationAcknowledgePayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<NotificationAcknowledgePayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<NotificationAcknowledgePayload>>,
      Record<string, never>
    >
  }
  PageInfo?: {
    endCursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<PageInfo>>,
      Record<string, never>
    >
    hasNextPage?: GraphCacheUpdateResolver<
      Maybe<WithTypename<PageInfo>>,
      Record<string, never>
    >
    hasPreviousPage?: GraphCacheUpdateResolver<
      Maybe<WithTypename<PageInfo>>,
      Record<string, never>
    >
    startCursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<PageInfo>>,
      Record<string, never>
    >
  }
  ProfilePicture?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePicture>>,
      Record<string, never>
    >
    accountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePicture>>,
      Record<string, never>
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePicture>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePicture>>,
      Record<string, never>
    >
    uploadByUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePicture>>,
      Record<string, never>
    >
    uploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePicture>>,
      Record<string, never>
    >
  }
  ProfilePictureSetPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePictureSetPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePictureSetPayload>>,
      Record<string, never>
    >
  }
  ProfilePicturesConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePicturesConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePicturesConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePicturesConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePicturesConnection>>,
      Record<string, never>
    >
  }
  ProfilePicturesEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePicturesEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ProfilePicturesEdge>>,
      Record<string, never>
    >
  }
  UpdateAccountPayload?: {
    account?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountPayload>>,
      Record<string, never>
    >
    accountEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountPayload>>,
      UpdateAccountPayloadAccountEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountPayload>>,
      Record<string, never>
    >
  }
  UpdateAchievementPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAchievementPayload>>,
      Record<string, never>
    >
    achievement?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAchievementPayload>>,
      Record<string, never>
    >
    achievementEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAchievementPayload>>,
      UpdateAchievementPayloadAchievementEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAchievementPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAchievementPayload>>,
      Record<string, never>
    >
  }
  UpdateContactPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateContactPayload>>,
      Record<string, never>
    >
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateContactPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateContactPayload>>,
      Record<string, never>
    >
    contact?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateContactPayload>>,
      Record<string, never>
    >
    contactEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateContactPayload>>,
      UpdateContactPayloadContactEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateContactPayload>>,
      Record<string, never>
    >
  }
  UpdateEventGroupPayload?: {
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventGroupPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventGroupPayload>>,
      Record<string, never>
    >
    eventGroup?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventGroupPayload>>,
      Record<string, never>
    >
    eventGroupEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventGroupPayload>>,
      UpdateEventGroupPayloadEventGroupEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventGroupPayload>>,
      Record<string, never>
    >
  }
  UpdateEventGroupingPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventGroupingPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventGroupingPayload>>,
      Record<string, never>
    >
    eventGroupByEventGroupId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventGroupingPayload>>,
      Record<string, never>
    >
    eventGrouping?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventGroupingPayload>>,
      Record<string, never>
    >
    eventGroupingEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventGroupingPayload>>,
      UpdateEventGroupingPayloadEventGroupingEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventGroupingPayload>>,
      Record<string, never>
    >
  }
  UpdateEventPayload?: {
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventPayload>>,
      Record<string, never>
    >
    event?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventPayload>>,
      Record<string, never>
    >
    eventEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventPayload>>,
      UpdateEventPayloadEventEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventPayload>>,
      Record<string, never>
    >
  }
  UpdateInvitationPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateInvitationPayload>>,
      Record<string, never>
    >
    contactByContactId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateInvitationPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateInvitationPayload>>,
      Record<string, never>
    >
    invitation?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateInvitationPayload>>,
      Record<string, never>
    >
    invitationEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateInvitationPayload>>,
      UpdateInvitationPayloadInvitationEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateInvitationPayload>>,
      Record<string, never>
    >
  }
  UpdateProfilePicturePayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateProfilePicturePayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateProfilePicturePayload>>,
      Record<string, never>
    >
    profilePicture?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateProfilePicturePayload>>,
      Record<string, never>
    >
    profilePictureEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateProfilePicturePayload>>,
      UpdateProfilePicturePayloadProfilePictureEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateProfilePicturePayload>>,
      Record<string, never>
    >
    uploadByUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateProfilePicturePayload>>,
      Record<string, never>
    >
  }
  UpdateUploadPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateUploadPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateUploadPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateUploadPayload>>,
      Record<string, never>
    >
    upload?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateUploadPayload>>,
      Record<string, never>
    >
    uploadEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateUploadPayload>>,
      UpdateUploadPayloadUploadEdgeArgs
    >
  }
  Upload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Upload>>,
      Record<string, never>
    >
    accountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Upload>>,
      Record<string, never>
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Upload>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Upload>>,
      Record<string, never>
    >
    profilePicturesByUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Upload>>,
      UploadProfilePicturesByUploadIdArgs
    >
    sizeByte?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Upload>>,
      Record<string, never>
    >
    storageKey?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Upload>>,
      Record<string, never>
    >
  }
  UploadCreatePayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UploadCreatePayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UploadCreatePayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UploadCreatePayload>>,
      Record<string, never>
    >
    upload?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UploadCreatePayload>>,
      Record<string, never>
    >
    uploadEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UploadCreatePayload>>,
      UploadCreatePayloadUploadEdgeArgs
    >
  }
  UploadsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UploadsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UploadsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UploadsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UploadsConnection>>,
      Record<string, never>
    >
  }
  UploadsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UploadsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UploadsEdge>>,
      Record<string, never>
    >
  }
}

export type GraphCacheConfig = Parameters<typeof cacheExchange>[0] & {
  updates?: GraphCacheUpdaters
  keys?: GraphCacheKeysConfig
  optimistic?: GraphCacheOptimisticUpdaters
  resolvers?: GraphCacheResolvers
}

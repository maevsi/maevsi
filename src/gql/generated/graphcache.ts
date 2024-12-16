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
  /** Reads and enables pagination through a set of `AccountInterest`. */
  accountInterestsByAccountId: AccountInterestsConnection
  /** Reads and enables pagination through a set of `AccountPreferenceEventSize`. */
  accountPreferenceEventSizesByAccountId: AccountPreferenceEventSizesConnection
  /** Reads and enables pagination through a set of `AccountSocialNetwork`. */
  accountSocialNetworksByAccountId: AccountSocialNetworksConnection
  /** Reads and enables pagination through a set of `Achievement`. */
  achievementsByAccountId: AchievementsConnection
  /** Reads and enables pagination through a set of `Contact`. */
  contactsByAccountId: ContactsConnection
  /** Reads and enables pagination through a set of `Contact`. */
  contactsByAuthorAccountId: ContactsConnection
  /** Reads and enables pagination through a set of `EventGroup`. */
  eventGroupsByAuthorAccountId: EventGroupsConnection
  /** Reads and enables pagination through a set of `EventRecommendation`. */
  eventRecommendationsByAccountId: EventRecommendationsConnection
  /** Reads and enables pagination through a set of `Event`. */
  eventsByAuthorAccountId: EventsConnection
  /** The account's internal id. */
  id: Scalars['UUID']['output']
  /** Reads and enables pagination through a set of `Invitation`. */
  invitationsByUpdatedBy: InvitationsConnection
  /** Reads and enables pagination through a set of `LegalTermAcceptance`. */
  legalTermAcceptancesByAccountId: LegalTermAcceptancesConnection
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads a single `ProfilePicture` that is related to this `Account`. */
  profilePictureByAccountId?: Maybe<ProfilePicture>
  /**
   * Reads and enables pagination through a set of `ProfilePicture`.
   * @deprecated Please use profilePictureByAccountId instead
   */
  profilePicturesByAccountId: ProfilePicturesConnection
  /** Reads and enables pagination through a set of `Report`. */
  reportsByAuthorAccountId: ReportsConnection
  /** Reads and enables pagination through a set of `Report`. */
  reportsByTargetAccountId: ReportsConnection
  /** Reads and enables pagination through a set of `Upload`. */
  uploadsByAccountId: UploadsConnection
  /** The account's username. */
  username: Scalars['String']['output']
}

/** Public account data. */
export type AccountAccountInterestsByAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<AccountInterestCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<AccountInterestsOrderBy>>
}

/** Public account data. */
export type AccountAccountPreferenceEventSizesByAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<AccountPreferenceEventSizeCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<AccountPreferenceEventSizesOrderBy>>
}

/** Public account data. */
export type AccountAccountSocialNetworksByAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<AccountSocialNetworkCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<AccountSocialNetworksOrderBy>>
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
export type AccountEventRecommendationsByAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventRecommendationCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventRecommendationsOrderBy>>
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
export type AccountInvitationsByUpdatedByArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<InvitationCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<InvitationsOrderBy>>
}

/** Public account data. */
export type AccountLegalTermAcceptancesByAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<LegalTermAcceptanceCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<LegalTermAcceptancesOrderBy>>
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
export type AccountReportsByAuthorAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<ReportCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ReportsOrderBy>>
}

/** Public account data. */
export type AccountReportsByTargetAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<ReportCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ReportsOrderBy>>
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

/** Event categories a user account is interested in (M:N relationship). */
export type AccountInterest = Node & {
  __typename?: 'AccountInterest'
  /** Reads a single `Account` that is related to this `AccountInterest`. */
  accountByAccountId?: Maybe<Account>
  /** A user account id. */
  accountId: Scalars['UUID']['output']
  /** An event category. */
  category: Scalars['String']['output']
  /** Reads a single `EventCategory` that is related to this `AccountInterest`. */
  eventCategoryByCategory?: Maybe<EventCategory>
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
}

/**
 * A condition to be used against `AccountInterest` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AccountInterestCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `category` field. */
  category?: InputMaybe<Scalars['String']['input']>
}

/** An input for mutations affecting `AccountInterest` */
export type AccountInterestInput = {
  /** A user account id. */
  accountId: Scalars['UUID']['input']
  /** An event category. */
  category: Scalars['String']['input']
}

/** Represents an update to a `AccountInterest`. Fields that are set will be updated. */
export type AccountInterestPatch = {
  /** A user account id. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** An event category. */
  category?: InputMaybe<Scalars['String']['input']>
}

/** A connection to a list of `AccountInterest` values. */
export type AccountInterestsConnection = {
  __typename?: 'AccountInterestsConnection'
  /** A list of edges which contains the `AccountInterest` and cursor to aid in pagination. */
  edges: Array<AccountInterestsEdge>
  /** A list of `AccountInterest` objects. */
  nodes: Array<AccountInterest>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `AccountInterest` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `AccountInterest` edge in the connection. */
export type AccountInterestsEdge = {
  __typename?: 'AccountInterestsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `AccountInterest` at the end of the edge. */
  node: AccountInterest
}

/** Methods to use when ordering `AccountInterest`. */
export enum AccountInterestsOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  CategoryAsc = 'CATEGORY_ASC',
  CategoryDesc = 'CATEGORY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
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

/** Table for the user accounts' preferred event sizes (M:N relationship). */
export type AccountPreferenceEventSize = Node & {
  __typename?: 'AccountPreferenceEventSize'
  /** Reads a single `Account` that is related to this `AccountPreferenceEventSize`. */
  accountByAccountId?: Maybe<Account>
  /** The account's internal id. */
  accountId: Scalars['UUID']['output']
  /** Timestamp of when the event size preference was created, defaults to the current timestamp. */
  createdAt: Scalars['Datetime']['output']
  /** A preferred event sized */
  eventSize: EventSize
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
}

/**
 * A condition to be used against `AccountPreferenceEventSize` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type AccountPreferenceEventSizeCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `eventSize` field. */
  eventSize?: InputMaybe<EventSize>
}

/** An input for mutations affecting `AccountPreferenceEventSize` */
export type AccountPreferenceEventSizeInput = {
  /** The account's internal id. */
  accountId: Scalars['UUID']['input']
  /** A preferred event sized */
  eventSize: EventSize
}

/** Represents an update to a `AccountPreferenceEventSize`. Fields that are set will be updated. */
export type AccountPreferenceEventSizePatch = {
  /** The account's internal id. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** A preferred event sized */
  eventSize?: InputMaybe<EventSize>
}

/** A connection to a list of `AccountPreferenceEventSize` values. */
export type AccountPreferenceEventSizesConnection = {
  __typename?: 'AccountPreferenceEventSizesConnection'
  /** A list of edges which contains the `AccountPreferenceEventSize` and cursor to aid in pagination. */
  edges: Array<AccountPreferenceEventSizesEdge>
  /** A list of `AccountPreferenceEventSize` objects. */
  nodes: Array<AccountPreferenceEventSize>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `AccountPreferenceEventSize` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `AccountPreferenceEventSize` edge in the connection. */
export type AccountPreferenceEventSizesEdge = {
  __typename?: 'AccountPreferenceEventSizesEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `AccountPreferenceEventSize` at the end of the edge. */
  node: AccountPreferenceEventSize
}

/** Methods to use when ordering `AccountPreferenceEventSize`. */
export enum AccountPreferenceEventSizesOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EventSizeAsc = 'EVENT_SIZE_ASC',
  EventSizeDesc = 'EVENT_SIZE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
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

/** Links accounts to their social media profiles. Each entry represents a specific social network and associated username for an account. */
export type AccountSocialNetwork = Node & {
  __typename?: 'AccountSocialNetwork'
  /** Reads a single `Account` that is related to this `AccountSocialNetwork`. */
  accountByAccountId?: Maybe<Account>
  /** The unique identifier of the account. */
  accountId: Scalars['UUID']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** The social network to which the account is linked. */
  socialNetwork: SocialNetwork
  /** The username of the account on the specified social network. */
  socialNetworkUsername: Scalars['String']['output']
}

/**
 * A condition to be used against `AccountSocialNetwork` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type AccountSocialNetworkCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `socialNetwork` field. */
  socialNetwork?: InputMaybe<SocialNetwork>
  /** Checks for equality with the object’s `socialNetworkUsername` field. */
  socialNetworkUsername?: InputMaybe<Scalars['String']['input']>
}

/** An input for mutations affecting `AccountSocialNetwork` */
export type AccountSocialNetworkInput = {
  /** The unique identifier of the account. */
  accountId: Scalars['UUID']['input']
  /** The social network to which the account is linked. */
  socialNetwork: SocialNetwork
  /** The username of the account on the specified social network. */
  socialNetworkUsername: Scalars['String']['input']
}

/** Represents an update to a `AccountSocialNetwork`. Fields that are set will be updated. */
export type AccountSocialNetworkPatch = {
  /** The unique identifier of the account. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** The social network to which the account is linked. */
  socialNetwork?: InputMaybe<SocialNetwork>
  /** The username of the account on the specified social network. */
  socialNetworkUsername?: InputMaybe<Scalars['String']['input']>
}

/** A connection to a list of `AccountSocialNetwork` values. */
export type AccountSocialNetworksConnection = {
  __typename?: 'AccountSocialNetworksConnection'
  /** A list of edges which contains the `AccountSocialNetwork` and cursor to aid in pagination. */
  edges: Array<AccountSocialNetworksEdge>
  /** A list of `AccountSocialNetwork` objects. */
  nodes: Array<AccountSocialNetwork>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `AccountSocialNetwork` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `AccountSocialNetwork` edge in the connection. */
export type AccountSocialNetworksEdge = {
  __typename?: 'AccountSocialNetworksEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `AccountSocialNetwork` at the end of the edge. */
  node: AccountSocialNetwork
}

/** Methods to use when ordering `AccountSocialNetwork`. */
export enum AccountSocialNetworksOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SocialNetworkAsc = 'SOCIAL_NETWORK_ASC',
  SocialNetworkDesc = 'SOCIAL_NETWORK_DESC',
  SocialNetworkUsernameAsc = 'SOCIAL_NETWORK_USERNAME_ASC',
  SocialNetworkUsernameDesc = 'SOCIAL_NETWORK_USERNAME_DESC',
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
  /** Timestamp of when the contact was created, defaults to the current timestamp. */
  createdAt: Scalars['Datetime']['output']
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
  /** The contact's language. */
  language?: Maybe<Language>
  /** The contact's last name. */
  lastName?: Maybe<Scalars['String']['output']>
  /** The contact's nickname. */
  nickname?: Maybe<Scalars['String']['output']>
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** The contact's international phone number in E.164 format (https://wikipedia.org/wiki/E.164). */
  phoneNumber?: Maybe<Scalars['String']['output']>
  /** The contact's ISO 8601 timezone, e.g. `+02:00`, `-05:30` or `Z`. */
  timezone?: Maybe<Scalars['String']['output']>
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
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `emailAddress` field. */
  emailAddress?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `emailAddressHash` field. */
  emailAddressHash?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `language` field. */
  language?: InputMaybe<Language>
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `nickname` field. */
  nickname?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `phoneNumber` field. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `timezone` field. */
  timezone?: InputMaybe<Scalars['String']['input']>
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
  /** The contact's language. */
  language?: InputMaybe<Language>
  /** The contact's last name. */
  lastName?: InputMaybe<Scalars['String']['input']>
  /** The contact's nickname. */
  nickname?: InputMaybe<Scalars['String']['input']>
  /** The contact's international phone number in E.164 format (https://wikipedia.org/wiki/E.164). */
  phoneNumber?: InputMaybe<Scalars['String']['input']>
  /** The contact's ISO 8601 timezone, e.g. `+02:00`, `-05:30` or `Z`. */
  timezone?: InputMaybe<Scalars['String']['input']>
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
  /** The contact's language. */
  language?: InputMaybe<Language>
  /** The contact's last name. */
  lastName?: InputMaybe<Scalars['String']['input']>
  /** The contact's nickname. */
  nickname?: InputMaybe<Scalars['String']['input']>
  /** The contact's international phone number in E.164 format (https://wikipedia.org/wiki/E.164). */
  phoneNumber?: InputMaybe<Scalars['String']['input']>
  /** The contact's ISO 8601 timezone, e.g. `+02:00`, `-05:30` or `Z`. */
  timezone?: InputMaybe<Scalars['String']['input']>
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
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmailAddressAsc = 'EMAIL_ADDRESS_ASC',
  EmailAddressDesc = 'EMAIL_ADDRESS_DESC',
  EmailAddressHashAsc = 'EMAIL_ADDRESS_HASH_ASC',
  EmailAddressHashDesc = 'EMAIL_ADDRESS_HASH_DESC',
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LanguageAsc = 'LANGUAGE_ASC',
  LanguageDesc = 'LANGUAGE_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
  Natural = 'NATURAL',
  NicknameAsc = 'NICKNAME_ASC',
  NicknameDesc = 'NICKNAME_DESC',
  PhoneNumberAsc = 'PHONE_NUMBER_ASC',
  PhoneNumberDesc = 'PHONE_NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TimezoneAsc = 'TIMEZONE_ASC',
  TimezoneDesc = 'TIMEZONE_DESC',
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

/** All input for the create `AccountInterest` mutation. */
export type CreateAccountInterestInput = {
  /** The `AccountInterest` to be created by this mutation. */
  accountInterest: AccountInterestInput
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** The output of our create `AccountInterest` mutation. */
export type CreateAccountInterestPayload = {
  __typename?: 'CreateAccountInterestPayload'
  /** Reads a single `Account` that is related to this `AccountInterest`. */
  accountByAccountId?: Maybe<Account>
  /** The `AccountInterest` that was created by this mutation. */
  accountInterest?: Maybe<AccountInterest>
  /** An edge for our `AccountInterest`. May be used by Relay 1. */
  accountInterestEdge?: Maybe<AccountInterestsEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `EventCategory` that is related to this `AccountInterest`. */
  eventCategoryByCategory?: Maybe<EventCategory>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `AccountInterest` mutation. */
export type CreateAccountInterestPayloadAccountInterestEdgeArgs = {
  orderBy?: InputMaybe<Array<AccountInterestsOrderBy>>
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

/** All input for the create `AccountPreferenceEventSize` mutation. */
export type CreateAccountPreferenceEventSizeInput = {
  /** The `AccountPreferenceEventSize` to be created by this mutation. */
  accountPreferenceEventSize: AccountPreferenceEventSizeInput
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** The output of our create `AccountPreferenceEventSize` mutation. */
export type CreateAccountPreferenceEventSizePayload = {
  __typename?: 'CreateAccountPreferenceEventSizePayload'
  /** Reads a single `Account` that is related to this `AccountPreferenceEventSize`. */
  accountByAccountId?: Maybe<Account>
  /** The `AccountPreferenceEventSize` that was created by this mutation. */
  accountPreferenceEventSize?: Maybe<AccountPreferenceEventSize>
  /** An edge for our `AccountPreferenceEventSize`. May be used by Relay 1. */
  accountPreferenceEventSizeEdge?: Maybe<AccountPreferenceEventSizesEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `AccountPreferenceEventSize` mutation. */
export type CreateAccountPreferenceEventSizePayloadAccountPreferenceEventSizeEdgeArgs =
  {
    orderBy?: InputMaybe<Array<AccountPreferenceEventSizesOrderBy>>
  }

/** All input for the create `AccountSocialNetwork` mutation. */
export type CreateAccountSocialNetworkInput = {
  /** The `AccountSocialNetwork` to be created by this mutation. */
  accountSocialNetwork: AccountSocialNetworkInput
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** The output of our create `AccountSocialNetwork` mutation. */
export type CreateAccountSocialNetworkPayload = {
  __typename?: 'CreateAccountSocialNetworkPayload'
  /** Reads a single `Account` that is related to this `AccountSocialNetwork`. */
  accountByAccountId?: Maybe<Account>
  /** The `AccountSocialNetwork` that was created by this mutation. */
  accountSocialNetwork?: Maybe<AccountSocialNetwork>
  /** An edge for our `AccountSocialNetwork`. May be used by Relay 1. */
  accountSocialNetworkEdge?: Maybe<AccountSocialNetworksEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `AccountSocialNetwork` mutation. */
export type CreateAccountSocialNetworkPayloadAccountSocialNetworkEdgeArgs = {
  orderBy?: InputMaybe<Array<AccountSocialNetworksOrderBy>>
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

/** All input for the create `EventCategory` mutation. */
export type CreateEventCategoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `EventCategory` to be created by this mutation. */
  eventCategory: EventCategoryInput
}

/** All input for the create `EventCategoryMapping` mutation. */
export type CreateEventCategoryMappingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `EventCategoryMapping` to be created by this mutation. */
  eventCategoryMapping: EventCategoryMappingInput
}

/** The output of our create `EventCategoryMapping` mutation. */
export type CreateEventCategoryMappingPayload = {
  __typename?: 'CreateEventCategoryMappingPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Event` that is related to this `EventCategoryMapping`. */
  eventByEventId?: Maybe<Event>
  /** Reads a single `EventCategory` that is related to this `EventCategoryMapping`. */
  eventCategoryByCategory?: Maybe<EventCategory>
  /** The `EventCategoryMapping` that was created by this mutation. */
  eventCategoryMapping?: Maybe<EventCategoryMapping>
  /** An edge for our `EventCategoryMapping`. May be used by Relay 1. */
  eventCategoryMappingEdge?: Maybe<EventCategoryMappingsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `EventCategoryMapping` mutation. */
export type CreateEventCategoryMappingPayloadEventCategoryMappingEdgeArgs = {
  orderBy?: InputMaybe<Array<EventCategoryMappingsOrderBy>>
}

/** The output of our create `EventCategory` mutation. */
export type CreateEventCategoryPayload = {
  __typename?: 'CreateEventCategoryPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `EventCategory` that was created by this mutation. */
  eventCategory?: Maybe<EventCategory>
  /** An edge for our `EventCategory`. May be used by Relay 1. */
  eventCategoryEdge?: Maybe<EventCategoriesEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `EventCategory` mutation. */
export type CreateEventCategoryPayloadEventCategoryEdgeArgs = {
  orderBy?: InputMaybe<Array<EventCategoriesOrderBy>>
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

/** All input for the create `EventRecommendation` mutation. */
export type CreateEventRecommendationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `EventRecommendation` to be created by this mutation. */
  eventRecommendation: EventRecommendationInput
}

/** The output of our create `EventRecommendation` mutation. */
export type CreateEventRecommendationPayload = {
  __typename?: 'CreateEventRecommendationPayload'
  /** Reads a single `Account` that is related to this `EventRecommendation`. */
  accountByAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Event` that is related to this `EventRecommendation`. */
  eventByEventId?: Maybe<Event>
  /** The `EventRecommendation` that was created by this mutation. */
  eventRecommendation?: Maybe<EventRecommendation>
  /** An edge for our `EventRecommendation`. May be used by Relay 1. */
  eventRecommendationEdge?: Maybe<EventRecommendationsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `EventRecommendation` mutation. */
export type CreateEventRecommendationPayloadEventRecommendationEdgeArgs = {
  orderBy?: InputMaybe<Array<EventRecommendationsOrderBy>>
}

/** All input for the create `EventUpload` mutation. */
export type CreateEventUploadInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `EventUpload` to be created by this mutation. */
  eventUpload: EventUploadInput
}

/** The output of our create `EventUpload` mutation. */
export type CreateEventUploadPayload = {
  __typename?: 'CreateEventUploadPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Event` that is related to this `EventUpload`. */
  eventByEventId?: Maybe<Event>
  /** The `EventUpload` that was created by this mutation. */
  eventUpload?: Maybe<EventUpload>
  /** An edge for our `EventUpload`. May be used by Relay 1. */
  eventUploadEdge?: Maybe<EventUploadsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Upload` that is related to this `EventUpload`. */
  uploadByUploadId?: Maybe<Upload>
}

/** The output of our create `EventUpload` mutation. */
export type CreateEventUploadPayloadEventUploadEdgeArgs = {
  orderBy?: InputMaybe<Array<EventUploadsOrderBy>>
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
  /** Reads a single `Account` that is related to this `Invitation`. */
  accountByUpdatedBy?: Maybe<Account>
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

/** All input for the create `LegalTermAcceptance` mutation. */
export type CreateLegalTermAcceptanceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `LegalTermAcceptance` to be created by this mutation. */
  legalTermAcceptance: LegalTermAcceptanceInput
}

/** The output of our create `LegalTermAcceptance` mutation. */
export type CreateLegalTermAcceptancePayload = {
  __typename?: 'CreateLegalTermAcceptancePayload'
  /** Reads a single `Account` that is related to this `LegalTermAcceptance`. */
  accountByAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `LegalTermAcceptance` that was created by this mutation. */
  legalTermAcceptance?: Maybe<LegalTermAcceptance>
  /** An edge for our `LegalTermAcceptance`. May be used by Relay 1. */
  legalTermAcceptanceEdge?: Maybe<LegalTermAcceptancesEdge>
  /** Reads a single `LegalTerm` that is related to this `LegalTermAcceptance`. */
  legalTermByLegalTermId?: Maybe<LegalTerm>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `LegalTermAcceptance` mutation. */
export type CreateLegalTermAcceptancePayloadLegalTermAcceptanceEdgeArgs = {
  orderBy?: InputMaybe<Array<LegalTermAcceptancesOrderBy>>
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

/** All input for the create `Report` mutation. */
export type CreateReportInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `Report` to be created by this mutation. */
  report: ReportInput
}

/** The output of our create `Report` mutation. */
export type CreateReportPayload = {
  __typename?: 'CreateReportPayload'
  /** Reads a single `Account` that is related to this `Report`. */
  accountByAuthorAccountId?: Maybe<Account>
  /** Reads a single `Account` that is related to this `Report`. */
  accountByTargetAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Event` that is related to this `Report`. */
  eventByTargetEventId?: Maybe<Event>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Report` that was created by this mutation. */
  report?: Maybe<Report>
  /** An edge for our `Report`. May be used by Relay 1. */
  reportEdge?: Maybe<ReportsEdge>
  /** Reads a single `Upload` that is related to this `Report`. */
  uploadByTargetUploadId?: Maybe<Upload>
}

/** The output of our create `Report` mutation. */
export type CreateReportPayloadReportEdgeArgs = {
  orderBy?: InputMaybe<Array<ReportsOrderBy>>
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

/** All input for the `deleteAccountInterestByAccountIdAndCategory` mutation. */
export type DeleteAccountInterestByAccountIdAndCategoryInput = {
  /** A user account id. */
  accountId: Scalars['UUID']['input']
  /** An event category. */
  category: Scalars['String']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** All input for the `deleteAccountInterest` mutation. */
export type DeleteAccountInterestInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `AccountInterest` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `AccountInterest` mutation. */
export type DeleteAccountInterestPayload = {
  __typename?: 'DeleteAccountInterestPayload'
  /** Reads a single `Account` that is related to this `AccountInterest`. */
  accountByAccountId?: Maybe<Account>
  /** The `AccountInterest` that was deleted by this mutation. */
  accountInterest?: Maybe<AccountInterest>
  /** An edge for our `AccountInterest`. May be used by Relay 1. */
  accountInterestEdge?: Maybe<AccountInterestsEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedAccountInterestId?: Maybe<Scalars['ID']['output']>
  /** Reads a single `EventCategory` that is related to this `AccountInterest`. */
  eventCategoryByCategory?: Maybe<EventCategory>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `AccountInterest` mutation. */
export type DeleteAccountInterestPayloadAccountInterestEdgeArgs = {
  orderBy?: InputMaybe<Array<AccountInterestsOrderBy>>
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

/** All input for the `deleteAccountPreferenceEventSizeByAccountIdAndEventSize` mutation. */
export type DeleteAccountPreferenceEventSizeByAccountIdAndEventSizeInput = {
  /** The account's internal id. */
  accountId: Scalars['UUID']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** A preferred event sized */
  eventSize: EventSize
}

/** All input for the `deleteAccountPreferenceEventSize` mutation. */
export type DeleteAccountPreferenceEventSizeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `AccountPreferenceEventSize` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `AccountPreferenceEventSize` mutation. */
export type DeleteAccountPreferenceEventSizePayload = {
  __typename?: 'DeleteAccountPreferenceEventSizePayload'
  /** Reads a single `Account` that is related to this `AccountPreferenceEventSize`. */
  accountByAccountId?: Maybe<Account>
  /** The `AccountPreferenceEventSize` that was deleted by this mutation. */
  accountPreferenceEventSize?: Maybe<AccountPreferenceEventSize>
  /** An edge for our `AccountPreferenceEventSize`. May be used by Relay 1. */
  accountPreferenceEventSizeEdge?: Maybe<AccountPreferenceEventSizesEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedAccountPreferenceEventSizeId?: Maybe<Scalars['ID']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `AccountPreferenceEventSize` mutation. */
export type DeleteAccountPreferenceEventSizePayloadAccountPreferenceEventSizeEdgeArgs =
  {
    orderBy?: InputMaybe<Array<AccountPreferenceEventSizesOrderBy>>
  }

/** All input for the `deleteAccountSocialNetworkByAccountIdAndSocialNetwork` mutation. */
export type DeleteAccountSocialNetworkByAccountIdAndSocialNetworkInput = {
  /** The unique identifier of the account. */
  accountId: Scalars['UUID']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The social network to which the account is linked. */
  socialNetwork: SocialNetwork
}

/** All input for the `deleteAccountSocialNetwork` mutation. */
export type DeleteAccountSocialNetworkInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `AccountSocialNetwork` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `AccountSocialNetwork` mutation. */
export type DeleteAccountSocialNetworkPayload = {
  __typename?: 'DeleteAccountSocialNetworkPayload'
  /** Reads a single `Account` that is related to this `AccountSocialNetwork`. */
  accountByAccountId?: Maybe<Account>
  /** The `AccountSocialNetwork` that was deleted by this mutation. */
  accountSocialNetwork?: Maybe<AccountSocialNetwork>
  /** An edge for our `AccountSocialNetwork`. May be used by Relay 1. */
  accountSocialNetworkEdge?: Maybe<AccountSocialNetworksEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedAccountSocialNetworkId?: Maybe<Scalars['ID']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `AccountSocialNetwork` mutation. */
export type DeleteAccountSocialNetworkPayloadAccountSocialNetworkEdgeArgs = {
  orderBy?: InputMaybe<Array<AccountSocialNetworksOrderBy>>
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

/** All input for the `deleteEventCategoryByCategory` mutation. */
export type DeleteEventCategoryByCategoryInput = {
  /** A category name. */
  category: Scalars['String']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** All input for the `deleteEventCategory` mutation. */
export type DeleteEventCategoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `EventCategory` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** All input for the `deleteEventCategoryMappingByEventIdAndCategory` mutation. */
export type DeleteEventCategoryMappingByEventIdAndCategoryInput = {
  /** A category name. */
  category: Scalars['String']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An event id. */
  eventId: Scalars['UUID']['input']
}

/** All input for the `deleteEventCategoryMapping` mutation. */
export type DeleteEventCategoryMappingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `EventCategoryMapping` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `EventCategoryMapping` mutation. */
export type DeleteEventCategoryMappingPayload = {
  __typename?: 'DeleteEventCategoryMappingPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedEventCategoryMappingId?: Maybe<Scalars['ID']['output']>
  /** Reads a single `Event` that is related to this `EventCategoryMapping`. */
  eventByEventId?: Maybe<Event>
  /** Reads a single `EventCategory` that is related to this `EventCategoryMapping`. */
  eventCategoryByCategory?: Maybe<EventCategory>
  /** The `EventCategoryMapping` that was deleted by this mutation. */
  eventCategoryMapping?: Maybe<EventCategoryMapping>
  /** An edge for our `EventCategoryMapping`. May be used by Relay 1. */
  eventCategoryMappingEdge?: Maybe<EventCategoryMappingsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `EventCategoryMapping` mutation. */
export type DeleteEventCategoryMappingPayloadEventCategoryMappingEdgeArgs = {
  orderBy?: InputMaybe<Array<EventCategoryMappingsOrderBy>>
}

/** The output of our delete `EventCategory` mutation. */
export type DeleteEventCategoryPayload = {
  __typename?: 'DeleteEventCategoryPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedEventCategoryId?: Maybe<Scalars['ID']['output']>
  /** The `EventCategory` that was deleted by this mutation. */
  eventCategory?: Maybe<EventCategory>
  /** An edge for our `EventCategory`. May be used by Relay 1. */
  eventCategoryEdge?: Maybe<EventCategoriesEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `EventCategory` mutation. */
export type DeleteEventCategoryPayloadEventCategoryEdgeArgs = {
  orderBy?: InputMaybe<Array<EventCategoriesOrderBy>>
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

/** All input for the `deleteEventRecommendationByAccountIdAndEventId` mutation. */
export type DeleteEventRecommendationByAccountIdAndEventIdInput = {
  /** A user account id. */
  accountId: Scalars['UUID']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The predicted score of the recommendation. */
  eventId: Scalars['UUID']['input']
}

/** All input for the `deleteEventRecommendation` mutation. */
export type DeleteEventRecommendationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `EventRecommendation` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `EventRecommendation` mutation. */
export type DeleteEventRecommendationPayload = {
  __typename?: 'DeleteEventRecommendationPayload'
  /** Reads a single `Account` that is related to this `EventRecommendation`. */
  accountByAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedEventRecommendationId?: Maybe<Scalars['ID']['output']>
  /** Reads a single `Event` that is related to this `EventRecommendation`. */
  eventByEventId?: Maybe<Event>
  /** The `EventRecommendation` that was deleted by this mutation. */
  eventRecommendation?: Maybe<EventRecommendation>
  /** An edge for our `EventRecommendation`. May be used by Relay 1. */
  eventRecommendationEdge?: Maybe<EventRecommendationsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `EventRecommendation` mutation. */
export type DeleteEventRecommendationPayloadEventRecommendationEdgeArgs = {
  orderBy?: InputMaybe<Array<EventRecommendationsOrderBy>>
}

/** All input for the `deleteEventUploadByEventIdAndUploadId` mutation. */
export type DeleteEventUploadByEventIdAndUploadIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The event's internal id for which the invitation is valid. */
  eventId: Scalars['UUID']['input']
  /** The internal id of the uploaded content. */
  uploadId: Scalars['UUID']['input']
}

/** All input for the `deleteEventUploadById` mutation. */
export type DeleteEventUploadByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The event's internal id for which the invitation is valid. */
  id: Scalars['UUID']['input']
}

/** All input for the `deleteEventUpload` mutation. */
export type DeleteEventUploadInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `EventUpload` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `EventUpload` mutation. */
export type DeleteEventUploadPayload = {
  __typename?: 'DeleteEventUploadPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedEventUploadId?: Maybe<Scalars['ID']['output']>
  /** Reads a single `Event` that is related to this `EventUpload`. */
  eventByEventId?: Maybe<Event>
  /** The `EventUpload` that was deleted by this mutation. */
  eventUpload?: Maybe<EventUpload>
  /** An edge for our `EventUpload`. May be used by Relay 1. */
  eventUploadEdge?: Maybe<EventUploadsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Upload` that is related to this `EventUpload`. */
  uploadByUploadId?: Maybe<Upload>
}

/** The output of our delete `EventUpload` mutation. */
export type DeleteEventUploadPayloadEventUploadEdgeArgs = {
  orderBy?: InputMaybe<Array<EventUploadsOrderBy>>
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
  /** Reads a single `Account` that is related to this `Invitation`. */
  accountByUpdatedBy?: Maybe<Account>
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

/** All input for the `deleteLegalTermAcceptanceById` mutation. */
export type DeleteLegalTermAcceptanceByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** Unique identifier for this legal term acceptance record. Automatically generated for each new acceptance. */
  id: Scalars['UUID']['input']
}

/** All input for the `deleteLegalTermAcceptance` mutation. */
export type DeleteLegalTermAcceptanceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `LegalTermAcceptance` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** The output of our delete `LegalTermAcceptance` mutation. */
export type DeleteLegalTermAcceptancePayload = {
  __typename?: 'DeleteLegalTermAcceptancePayload'
  /** Reads a single `Account` that is related to this `LegalTermAcceptance`. */
  accountByAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedLegalTermAcceptanceId?: Maybe<Scalars['ID']['output']>
  /** The `LegalTermAcceptance` that was deleted by this mutation. */
  legalTermAcceptance?: Maybe<LegalTermAcceptance>
  /** An edge for our `LegalTermAcceptance`. May be used by Relay 1. */
  legalTermAcceptanceEdge?: Maybe<LegalTermAcceptancesEdge>
  /** Reads a single `LegalTerm` that is related to this `LegalTermAcceptance`. */
  legalTermByLegalTermId?: Maybe<LegalTerm>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `LegalTermAcceptance` mutation. */
export type DeleteLegalTermAcceptancePayloadLegalTermAcceptanceEdgeArgs = {
  orderBy?: InputMaybe<Array<LegalTermAcceptancesOrderBy>>
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
  /** Timestamp of when the event was created, defaults to the current timestamp. */
  createdAt: Scalars['Datetime']['output']
  /** The event's description. */
  description?: Maybe<Scalars['String']['output']>
  /** The event's end date and time, with timezone. */
  end?: Maybe<Scalars['Datetime']['output']>
  /** Reads and enables pagination through a set of `EventCategoryMapping`. */
  eventCategoryMappingsByEventId: EventCategoryMappingsConnection
  /** Reads and enables pagination through a set of `EventGrouping`. */
  eventGroupingsByEventId: EventGroupingsConnection
  /** Reads and enables pagination through a set of `EventRecommendation`. */
  eventRecommendationsByEventId: EventRecommendationsConnection
  /** Reads and enables pagination through a set of `EventUpload`. */
  eventUploadsByEventId: EventUploadsConnection
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
  /** Reads and enables pagination through a set of `Report`. */
  reportsByTargetEventId: ReportsConnection
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
export type EventEventCategoryMappingsByEventIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventCategoryMappingCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventCategoryMappingsOrderBy>>
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
export type EventEventRecommendationsByEventIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventRecommendationCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventRecommendationsOrderBy>>
}

/** An event. */
export type EventEventUploadsByEventIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventUploadCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventUploadsOrderBy>>
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

/** An event. */
export type EventReportsByTargetEventIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<ReportCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ReportsOrderBy>>
}

/** A connection to a list of `EventCategory` values. */
export type EventCategoriesConnection = {
  __typename?: 'EventCategoriesConnection'
  /** A list of edges which contains the `EventCategory` and cursor to aid in pagination. */
  edges: Array<EventCategoriesEdge>
  /** A list of `EventCategory` objects. */
  nodes: Array<EventCategory>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `EventCategory` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `EventCategory` edge in the connection. */
export type EventCategoriesEdge = {
  __typename?: 'EventCategoriesEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `EventCategory` at the end of the edge. */
  node: EventCategory
}

/** Methods to use when ordering `EventCategory`. */
export enum EventCategoriesOrderBy {
  CategoryAsc = 'CATEGORY_ASC',
  CategoryDesc = 'CATEGORY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
}

/** Event categories. */
export type EventCategory = Node & {
  __typename?: 'EventCategory'
  /** Reads and enables pagination through a set of `AccountInterest`. */
  accountInterestsByCategory: AccountInterestsConnection
  /** A category name. */
  category: Scalars['String']['output']
  /** Reads and enables pagination through a set of `EventCategoryMapping`. */
  eventCategoryMappingsByCategory: EventCategoryMappingsConnection
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
}

/** Event categories. */
export type EventCategoryAccountInterestsByCategoryArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<AccountInterestCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<AccountInterestsOrderBy>>
}

/** Event categories. */
export type EventCategoryEventCategoryMappingsByCategoryArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventCategoryMappingCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventCategoryMappingsOrderBy>>
}

/**
 * A condition to be used against `EventCategory` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EventCategoryCondition = {
  /** Checks for equality with the object’s `category` field. */
  category?: InputMaybe<Scalars['String']['input']>
}

/** An input for mutations affecting `EventCategory` */
export type EventCategoryInput = {
  /** A category name. */
  category: Scalars['String']['input']
}

/** Mapping events to categories (M:N relationship). */
export type EventCategoryMapping = Node & {
  __typename?: 'EventCategoryMapping'
  /** A category name. */
  category: Scalars['String']['output']
  /** Reads a single `Event` that is related to this `EventCategoryMapping`. */
  eventByEventId?: Maybe<Event>
  /** Reads a single `EventCategory` that is related to this `EventCategoryMapping`. */
  eventCategoryByCategory?: Maybe<EventCategory>
  /** An event id. */
  eventId: Scalars['UUID']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
}

/**
 * A condition to be used against `EventCategoryMapping` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type EventCategoryMappingCondition = {
  /** Checks for equality with the object’s `category` field. */
  category?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['UUID']['input']>
}

/** An input for mutations affecting `EventCategoryMapping` */
export type EventCategoryMappingInput = {
  /** A category name. */
  category: Scalars['String']['input']
  /** An event id. */
  eventId: Scalars['UUID']['input']
}

/** Represents an update to a `EventCategoryMapping`. Fields that are set will be updated. */
export type EventCategoryMappingPatch = {
  /** A category name. */
  category?: InputMaybe<Scalars['String']['input']>
  /** An event id. */
  eventId?: InputMaybe<Scalars['UUID']['input']>
}

/** A connection to a list of `EventCategoryMapping` values. */
export type EventCategoryMappingsConnection = {
  __typename?: 'EventCategoryMappingsConnection'
  /** A list of edges which contains the `EventCategoryMapping` and cursor to aid in pagination. */
  edges: Array<EventCategoryMappingsEdge>
  /** A list of `EventCategoryMapping` objects. */
  nodes: Array<EventCategoryMapping>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `EventCategoryMapping` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `EventCategoryMapping` edge in the connection. */
export type EventCategoryMappingsEdge = {
  __typename?: 'EventCategoryMappingsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `EventCategoryMapping` at the end of the edge. */
  node: EventCategoryMapping
}

/** Methods to use when ordering `EventCategoryMapping`. */
export enum EventCategoryMappingsOrderBy {
  CategoryAsc = 'CATEGORY_ASC',
  CategoryDesc = 'CATEGORY_DESC',
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
}

/** Represents an update to a `EventCategory`. Fields that are set will be updated. */
export type EventCategoryPatch = {
  /** A category name. */
  category?: InputMaybe<Scalars['String']['input']>
}

/** A condition to be used against `Event` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EventCondition = {
  /** Checks for equality with the object’s `authorAccountId` field. */
  authorAccountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
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
  /** Timestamp of when the event group was created, defaults to the current timestamp. */
  createdAt: Scalars['Datetime']['output']
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
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
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
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
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

/** Events recommended to a user account (M:N relationship). */
export type EventRecommendation = Node & {
  __typename?: 'EventRecommendation'
  /** Reads a single `Account` that is related to this `EventRecommendation`. */
  accountByAccountId?: Maybe<Account>
  /** A user account id. */
  accountId: Scalars['UUID']['output']
  /** Reads a single `Event` that is related to this `EventRecommendation`. */
  eventByEventId?: Maybe<Event>
  /** The predicted score of the recommendation. */
  eventId: Scalars['UUID']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** The score of the recommendation. */
  predictedScore?: Maybe<Scalars['Float']['output']>
  /** An event id. */
  score?: Maybe<Scalars['Float']['output']>
}

/**
 * A condition to be used against `EventRecommendation` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type EventRecommendationCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `predictedScore` field. */
  predictedScore?: InputMaybe<Scalars['Float']['input']>
  /** Checks for equality with the object’s `score` field. */
  score?: InputMaybe<Scalars['Float']['input']>
}

/** An input for mutations affecting `EventRecommendation` */
export type EventRecommendationInput = {
  /** A user account id. */
  accountId: Scalars['UUID']['input']
  /** The predicted score of the recommendation. */
  eventId: Scalars['UUID']['input']
  /** The score of the recommendation. */
  predictedScore?: InputMaybe<Scalars['Float']['input']>
  /** An event id. */
  score?: InputMaybe<Scalars['Float']['input']>
}

/** Represents an update to a `EventRecommendation`. Fields that are set will be updated. */
export type EventRecommendationPatch = {
  /** A user account id. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** The predicted score of the recommendation. */
  eventId?: InputMaybe<Scalars['UUID']['input']>
  /** The score of the recommendation. */
  predictedScore?: InputMaybe<Scalars['Float']['input']>
  /** An event id. */
  score?: InputMaybe<Scalars['Float']['input']>
}

/** A connection to a list of `EventRecommendation` values. */
export type EventRecommendationsConnection = {
  __typename?: 'EventRecommendationsConnection'
  /** A list of edges which contains the `EventRecommendation` and cursor to aid in pagination. */
  edges: Array<EventRecommendationsEdge>
  /** A list of `EventRecommendation` objects. */
  nodes: Array<EventRecommendation>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `EventRecommendation` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `EventRecommendation` edge in the connection. */
export type EventRecommendationsEdge = {
  __typename?: 'EventRecommendationsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `EventRecommendation` at the end of the edge. */
  node: EventRecommendation
}

/** Methods to use when ordering `EventRecommendation`. */
export enum EventRecommendationsOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
  Natural = 'NATURAL',
  PredictedScoreAsc = 'PREDICTED_SCORE_ASC',
  PredictedScoreDesc = 'PREDICTED_SCORE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ScoreAsc = 'SCORE_ASC',
  ScoreDesc = 'SCORE_DESC',
}

/** Possible event sizes: small, medium, large, huge. */
export enum EventSize {
  Huge = 'HUGE',
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL',
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

/** An assignment of an uploaded content (e.g. an image) to an event. */
export type EventUpload = Node & {
  __typename?: 'EventUpload'
  /** Reads a single `Event` that is related to this `EventUpload`. */
  eventByEventId?: Maybe<Event>
  /** The event's internal id for which the invitation is valid. */
  eventId: Scalars['UUID']['output']
  /** The event's internal id for which the invitation is valid. */
  id: Scalars['UUID']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads a single `Upload` that is related to this `EventUpload`. */
  uploadByUploadId?: Maybe<Upload>
  /** The internal id of the uploaded content. */
  uploadId: Scalars['UUID']['output']
}

/**
 * A condition to be used against `EventUpload` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type EventUploadCondition = {
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `uploadId` field. */
  uploadId?: InputMaybe<Scalars['UUID']['input']>
}

/** An input for mutations affecting `EventUpload` */
export type EventUploadInput = {
  /** The event's internal id for which the invitation is valid. */
  eventId: Scalars['UUID']['input']
  /** The internal id of the uploaded content. */
  uploadId: Scalars['UUID']['input']
}

/** A connection to a list of `EventUpload` values. */
export type EventUploadsConnection = {
  __typename?: 'EventUploadsConnection'
  /** A list of edges which contains the `EventUpload` and cursor to aid in pagination. */
  edges: Array<EventUploadsEdge>
  /** A list of `EventUpload` objects. */
  nodes: Array<EventUpload>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `EventUpload` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `EventUpload` edge in the connection. */
export type EventUploadsEdge = {
  __typename?: 'EventUploadsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `EventUpload` at the end of the edge. */
  node: EventUpload
}

/** Methods to use when ordering `EventUpload`. */
export enum EventUploadsOrderBy {
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UploadIdAsc = 'UPLOAD_ID_ASC',
  UploadIdDesc = 'UPLOAD_ID_DESC',
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
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
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
  /** Reads a single `Account` that is related to this `Invitation`. */
  accountByUpdatedBy?: Maybe<Account>
  /** Reads a single `Contact` that is related to this `Invitation`. */
  contactByContactId?: Maybe<Contact>
  /** The contact's internal id for which the invitation is valid. */
  contactId: Scalars['UUID']['output']
  /** Timestamp of when the invitation was created, defaults to the current timestamp. */
  createdAt: Scalars['Datetime']['output']
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
  /** Timestamp of when the invitation was last updated. */
  updatedAt?: Maybe<Scalars['Datetime']['output']>
  /** The id of the account which last updated the invitation. `NULL` if the invitation was updated by an anonymous user. */
  updatedBy?: Maybe<Scalars['UUID']['output']>
}

/**
 * A condition to be used against `Invitation` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type InvitationCondition = {
  /** Checks for equality with the object’s `contactId` field. */
  contactId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `feedback` field. */
  feedback?: InputMaybe<InvitationFeedback>
  /** Checks for equality with the object’s `feedbackPaper` field. */
  feedbackPaper?: InputMaybe<InvitationFeedbackPaper>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: InputMaybe<Scalars['UUID']['input']>
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

/** View returning flattened invitations. */
export type InvitationFlat = {
  __typename?: 'InvitationFlat'
  contactAccountId?: Maybe<Scalars['UUID']['output']>
  contactAddress?: Maybe<Scalars['String']['output']>
  contactAuthorAccountId?: Maybe<Scalars['UUID']['output']>
  contactEmailAddress?: Maybe<Scalars['String']['output']>
  contactEmailAddressHash?: Maybe<Scalars['String']['output']>
  contactFirstName?: Maybe<Scalars['String']['output']>
  contactId?: Maybe<Scalars['UUID']['output']>
  contactLastName?: Maybe<Scalars['String']['output']>
  contactPhoneNumber?: Maybe<Scalars['String']['output']>
  contactUrl?: Maybe<Scalars['String']['output']>
  eventAuthorAccountId?: Maybe<Scalars['UUID']['output']>
  eventDescription?: Maybe<Scalars['String']['output']>
  eventEnd?: Maybe<Scalars['Datetime']['output']>
  eventId?: Maybe<Scalars['UUID']['output']>
  eventInviteeCountMaximum?: Maybe<Scalars['Int']['output']>
  eventIsArchived?: Maybe<Scalars['Boolean']['output']>
  eventIsInPerson?: Maybe<Scalars['Boolean']['output']>
  eventIsRemote?: Maybe<Scalars['Boolean']['output']>
  eventLocation?: Maybe<Scalars['String']['output']>
  eventName?: Maybe<Scalars['String']['output']>
  eventSlug?: Maybe<Scalars['String']['output']>
  eventStart?: Maybe<Scalars['Datetime']['output']>
  eventUrl?: Maybe<Scalars['String']['output']>
  eventVisibility?: Maybe<EventVisibility>
  invitationContactId?: Maybe<Scalars['UUID']['output']>
  invitationEventId?: Maybe<Scalars['UUID']['output']>
  invitationFeedback?: Maybe<InvitationFeedback>
  invitationFeedbackPaper?: Maybe<InvitationFeedbackPaper>
  invitationId?: Maybe<Scalars['UUID']['output']>
}

/**
 * A condition to be used against `InvitationFlat` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type InvitationFlatCondition = {
  /** Checks for equality with the object’s `contactAccountId` field. */
  contactAccountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `contactAddress` field. */
  contactAddress?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `contactAuthorAccountId` field. */
  contactAuthorAccountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `contactEmailAddress` field. */
  contactEmailAddress?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `contactEmailAddressHash` field. */
  contactEmailAddressHash?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `contactFirstName` field. */
  contactFirstName?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `contactId` field. */
  contactId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `contactLastName` field. */
  contactLastName?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `contactPhoneNumber` field. */
  contactPhoneNumber?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `contactUrl` field. */
  contactUrl?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `eventAuthorAccountId` field. */
  eventAuthorAccountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `eventDescription` field. */
  eventDescription?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `eventEnd` field. */
  eventEnd?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `eventInviteeCountMaximum` field. */
  eventInviteeCountMaximum?: InputMaybe<Scalars['Int']['input']>
  /** Checks for equality with the object’s `eventIsArchived` field. */
  eventIsArchived?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks for equality with the object’s `eventIsInPerson` field. */
  eventIsInPerson?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks for equality with the object’s `eventIsRemote` field. */
  eventIsRemote?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks for equality with the object’s `eventLocation` field. */
  eventLocation?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `eventName` field. */
  eventName?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `eventSlug` field. */
  eventSlug?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `eventStart` field. */
  eventStart?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `eventUrl` field. */
  eventUrl?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `eventVisibility` field. */
  eventVisibility?: InputMaybe<EventVisibility>
  /** Checks for equality with the object’s `invitationContactId` field. */
  invitationContactId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `invitationEventId` field. */
  invitationEventId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `invitationFeedback` field. */
  invitationFeedback?: InputMaybe<InvitationFeedback>
  /** Checks for equality with the object’s `invitationFeedbackPaper` field. */
  invitationFeedbackPaper?: InputMaybe<InvitationFeedbackPaper>
  /** Checks for equality with the object’s `invitationId` field. */
  invitationId?: InputMaybe<Scalars['UUID']['input']>
}

/** A connection to a list of `InvitationFlat` values. */
export type InvitationFlatsConnection = {
  __typename?: 'InvitationFlatsConnection'
  /** A list of edges which contains the `InvitationFlat` and cursor to aid in pagination. */
  edges: Array<InvitationFlatsEdge>
  /** A list of `InvitationFlat` objects. */
  nodes: Array<InvitationFlat>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `InvitationFlat` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `InvitationFlat` edge in the connection. */
export type InvitationFlatsEdge = {
  __typename?: 'InvitationFlatsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `InvitationFlat` at the end of the edge. */
  node: InvitationFlat
}

/** Methods to use when ordering `InvitationFlat`. */
export enum InvitationFlatsOrderBy {
  ContactAccountIdAsc = 'CONTACT_ACCOUNT_ID_ASC',
  ContactAccountIdDesc = 'CONTACT_ACCOUNT_ID_DESC',
  ContactAddressAsc = 'CONTACT_ADDRESS_ASC',
  ContactAddressDesc = 'CONTACT_ADDRESS_DESC',
  ContactAuthorAccountIdAsc = 'CONTACT_AUTHOR_ACCOUNT_ID_ASC',
  ContactAuthorAccountIdDesc = 'CONTACT_AUTHOR_ACCOUNT_ID_DESC',
  ContactEmailAddressAsc = 'CONTACT_EMAIL_ADDRESS_ASC',
  ContactEmailAddressDesc = 'CONTACT_EMAIL_ADDRESS_DESC',
  ContactEmailAddressHashAsc = 'CONTACT_EMAIL_ADDRESS_HASH_ASC',
  ContactEmailAddressHashDesc = 'CONTACT_EMAIL_ADDRESS_HASH_DESC',
  ContactFirstNameAsc = 'CONTACT_FIRST_NAME_ASC',
  ContactFirstNameDesc = 'CONTACT_FIRST_NAME_DESC',
  ContactIdAsc = 'CONTACT_ID_ASC',
  ContactIdDesc = 'CONTACT_ID_DESC',
  ContactLastNameAsc = 'CONTACT_LAST_NAME_ASC',
  ContactLastNameDesc = 'CONTACT_LAST_NAME_DESC',
  ContactPhoneNumberAsc = 'CONTACT_PHONE_NUMBER_ASC',
  ContactPhoneNumberDesc = 'CONTACT_PHONE_NUMBER_DESC',
  ContactUrlAsc = 'CONTACT_URL_ASC',
  ContactUrlDesc = 'CONTACT_URL_DESC',
  EventAuthorAccountIdAsc = 'EVENT_AUTHOR_ACCOUNT_ID_ASC',
  EventAuthorAccountIdDesc = 'EVENT_AUTHOR_ACCOUNT_ID_DESC',
  EventDescriptionAsc = 'EVENT_DESCRIPTION_ASC',
  EventDescriptionDesc = 'EVENT_DESCRIPTION_DESC',
  EventEndAsc = 'EVENT_END_ASC',
  EventEndDesc = 'EVENT_END_DESC',
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
  EventInviteeCountMaximumAsc = 'EVENT_INVITEE_COUNT_MAXIMUM_ASC',
  EventInviteeCountMaximumDesc = 'EVENT_INVITEE_COUNT_MAXIMUM_DESC',
  EventIsArchivedAsc = 'EVENT_IS_ARCHIVED_ASC',
  EventIsArchivedDesc = 'EVENT_IS_ARCHIVED_DESC',
  EventIsInPersonAsc = 'EVENT_IS_IN_PERSON_ASC',
  EventIsInPersonDesc = 'EVENT_IS_IN_PERSON_DESC',
  EventIsRemoteAsc = 'EVENT_IS_REMOTE_ASC',
  EventIsRemoteDesc = 'EVENT_IS_REMOTE_DESC',
  EventLocationAsc = 'EVENT_LOCATION_ASC',
  EventLocationDesc = 'EVENT_LOCATION_DESC',
  EventNameAsc = 'EVENT_NAME_ASC',
  EventNameDesc = 'EVENT_NAME_DESC',
  EventSlugAsc = 'EVENT_SLUG_ASC',
  EventSlugDesc = 'EVENT_SLUG_DESC',
  EventStartAsc = 'EVENT_START_ASC',
  EventStartDesc = 'EVENT_START_DESC',
  EventUrlAsc = 'EVENT_URL_ASC',
  EventUrlDesc = 'EVENT_URL_DESC',
  EventVisibilityAsc = 'EVENT_VISIBILITY_ASC',
  EventVisibilityDesc = 'EVENT_VISIBILITY_DESC',
  InvitationContactIdAsc = 'INVITATION_CONTACT_ID_ASC',
  InvitationContactIdDesc = 'INVITATION_CONTACT_ID_DESC',
  InvitationEventIdAsc = 'INVITATION_EVENT_ID_ASC',
  InvitationEventIdDesc = 'INVITATION_EVENT_ID_DESC',
  InvitationFeedbackAsc = 'INVITATION_FEEDBACK_ASC',
  InvitationFeedbackDesc = 'INVITATION_FEEDBACK_DESC',
  InvitationFeedbackPaperAsc = 'INVITATION_FEEDBACK_PAPER_ASC',
  InvitationFeedbackPaperDesc = 'INVITATION_FEEDBACK_PAPER_DESC',
  InvitationIdAsc = 'INVITATION_ID_ASC',
  InvitationIdDesc = 'INVITATION_ID_DESC',
  Natural = 'NATURAL',
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
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
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
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UpdatedByAsc = 'UPDATED_BY_ASC',
  UpdatedByDesc = 'UPDATED_BY_DESC',
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

/** Supported ISO 639 language codes. */
export enum Language {
  De = 'DE',
  En = 'EN',
}

/** Legal terms like privacy policies or terms of service. */
export type LegalTerm = Node & {
  __typename?: 'LegalTerm'
  /** Timestamp when the term was created. Set to the current time by default. */
  createdAt: Scalars['Datetime']['output']
  /** Unique identifier for each legal term. */
  id: Scalars['UUID']['output']
  /** Language code in ISO 639-1 format with optional region (e.g., `en` for English, `en_GB` for British English) */
  language: Scalars['String']['output']
  /** Reads and enables pagination through a set of `LegalTermAcceptance`. */
  legalTermAcceptancesByLegalTermId: LegalTermAcceptancesConnection
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Text of the legal term. Markdown is expected to be used. It must be non-empty and cannot exceed 500,000 characters. */
  term: Scalars['String']['output']
  /** Semantic versioning string to track changes to the legal terms (format: `X.Y.Z`). */
  version: Scalars['String']['output']
}

/** Legal terms like privacy policies or terms of service. */
export type LegalTermLegalTermAcceptancesByLegalTermIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<LegalTermAcceptanceCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<LegalTermAcceptancesOrderBy>>
}

export type LegalTermAcceptance = Node & {
  __typename?: 'LegalTermAcceptance'
  /** Reads a single `Account` that is related to this `LegalTermAcceptance`. */
  accountByAccountId?: Maybe<Account>
  /** The user account ID that accepted the legal terms. If the account is deleted, this acceptance record will also be deleted. */
  accountId: Scalars['UUID']['output']
  /** Timestamp showing when the legal terms were accepted, set automatically at the time of acceptance. */
  createdAt: Scalars['Datetime']['output']
  /** Unique identifier for this legal term acceptance record. Automatically generated for each new acceptance. */
  id: Scalars['UUID']['output']
  /** Reads a single `LegalTerm` that is related to this `LegalTermAcceptance`. */
  legalTermByLegalTermId?: Maybe<LegalTerm>
  /** The ID of the legal terms that were accepted. Deletion of these legal terms is restricted while they are still referenced in this table. */
  legalTermId: Scalars['UUID']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
}

/**
 * A condition to be used against `LegalTermAcceptance` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type LegalTermAcceptanceCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `legalTermId` field. */
  legalTermId?: InputMaybe<Scalars['UUID']['input']>
}

/** An input for mutations affecting `LegalTermAcceptance` */
export type LegalTermAcceptanceInput = {
  /** The user account ID that accepted the legal terms. If the account is deleted, this acceptance record will also be deleted. */
  accountId: Scalars['UUID']['input']
  /** The ID of the legal terms that were accepted. Deletion of these legal terms is restricted while they are still referenced in this table. */
  legalTermId: Scalars['UUID']['input']
}

/** A connection to a list of `LegalTermAcceptance` values. */
export type LegalTermAcceptancesConnection = {
  __typename?: 'LegalTermAcceptancesConnection'
  /** A list of edges which contains the `LegalTermAcceptance` and cursor to aid in pagination. */
  edges: Array<LegalTermAcceptancesEdge>
  /** A list of `LegalTermAcceptance` objects. */
  nodes: Array<LegalTermAcceptance>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `LegalTermAcceptance` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `LegalTermAcceptance` edge in the connection. */
export type LegalTermAcceptancesEdge = {
  __typename?: 'LegalTermAcceptancesEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `LegalTermAcceptance` at the end of the edge. */
  node: LegalTermAcceptance
}

/** Methods to use when ordering `LegalTermAcceptance`. */
export enum LegalTermAcceptancesOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LegalTermIdAsc = 'LEGAL_TERM_ID_ASC',
  LegalTermIdDesc = 'LEGAL_TERM_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
}

/**
 * A condition to be used against `LegalTerm` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type LegalTermCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `language` field. */
  language?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `term` field. */
  term?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `version` field. */
  version?: InputMaybe<Scalars['String']['input']>
}

/** A connection to a list of `LegalTerm` values. */
export type LegalTermsConnection = {
  __typename?: 'LegalTermsConnection'
  /** A list of edges which contains the `LegalTerm` and cursor to aid in pagination. */
  edges: Array<LegalTermsEdge>
  /** A list of `LegalTerm` objects. */
  nodes: Array<LegalTerm>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `LegalTerm` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `LegalTerm` edge in the connection. */
export type LegalTermsEdge = {
  __typename?: 'LegalTermsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `LegalTerm` at the end of the edge. */
  node: LegalTerm
}

/** Methods to use when ordering `LegalTerm`. */
export enum LegalTermsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LanguageAsc = 'LANGUAGE_ASC',
  LanguageDesc = 'LANGUAGE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TermAsc = 'TERM_ASC',
  TermDesc = 'TERM_DESC',
  VersionAsc = 'VERSION_ASC',
  VersionDesc = 'VERSION_DESC',
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
  /** Creates a single `AccountInterest`. */
  createAccountInterest?: Maybe<CreateAccountInterestPayload>
  /** Creates a single `AccountPreferenceEventSize`. */
  createAccountPreferenceEventSize?: Maybe<CreateAccountPreferenceEventSizePayload>
  /** Creates a single `AccountSocialNetwork`. */
  createAccountSocialNetwork?: Maybe<CreateAccountSocialNetworkPayload>
  /** Creates a single `Achievement`. */
  createAchievement?: Maybe<CreateAchievementPayload>
  /** Creates a single `Contact`. */
  createContact?: Maybe<CreateContactPayload>
  /** Creates a single `Event`. */
  createEvent?: Maybe<CreateEventPayload>
  /** Creates a single `EventCategory`. */
  createEventCategory?: Maybe<CreateEventCategoryPayload>
  /** Creates a single `EventCategoryMapping`. */
  createEventCategoryMapping?: Maybe<CreateEventCategoryMappingPayload>
  /** Creates a single `EventGroup`. */
  createEventGroup?: Maybe<CreateEventGroupPayload>
  /** Creates a single `EventGrouping`. */
  createEventGrouping?: Maybe<CreateEventGroupingPayload>
  /** Creates a single `EventRecommendation`. */
  createEventRecommendation?: Maybe<CreateEventRecommendationPayload>
  /** Creates a single `EventUpload`. */
  createEventUpload?: Maybe<CreateEventUploadPayload>
  /** Creates a single `Invitation`. */
  createInvitation?: Maybe<CreateInvitationPayload>
  /** Creates a single `LegalTermAcceptance`. */
  createLegalTermAcceptance?: Maybe<CreateLegalTermAcceptancePayload>
  /** Creates a single `ProfilePicture`. */
  createProfilePicture?: Maybe<CreateProfilePicturePayload>
  /** Creates a single `Report`. */
  createReport?: Maybe<CreateReportPayload>
  /** Creates a single `Upload`. */
  createUpload?: Maybe<CreateUploadPayload>
  /** Deletes a single `Account` using its globally unique id. */
  deleteAccount?: Maybe<DeleteAccountPayload>
  /** Deletes a single `Account` using a unique key. */
  deleteAccountById?: Maybe<DeleteAccountPayload>
  /** Deletes a single `Account` using a unique key. */
  deleteAccountByUsername?: Maybe<DeleteAccountPayload>
  /** Deletes a single `AccountInterest` using its globally unique id. */
  deleteAccountInterest?: Maybe<DeleteAccountInterestPayload>
  /** Deletes a single `AccountInterest` using a unique key. */
  deleteAccountInterestByAccountIdAndCategory?: Maybe<DeleteAccountInterestPayload>
  /** Deletes a single `AccountPreferenceEventSize` using its globally unique id. */
  deleteAccountPreferenceEventSize?: Maybe<DeleteAccountPreferenceEventSizePayload>
  /** Deletes a single `AccountPreferenceEventSize` using a unique key. */
  deleteAccountPreferenceEventSizeByAccountIdAndEventSize?: Maybe<DeleteAccountPreferenceEventSizePayload>
  /** Deletes a single `AccountSocialNetwork` using its globally unique id. */
  deleteAccountSocialNetwork?: Maybe<DeleteAccountSocialNetworkPayload>
  /** Deletes a single `AccountSocialNetwork` using a unique key. */
  deleteAccountSocialNetworkByAccountIdAndSocialNetwork?: Maybe<DeleteAccountSocialNetworkPayload>
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
  /** Deletes a single `EventCategory` using its globally unique id. */
  deleteEventCategory?: Maybe<DeleteEventCategoryPayload>
  /** Deletes a single `EventCategory` using a unique key. */
  deleteEventCategoryByCategory?: Maybe<DeleteEventCategoryPayload>
  /** Deletes a single `EventCategoryMapping` using its globally unique id. */
  deleteEventCategoryMapping?: Maybe<DeleteEventCategoryMappingPayload>
  /** Deletes a single `EventCategoryMapping` using a unique key. */
  deleteEventCategoryMappingByEventIdAndCategory?: Maybe<DeleteEventCategoryMappingPayload>
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
  /** Deletes a single `EventRecommendation` using its globally unique id. */
  deleteEventRecommendation?: Maybe<DeleteEventRecommendationPayload>
  /** Deletes a single `EventRecommendation` using a unique key. */
  deleteEventRecommendationByAccountIdAndEventId?: Maybe<DeleteEventRecommendationPayload>
  /** Deletes a single `EventUpload` using its globally unique id. */
  deleteEventUpload?: Maybe<DeleteEventUploadPayload>
  /** Deletes a single `EventUpload` using a unique key. */
  deleteEventUploadByEventIdAndUploadId?: Maybe<DeleteEventUploadPayload>
  /** Deletes a single `EventUpload` using a unique key. */
  deleteEventUploadById?: Maybe<DeleteEventUploadPayload>
  /** Deletes a single `Invitation` using its globally unique id. */
  deleteInvitation?: Maybe<DeleteInvitationPayload>
  /** Deletes a single `Invitation` using a unique key. */
  deleteInvitationByEventIdAndContactId?: Maybe<DeleteInvitationPayload>
  /** Deletes a single `Invitation` using a unique key. */
  deleteInvitationById?: Maybe<DeleteInvitationPayload>
  /** Deletes a single `LegalTermAcceptance` using its globally unique id. */
  deleteLegalTermAcceptance?: Maybe<DeleteLegalTermAcceptancePayload>
  /** Deletes a single `LegalTermAcceptance` using a unique key. */
  deleteLegalTermAcceptanceById?: Maybe<DeleteLegalTermAcceptancePayload>
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
  /** Updates a single `AccountInterest` using its globally unique id and a patch. */
  updateAccountInterest?: Maybe<UpdateAccountInterestPayload>
  /** Updates a single `AccountInterest` using a unique key and a patch. */
  updateAccountInterestByAccountIdAndCategory?: Maybe<UpdateAccountInterestPayload>
  /** Updates a single `AccountPreferenceEventSize` using its globally unique id and a patch. */
  updateAccountPreferenceEventSize?: Maybe<UpdateAccountPreferenceEventSizePayload>
  /** Updates a single `AccountPreferenceEventSize` using a unique key and a patch. */
  updateAccountPreferenceEventSizeByAccountIdAndEventSize?: Maybe<UpdateAccountPreferenceEventSizePayload>
  /** Updates a single `AccountSocialNetwork` using its globally unique id and a patch. */
  updateAccountSocialNetwork?: Maybe<UpdateAccountSocialNetworkPayload>
  /** Updates a single `AccountSocialNetwork` using a unique key and a patch. */
  updateAccountSocialNetworkByAccountIdAndSocialNetwork?: Maybe<UpdateAccountSocialNetworkPayload>
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
  /** Updates a single `EventCategory` using its globally unique id and a patch. */
  updateEventCategory?: Maybe<UpdateEventCategoryPayload>
  /** Updates a single `EventCategory` using a unique key and a patch. */
  updateEventCategoryByCategory?: Maybe<UpdateEventCategoryPayload>
  /** Updates a single `EventCategoryMapping` using its globally unique id and a patch. */
  updateEventCategoryMapping?: Maybe<UpdateEventCategoryMappingPayload>
  /** Updates a single `EventCategoryMapping` using a unique key and a patch. */
  updateEventCategoryMappingByEventIdAndCategory?: Maybe<UpdateEventCategoryMappingPayload>
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
  /** Updates a single `EventRecommendation` using its globally unique id and a patch. */
  updateEventRecommendation?: Maybe<UpdateEventRecommendationPayload>
  /** Updates a single `EventRecommendation` using a unique key and a patch. */
  updateEventRecommendationByAccountIdAndEventId?: Maybe<UpdateEventRecommendationPayload>
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
export type MutationCreateAccountInterestArgs = {
  input: CreateAccountInterestInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAccountPreferenceEventSizeArgs = {
  input: CreateAccountPreferenceEventSizeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAccountSocialNetworkArgs = {
  input: CreateAccountSocialNetworkInput
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
export type MutationCreateEventCategoryArgs = {
  input: CreateEventCategoryInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEventCategoryMappingArgs = {
  input: CreateEventCategoryMappingInput
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
export type MutationCreateEventRecommendationArgs = {
  input: CreateEventRecommendationInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEventUploadArgs = {
  input: CreateEventUploadInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateInvitationArgs = {
  input: CreateInvitationInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateLegalTermAcceptanceArgs = {
  input: CreateLegalTermAcceptanceInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProfilePictureArgs = {
  input: CreateProfilePictureInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateReportArgs = {
  input: CreateReportInput
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
export type MutationDeleteAccountInterestArgs = {
  input: DeleteAccountInterestInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountInterestByAccountIdAndCategoryArgs = {
  input: DeleteAccountInterestByAccountIdAndCategoryInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountPreferenceEventSizeArgs = {
  input: DeleteAccountPreferenceEventSizeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountPreferenceEventSizeByAccountIdAndEventSizeArgs =
  {
    input: DeleteAccountPreferenceEventSizeByAccountIdAndEventSizeInput
  }

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountSocialNetworkArgs = {
  input: DeleteAccountSocialNetworkInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountSocialNetworkByAccountIdAndSocialNetworkArgs =
  {
    input: DeleteAccountSocialNetworkByAccountIdAndSocialNetworkInput
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
export type MutationDeleteEventCategoryArgs = {
  input: DeleteEventCategoryInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventCategoryByCategoryArgs = {
  input: DeleteEventCategoryByCategoryInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventCategoryMappingArgs = {
  input: DeleteEventCategoryMappingInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventCategoryMappingByEventIdAndCategoryArgs = {
  input: DeleteEventCategoryMappingByEventIdAndCategoryInput
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
export type MutationDeleteEventRecommendationArgs = {
  input: DeleteEventRecommendationInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventRecommendationByAccountIdAndEventIdArgs = {
  input: DeleteEventRecommendationByAccountIdAndEventIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventUploadArgs = {
  input: DeleteEventUploadInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventUploadByEventIdAndUploadIdArgs = {
  input: DeleteEventUploadByEventIdAndUploadIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventUploadByIdArgs = {
  input: DeleteEventUploadByIdInput
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
export type MutationDeleteLegalTermAcceptanceArgs = {
  input: DeleteLegalTermAcceptanceInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLegalTermAcceptanceByIdArgs = {
  input: DeleteLegalTermAcceptanceByIdInput
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
export type MutationUpdateAccountInterestArgs = {
  input: UpdateAccountInterestInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountInterestByAccountIdAndCategoryArgs = {
  input: UpdateAccountInterestByAccountIdAndCategoryInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountPreferenceEventSizeArgs = {
  input: UpdateAccountPreferenceEventSizeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountPreferenceEventSizeByAccountIdAndEventSizeArgs =
  {
    input: UpdateAccountPreferenceEventSizeByAccountIdAndEventSizeInput
  }

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountSocialNetworkArgs = {
  input: UpdateAccountSocialNetworkInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountSocialNetworkByAccountIdAndSocialNetworkArgs =
  {
    input: UpdateAccountSocialNetworkByAccountIdAndSocialNetworkInput
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
export type MutationUpdateEventCategoryArgs = {
  input: UpdateEventCategoryInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventCategoryByCategoryArgs = {
  input: UpdateEventCategoryByCategoryInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventCategoryMappingArgs = {
  input: UpdateEventCategoryMappingInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventCategoryMappingByEventIdAndCategoryArgs = {
  input: UpdateEventCategoryMappingByEventIdAndCategoryInput
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
export type MutationUpdateEventRecommendationArgs = {
  input: UpdateEventRecommendationInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventRecommendationByAccountIdAndEventIdArgs = {
  input: UpdateEventRecommendationByAccountIdAndEventIdInput
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
  /** Reads a single `AccountInterest` using its globally unique `ID`. */
  accountInterest?: Maybe<AccountInterest>
  accountInterestByAccountIdAndCategory?: Maybe<AccountInterest>
  /** Reads a single `AccountPreferenceEventSize` using its globally unique `ID`. */
  accountPreferenceEventSize?: Maybe<AccountPreferenceEventSize>
  accountPreferenceEventSizeByAccountIdAndEventSize?: Maybe<AccountPreferenceEventSize>
  /** Reads a single `AccountSocialNetwork` using its globally unique `ID`. */
  accountSocialNetwork?: Maybe<AccountSocialNetwork>
  accountSocialNetworkByAccountIdAndSocialNetwork?: Maybe<AccountSocialNetwork>
  /** Gets the total upload quota in bytes for the invoking account. */
  accountUploadQuotaBytes?: Maybe<Scalars['BigInt']['output']>
  /** Reads a single `Achievement` using its globally unique `ID`. */
  achievement?: Maybe<Achievement>
  achievementByAccountIdAndAchievement?: Maybe<Achievement>
  achievementById?: Maybe<Achievement>
  /** Reads and enables pagination through a set of `AccountInterest`. */
  allAccountInterests?: Maybe<AccountInterestsConnection>
  /** Reads and enables pagination through a set of `AccountPreferenceEventSize`. */
  allAccountPreferenceEventSizes?: Maybe<AccountPreferenceEventSizesConnection>
  /** Reads and enables pagination through a set of `AccountSocialNetwork`. */
  allAccountSocialNetworks?: Maybe<AccountSocialNetworksConnection>
  /** Reads and enables pagination through a set of `Account`. */
  allAccounts?: Maybe<AccountsConnection>
  /** Reads and enables pagination through a set of `Achievement`. */
  allAchievements?: Maybe<AchievementsConnection>
  /** Reads and enables pagination through a set of `Contact`. */
  allContacts?: Maybe<ContactsConnection>
  /** Reads and enables pagination through a set of `EventCategory`. */
  allEventCategories?: Maybe<EventCategoriesConnection>
  /** Reads and enables pagination through a set of `EventCategoryMapping`. */
  allEventCategoryMappings?: Maybe<EventCategoryMappingsConnection>
  /** Reads and enables pagination through a set of `EventGrouping`. */
  allEventGroupings?: Maybe<EventGroupingsConnection>
  /** Reads and enables pagination through a set of `EventGroup`. */
  allEventGroups?: Maybe<EventGroupsConnection>
  /** Reads and enables pagination through a set of `EventRecommendation`. */
  allEventRecommendations?: Maybe<EventRecommendationsConnection>
  /** Reads and enables pagination through a set of `EventUpload`. */
  allEventUploads?: Maybe<EventUploadsConnection>
  /** Reads and enables pagination through a set of `Event`. */
  allEvents?: Maybe<EventsConnection>
  /** Reads and enables pagination through a set of `InvitationFlat`. */
  allInvitationFlats?: Maybe<InvitationFlatsConnection>
  /** Reads and enables pagination through a set of `Invitation`. */
  allInvitations?: Maybe<InvitationsConnection>
  /** Reads and enables pagination through a set of `LegalTermAcceptance`. */
  allLegalTermAcceptances?: Maybe<LegalTermAcceptancesConnection>
  /** Reads and enables pagination through a set of `LegalTerm`. */
  allLegalTerms?: Maybe<LegalTermsConnection>
  /** Reads and enables pagination through a set of `ProfilePicture`. */
  allProfilePictures?: Maybe<ProfilePicturesConnection>
  /** Reads and enables pagination through a set of `Report`. */
  allReports?: Maybe<ReportsConnection>
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
  /** Reads a single `EventCategory` using its globally unique `ID`. */
  eventCategory?: Maybe<EventCategory>
  eventCategoryByCategory?: Maybe<EventCategory>
  /** Reads a single `EventCategoryMapping` using its globally unique `ID`. */
  eventCategoryMapping?: Maybe<EventCategoryMapping>
  eventCategoryMappingByEventIdAndCategory?: Maybe<EventCategoryMapping>
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
  /** Reads a single `EventRecommendation` using its globally unique `ID`. */
  eventRecommendation?: Maybe<EventRecommendation>
  eventRecommendationByAccountIdAndEventId?: Maybe<EventRecommendation>
  /** Reads a single `EventUpload` using its globally unique `ID`. */
  eventUpload?: Maybe<EventUpload>
  eventUploadByEventIdAndUploadId?: Maybe<EventUpload>
  eventUploadById?: Maybe<EventUpload>
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
  /** Returns the session's account id. */
  invokerAccountId?: Maybe<Scalars['UUID']['output']>
  /** Reads a single `LegalTerm` using its globally unique `ID`. */
  legalTerm?: Maybe<LegalTerm>
  /** Reads a single `LegalTermAcceptance` using its globally unique `ID`. */
  legalTermAcceptance?: Maybe<LegalTermAcceptance>
  legalTermAcceptanceById?: Maybe<LegalTermAcceptance>
  legalTermById?: Maybe<LegalTerm>
  legalTermByLanguageAndVersion?: Maybe<LegalTerm>
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
  /** Reads a single `Report` using its globally unique `ID`. */
  report?: Maybe<Report>
  reportByAuthorAccountIdAndTargetAccountIdAndTargetEventIdAndTargetUploadId?: Maybe<Report>
  reportById?: Maybe<Report>
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
export type QueryAccountInterestArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryAccountInterestByAccountIdAndCategoryArgs = {
  accountId: Scalars['UUID']['input']
  category: Scalars['String']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryAccountPreferenceEventSizeArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryAccountPreferenceEventSizeByAccountIdAndEventSizeArgs = {
  accountId: Scalars['UUID']['input']
  eventSize: EventSize
}

/** The root query type which gives access points into the data universe. */
export type QueryAccountSocialNetworkArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryAccountSocialNetworkByAccountIdAndSocialNetworkArgs = {
  accountId: Scalars['UUID']['input']
  socialNetwork: SocialNetwork
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
export type QueryAllAccountInterestsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<AccountInterestCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<AccountInterestsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllAccountPreferenceEventSizesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<AccountPreferenceEventSizeCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<AccountPreferenceEventSizesOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllAccountSocialNetworksArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<AccountSocialNetworkCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<AccountSocialNetworksOrderBy>>
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
export type QueryAllEventCategoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventCategoryCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventCategoriesOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllEventCategoryMappingsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventCategoryMappingCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventCategoryMappingsOrderBy>>
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
export type QueryAllEventRecommendationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventRecommendationCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventRecommendationsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllEventUploadsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventUploadCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventUploadsOrderBy>>
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
export type QueryAllInvitationFlatsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<InvitationFlatCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<InvitationFlatsOrderBy>>
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
export type QueryAllLegalTermAcceptancesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<LegalTermAcceptanceCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<LegalTermAcceptancesOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllLegalTermsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<LegalTermCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<LegalTermsOrderBy>>
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
export type QueryAllReportsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<ReportCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ReportsOrderBy>>
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
export type QueryEventCategoryArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventCategoryByCategoryArgs = {
  category: Scalars['String']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventCategoryMappingArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventCategoryMappingByEventIdAndCategoryArgs = {
  category: Scalars['String']['input']
  eventId: Scalars['UUID']['input']
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
export type QueryEventRecommendationArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventRecommendationByAccountIdAndEventIdArgs = {
  accountId: Scalars['UUID']['input']
  eventId: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventUploadArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventUploadByEventIdAndUploadIdArgs = {
  eventId: Scalars['UUID']['input']
  uploadId: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventUploadByIdArgs = {
  id: Scalars['UUID']['input']
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
export type QueryLegalTermArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryLegalTermAcceptanceArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryLegalTermAcceptanceByIdArgs = {
  id: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryLegalTermByIdArgs = {
  id: Scalars['UUID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryLegalTermByLanguageAndVersionArgs = {
  language: Scalars['String']['input']
  version: Scalars['String']['input']
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
export type QueryReportArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryReportByAuthorAccountIdAndTargetAccountIdAndTargetEventIdAndTargetUploadIdArgs =
  {
    authorAccountId: Scalars['UUID']['input']
    targetAccountId: Scalars['UUID']['input']
    targetEventId: Scalars['UUID']['input']
    targetUploadId: Scalars['UUID']['input']
  }

/** The root query type which gives access points into the data universe. */
export type QueryReportByIdArgs = {
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

/** Stores reports made by users on other users, events, or uploads for moderation purposes. */
export type Report = Node & {
  __typename?: 'Report'
  /** Reads a single `Account` that is related to this `Report`. */
  accountByAuthorAccountId?: Maybe<Account>
  /** Reads a single `Account` that is related to this `Report`. */
  accountByTargetAccountId?: Maybe<Account>
  /** The ID of the user who created the report. */
  authorAccountId: Scalars['UUID']['output']
  /** Timestamp of when the report was created, defaults to the current timestamp. */
  createdAt: Scalars['Datetime']['output']
  /** Reads a single `Event` that is related to this `Report`. */
  eventByTargetEventId?: Maybe<Event>
  /** Unique identifier for the report, generated randomly using UUIDs. */
  id: Scalars['UUID']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** The reason for the report, provided by the reporting user. Must be non-empty and less than 2000 characters. */
  reason: Scalars['String']['output']
  /** The ID of the account being reported, if applicable. */
  targetAccountId?: Maybe<Scalars['UUID']['output']>
  /** The ID of the event being reported, if applicable. */
  targetEventId?: Maybe<Scalars['UUID']['output']>
  /** The ID of the upload being reported, if applicable. */
  targetUploadId?: Maybe<Scalars['UUID']['output']>
  /** Reads a single `Upload` that is related to this `Report`. */
  uploadByTargetUploadId?: Maybe<Upload>
}

/** A condition to be used against `Report` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ReportCondition = {
  /** Checks for equality with the object’s `authorAccountId` field. */
  authorAccountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `reason` field. */
  reason?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `targetAccountId` field. */
  targetAccountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `targetEventId` field. */
  targetEventId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `targetUploadId` field. */
  targetUploadId?: InputMaybe<Scalars['UUID']['input']>
}

/** An input for mutations affecting `Report` */
export type ReportInput = {
  /** The ID of the user who created the report. */
  authorAccountId: Scalars['UUID']['input']
  /** The reason for the report, provided by the reporting user. Must be non-empty and less than 2000 characters. */
  reason: Scalars['String']['input']
  /** The ID of the account being reported, if applicable. */
  targetAccountId?: InputMaybe<Scalars['UUID']['input']>
  /** The ID of the event being reported, if applicable. */
  targetEventId?: InputMaybe<Scalars['UUID']['input']>
  /** The ID of the upload being reported, if applicable. */
  targetUploadId?: InputMaybe<Scalars['UUID']['input']>
}

/** A connection to a list of `Report` values. */
export type ReportsConnection = {
  __typename?: 'ReportsConnection'
  /** A list of edges which contains the `Report` and cursor to aid in pagination. */
  edges: Array<ReportsEdge>
  /** A list of `Report` objects. */
  nodes: Array<Report>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Report` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `Report` edge in the connection. */
export type ReportsEdge = {
  __typename?: 'ReportsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `Report` at the end of the edge. */
  node: Report
}

/** Methods to use when ordering `Report`. */
export enum ReportsOrderBy {
  AuthorAccountIdAsc = 'AUTHOR_ACCOUNT_ID_ASC',
  AuthorAccountIdDesc = 'AUTHOR_ACCOUNT_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReasonAsc = 'REASON_ASC',
  ReasonDesc = 'REASON_DESC',
  TargetAccountIdAsc = 'TARGET_ACCOUNT_ID_ASC',
  TargetAccountIdDesc = 'TARGET_ACCOUNT_ID_DESC',
  TargetEventIdAsc = 'TARGET_EVENT_ID_ASC',
  TargetEventIdDesc = 'TARGET_EVENT_ID_DESC',
  TargetUploadIdAsc = 'TARGET_UPLOAD_ID_ASC',
  TargetUploadIdDesc = 'TARGET_UPLOAD_ID_DESC',
}

/** Social networks. */
export enum SocialNetwork {
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  Tiktok = 'TIKTOK',
  X = 'X',
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

/** All input for the `updateAccountInterestByAccountIdAndCategory` mutation. */
export type UpdateAccountInterestByAccountIdAndCategoryInput = {
  /** A user account id. */
  accountId: Scalars['UUID']['input']
  /** An object where the defined keys will be set on the `AccountInterest` being updated. */
  accountInterestPatch: AccountInterestPatch
  /** An event category. */
  category: Scalars['String']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** All input for the `updateAccountInterest` mutation. */
export type UpdateAccountInterestInput = {
  /** An object where the defined keys will be set on the `AccountInterest` being updated. */
  accountInterestPatch: AccountInterestPatch
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `AccountInterest` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `AccountInterest` mutation. */
export type UpdateAccountInterestPayload = {
  __typename?: 'UpdateAccountInterestPayload'
  /** Reads a single `Account` that is related to this `AccountInterest`. */
  accountByAccountId?: Maybe<Account>
  /** The `AccountInterest` that was updated by this mutation. */
  accountInterest?: Maybe<AccountInterest>
  /** An edge for our `AccountInterest`. May be used by Relay 1. */
  accountInterestEdge?: Maybe<AccountInterestsEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `EventCategory` that is related to this `AccountInterest`. */
  eventCategoryByCategory?: Maybe<EventCategory>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `AccountInterest` mutation. */
export type UpdateAccountInterestPayloadAccountInterestEdgeArgs = {
  orderBy?: InputMaybe<Array<AccountInterestsOrderBy>>
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

/** All input for the `updateAccountPreferenceEventSizeByAccountIdAndEventSize` mutation. */
export type UpdateAccountPreferenceEventSizeByAccountIdAndEventSizeInput = {
  /** The account's internal id. */
  accountId: Scalars['UUID']['input']
  /** An object where the defined keys will be set on the `AccountPreferenceEventSize` being updated. */
  accountPreferenceEventSizePatch: AccountPreferenceEventSizePatch
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** A preferred event sized */
  eventSize: EventSize
}

/** All input for the `updateAccountPreferenceEventSize` mutation. */
export type UpdateAccountPreferenceEventSizeInput = {
  /** An object where the defined keys will be set on the `AccountPreferenceEventSize` being updated. */
  accountPreferenceEventSizePatch: AccountPreferenceEventSizePatch
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `AccountPreferenceEventSize` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `AccountPreferenceEventSize` mutation. */
export type UpdateAccountPreferenceEventSizePayload = {
  __typename?: 'UpdateAccountPreferenceEventSizePayload'
  /** Reads a single `Account` that is related to this `AccountPreferenceEventSize`. */
  accountByAccountId?: Maybe<Account>
  /** The `AccountPreferenceEventSize` that was updated by this mutation. */
  accountPreferenceEventSize?: Maybe<AccountPreferenceEventSize>
  /** An edge for our `AccountPreferenceEventSize`. May be used by Relay 1. */
  accountPreferenceEventSizeEdge?: Maybe<AccountPreferenceEventSizesEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `AccountPreferenceEventSize` mutation. */
export type UpdateAccountPreferenceEventSizePayloadAccountPreferenceEventSizeEdgeArgs =
  {
    orderBy?: InputMaybe<Array<AccountPreferenceEventSizesOrderBy>>
  }

/** All input for the `updateAccountSocialNetworkByAccountIdAndSocialNetwork` mutation. */
export type UpdateAccountSocialNetworkByAccountIdAndSocialNetworkInput = {
  /** The unique identifier of the account. */
  accountId: Scalars['UUID']['input']
  /** An object where the defined keys will be set on the `AccountSocialNetwork` being updated. */
  accountSocialNetworkPatch: AccountSocialNetworkPatch
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The social network to which the account is linked. */
  socialNetwork: SocialNetwork
}

/** All input for the `updateAccountSocialNetwork` mutation. */
export type UpdateAccountSocialNetworkInput = {
  /** An object where the defined keys will be set on the `AccountSocialNetwork` being updated. */
  accountSocialNetworkPatch: AccountSocialNetworkPatch
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `AccountSocialNetwork` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `AccountSocialNetwork` mutation. */
export type UpdateAccountSocialNetworkPayload = {
  __typename?: 'UpdateAccountSocialNetworkPayload'
  /** Reads a single `Account` that is related to this `AccountSocialNetwork`. */
  accountByAccountId?: Maybe<Account>
  /** The `AccountSocialNetwork` that was updated by this mutation. */
  accountSocialNetwork?: Maybe<AccountSocialNetwork>
  /** An edge for our `AccountSocialNetwork`. May be used by Relay 1. */
  accountSocialNetworkEdge?: Maybe<AccountSocialNetworksEdge>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `AccountSocialNetwork` mutation. */
export type UpdateAccountSocialNetworkPayloadAccountSocialNetworkEdgeArgs = {
  orderBy?: InputMaybe<Array<AccountSocialNetworksOrderBy>>
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

/** All input for the `updateEventCategoryByCategory` mutation. */
export type UpdateEventCategoryByCategoryInput = {
  /** A category name. */
  category: Scalars['String']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `EventCategory` being updated. */
  eventCategoryPatch: EventCategoryPatch
}

/** All input for the `updateEventCategory` mutation. */
export type UpdateEventCategoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `EventCategory` being updated. */
  eventCategoryPatch: EventCategoryPatch
  /** The globally unique `ID` which will identify a single `EventCategory` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** All input for the `updateEventCategoryMappingByEventIdAndCategory` mutation. */
export type UpdateEventCategoryMappingByEventIdAndCategoryInput = {
  /** A category name. */
  category: Scalars['String']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `EventCategoryMapping` being updated. */
  eventCategoryMappingPatch: EventCategoryMappingPatch
  /** An event id. */
  eventId: Scalars['UUID']['input']
}

/** All input for the `updateEventCategoryMapping` mutation. */
export type UpdateEventCategoryMappingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `EventCategoryMapping` being updated. */
  eventCategoryMappingPatch: EventCategoryMappingPatch
  /** The globally unique `ID` which will identify a single `EventCategoryMapping` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `EventCategoryMapping` mutation. */
export type UpdateEventCategoryMappingPayload = {
  __typename?: 'UpdateEventCategoryMappingPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Event` that is related to this `EventCategoryMapping`. */
  eventByEventId?: Maybe<Event>
  /** Reads a single `EventCategory` that is related to this `EventCategoryMapping`. */
  eventCategoryByCategory?: Maybe<EventCategory>
  /** The `EventCategoryMapping` that was updated by this mutation. */
  eventCategoryMapping?: Maybe<EventCategoryMapping>
  /** An edge for our `EventCategoryMapping`. May be used by Relay 1. */
  eventCategoryMappingEdge?: Maybe<EventCategoryMappingsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `EventCategoryMapping` mutation. */
export type UpdateEventCategoryMappingPayloadEventCategoryMappingEdgeArgs = {
  orderBy?: InputMaybe<Array<EventCategoryMappingsOrderBy>>
}

/** The output of our update `EventCategory` mutation. */
export type UpdateEventCategoryPayload = {
  __typename?: 'UpdateEventCategoryPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `EventCategory` that was updated by this mutation. */
  eventCategory?: Maybe<EventCategory>
  /** An edge for our `EventCategory`. May be used by Relay 1. */
  eventCategoryEdge?: Maybe<EventCategoriesEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `EventCategory` mutation. */
export type UpdateEventCategoryPayloadEventCategoryEdgeArgs = {
  orderBy?: InputMaybe<Array<EventCategoriesOrderBy>>
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

/** All input for the `updateEventRecommendationByAccountIdAndEventId` mutation. */
export type UpdateEventRecommendationByAccountIdAndEventIdInput = {
  /** A user account id. */
  accountId: Scalars['UUID']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The predicted score of the recommendation. */
  eventId: Scalars['UUID']['input']
  /** An object where the defined keys will be set on the `EventRecommendation` being updated. */
  eventRecommendationPatch: EventRecommendationPatch
}

/** All input for the `updateEventRecommendation` mutation. */
export type UpdateEventRecommendationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `EventRecommendation` being updated. */
  eventRecommendationPatch: EventRecommendationPatch
  /** The globally unique `ID` which will identify a single `EventRecommendation` to be updated. */
  nodeId: Scalars['ID']['input']
}

/** The output of our update `EventRecommendation` mutation. */
export type UpdateEventRecommendationPayload = {
  __typename?: 'UpdateEventRecommendationPayload'
  /** Reads a single `Account` that is related to this `EventRecommendation`. */
  accountByAccountId?: Maybe<Account>
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Event` that is related to this `EventRecommendation`. */
  eventByEventId?: Maybe<Event>
  /** The `EventRecommendation` that was updated by this mutation. */
  eventRecommendation?: Maybe<EventRecommendation>
  /** An edge for our `EventRecommendation`. May be used by Relay 1. */
  eventRecommendationEdge?: Maybe<EventRecommendationsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `EventRecommendation` mutation. */
export type UpdateEventRecommendationPayloadEventRecommendationEdgeArgs = {
  orderBy?: InputMaybe<Array<EventRecommendationsOrderBy>>
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
  /** Reads a single `Account` that is related to this `Invitation`. */
  accountByUpdatedBy?: Maybe<Account>
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
  /** Timestamp of when the upload was created, defaults to the current timestamp. */
  createdAt: Scalars['Datetime']['output']
  /** Reads and enables pagination through a set of `EventUpload`. */
  eventUploadsByUploadId: EventUploadsConnection
  /** The upload's internal id. */
  id: Scalars['UUID']['output']
  /** The name of the uploaded file. */
  name?: Maybe<Scalars['String']['output']>
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads and enables pagination through a set of `ProfilePicture`. */
  profilePicturesByUploadId: ProfilePicturesConnection
  /** Reads and enables pagination through a set of `Report`. */
  reportsByTargetUploadId: ReportsConnection
  /** The upload's size in bytes. */
  sizeByte: Scalars['BigInt']['output']
  /** The upload's storage key. */
  storageKey?: Maybe<Scalars['String']['output']>
  /** The type of the uploaded file, default is 'image'. */
  type: Scalars['String']['output']
}

/** An upload. */
export type UploadEventUploadsByUploadIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<EventUploadCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EventUploadsOrderBy>>
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

/** An upload. */
export type UploadReportsByTargetUploadIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<ReportCondition>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ReportsOrderBy>>
}

/** A condition to be used against `Upload` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UploadCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `sizeByte` field. */
  sizeByte?: InputMaybe<Scalars['BigInt']['input']>
  /** Checks for equality with the object’s `storageKey` field. */
  storageKey?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>
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
  /** The name of the uploaded file. */
  name?: InputMaybe<Scalars['String']['input']>
  /** The upload's size in bytes. */
  sizeByte: Scalars['BigInt']['input']
  /** The upload's storage key. */
  storageKey?: InputMaybe<Scalars['String']['input']>
  /** The type of the uploaded file, default is 'image'. */
  type?: InputMaybe<Scalars['String']['input']>
}

/** Represents an update to a `Upload`. Fields that are set will be updated. */
export type UploadPatch = {
  /** The uploader's account id. */
  accountId?: InputMaybe<Scalars['UUID']['input']>
  /** The name of the uploaded file. */
  name?: InputMaybe<Scalars['String']['input']>
  /** The upload's size in bytes. */
  sizeByte?: InputMaybe<Scalars['BigInt']['input']>
  /** The upload's storage key. */
  storageKey?: InputMaybe<Scalars['String']['input']>
  /** The type of the uploaded file, default is 'image'. */
  type?: InputMaybe<Scalars['String']['input']>
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
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SizeByteAsc = 'SIZE_BYTE_ASC',
  SizeByteDesc = 'SIZE_BYTE_DESC',
  StorageKeyAsc = 'STORAGE_KEY_ASC',
  StorageKeyDesc = 'STORAGE_KEY_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
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
  AccountInterest?: (data: WithTypename<AccountInterest>) => null | string
  AccountInterestsConnection?: (
    data: WithTypename<AccountInterestsConnection>,
  ) => null | string
  AccountInterestsEdge?: (
    data: WithTypename<AccountInterestsEdge>,
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
  AccountPreferenceEventSize?: (
    data: WithTypename<AccountPreferenceEventSize>,
  ) => null | string
  AccountPreferenceEventSizesConnection?: (
    data: WithTypename<AccountPreferenceEventSizesConnection>,
  ) => null | string
  AccountPreferenceEventSizesEdge?: (
    data: WithTypename<AccountPreferenceEventSizesEdge>,
  ) => null | string
  AccountRegistrationPayload?: (
    data: WithTypename<AccountRegistrationPayload>,
  ) => null | string
  AccountRegistrationRefreshPayload?: (
    data: WithTypename<AccountRegistrationRefreshPayload>,
  ) => null | string
  AccountSocialNetwork?: (
    data: WithTypename<AccountSocialNetwork>,
  ) => null | string
  AccountSocialNetworksConnection?: (
    data: WithTypename<AccountSocialNetworksConnection>,
  ) => null | string
  AccountSocialNetworksEdge?: (
    data: WithTypename<AccountSocialNetworksEdge>,
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
  CreateAccountInterestPayload?: (
    data: WithTypename<CreateAccountInterestPayload>,
  ) => null | string
  CreateAccountPayload?: (
    data: WithTypename<CreateAccountPayload>,
  ) => null | string
  CreateAccountPreferenceEventSizePayload?: (
    data: WithTypename<CreateAccountPreferenceEventSizePayload>,
  ) => null | string
  CreateAccountSocialNetworkPayload?: (
    data: WithTypename<CreateAccountSocialNetworkPayload>,
  ) => null | string
  CreateAchievementPayload?: (
    data: WithTypename<CreateAchievementPayload>,
  ) => null | string
  CreateContactPayload?: (
    data: WithTypename<CreateContactPayload>,
  ) => null | string
  CreateEventCategoryMappingPayload?: (
    data: WithTypename<CreateEventCategoryMappingPayload>,
  ) => null | string
  CreateEventCategoryPayload?: (
    data: WithTypename<CreateEventCategoryPayload>,
  ) => null | string
  CreateEventGroupPayload?: (
    data: WithTypename<CreateEventGroupPayload>,
  ) => null | string
  CreateEventGroupingPayload?: (
    data: WithTypename<CreateEventGroupingPayload>,
  ) => null | string
  CreateEventPayload?: (data: WithTypename<CreateEventPayload>) => null | string
  CreateEventRecommendationPayload?: (
    data: WithTypename<CreateEventRecommendationPayload>,
  ) => null | string
  CreateEventUploadPayload?: (
    data: WithTypename<CreateEventUploadPayload>,
  ) => null | string
  CreateInvitationPayload?: (
    data: WithTypename<CreateInvitationPayload>,
  ) => null | string
  CreateLegalTermAcceptancePayload?: (
    data: WithTypename<CreateLegalTermAcceptancePayload>,
  ) => null | string
  CreateProfilePicturePayload?: (
    data: WithTypename<CreateProfilePicturePayload>,
  ) => null | string
  CreateReportPayload?: (
    data: WithTypename<CreateReportPayload>,
  ) => null | string
  CreateUploadPayload?: (
    data: WithTypename<CreateUploadPayload>,
  ) => null | string
  DeleteAccountInterestPayload?: (
    data: WithTypename<DeleteAccountInterestPayload>,
  ) => null | string
  DeleteAccountPayload?: (
    data: WithTypename<DeleteAccountPayload>,
  ) => null | string
  DeleteAccountPreferenceEventSizePayload?: (
    data: WithTypename<DeleteAccountPreferenceEventSizePayload>,
  ) => null | string
  DeleteAccountSocialNetworkPayload?: (
    data: WithTypename<DeleteAccountSocialNetworkPayload>,
  ) => null | string
  DeleteAchievementPayload?: (
    data: WithTypename<DeleteAchievementPayload>,
  ) => null | string
  DeleteContactPayload?: (
    data: WithTypename<DeleteContactPayload>,
  ) => null | string
  DeleteEventCategoryMappingPayload?: (
    data: WithTypename<DeleteEventCategoryMappingPayload>,
  ) => null | string
  DeleteEventCategoryPayload?: (
    data: WithTypename<DeleteEventCategoryPayload>,
  ) => null | string
  DeleteEventGroupPayload?: (
    data: WithTypename<DeleteEventGroupPayload>,
  ) => null | string
  DeleteEventGroupingPayload?: (
    data: WithTypename<DeleteEventGroupingPayload>,
  ) => null | string
  DeleteEventPayload?: (data: WithTypename<DeleteEventPayload>) => null | string
  DeleteEventRecommendationPayload?: (
    data: WithTypename<DeleteEventRecommendationPayload>,
  ) => null | string
  DeleteEventUploadPayload?: (
    data: WithTypename<DeleteEventUploadPayload>,
  ) => null | string
  DeleteInvitationPayload?: (
    data: WithTypename<DeleteInvitationPayload>,
  ) => null | string
  DeleteLegalTermAcceptancePayload?: (
    data: WithTypename<DeleteLegalTermAcceptancePayload>,
  ) => null | string
  DeleteProfilePicturePayload?: (
    data: WithTypename<DeleteProfilePicturePayload>,
  ) => null | string
  DeleteUploadPayload?: (
    data: WithTypename<DeleteUploadPayload>,
  ) => null | string
  Event?: (data: WithTypename<Event>) => null | string
  EventCategoriesConnection?: (
    data: WithTypename<EventCategoriesConnection>,
  ) => null | string
  EventCategoriesEdge?: (
    data: WithTypename<EventCategoriesEdge>,
  ) => null | string
  EventCategory?: (data: WithTypename<EventCategory>) => null | string
  EventCategoryMapping?: (
    data: WithTypename<EventCategoryMapping>,
  ) => null | string
  EventCategoryMappingsConnection?: (
    data: WithTypename<EventCategoryMappingsConnection>,
  ) => null | string
  EventCategoryMappingsEdge?: (
    data: WithTypename<EventCategoryMappingsEdge>,
  ) => null | string
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
  EventRecommendation?: (
    data: WithTypename<EventRecommendation>,
  ) => null | string
  EventRecommendationsConnection?: (
    data: WithTypename<EventRecommendationsConnection>,
  ) => null | string
  EventRecommendationsEdge?: (
    data: WithTypename<EventRecommendationsEdge>,
  ) => null | string
  EventUnlockPayload?: (data: WithTypename<EventUnlockPayload>) => null | string
  EventUnlockResponse?: (
    data: WithTypename<EventUnlockResponse>,
  ) => null | string
  EventUpload?: (data: WithTypename<EventUpload>) => null | string
  EventUploadsConnection?: (
    data: WithTypename<EventUploadsConnection>,
  ) => null | string
  EventUploadsEdge?: (data: WithTypename<EventUploadsEdge>) => null | string
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
  InvitationFlat?: (data: WithTypename<InvitationFlat>) => null | string
  InvitationFlatsConnection?: (
    data: WithTypename<InvitationFlatsConnection>,
  ) => null | string
  InvitationFlatsEdge?: (
    data: WithTypename<InvitationFlatsEdge>,
  ) => null | string
  InvitationsConnection?: (
    data: WithTypename<InvitationsConnection>,
  ) => null | string
  InvitationsEdge?: (data: WithTypename<InvitationsEdge>) => null | string
  InvitePayload?: (data: WithTypename<InvitePayload>) => null | string
  JwtRefreshPayload?: (data: WithTypename<JwtRefreshPayload>) => null | string
  LegalTerm?: (data: WithTypename<LegalTerm>) => null | string
  LegalTermAcceptance?: (
    data: WithTypename<LegalTermAcceptance>,
  ) => null | string
  LegalTermAcceptancesConnection?: (
    data: WithTypename<LegalTermAcceptancesConnection>,
  ) => null | string
  LegalTermAcceptancesEdge?: (
    data: WithTypename<LegalTermAcceptancesEdge>,
  ) => null | string
  LegalTermsConnection?: (
    data: WithTypename<LegalTermsConnection>,
  ) => null | string
  LegalTermsEdge?: (data: WithTypename<LegalTermsEdge>) => null | string
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
  Report?: (data: WithTypename<Report>) => null | string
  ReportsConnection?: (data: WithTypename<ReportsConnection>) => null | string
  ReportsEdge?: (data: WithTypename<ReportsEdge>) => null | string
  UpdateAccountInterestPayload?: (
    data: WithTypename<UpdateAccountInterestPayload>,
  ) => null | string
  UpdateAccountPayload?: (
    data: WithTypename<UpdateAccountPayload>,
  ) => null | string
  UpdateAccountPreferenceEventSizePayload?: (
    data: WithTypename<UpdateAccountPreferenceEventSizePayload>,
  ) => null | string
  UpdateAccountSocialNetworkPayload?: (
    data: WithTypename<UpdateAccountSocialNetworkPayload>,
  ) => null | string
  UpdateAchievementPayload?: (
    data: WithTypename<UpdateAchievementPayload>,
  ) => null | string
  UpdateContactPayload?: (
    data: WithTypename<UpdateContactPayload>,
  ) => null | string
  UpdateEventCategoryMappingPayload?: (
    data: WithTypename<UpdateEventCategoryMappingPayload>,
  ) => null | string
  UpdateEventCategoryPayload?: (
    data: WithTypename<UpdateEventCategoryPayload>,
  ) => null | string
  UpdateEventGroupPayload?: (
    data: WithTypename<UpdateEventGroupPayload>,
  ) => null | string
  UpdateEventGroupingPayload?: (
    data: WithTypename<UpdateEventGroupingPayload>,
  ) => null | string
  UpdateEventPayload?: (data: WithTypename<UpdateEventPayload>) => null | string
  UpdateEventRecommendationPayload?: (
    data: WithTypename<UpdateEventRecommendationPayload>,
  ) => null | string
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
    accountInterest?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAccountInterestArgs,
      WithTypename<AccountInterest> | string
    >
    accountInterestByAccountIdAndCategory?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAccountInterestByAccountIdAndCategoryArgs,
      WithTypename<AccountInterest> | string
    >
    accountPreferenceEventSize?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAccountPreferenceEventSizeArgs,
      WithTypename<AccountPreferenceEventSize> | string
    >
    accountPreferenceEventSizeByAccountIdAndEventSize?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAccountPreferenceEventSizeByAccountIdAndEventSizeArgs,
      WithTypename<AccountPreferenceEventSize> | string
    >
    accountSocialNetwork?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAccountSocialNetworkArgs,
      WithTypename<AccountSocialNetwork> | string
    >
    accountSocialNetworkByAccountIdAndSocialNetwork?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAccountSocialNetworkByAccountIdAndSocialNetworkArgs,
      WithTypename<AccountSocialNetwork> | string
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
    allAccountInterests?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllAccountInterestsArgs,
      WithTypename<AccountInterestsConnection> | string
    >
    allAccountPreferenceEventSizes?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllAccountPreferenceEventSizesArgs,
      WithTypename<AccountPreferenceEventSizesConnection> | string
    >
    allAccountSocialNetworks?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllAccountSocialNetworksArgs,
      WithTypename<AccountSocialNetworksConnection> | string
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
    allEventCategories?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllEventCategoriesArgs,
      WithTypename<EventCategoriesConnection> | string
    >
    allEventCategoryMappings?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllEventCategoryMappingsArgs,
      WithTypename<EventCategoryMappingsConnection> | string
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
    allEventRecommendations?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllEventRecommendationsArgs,
      WithTypename<EventRecommendationsConnection> | string
    >
    allEventUploads?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllEventUploadsArgs,
      WithTypename<EventUploadsConnection> | string
    >
    allEvents?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllEventsArgs,
      WithTypename<EventsConnection> | string
    >
    allInvitationFlats?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllInvitationFlatsArgs,
      WithTypename<InvitationFlatsConnection> | string
    >
    allInvitations?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllInvitationsArgs,
      WithTypename<InvitationsConnection> | string
    >
    allLegalTermAcceptances?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllLegalTermAcceptancesArgs,
      WithTypename<LegalTermAcceptancesConnection> | string
    >
    allLegalTerms?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllLegalTermsArgs,
      WithTypename<LegalTermsConnection> | string
    >
    allProfilePictures?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllProfilePicturesArgs,
      WithTypename<ProfilePicturesConnection> | string
    >
    allReports?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAllReportsArgs,
      WithTypename<ReportsConnection> | string
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
    eventCategory?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventCategoryArgs,
      WithTypename<EventCategory> | string
    >
    eventCategoryByCategory?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventCategoryByCategoryArgs,
      WithTypename<EventCategory> | string
    >
    eventCategoryMapping?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventCategoryMappingArgs,
      WithTypename<EventCategoryMapping> | string
    >
    eventCategoryMappingByEventIdAndCategory?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventCategoryMappingByEventIdAndCategoryArgs,
      WithTypename<EventCategoryMapping> | string
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
    eventRecommendation?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventRecommendationArgs,
      WithTypename<EventRecommendation> | string
    >
    eventRecommendationByAccountIdAndEventId?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventRecommendationByAccountIdAndEventIdArgs,
      WithTypename<EventRecommendation> | string
    >
    eventUpload?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventUploadArgs,
      WithTypename<EventUpload> | string
    >
    eventUploadByEventIdAndUploadId?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventUploadByEventIdAndUploadIdArgs,
      WithTypename<EventUpload> | string
    >
    eventUploadById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventUploadByIdArgs,
      WithTypename<EventUpload> | string
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
    invokerAccountId?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    legalTerm?: GraphCacheResolver<
      WithTypename<Query>,
      QueryLegalTermArgs,
      WithTypename<LegalTerm> | string
    >
    legalTermAcceptance?: GraphCacheResolver<
      WithTypename<Query>,
      QueryLegalTermAcceptanceArgs,
      WithTypename<LegalTermAcceptance> | string
    >
    legalTermAcceptanceById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryLegalTermAcceptanceByIdArgs,
      WithTypename<LegalTermAcceptance> | string
    >
    legalTermById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryLegalTermByIdArgs,
      WithTypename<LegalTerm> | string
    >
    legalTermByLanguageAndVersion?: GraphCacheResolver<
      WithTypename<Query>,
      QueryLegalTermByLanguageAndVersionArgs,
      WithTypename<LegalTerm> | string
    >
    node?: GraphCacheResolver<
      WithTypename<Query>,
      QueryNodeArgs,
      | WithTypename<Account>
      | WithTypename<AccountInterest>
      | WithTypename<AccountPreferenceEventSize>
      | WithTypename<AccountSocialNetwork>
      | WithTypename<Achievement>
      | WithTypename<Contact>
      | WithTypename<Event>
      | WithTypename<EventCategory>
      | WithTypename<EventCategoryMapping>
      | WithTypename<EventGroup>
      | WithTypename<EventGrouping>
      | WithTypename<EventRecommendation>
      | WithTypename<EventUpload>
      | WithTypename<Invitation>
      | WithTypename<LegalTerm>
      | WithTypename<LegalTermAcceptance>
      | WithTypename<ProfilePicture>
      | WithTypename<Query>
      | WithTypename<Report>
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
    report?: GraphCacheResolver<
      WithTypename<Query>,
      QueryReportArgs,
      WithTypename<Report> | string
    >
    reportByAuthorAccountIdAndTargetAccountIdAndTargetEventIdAndTargetUploadId?: GraphCacheResolver<
      WithTypename<Query>,
      QueryReportByAuthorAccountIdAndTargetAccountIdAndTargetEventIdAndTargetUploadIdArgs,
      WithTypename<Report> | string
    >
    reportById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryReportByIdArgs,
      WithTypename<Report> | string
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
    accountInterestsByAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountAccountInterestsByAccountIdArgs,
      WithTypename<AccountInterestsConnection> | string
    >
    accountPreferenceEventSizesByAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountAccountPreferenceEventSizesByAccountIdArgs,
      WithTypename<AccountPreferenceEventSizesConnection> | string
    >
    accountSocialNetworksByAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountAccountSocialNetworksByAccountIdArgs,
      WithTypename<AccountSocialNetworksConnection> | string
    >
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
    eventRecommendationsByAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountEventRecommendationsByAccountIdArgs,
      WithTypename<EventRecommendationsConnection> | string
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
    invitationsByUpdatedBy?: GraphCacheResolver<
      WithTypename<Account>,
      AccountInvitationsByUpdatedByArgs,
      WithTypename<InvitationsConnection> | string
    >
    legalTermAcceptancesByAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountLegalTermAcceptancesByAccountIdArgs,
      WithTypename<LegalTermAcceptancesConnection> | string
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
    reportsByAuthorAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountReportsByAuthorAccountIdArgs,
      WithTypename<ReportsConnection> | string
    >
    reportsByTargetAccountId?: GraphCacheResolver<
      WithTypename<Account>,
      AccountReportsByTargetAccountIdArgs,
      WithTypename<ReportsConnection> | string
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
  AccountInterest?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<AccountInterest>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountId?: GraphCacheResolver<
      WithTypename<AccountInterest>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    category?: GraphCacheResolver<
      WithTypename<AccountInterest>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventCategoryByCategory?: GraphCacheResolver<
      WithTypename<AccountInterest>,
      Record<string, never>,
      WithTypename<EventCategory> | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<AccountInterest>,
      Record<string, never>,
      Scalars['ID'] | string
    >
  }
  AccountInterestsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<AccountInterestsConnection>,
      Record<string, never>,
      Array<WithTypename<AccountInterestsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<AccountInterestsConnection>,
      Record<string, never>,
      Array<WithTypename<AccountInterest> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<AccountInterestsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<AccountInterestsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  AccountInterestsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<AccountInterestsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<AccountInterestsEdge>,
      Record<string, never>,
      WithTypename<AccountInterest> | string
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
  AccountPreferenceEventSize?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<AccountPreferenceEventSize>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountId?: GraphCacheResolver<
      WithTypename<AccountPreferenceEventSize>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    createdAt?: GraphCacheResolver<
      WithTypename<AccountPreferenceEventSize>,
      Record<string, never>,
      Scalars['Datetime'] | string
    >
    eventSize?: GraphCacheResolver<
      WithTypename<AccountPreferenceEventSize>,
      Record<string, never>,
      EventSize | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<AccountPreferenceEventSize>,
      Record<string, never>,
      Scalars['ID'] | string
    >
  }
  AccountPreferenceEventSizesConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<AccountPreferenceEventSizesConnection>,
      Record<string, never>,
      Array<WithTypename<AccountPreferenceEventSizesEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<AccountPreferenceEventSizesConnection>,
      Record<string, never>,
      Array<WithTypename<AccountPreferenceEventSize> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<AccountPreferenceEventSizesConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<AccountPreferenceEventSizesConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  AccountPreferenceEventSizesEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<AccountPreferenceEventSizesEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<AccountPreferenceEventSizesEdge>,
      Record<string, never>,
      WithTypename<AccountPreferenceEventSize> | string
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
  AccountSocialNetwork?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<AccountSocialNetwork>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountId?: GraphCacheResolver<
      WithTypename<AccountSocialNetwork>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<AccountSocialNetwork>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    socialNetwork?: GraphCacheResolver<
      WithTypename<AccountSocialNetwork>,
      Record<string, never>,
      SocialNetwork | string
    >
    socialNetworkUsername?: GraphCacheResolver<
      WithTypename<AccountSocialNetwork>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
  AccountSocialNetworksConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<AccountSocialNetworksConnection>,
      Record<string, never>,
      Array<WithTypename<AccountSocialNetworksEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<AccountSocialNetworksConnection>,
      Record<string, never>,
      Array<WithTypename<AccountSocialNetwork> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<AccountSocialNetworksConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<AccountSocialNetworksConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  AccountSocialNetworksEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<AccountSocialNetworksEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<AccountSocialNetworksEdge>,
      Record<string, never>,
      WithTypename<AccountSocialNetwork> | string
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
    createdAt?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['Datetime'] | string
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
    language?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Language | string
    >
    lastName?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['String'] | string
    >
    nickname?: GraphCacheResolver<
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
    timezone?: GraphCacheResolver<
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
  CreateAccountInterestPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<CreateAccountInterestPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountInterest?: GraphCacheResolver<
      WithTypename<CreateAccountInterestPayload>,
      Record<string, never>,
      WithTypename<AccountInterest> | string
    >
    accountInterestEdge?: GraphCacheResolver<
      WithTypename<CreateAccountInterestPayload>,
      CreateAccountInterestPayloadAccountInterestEdgeArgs,
      WithTypename<AccountInterestsEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateAccountInterestPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventCategoryByCategory?: GraphCacheResolver<
      WithTypename<CreateAccountInterestPayload>,
      Record<string, never>,
      WithTypename<EventCategory> | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateAccountInterestPayload>,
      Record<string, never>,
      WithTypename<Query> | string
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
  CreateAccountPreferenceEventSizePayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<CreateAccountPreferenceEventSizePayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountPreferenceEventSize?: GraphCacheResolver<
      WithTypename<CreateAccountPreferenceEventSizePayload>,
      Record<string, never>,
      WithTypename<AccountPreferenceEventSize> | string
    >
    accountPreferenceEventSizeEdge?: GraphCacheResolver<
      WithTypename<CreateAccountPreferenceEventSizePayload>,
      CreateAccountPreferenceEventSizePayloadAccountPreferenceEventSizeEdgeArgs,
      WithTypename<AccountPreferenceEventSizesEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateAccountPreferenceEventSizePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateAccountPreferenceEventSizePayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  CreateAccountSocialNetworkPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<CreateAccountSocialNetworkPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountSocialNetwork?: GraphCacheResolver<
      WithTypename<CreateAccountSocialNetworkPayload>,
      Record<string, never>,
      WithTypename<AccountSocialNetwork> | string
    >
    accountSocialNetworkEdge?: GraphCacheResolver<
      WithTypename<CreateAccountSocialNetworkPayload>,
      CreateAccountSocialNetworkPayloadAccountSocialNetworkEdgeArgs,
      WithTypename<AccountSocialNetworksEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateAccountSocialNetworkPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateAccountSocialNetworkPayload>,
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
  CreateEventCategoryMappingPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateEventCategoryMappingPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<CreateEventCategoryMappingPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventCategoryByCategory?: GraphCacheResolver<
      WithTypename<CreateEventCategoryMappingPayload>,
      Record<string, never>,
      WithTypename<EventCategory> | string
    >
    eventCategoryMapping?: GraphCacheResolver<
      WithTypename<CreateEventCategoryMappingPayload>,
      Record<string, never>,
      WithTypename<EventCategoryMapping> | string
    >
    eventCategoryMappingEdge?: GraphCacheResolver<
      WithTypename<CreateEventCategoryMappingPayload>,
      CreateEventCategoryMappingPayloadEventCategoryMappingEdgeArgs,
      WithTypename<EventCategoryMappingsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateEventCategoryMappingPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  CreateEventCategoryPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateEventCategoryPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventCategory?: GraphCacheResolver<
      WithTypename<CreateEventCategoryPayload>,
      Record<string, never>,
      WithTypename<EventCategory> | string
    >
    eventCategoryEdge?: GraphCacheResolver<
      WithTypename<CreateEventCategoryPayload>,
      CreateEventCategoryPayloadEventCategoryEdgeArgs,
      WithTypename<EventCategoriesEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateEventCategoryPayload>,
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
  CreateEventRecommendationPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<CreateEventRecommendationPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateEventRecommendationPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<CreateEventRecommendationPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventRecommendation?: GraphCacheResolver<
      WithTypename<CreateEventRecommendationPayload>,
      Record<string, never>,
      WithTypename<EventRecommendation> | string
    >
    eventRecommendationEdge?: GraphCacheResolver<
      WithTypename<CreateEventRecommendationPayload>,
      CreateEventRecommendationPayloadEventRecommendationEdgeArgs,
      WithTypename<EventRecommendationsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateEventRecommendationPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  CreateEventUploadPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateEventUploadPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<CreateEventUploadPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventUpload?: GraphCacheResolver<
      WithTypename<CreateEventUploadPayload>,
      Record<string, never>,
      WithTypename<EventUpload> | string
    >
    eventUploadEdge?: GraphCacheResolver<
      WithTypename<CreateEventUploadPayload>,
      CreateEventUploadPayloadEventUploadEdgeArgs,
      WithTypename<EventUploadsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateEventUploadPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
    uploadByUploadId?: GraphCacheResolver<
      WithTypename<CreateEventUploadPayload>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
  }
  CreateInvitationPayload?: {
    accountByUpdatedBy?: GraphCacheResolver<
      WithTypename<CreateInvitationPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
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
  CreateLegalTermAcceptancePayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<CreateLegalTermAcceptancePayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateLegalTermAcceptancePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    legalTermAcceptance?: GraphCacheResolver<
      WithTypename<CreateLegalTermAcceptancePayload>,
      Record<string, never>,
      WithTypename<LegalTermAcceptance> | string
    >
    legalTermAcceptanceEdge?: GraphCacheResolver<
      WithTypename<CreateLegalTermAcceptancePayload>,
      CreateLegalTermAcceptancePayloadLegalTermAcceptanceEdgeArgs,
      WithTypename<LegalTermAcceptancesEdge> | string
    >
    legalTermByLegalTermId?: GraphCacheResolver<
      WithTypename<CreateLegalTermAcceptancePayload>,
      Record<string, never>,
      WithTypename<LegalTerm> | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateLegalTermAcceptancePayload>,
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
  CreateReportPayload?: {
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<CreateReportPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountByTargetAccountId?: GraphCacheResolver<
      WithTypename<CreateReportPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<CreateReportPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventByTargetEventId?: GraphCacheResolver<
      WithTypename<CreateReportPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    query?: GraphCacheResolver<
      WithTypename<CreateReportPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
    report?: GraphCacheResolver<
      WithTypename<CreateReportPayload>,
      Record<string, never>,
      WithTypename<Report> | string
    >
    reportEdge?: GraphCacheResolver<
      WithTypename<CreateReportPayload>,
      CreateReportPayloadReportEdgeArgs,
      WithTypename<ReportsEdge> | string
    >
    uploadByTargetUploadId?: GraphCacheResolver<
      WithTypename<CreateReportPayload>,
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
  DeleteAccountInterestPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<DeleteAccountInterestPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountInterest?: GraphCacheResolver<
      WithTypename<DeleteAccountInterestPayload>,
      Record<string, never>,
      WithTypename<AccountInterest> | string
    >
    accountInterestEdge?: GraphCacheResolver<
      WithTypename<DeleteAccountInterestPayload>,
      DeleteAccountInterestPayloadAccountInterestEdgeArgs,
      WithTypename<AccountInterestsEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteAccountInterestPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedAccountInterestId?: GraphCacheResolver<
      WithTypename<DeleteAccountInterestPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    eventCategoryByCategory?: GraphCacheResolver<
      WithTypename<DeleteAccountInterestPayload>,
      Record<string, never>,
      WithTypename<EventCategory> | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteAccountInterestPayload>,
      Record<string, never>,
      WithTypename<Query> | string
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
  DeleteAccountPreferenceEventSizePayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<DeleteAccountPreferenceEventSizePayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountPreferenceEventSize?: GraphCacheResolver<
      WithTypename<DeleteAccountPreferenceEventSizePayload>,
      Record<string, never>,
      WithTypename<AccountPreferenceEventSize> | string
    >
    accountPreferenceEventSizeEdge?: GraphCacheResolver<
      WithTypename<DeleteAccountPreferenceEventSizePayload>,
      DeleteAccountPreferenceEventSizePayloadAccountPreferenceEventSizeEdgeArgs,
      WithTypename<AccountPreferenceEventSizesEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteAccountPreferenceEventSizePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedAccountPreferenceEventSizeId?: GraphCacheResolver<
      WithTypename<DeleteAccountPreferenceEventSizePayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteAccountPreferenceEventSizePayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  DeleteAccountSocialNetworkPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<DeleteAccountSocialNetworkPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountSocialNetwork?: GraphCacheResolver<
      WithTypename<DeleteAccountSocialNetworkPayload>,
      Record<string, never>,
      WithTypename<AccountSocialNetwork> | string
    >
    accountSocialNetworkEdge?: GraphCacheResolver<
      WithTypename<DeleteAccountSocialNetworkPayload>,
      DeleteAccountSocialNetworkPayloadAccountSocialNetworkEdgeArgs,
      WithTypename<AccountSocialNetworksEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteAccountSocialNetworkPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedAccountSocialNetworkId?: GraphCacheResolver<
      WithTypename<DeleteAccountSocialNetworkPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteAccountSocialNetworkPayload>,
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
  DeleteEventCategoryMappingPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteEventCategoryMappingPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedEventCategoryMappingId?: GraphCacheResolver<
      WithTypename<DeleteEventCategoryMappingPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<DeleteEventCategoryMappingPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventCategoryByCategory?: GraphCacheResolver<
      WithTypename<DeleteEventCategoryMappingPayload>,
      Record<string, never>,
      WithTypename<EventCategory> | string
    >
    eventCategoryMapping?: GraphCacheResolver<
      WithTypename<DeleteEventCategoryMappingPayload>,
      Record<string, never>,
      WithTypename<EventCategoryMapping> | string
    >
    eventCategoryMappingEdge?: GraphCacheResolver<
      WithTypename<DeleteEventCategoryMappingPayload>,
      DeleteEventCategoryMappingPayloadEventCategoryMappingEdgeArgs,
      WithTypename<EventCategoryMappingsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteEventCategoryMappingPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  DeleteEventCategoryPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteEventCategoryPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedEventCategoryId?: GraphCacheResolver<
      WithTypename<DeleteEventCategoryPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    eventCategory?: GraphCacheResolver<
      WithTypename<DeleteEventCategoryPayload>,
      Record<string, never>,
      WithTypename<EventCategory> | string
    >
    eventCategoryEdge?: GraphCacheResolver<
      WithTypename<DeleteEventCategoryPayload>,
      DeleteEventCategoryPayloadEventCategoryEdgeArgs,
      WithTypename<EventCategoriesEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteEventCategoryPayload>,
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
  DeleteEventRecommendationPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<DeleteEventRecommendationPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteEventRecommendationPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedEventRecommendationId?: GraphCacheResolver<
      WithTypename<DeleteEventRecommendationPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<DeleteEventRecommendationPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventRecommendation?: GraphCacheResolver<
      WithTypename<DeleteEventRecommendationPayload>,
      Record<string, never>,
      WithTypename<EventRecommendation> | string
    >
    eventRecommendationEdge?: GraphCacheResolver<
      WithTypename<DeleteEventRecommendationPayload>,
      DeleteEventRecommendationPayloadEventRecommendationEdgeArgs,
      WithTypename<EventRecommendationsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteEventRecommendationPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  DeleteEventUploadPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteEventUploadPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedEventUploadId?: GraphCacheResolver<
      WithTypename<DeleteEventUploadPayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<DeleteEventUploadPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventUpload?: GraphCacheResolver<
      WithTypename<DeleteEventUploadPayload>,
      Record<string, never>,
      WithTypename<EventUpload> | string
    >
    eventUploadEdge?: GraphCacheResolver<
      WithTypename<DeleteEventUploadPayload>,
      DeleteEventUploadPayloadEventUploadEdgeArgs,
      WithTypename<EventUploadsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteEventUploadPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
    uploadByUploadId?: GraphCacheResolver<
      WithTypename<DeleteEventUploadPayload>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
  }
  DeleteInvitationPayload?: {
    accountByUpdatedBy?: GraphCacheResolver<
      WithTypename<DeleteInvitationPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
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
  DeleteLegalTermAcceptancePayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<DeleteLegalTermAcceptancePayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<DeleteLegalTermAcceptancePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    deletedLegalTermAcceptanceId?: GraphCacheResolver<
      WithTypename<DeleteLegalTermAcceptancePayload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    legalTermAcceptance?: GraphCacheResolver<
      WithTypename<DeleteLegalTermAcceptancePayload>,
      Record<string, never>,
      WithTypename<LegalTermAcceptance> | string
    >
    legalTermAcceptanceEdge?: GraphCacheResolver<
      WithTypename<DeleteLegalTermAcceptancePayload>,
      DeleteLegalTermAcceptancePayloadLegalTermAcceptanceEdgeArgs,
      WithTypename<LegalTermAcceptancesEdge> | string
    >
    legalTermByLegalTermId?: GraphCacheResolver<
      WithTypename<DeleteLegalTermAcceptancePayload>,
      Record<string, never>,
      WithTypename<LegalTerm> | string
    >
    query?: GraphCacheResolver<
      WithTypename<DeleteLegalTermAcceptancePayload>,
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
    createdAt?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['Datetime'] | string
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
    eventCategoryMappingsByEventId?: GraphCacheResolver<
      WithTypename<Event>,
      EventEventCategoryMappingsByEventIdArgs,
      WithTypename<EventCategoryMappingsConnection> | string
    >
    eventGroupingsByEventId?: GraphCacheResolver<
      WithTypename<Event>,
      EventEventGroupingsByEventIdArgs,
      WithTypename<EventGroupingsConnection> | string
    >
    eventRecommendationsByEventId?: GraphCacheResolver<
      WithTypename<Event>,
      EventEventRecommendationsByEventIdArgs,
      WithTypename<EventRecommendationsConnection> | string
    >
    eventUploadsByEventId?: GraphCacheResolver<
      WithTypename<Event>,
      EventEventUploadsByEventIdArgs,
      WithTypename<EventUploadsConnection> | string
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
    reportsByTargetEventId?: GraphCacheResolver<
      WithTypename<Event>,
      EventReportsByTargetEventIdArgs,
      WithTypename<ReportsConnection> | string
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
  EventCategoriesConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<EventCategoriesConnection>,
      Record<string, never>,
      Array<WithTypename<EventCategoriesEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<EventCategoriesConnection>,
      Record<string, never>,
      Array<WithTypename<EventCategory> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<EventCategoriesConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<EventCategoriesConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  EventCategoriesEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<EventCategoriesEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<EventCategoriesEdge>,
      Record<string, never>,
      WithTypename<EventCategory> | string
    >
  }
  EventCategory?: {
    accountInterestsByCategory?: GraphCacheResolver<
      WithTypename<EventCategory>,
      EventCategoryAccountInterestsByCategoryArgs,
      WithTypename<AccountInterestsConnection> | string
    >
    category?: GraphCacheResolver<
      WithTypename<EventCategory>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventCategoryMappingsByCategory?: GraphCacheResolver<
      WithTypename<EventCategory>,
      EventCategoryEventCategoryMappingsByCategoryArgs,
      WithTypename<EventCategoryMappingsConnection> | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<EventCategory>,
      Record<string, never>,
      Scalars['ID'] | string
    >
  }
  EventCategoryMapping?: {
    category?: GraphCacheResolver<
      WithTypename<EventCategoryMapping>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<EventCategoryMapping>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventCategoryByCategory?: GraphCacheResolver<
      WithTypename<EventCategoryMapping>,
      Record<string, never>,
      WithTypename<EventCategory> | string
    >
    eventId?: GraphCacheResolver<
      WithTypename<EventCategoryMapping>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<EventCategoryMapping>,
      Record<string, never>,
      Scalars['ID'] | string
    >
  }
  EventCategoryMappingsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<EventCategoryMappingsConnection>,
      Record<string, never>,
      Array<WithTypename<EventCategoryMappingsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<EventCategoryMappingsConnection>,
      Record<string, never>,
      Array<WithTypename<EventCategoryMapping> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<EventCategoryMappingsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<EventCategoryMappingsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  EventCategoryMappingsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<EventCategoryMappingsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<EventCategoryMappingsEdge>,
      Record<string, never>,
      WithTypename<EventCategoryMapping> | string
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
    createdAt?: GraphCacheResolver<
      WithTypename<EventGroup>,
      Record<string, never>,
      Scalars['Datetime'] | string
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
  EventRecommendation?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<EventRecommendation>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountId?: GraphCacheResolver<
      WithTypename<EventRecommendation>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<EventRecommendation>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventId?: GraphCacheResolver<
      WithTypename<EventRecommendation>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<EventRecommendation>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    predictedScore?: GraphCacheResolver<
      WithTypename<EventRecommendation>,
      Record<string, never>,
      Scalars['Float'] | string
    >
    score?: GraphCacheResolver<
      WithTypename<EventRecommendation>,
      Record<string, never>,
      Scalars['Float'] | string
    >
  }
  EventRecommendationsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<EventRecommendationsConnection>,
      Record<string, never>,
      Array<WithTypename<EventRecommendationsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<EventRecommendationsConnection>,
      Record<string, never>,
      Array<WithTypename<EventRecommendation> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<EventRecommendationsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<EventRecommendationsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  EventRecommendationsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<EventRecommendationsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<EventRecommendationsEdge>,
      Record<string, never>,
      WithTypename<EventRecommendation> | string
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
  EventUpload?: {
    eventByEventId?: GraphCacheResolver<
      WithTypename<EventUpload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventId?: GraphCacheResolver<
      WithTypename<EventUpload>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<EventUpload>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<EventUpload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    uploadByUploadId?: GraphCacheResolver<
      WithTypename<EventUpload>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
    uploadId?: GraphCacheResolver<
      WithTypename<EventUpload>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
  }
  EventUploadsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<EventUploadsConnection>,
      Record<string, never>,
      Array<WithTypename<EventUploadsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<EventUploadsConnection>,
      Record<string, never>,
      Array<WithTypename<EventUpload> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<EventUploadsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<EventUploadsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  EventUploadsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<EventUploadsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<EventUploadsEdge>,
      Record<string, never>,
      WithTypename<EventUpload> | string
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
    accountByUpdatedBy?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      WithTypename<Account> | string
    >
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
    createdAt?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      Scalars['Datetime'] | string
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
    updatedAt?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      Scalars['Datetime'] | string
    >
    updatedBy?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      Scalars['UUID'] | string
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
  InvitationFlat?: {
    contactAccountId?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    contactAddress?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['String'] | string
    >
    contactAuthorAccountId?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    contactEmailAddress?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['String'] | string
    >
    contactEmailAddressHash?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['String'] | string
    >
    contactFirstName?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['String'] | string
    >
    contactId?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    contactLastName?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['String'] | string
    >
    contactPhoneNumber?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['String'] | string
    >
    contactUrl?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventAuthorAccountId?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    eventDescription?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventEnd?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['Datetime'] | string
    >
    eventId?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    eventInviteeCountMaximum?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['Int'] | string
    >
    eventIsArchived?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['Boolean'] | string
    >
    eventIsInPerson?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['Boolean'] | string
    >
    eventIsRemote?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['Boolean'] | string
    >
    eventLocation?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventName?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventSlug?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventStart?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['Datetime'] | string
    >
    eventUrl?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventVisibility?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      EventVisibility | string
    >
    invitationContactId?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    invitationEventId?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    invitationFeedback?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      InvitationFeedback | string
    >
    invitationFeedbackPaper?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      InvitationFeedbackPaper | string
    >
    invitationId?: GraphCacheResolver<
      WithTypename<InvitationFlat>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
  }
  InvitationFlatsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<InvitationFlatsConnection>,
      Record<string, never>,
      Array<WithTypename<InvitationFlatsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<InvitationFlatsConnection>,
      Record<string, never>,
      Array<WithTypename<InvitationFlat> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<InvitationFlatsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<InvitationFlatsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  InvitationFlatsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<InvitationFlatsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<InvitationFlatsEdge>,
      Record<string, never>,
      WithTypename<InvitationFlat> | string
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
  LegalTerm?: {
    createdAt?: GraphCacheResolver<
      WithTypename<LegalTerm>,
      Record<string, never>,
      Scalars['Datetime'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<LegalTerm>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    language?: GraphCacheResolver<
      WithTypename<LegalTerm>,
      Record<string, never>,
      Scalars['String'] | string
    >
    legalTermAcceptancesByLegalTermId?: GraphCacheResolver<
      WithTypename<LegalTerm>,
      LegalTermLegalTermAcceptancesByLegalTermIdArgs,
      WithTypename<LegalTermAcceptancesConnection> | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<LegalTerm>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    term?: GraphCacheResolver<
      WithTypename<LegalTerm>,
      Record<string, never>,
      Scalars['String'] | string
    >
    version?: GraphCacheResolver<
      WithTypename<LegalTerm>,
      Record<string, never>,
      Scalars['String'] | string
    >
  }
  LegalTermAcceptance?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<LegalTermAcceptance>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountId?: GraphCacheResolver<
      WithTypename<LegalTermAcceptance>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    createdAt?: GraphCacheResolver<
      WithTypename<LegalTermAcceptance>,
      Record<string, never>,
      Scalars['Datetime'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<LegalTermAcceptance>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    legalTermByLegalTermId?: GraphCacheResolver<
      WithTypename<LegalTermAcceptance>,
      Record<string, never>,
      WithTypename<LegalTerm> | string
    >
    legalTermId?: GraphCacheResolver<
      WithTypename<LegalTermAcceptance>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<LegalTermAcceptance>,
      Record<string, never>,
      Scalars['ID'] | string
    >
  }
  LegalTermAcceptancesConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<LegalTermAcceptancesConnection>,
      Record<string, never>,
      Array<WithTypename<LegalTermAcceptancesEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<LegalTermAcceptancesConnection>,
      Record<string, never>,
      Array<WithTypename<LegalTermAcceptance> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<LegalTermAcceptancesConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<LegalTermAcceptancesConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  LegalTermAcceptancesEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<LegalTermAcceptancesEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<LegalTermAcceptancesEdge>,
      Record<string, never>,
      WithTypename<LegalTermAcceptance> | string
    >
  }
  LegalTermsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<LegalTermsConnection>,
      Record<string, never>,
      Array<WithTypename<LegalTermsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<LegalTermsConnection>,
      Record<string, never>,
      Array<WithTypename<LegalTerm> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<LegalTermsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<LegalTermsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  LegalTermsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<LegalTermsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<LegalTermsEdge>,
      Record<string, never>,
      WithTypename<LegalTerm> | string
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
  Report?: {
    accountByAuthorAccountId?: GraphCacheResolver<
      WithTypename<Report>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountByTargetAccountId?: GraphCacheResolver<
      WithTypename<Report>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    authorAccountId?: GraphCacheResolver<
      WithTypename<Report>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    createdAt?: GraphCacheResolver<
      WithTypename<Report>,
      Record<string, never>,
      Scalars['Datetime'] | string
    >
    eventByTargetEventId?: GraphCacheResolver<
      WithTypename<Report>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    id?: GraphCacheResolver<
      WithTypename<Report>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<Report>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    reason?: GraphCacheResolver<
      WithTypename<Report>,
      Record<string, never>,
      Scalars['String'] | string
    >
    targetAccountId?: GraphCacheResolver<
      WithTypename<Report>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    targetEventId?: GraphCacheResolver<
      WithTypename<Report>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    targetUploadId?: GraphCacheResolver<
      WithTypename<Report>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    uploadByTargetUploadId?: GraphCacheResolver<
      WithTypename<Report>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
  }
  ReportsConnection?: {
    edges?: GraphCacheResolver<
      WithTypename<ReportsConnection>,
      Record<string, never>,
      Array<WithTypename<ReportsEdge> | string>
    >
    nodes?: GraphCacheResolver<
      WithTypename<ReportsConnection>,
      Record<string, never>,
      Array<WithTypename<Report> | string>
    >
    pageInfo?: GraphCacheResolver<
      WithTypename<ReportsConnection>,
      Record<string, never>,
      WithTypename<PageInfo> | string
    >
    totalCount?: GraphCacheResolver<
      WithTypename<ReportsConnection>,
      Record<string, never>,
      Scalars['Int'] | string
    >
  }
  ReportsEdge?: {
    cursor?: GraphCacheResolver<
      WithTypename<ReportsEdge>,
      Record<string, never>,
      Scalars['Cursor'] | string
    >
    node?: GraphCacheResolver<
      WithTypename<ReportsEdge>,
      Record<string, never>,
      WithTypename<Report> | string
    >
  }
  UpdateAccountInterestPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<UpdateAccountInterestPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountInterest?: GraphCacheResolver<
      WithTypename<UpdateAccountInterestPayload>,
      Record<string, never>,
      WithTypename<AccountInterest> | string
    >
    accountInterestEdge?: GraphCacheResolver<
      WithTypename<UpdateAccountInterestPayload>,
      UpdateAccountInterestPayloadAccountInterestEdgeArgs,
      WithTypename<AccountInterestsEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateAccountInterestPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventCategoryByCategory?: GraphCacheResolver<
      WithTypename<UpdateAccountInterestPayload>,
      Record<string, never>,
      WithTypename<EventCategory> | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateAccountInterestPayload>,
      Record<string, never>,
      WithTypename<Query> | string
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
  UpdateAccountPreferenceEventSizePayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<UpdateAccountPreferenceEventSizePayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountPreferenceEventSize?: GraphCacheResolver<
      WithTypename<UpdateAccountPreferenceEventSizePayload>,
      Record<string, never>,
      WithTypename<AccountPreferenceEventSize> | string
    >
    accountPreferenceEventSizeEdge?: GraphCacheResolver<
      WithTypename<UpdateAccountPreferenceEventSizePayload>,
      UpdateAccountPreferenceEventSizePayloadAccountPreferenceEventSizeEdgeArgs,
      WithTypename<AccountPreferenceEventSizesEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateAccountPreferenceEventSizePayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateAccountPreferenceEventSizePayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  UpdateAccountSocialNetworkPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<UpdateAccountSocialNetworkPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    accountSocialNetwork?: GraphCacheResolver<
      WithTypename<UpdateAccountSocialNetworkPayload>,
      Record<string, never>,
      WithTypename<AccountSocialNetwork> | string
    >
    accountSocialNetworkEdge?: GraphCacheResolver<
      WithTypename<UpdateAccountSocialNetworkPayload>,
      UpdateAccountSocialNetworkPayloadAccountSocialNetworkEdgeArgs,
      WithTypename<AccountSocialNetworksEdge> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateAccountSocialNetworkPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateAccountSocialNetworkPayload>,
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
  UpdateEventCategoryMappingPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateEventCategoryMappingPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<UpdateEventCategoryMappingPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventCategoryByCategory?: GraphCacheResolver<
      WithTypename<UpdateEventCategoryMappingPayload>,
      Record<string, never>,
      WithTypename<EventCategory> | string
    >
    eventCategoryMapping?: GraphCacheResolver<
      WithTypename<UpdateEventCategoryMappingPayload>,
      Record<string, never>,
      WithTypename<EventCategoryMapping> | string
    >
    eventCategoryMappingEdge?: GraphCacheResolver<
      WithTypename<UpdateEventCategoryMappingPayload>,
      UpdateEventCategoryMappingPayloadEventCategoryMappingEdgeArgs,
      WithTypename<EventCategoryMappingsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateEventCategoryMappingPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  UpdateEventCategoryPayload?: {
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateEventCategoryPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventCategory?: GraphCacheResolver<
      WithTypename<UpdateEventCategoryPayload>,
      Record<string, never>,
      WithTypename<EventCategory> | string
    >
    eventCategoryEdge?: GraphCacheResolver<
      WithTypename<UpdateEventCategoryPayload>,
      UpdateEventCategoryPayloadEventCategoryEdgeArgs,
      WithTypename<EventCategoriesEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateEventCategoryPayload>,
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
  UpdateEventRecommendationPayload?: {
    accountByAccountId?: GraphCacheResolver<
      WithTypename<UpdateEventRecommendationPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
    clientMutationId?: GraphCacheResolver<
      WithTypename<UpdateEventRecommendationPayload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<UpdateEventRecommendationPayload>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventRecommendation?: GraphCacheResolver<
      WithTypename<UpdateEventRecommendationPayload>,
      Record<string, never>,
      WithTypename<EventRecommendation> | string
    >
    eventRecommendationEdge?: GraphCacheResolver<
      WithTypename<UpdateEventRecommendationPayload>,
      UpdateEventRecommendationPayloadEventRecommendationEdgeArgs,
      WithTypename<EventRecommendationsEdge> | string
    >
    query?: GraphCacheResolver<
      WithTypename<UpdateEventRecommendationPayload>,
      Record<string, never>,
      WithTypename<Query> | string
    >
  }
  UpdateInvitationPayload?: {
    accountByUpdatedBy?: GraphCacheResolver<
      WithTypename<UpdateInvitationPayload>,
      Record<string, never>,
      WithTypename<Account> | string
    >
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
    createdAt?: GraphCacheResolver<
      WithTypename<Upload>,
      Record<string, never>,
      Scalars['Datetime'] | string
    >
    eventUploadsByUploadId?: GraphCacheResolver<
      WithTypename<Upload>,
      UploadEventUploadsByUploadIdArgs,
      WithTypename<EventUploadsConnection> | string
    >
    id?: GraphCacheResolver<
      WithTypename<Upload>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
    name?: GraphCacheResolver<
      WithTypename<Upload>,
      Record<string, never>,
      Scalars['String'] | string
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
    reportsByTargetUploadId?: GraphCacheResolver<
      WithTypename<Upload>,
      UploadReportsByTargetUploadIdArgs,
      WithTypename<ReportsConnection> | string
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
    type?: GraphCacheResolver<
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
  createAccountInterest?: GraphCacheOptimisticMutationResolver<
    MutationCreateAccountInterestArgs,
    Maybe<WithTypename<CreateAccountInterestPayload>>
  >
  createAccountPreferenceEventSize?: GraphCacheOptimisticMutationResolver<
    MutationCreateAccountPreferenceEventSizeArgs,
    Maybe<WithTypename<CreateAccountPreferenceEventSizePayload>>
  >
  createAccountSocialNetwork?: GraphCacheOptimisticMutationResolver<
    MutationCreateAccountSocialNetworkArgs,
    Maybe<WithTypename<CreateAccountSocialNetworkPayload>>
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
  createEventCategory?: GraphCacheOptimisticMutationResolver<
    MutationCreateEventCategoryArgs,
    Maybe<WithTypename<CreateEventCategoryPayload>>
  >
  createEventCategoryMapping?: GraphCacheOptimisticMutationResolver<
    MutationCreateEventCategoryMappingArgs,
    Maybe<WithTypename<CreateEventCategoryMappingPayload>>
  >
  createEventGroup?: GraphCacheOptimisticMutationResolver<
    MutationCreateEventGroupArgs,
    Maybe<WithTypename<CreateEventGroupPayload>>
  >
  createEventGrouping?: GraphCacheOptimisticMutationResolver<
    MutationCreateEventGroupingArgs,
    Maybe<WithTypename<CreateEventGroupingPayload>>
  >
  createEventRecommendation?: GraphCacheOptimisticMutationResolver<
    MutationCreateEventRecommendationArgs,
    Maybe<WithTypename<CreateEventRecommendationPayload>>
  >
  createEventUpload?: GraphCacheOptimisticMutationResolver<
    MutationCreateEventUploadArgs,
    Maybe<WithTypename<CreateEventUploadPayload>>
  >
  createInvitation?: GraphCacheOptimisticMutationResolver<
    MutationCreateInvitationArgs,
    Maybe<WithTypename<CreateInvitationPayload>>
  >
  createLegalTermAcceptance?: GraphCacheOptimisticMutationResolver<
    MutationCreateLegalTermAcceptanceArgs,
    Maybe<WithTypename<CreateLegalTermAcceptancePayload>>
  >
  createProfilePicture?: GraphCacheOptimisticMutationResolver<
    MutationCreateProfilePictureArgs,
    Maybe<WithTypename<CreateProfilePicturePayload>>
  >
  createReport?: GraphCacheOptimisticMutationResolver<
    MutationCreateReportArgs,
    Maybe<WithTypename<CreateReportPayload>>
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
  deleteAccountInterest?: GraphCacheOptimisticMutationResolver<
    MutationDeleteAccountInterestArgs,
    Maybe<WithTypename<DeleteAccountInterestPayload>>
  >
  deleteAccountInterestByAccountIdAndCategory?: GraphCacheOptimisticMutationResolver<
    MutationDeleteAccountInterestByAccountIdAndCategoryArgs,
    Maybe<WithTypename<DeleteAccountInterestPayload>>
  >
  deleteAccountPreferenceEventSize?: GraphCacheOptimisticMutationResolver<
    MutationDeleteAccountPreferenceEventSizeArgs,
    Maybe<WithTypename<DeleteAccountPreferenceEventSizePayload>>
  >
  deleteAccountPreferenceEventSizeByAccountIdAndEventSize?: GraphCacheOptimisticMutationResolver<
    MutationDeleteAccountPreferenceEventSizeByAccountIdAndEventSizeArgs,
    Maybe<WithTypename<DeleteAccountPreferenceEventSizePayload>>
  >
  deleteAccountSocialNetwork?: GraphCacheOptimisticMutationResolver<
    MutationDeleteAccountSocialNetworkArgs,
    Maybe<WithTypename<DeleteAccountSocialNetworkPayload>>
  >
  deleteAccountSocialNetworkByAccountIdAndSocialNetwork?: GraphCacheOptimisticMutationResolver<
    MutationDeleteAccountSocialNetworkByAccountIdAndSocialNetworkArgs,
    Maybe<WithTypename<DeleteAccountSocialNetworkPayload>>
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
  deleteEventCategory?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventCategoryArgs,
    Maybe<WithTypename<DeleteEventCategoryPayload>>
  >
  deleteEventCategoryByCategory?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventCategoryByCategoryArgs,
    Maybe<WithTypename<DeleteEventCategoryPayload>>
  >
  deleteEventCategoryMapping?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventCategoryMappingArgs,
    Maybe<WithTypename<DeleteEventCategoryMappingPayload>>
  >
  deleteEventCategoryMappingByEventIdAndCategory?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventCategoryMappingByEventIdAndCategoryArgs,
    Maybe<WithTypename<DeleteEventCategoryMappingPayload>>
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
  deleteEventRecommendation?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventRecommendationArgs,
    Maybe<WithTypename<DeleteEventRecommendationPayload>>
  >
  deleteEventRecommendationByAccountIdAndEventId?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventRecommendationByAccountIdAndEventIdArgs,
    Maybe<WithTypename<DeleteEventRecommendationPayload>>
  >
  deleteEventUpload?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventUploadArgs,
    Maybe<WithTypename<DeleteEventUploadPayload>>
  >
  deleteEventUploadByEventIdAndUploadId?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventUploadByEventIdAndUploadIdArgs,
    Maybe<WithTypename<DeleteEventUploadPayload>>
  >
  deleteEventUploadById?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventUploadByIdArgs,
    Maybe<WithTypename<DeleteEventUploadPayload>>
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
  deleteLegalTermAcceptance?: GraphCacheOptimisticMutationResolver<
    MutationDeleteLegalTermAcceptanceArgs,
    Maybe<WithTypename<DeleteLegalTermAcceptancePayload>>
  >
  deleteLegalTermAcceptanceById?: GraphCacheOptimisticMutationResolver<
    MutationDeleteLegalTermAcceptanceByIdArgs,
    Maybe<WithTypename<DeleteLegalTermAcceptancePayload>>
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
  updateAccountInterest?: GraphCacheOptimisticMutationResolver<
    MutationUpdateAccountInterestArgs,
    Maybe<WithTypename<UpdateAccountInterestPayload>>
  >
  updateAccountInterestByAccountIdAndCategory?: GraphCacheOptimisticMutationResolver<
    MutationUpdateAccountInterestByAccountIdAndCategoryArgs,
    Maybe<WithTypename<UpdateAccountInterestPayload>>
  >
  updateAccountPreferenceEventSize?: GraphCacheOptimisticMutationResolver<
    MutationUpdateAccountPreferenceEventSizeArgs,
    Maybe<WithTypename<UpdateAccountPreferenceEventSizePayload>>
  >
  updateAccountPreferenceEventSizeByAccountIdAndEventSize?: GraphCacheOptimisticMutationResolver<
    MutationUpdateAccountPreferenceEventSizeByAccountIdAndEventSizeArgs,
    Maybe<WithTypename<UpdateAccountPreferenceEventSizePayload>>
  >
  updateAccountSocialNetwork?: GraphCacheOptimisticMutationResolver<
    MutationUpdateAccountSocialNetworkArgs,
    Maybe<WithTypename<UpdateAccountSocialNetworkPayload>>
  >
  updateAccountSocialNetworkByAccountIdAndSocialNetwork?: GraphCacheOptimisticMutationResolver<
    MutationUpdateAccountSocialNetworkByAccountIdAndSocialNetworkArgs,
    Maybe<WithTypename<UpdateAccountSocialNetworkPayload>>
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
  updateEventCategory?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventCategoryArgs,
    Maybe<WithTypename<UpdateEventCategoryPayload>>
  >
  updateEventCategoryByCategory?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventCategoryByCategoryArgs,
    Maybe<WithTypename<UpdateEventCategoryPayload>>
  >
  updateEventCategoryMapping?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventCategoryMappingArgs,
    Maybe<WithTypename<UpdateEventCategoryMappingPayload>>
  >
  updateEventCategoryMappingByEventIdAndCategory?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventCategoryMappingByEventIdAndCategoryArgs,
    Maybe<WithTypename<UpdateEventCategoryMappingPayload>>
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
  updateEventRecommendation?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventRecommendationArgs,
    Maybe<WithTypename<UpdateEventRecommendationPayload>>
  >
  updateEventRecommendationByAccountIdAndEventId?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventRecommendationByAccountIdAndEventIdArgs,
    Maybe<WithTypename<UpdateEventRecommendationPayload>>
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
    accountInterest?: GraphCacheUpdateResolver<
      { accountInterest: Maybe<WithTypename<AccountInterest>> },
      QueryAccountInterestArgs
    >
    accountInterestByAccountIdAndCategory?: GraphCacheUpdateResolver<
      {
        accountInterestByAccountIdAndCategory: Maybe<
          WithTypename<AccountInterest>
        >
      },
      QueryAccountInterestByAccountIdAndCategoryArgs
    >
    accountPreferenceEventSize?: GraphCacheUpdateResolver<
      {
        accountPreferenceEventSize: Maybe<
          WithTypename<AccountPreferenceEventSize>
        >
      },
      QueryAccountPreferenceEventSizeArgs
    >
    accountPreferenceEventSizeByAccountIdAndEventSize?: GraphCacheUpdateResolver<
      {
        accountPreferenceEventSizeByAccountIdAndEventSize: Maybe<
          WithTypename<AccountPreferenceEventSize>
        >
      },
      QueryAccountPreferenceEventSizeByAccountIdAndEventSizeArgs
    >
    accountSocialNetwork?: GraphCacheUpdateResolver<
      { accountSocialNetwork: Maybe<WithTypename<AccountSocialNetwork>> },
      QueryAccountSocialNetworkArgs
    >
    accountSocialNetworkByAccountIdAndSocialNetwork?: GraphCacheUpdateResolver<
      {
        accountSocialNetworkByAccountIdAndSocialNetwork: Maybe<
          WithTypename<AccountSocialNetwork>
        >
      },
      QueryAccountSocialNetworkByAccountIdAndSocialNetworkArgs
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
    allAccountInterests?: GraphCacheUpdateResolver<
      { allAccountInterests: Maybe<WithTypename<AccountInterestsConnection>> },
      QueryAllAccountInterestsArgs
    >
    allAccountPreferenceEventSizes?: GraphCacheUpdateResolver<
      {
        allAccountPreferenceEventSizes: Maybe<
          WithTypename<AccountPreferenceEventSizesConnection>
        >
      },
      QueryAllAccountPreferenceEventSizesArgs
    >
    allAccountSocialNetworks?: GraphCacheUpdateResolver<
      {
        allAccountSocialNetworks: Maybe<
          WithTypename<AccountSocialNetworksConnection>
        >
      },
      QueryAllAccountSocialNetworksArgs
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
    allEventCategories?: GraphCacheUpdateResolver<
      { allEventCategories: Maybe<WithTypename<EventCategoriesConnection>> },
      QueryAllEventCategoriesArgs
    >
    allEventCategoryMappings?: GraphCacheUpdateResolver<
      {
        allEventCategoryMappings: Maybe<
          WithTypename<EventCategoryMappingsConnection>
        >
      },
      QueryAllEventCategoryMappingsArgs
    >
    allEventGroupings?: GraphCacheUpdateResolver<
      { allEventGroupings: Maybe<WithTypename<EventGroupingsConnection>> },
      QueryAllEventGroupingsArgs
    >
    allEventGroups?: GraphCacheUpdateResolver<
      { allEventGroups: Maybe<WithTypename<EventGroupsConnection>> },
      QueryAllEventGroupsArgs
    >
    allEventRecommendations?: GraphCacheUpdateResolver<
      {
        allEventRecommendations: Maybe<
          WithTypename<EventRecommendationsConnection>
        >
      },
      QueryAllEventRecommendationsArgs
    >
    allEventUploads?: GraphCacheUpdateResolver<
      { allEventUploads: Maybe<WithTypename<EventUploadsConnection>> },
      QueryAllEventUploadsArgs
    >
    allEvents?: GraphCacheUpdateResolver<
      { allEvents: Maybe<WithTypename<EventsConnection>> },
      QueryAllEventsArgs
    >
    allInvitationFlats?: GraphCacheUpdateResolver<
      { allInvitationFlats: Maybe<WithTypename<InvitationFlatsConnection>> },
      QueryAllInvitationFlatsArgs
    >
    allInvitations?: GraphCacheUpdateResolver<
      { allInvitations: Maybe<WithTypename<InvitationsConnection>> },
      QueryAllInvitationsArgs
    >
    allLegalTermAcceptances?: GraphCacheUpdateResolver<
      {
        allLegalTermAcceptances: Maybe<
          WithTypename<LegalTermAcceptancesConnection>
        >
      },
      QueryAllLegalTermAcceptancesArgs
    >
    allLegalTerms?: GraphCacheUpdateResolver<
      { allLegalTerms: Maybe<WithTypename<LegalTermsConnection>> },
      QueryAllLegalTermsArgs
    >
    allProfilePictures?: GraphCacheUpdateResolver<
      { allProfilePictures: Maybe<WithTypename<ProfilePicturesConnection>> },
      QueryAllProfilePicturesArgs
    >
    allReports?: GraphCacheUpdateResolver<
      { allReports: Maybe<WithTypename<ReportsConnection>> },
      QueryAllReportsArgs
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
    eventCategory?: GraphCacheUpdateResolver<
      { eventCategory: Maybe<WithTypename<EventCategory>> },
      QueryEventCategoryArgs
    >
    eventCategoryByCategory?: GraphCacheUpdateResolver<
      { eventCategoryByCategory: Maybe<WithTypename<EventCategory>> },
      QueryEventCategoryByCategoryArgs
    >
    eventCategoryMapping?: GraphCacheUpdateResolver<
      { eventCategoryMapping: Maybe<WithTypename<EventCategoryMapping>> },
      QueryEventCategoryMappingArgs
    >
    eventCategoryMappingByEventIdAndCategory?: GraphCacheUpdateResolver<
      {
        eventCategoryMappingByEventIdAndCategory: Maybe<
          WithTypename<EventCategoryMapping>
        >
      },
      QueryEventCategoryMappingByEventIdAndCategoryArgs
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
    eventRecommendation?: GraphCacheUpdateResolver<
      { eventRecommendation: Maybe<WithTypename<EventRecommendation>> },
      QueryEventRecommendationArgs
    >
    eventRecommendationByAccountIdAndEventId?: GraphCacheUpdateResolver<
      {
        eventRecommendationByAccountIdAndEventId: Maybe<
          WithTypename<EventRecommendation>
        >
      },
      QueryEventRecommendationByAccountIdAndEventIdArgs
    >
    eventUpload?: GraphCacheUpdateResolver<
      { eventUpload: Maybe<WithTypename<EventUpload>> },
      QueryEventUploadArgs
    >
    eventUploadByEventIdAndUploadId?: GraphCacheUpdateResolver<
      { eventUploadByEventIdAndUploadId: Maybe<WithTypename<EventUpload>> },
      QueryEventUploadByEventIdAndUploadIdArgs
    >
    eventUploadById?: GraphCacheUpdateResolver<
      { eventUploadById: Maybe<WithTypename<EventUpload>> },
      QueryEventUploadByIdArgs
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
    invokerAccountId?: GraphCacheUpdateResolver<
      { invokerAccountId: Maybe<Scalars['UUID']> },
      Record<string, never>
    >
    legalTerm?: GraphCacheUpdateResolver<
      { legalTerm: Maybe<WithTypename<LegalTerm>> },
      QueryLegalTermArgs
    >
    legalTermAcceptance?: GraphCacheUpdateResolver<
      { legalTermAcceptance: Maybe<WithTypename<LegalTermAcceptance>> },
      QueryLegalTermAcceptanceArgs
    >
    legalTermAcceptanceById?: GraphCacheUpdateResolver<
      { legalTermAcceptanceById: Maybe<WithTypename<LegalTermAcceptance>> },
      QueryLegalTermAcceptanceByIdArgs
    >
    legalTermById?: GraphCacheUpdateResolver<
      { legalTermById: Maybe<WithTypename<LegalTerm>> },
      QueryLegalTermByIdArgs
    >
    legalTermByLanguageAndVersion?: GraphCacheUpdateResolver<
      { legalTermByLanguageAndVersion: Maybe<WithTypename<LegalTerm>> },
      QueryLegalTermByLanguageAndVersionArgs
    >
    node?: GraphCacheUpdateResolver<
      {
        node: Maybe<
          | WithTypename<Account>
          | WithTypename<AccountInterest>
          | WithTypename<AccountPreferenceEventSize>
          | WithTypename<AccountSocialNetwork>
          | WithTypename<Achievement>
          | WithTypename<Contact>
          | WithTypename<Event>
          | WithTypename<EventCategory>
          | WithTypename<EventCategoryMapping>
          | WithTypename<EventGroup>
          | WithTypename<EventGrouping>
          | WithTypename<EventRecommendation>
          | WithTypename<EventUpload>
          | WithTypename<Invitation>
          | WithTypename<LegalTerm>
          | WithTypename<LegalTermAcceptance>
          | WithTypename<ProfilePicture>
          | WithTypename<Query>
          | WithTypename<Report>
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
    report?: GraphCacheUpdateResolver<
      { report: Maybe<WithTypename<Report>> },
      QueryReportArgs
    >
    reportByAuthorAccountIdAndTargetAccountIdAndTargetEventIdAndTargetUploadId?: GraphCacheUpdateResolver<
      {
        reportByAuthorAccountIdAndTargetAccountIdAndTargetEventIdAndTargetUploadId: Maybe<
          WithTypename<Report>
        >
      },
      QueryReportByAuthorAccountIdAndTargetAccountIdAndTargetEventIdAndTargetUploadIdArgs
    >
    reportById?: GraphCacheUpdateResolver<
      { reportById: Maybe<WithTypename<Report>> },
      QueryReportByIdArgs
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
    createAccountInterest?: GraphCacheUpdateResolver<
      {
        createAccountInterest: Maybe<WithTypename<CreateAccountInterestPayload>>
      },
      MutationCreateAccountInterestArgs
    >
    createAccountPreferenceEventSize?: GraphCacheUpdateResolver<
      {
        createAccountPreferenceEventSize: Maybe<
          WithTypename<CreateAccountPreferenceEventSizePayload>
        >
      },
      MutationCreateAccountPreferenceEventSizeArgs
    >
    createAccountSocialNetwork?: GraphCacheUpdateResolver<
      {
        createAccountSocialNetwork: Maybe<
          WithTypename<CreateAccountSocialNetworkPayload>
        >
      },
      MutationCreateAccountSocialNetworkArgs
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
    createEventCategory?: GraphCacheUpdateResolver<
      { createEventCategory: Maybe<WithTypename<CreateEventCategoryPayload>> },
      MutationCreateEventCategoryArgs
    >
    createEventCategoryMapping?: GraphCacheUpdateResolver<
      {
        createEventCategoryMapping: Maybe<
          WithTypename<CreateEventCategoryMappingPayload>
        >
      },
      MutationCreateEventCategoryMappingArgs
    >
    createEventGroup?: GraphCacheUpdateResolver<
      { createEventGroup: Maybe<WithTypename<CreateEventGroupPayload>> },
      MutationCreateEventGroupArgs
    >
    createEventGrouping?: GraphCacheUpdateResolver<
      { createEventGrouping: Maybe<WithTypename<CreateEventGroupingPayload>> },
      MutationCreateEventGroupingArgs
    >
    createEventRecommendation?: GraphCacheUpdateResolver<
      {
        createEventRecommendation: Maybe<
          WithTypename<CreateEventRecommendationPayload>
        >
      },
      MutationCreateEventRecommendationArgs
    >
    createEventUpload?: GraphCacheUpdateResolver<
      { createEventUpload: Maybe<WithTypename<CreateEventUploadPayload>> },
      MutationCreateEventUploadArgs
    >
    createInvitation?: GraphCacheUpdateResolver<
      { createInvitation: Maybe<WithTypename<CreateInvitationPayload>> },
      MutationCreateInvitationArgs
    >
    createLegalTermAcceptance?: GraphCacheUpdateResolver<
      {
        createLegalTermAcceptance: Maybe<
          WithTypename<CreateLegalTermAcceptancePayload>
        >
      },
      MutationCreateLegalTermAcceptanceArgs
    >
    createProfilePicture?: GraphCacheUpdateResolver<
      {
        createProfilePicture: Maybe<WithTypename<CreateProfilePicturePayload>>
      },
      MutationCreateProfilePictureArgs
    >
    createReport?: GraphCacheUpdateResolver<
      { createReport: Maybe<WithTypename<CreateReportPayload>> },
      MutationCreateReportArgs
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
    deleteAccountInterest?: GraphCacheUpdateResolver<
      {
        deleteAccountInterest: Maybe<WithTypename<DeleteAccountInterestPayload>>
      },
      MutationDeleteAccountInterestArgs
    >
    deleteAccountInterestByAccountIdAndCategory?: GraphCacheUpdateResolver<
      {
        deleteAccountInterestByAccountIdAndCategory: Maybe<
          WithTypename<DeleteAccountInterestPayload>
        >
      },
      MutationDeleteAccountInterestByAccountIdAndCategoryArgs
    >
    deleteAccountPreferenceEventSize?: GraphCacheUpdateResolver<
      {
        deleteAccountPreferenceEventSize: Maybe<
          WithTypename<DeleteAccountPreferenceEventSizePayload>
        >
      },
      MutationDeleteAccountPreferenceEventSizeArgs
    >
    deleteAccountPreferenceEventSizeByAccountIdAndEventSize?: GraphCacheUpdateResolver<
      {
        deleteAccountPreferenceEventSizeByAccountIdAndEventSize: Maybe<
          WithTypename<DeleteAccountPreferenceEventSizePayload>
        >
      },
      MutationDeleteAccountPreferenceEventSizeByAccountIdAndEventSizeArgs
    >
    deleteAccountSocialNetwork?: GraphCacheUpdateResolver<
      {
        deleteAccountSocialNetwork: Maybe<
          WithTypename<DeleteAccountSocialNetworkPayload>
        >
      },
      MutationDeleteAccountSocialNetworkArgs
    >
    deleteAccountSocialNetworkByAccountIdAndSocialNetwork?: GraphCacheUpdateResolver<
      {
        deleteAccountSocialNetworkByAccountIdAndSocialNetwork: Maybe<
          WithTypename<DeleteAccountSocialNetworkPayload>
        >
      },
      MutationDeleteAccountSocialNetworkByAccountIdAndSocialNetworkArgs
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
    deleteEventCategory?: GraphCacheUpdateResolver<
      { deleteEventCategory: Maybe<WithTypename<DeleteEventCategoryPayload>> },
      MutationDeleteEventCategoryArgs
    >
    deleteEventCategoryByCategory?: GraphCacheUpdateResolver<
      {
        deleteEventCategoryByCategory: Maybe<
          WithTypename<DeleteEventCategoryPayload>
        >
      },
      MutationDeleteEventCategoryByCategoryArgs
    >
    deleteEventCategoryMapping?: GraphCacheUpdateResolver<
      {
        deleteEventCategoryMapping: Maybe<
          WithTypename<DeleteEventCategoryMappingPayload>
        >
      },
      MutationDeleteEventCategoryMappingArgs
    >
    deleteEventCategoryMappingByEventIdAndCategory?: GraphCacheUpdateResolver<
      {
        deleteEventCategoryMappingByEventIdAndCategory: Maybe<
          WithTypename<DeleteEventCategoryMappingPayload>
        >
      },
      MutationDeleteEventCategoryMappingByEventIdAndCategoryArgs
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
    deleteEventRecommendation?: GraphCacheUpdateResolver<
      {
        deleteEventRecommendation: Maybe<
          WithTypename<DeleteEventRecommendationPayload>
        >
      },
      MutationDeleteEventRecommendationArgs
    >
    deleteEventRecommendationByAccountIdAndEventId?: GraphCacheUpdateResolver<
      {
        deleteEventRecommendationByAccountIdAndEventId: Maybe<
          WithTypename<DeleteEventRecommendationPayload>
        >
      },
      MutationDeleteEventRecommendationByAccountIdAndEventIdArgs
    >
    deleteEventUpload?: GraphCacheUpdateResolver<
      { deleteEventUpload: Maybe<WithTypename<DeleteEventUploadPayload>> },
      MutationDeleteEventUploadArgs
    >
    deleteEventUploadByEventIdAndUploadId?: GraphCacheUpdateResolver<
      {
        deleteEventUploadByEventIdAndUploadId: Maybe<
          WithTypename<DeleteEventUploadPayload>
        >
      },
      MutationDeleteEventUploadByEventIdAndUploadIdArgs
    >
    deleteEventUploadById?: GraphCacheUpdateResolver<
      { deleteEventUploadById: Maybe<WithTypename<DeleteEventUploadPayload>> },
      MutationDeleteEventUploadByIdArgs
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
    deleteLegalTermAcceptance?: GraphCacheUpdateResolver<
      {
        deleteLegalTermAcceptance: Maybe<
          WithTypename<DeleteLegalTermAcceptancePayload>
        >
      },
      MutationDeleteLegalTermAcceptanceArgs
    >
    deleteLegalTermAcceptanceById?: GraphCacheUpdateResolver<
      {
        deleteLegalTermAcceptanceById: Maybe<
          WithTypename<DeleteLegalTermAcceptancePayload>
        >
      },
      MutationDeleteLegalTermAcceptanceByIdArgs
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
    updateAccountInterest?: GraphCacheUpdateResolver<
      {
        updateAccountInterest: Maybe<WithTypename<UpdateAccountInterestPayload>>
      },
      MutationUpdateAccountInterestArgs
    >
    updateAccountInterestByAccountIdAndCategory?: GraphCacheUpdateResolver<
      {
        updateAccountInterestByAccountIdAndCategory: Maybe<
          WithTypename<UpdateAccountInterestPayload>
        >
      },
      MutationUpdateAccountInterestByAccountIdAndCategoryArgs
    >
    updateAccountPreferenceEventSize?: GraphCacheUpdateResolver<
      {
        updateAccountPreferenceEventSize: Maybe<
          WithTypename<UpdateAccountPreferenceEventSizePayload>
        >
      },
      MutationUpdateAccountPreferenceEventSizeArgs
    >
    updateAccountPreferenceEventSizeByAccountIdAndEventSize?: GraphCacheUpdateResolver<
      {
        updateAccountPreferenceEventSizeByAccountIdAndEventSize: Maybe<
          WithTypename<UpdateAccountPreferenceEventSizePayload>
        >
      },
      MutationUpdateAccountPreferenceEventSizeByAccountIdAndEventSizeArgs
    >
    updateAccountSocialNetwork?: GraphCacheUpdateResolver<
      {
        updateAccountSocialNetwork: Maybe<
          WithTypename<UpdateAccountSocialNetworkPayload>
        >
      },
      MutationUpdateAccountSocialNetworkArgs
    >
    updateAccountSocialNetworkByAccountIdAndSocialNetwork?: GraphCacheUpdateResolver<
      {
        updateAccountSocialNetworkByAccountIdAndSocialNetwork: Maybe<
          WithTypename<UpdateAccountSocialNetworkPayload>
        >
      },
      MutationUpdateAccountSocialNetworkByAccountIdAndSocialNetworkArgs
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
    updateEventCategory?: GraphCacheUpdateResolver<
      { updateEventCategory: Maybe<WithTypename<UpdateEventCategoryPayload>> },
      MutationUpdateEventCategoryArgs
    >
    updateEventCategoryByCategory?: GraphCacheUpdateResolver<
      {
        updateEventCategoryByCategory: Maybe<
          WithTypename<UpdateEventCategoryPayload>
        >
      },
      MutationUpdateEventCategoryByCategoryArgs
    >
    updateEventCategoryMapping?: GraphCacheUpdateResolver<
      {
        updateEventCategoryMapping: Maybe<
          WithTypename<UpdateEventCategoryMappingPayload>
        >
      },
      MutationUpdateEventCategoryMappingArgs
    >
    updateEventCategoryMappingByEventIdAndCategory?: GraphCacheUpdateResolver<
      {
        updateEventCategoryMappingByEventIdAndCategory: Maybe<
          WithTypename<UpdateEventCategoryMappingPayload>
        >
      },
      MutationUpdateEventCategoryMappingByEventIdAndCategoryArgs
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
    updateEventRecommendation?: GraphCacheUpdateResolver<
      {
        updateEventRecommendation: Maybe<
          WithTypename<UpdateEventRecommendationPayload>
        >
      },
      MutationUpdateEventRecommendationArgs
    >
    updateEventRecommendationByAccountIdAndEventId?: GraphCacheUpdateResolver<
      {
        updateEventRecommendationByAccountIdAndEventId: Maybe<
          WithTypename<UpdateEventRecommendationPayload>
        >
      },
      MutationUpdateEventRecommendationByAccountIdAndEventIdArgs
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
    accountInterestsByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountAccountInterestsByAccountIdArgs
    >
    accountPreferenceEventSizesByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountAccountPreferenceEventSizesByAccountIdArgs
    >
    accountSocialNetworksByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountAccountSocialNetworksByAccountIdArgs
    >
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
    eventRecommendationsByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountEventRecommendationsByAccountIdArgs
    >
    eventsByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountEventsByAuthorAccountIdArgs
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      Record<string, never>
    >
    invitationsByUpdatedBy?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountInvitationsByUpdatedByArgs
    >
    legalTermAcceptancesByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountLegalTermAcceptancesByAccountIdArgs
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
    reportsByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountReportsByAuthorAccountIdArgs
    >
    reportsByTargetAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Account>>,
      AccountReportsByTargetAccountIdArgs
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
  AccountInterest?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountInterest>>,
      Record<string, never>
    >
    accountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountInterest>>,
      Record<string, never>
    >
    category?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountInterest>>,
      Record<string, never>
    >
    eventCategoryByCategory?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountInterest>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountInterest>>,
      Record<string, never>
    >
  }
  AccountInterestsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountInterestsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountInterestsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountInterestsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountInterestsConnection>>,
      Record<string, never>
    >
  }
  AccountInterestsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountInterestsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountInterestsEdge>>,
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
  AccountPreferenceEventSize?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPreferenceEventSize>>,
      Record<string, never>
    >
    accountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPreferenceEventSize>>,
      Record<string, never>
    >
    createdAt?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPreferenceEventSize>>,
      Record<string, never>
    >
    eventSize?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPreferenceEventSize>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPreferenceEventSize>>,
      Record<string, never>
    >
  }
  AccountPreferenceEventSizesConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPreferenceEventSizesConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPreferenceEventSizesConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPreferenceEventSizesConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPreferenceEventSizesConnection>>,
      Record<string, never>
    >
  }
  AccountPreferenceEventSizesEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPreferenceEventSizesEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountPreferenceEventSizesEdge>>,
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
  AccountSocialNetwork?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountSocialNetwork>>,
      Record<string, never>
    >
    accountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountSocialNetwork>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountSocialNetwork>>,
      Record<string, never>
    >
    socialNetwork?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountSocialNetwork>>,
      Record<string, never>
    >
    socialNetworkUsername?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountSocialNetwork>>,
      Record<string, never>
    >
  }
  AccountSocialNetworksConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountSocialNetworksConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountSocialNetworksConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountSocialNetworksConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountSocialNetworksConnection>>,
      Record<string, never>
    >
  }
  AccountSocialNetworksEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountSocialNetworksEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<AccountSocialNetworksEdge>>,
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
    createdAt?: GraphCacheUpdateResolver<
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
    language?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    lastName?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Contact>>,
      Record<string, never>
    >
    nickname?: GraphCacheUpdateResolver<
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
    timezone?: GraphCacheUpdateResolver<
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
  CreateAccountInterestPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountInterestPayload>>,
      Record<string, never>
    >
    accountInterest?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountInterestPayload>>,
      Record<string, never>
    >
    accountInterestEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountInterestPayload>>,
      CreateAccountInterestPayloadAccountInterestEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountInterestPayload>>,
      Record<string, never>
    >
    eventCategoryByCategory?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountInterestPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountInterestPayload>>,
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
  CreateAccountPreferenceEventSizePayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountPreferenceEventSizePayload>>,
      Record<string, never>
    >
    accountPreferenceEventSize?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountPreferenceEventSizePayload>>,
      Record<string, never>
    >
    accountPreferenceEventSizeEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountPreferenceEventSizePayload>>,
      CreateAccountPreferenceEventSizePayloadAccountPreferenceEventSizeEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountPreferenceEventSizePayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountPreferenceEventSizePayload>>,
      Record<string, never>
    >
  }
  CreateAccountSocialNetworkPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountSocialNetworkPayload>>,
      Record<string, never>
    >
    accountSocialNetwork?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountSocialNetworkPayload>>,
      Record<string, never>
    >
    accountSocialNetworkEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountSocialNetworkPayload>>,
      CreateAccountSocialNetworkPayloadAccountSocialNetworkEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountSocialNetworkPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateAccountSocialNetworkPayload>>,
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
  CreateEventCategoryMappingPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventCategoryMappingPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventCategoryMappingPayload>>,
      Record<string, never>
    >
    eventCategoryByCategory?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventCategoryMappingPayload>>,
      Record<string, never>
    >
    eventCategoryMapping?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventCategoryMappingPayload>>,
      Record<string, never>
    >
    eventCategoryMappingEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventCategoryMappingPayload>>,
      CreateEventCategoryMappingPayloadEventCategoryMappingEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventCategoryMappingPayload>>,
      Record<string, never>
    >
  }
  CreateEventCategoryPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventCategoryPayload>>,
      Record<string, never>
    >
    eventCategory?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventCategoryPayload>>,
      Record<string, never>
    >
    eventCategoryEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventCategoryPayload>>,
      CreateEventCategoryPayloadEventCategoryEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventCategoryPayload>>,
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
  CreateEventRecommendationPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventRecommendationPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventRecommendationPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventRecommendationPayload>>,
      Record<string, never>
    >
    eventRecommendation?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventRecommendationPayload>>,
      Record<string, never>
    >
    eventRecommendationEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventRecommendationPayload>>,
      CreateEventRecommendationPayloadEventRecommendationEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventRecommendationPayload>>,
      Record<string, never>
    >
  }
  CreateEventUploadPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventUploadPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventUploadPayload>>,
      Record<string, never>
    >
    eventUpload?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventUploadPayload>>,
      Record<string, never>
    >
    eventUploadEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventUploadPayload>>,
      CreateEventUploadPayloadEventUploadEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventUploadPayload>>,
      Record<string, never>
    >
    uploadByUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateEventUploadPayload>>,
      Record<string, never>
    >
  }
  CreateInvitationPayload?: {
    accountByUpdatedBy?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateInvitationPayload>>,
      Record<string, never>
    >
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
  CreateLegalTermAcceptancePayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateLegalTermAcceptancePayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateLegalTermAcceptancePayload>>,
      Record<string, never>
    >
    legalTermAcceptance?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateLegalTermAcceptancePayload>>,
      Record<string, never>
    >
    legalTermAcceptanceEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateLegalTermAcceptancePayload>>,
      CreateLegalTermAcceptancePayloadLegalTermAcceptanceEdgeArgs
    >
    legalTermByLegalTermId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateLegalTermAcceptancePayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateLegalTermAcceptancePayload>>,
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
  CreateReportPayload?: {
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateReportPayload>>,
      Record<string, never>
    >
    accountByTargetAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateReportPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateReportPayload>>,
      Record<string, never>
    >
    eventByTargetEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateReportPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateReportPayload>>,
      Record<string, never>
    >
    report?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateReportPayload>>,
      Record<string, never>
    >
    reportEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateReportPayload>>,
      CreateReportPayloadReportEdgeArgs
    >
    uploadByTargetUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<CreateReportPayload>>,
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
  DeleteAccountInterestPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountInterestPayload>>,
      Record<string, never>
    >
    accountInterest?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountInterestPayload>>,
      Record<string, never>
    >
    accountInterestEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountInterestPayload>>,
      DeleteAccountInterestPayloadAccountInterestEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountInterestPayload>>,
      Record<string, never>
    >
    deletedAccountInterestId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountInterestPayload>>,
      Record<string, never>
    >
    eventCategoryByCategory?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountInterestPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountInterestPayload>>,
      Record<string, never>
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
  DeleteAccountPreferenceEventSizePayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountPreferenceEventSizePayload>>,
      Record<string, never>
    >
    accountPreferenceEventSize?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountPreferenceEventSizePayload>>,
      Record<string, never>
    >
    accountPreferenceEventSizeEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountPreferenceEventSizePayload>>,
      DeleteAccountPreferenceEventSizePayloadAccountPreferenceEventSizeEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountPreferenceEventSizePayload>>,
      Record<string, never>
    >
    deletedAccountPreferenceEventSizeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountPreferenceEventSizePayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountPreferenceEventSizePayload>>,
      Record<string, never>
    >
  }
  DeleteAccountSocialNetworkPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountSocialNetworkPayload>>,
      Record<string, never>
    >
    accountSocialNetwork?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountSocialNetworkPayload>>,
      Record<string, never>
    >
    accountSocialNetworkEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountSocialNetworkPayload>>,
      DeleteAccountSocialNetworkPayloadAccountSocialNetworkEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountSocialNetworkPayload>>,
      Record<string, never>
    >
    deletedAccountSocialNetworkId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountSocialNetworkPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteAccountSocialNetworkPayload>>,
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
  DeleteEventCategoryMappingPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventCategoryMappingPayload>>,
      Record<string, never>
    >
    deletedEventCategoryMappingId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventCategoryMappingPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventCategoryMappingPayload>>,
      Record<string, never>
    >
    eventCategoryByCategory?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventCategoryMappingPayload>>,
      Record<string, never>
    >
    eventCategoryMapping?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventCategoryMappingPayload>>,
      Record<string, never>
    >
    eventCategoryMappingEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventCategoryMappingPayload>>,
      DeleteEventCategoryMappingPayloadEventCategoryMappingEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventCategoryMappingPayload>>,
      Record<string, never>
    >
  }
  DeleteEventCategoryPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventCategoryPayload>>,
      Record<string, never>
    >
    deletedEventCategoryId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventCategoryPayload>>,
      Record<string, never>
    >
    eventCategory?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventCategoryPayload>>,
      Record<string, never>
    >
    eventCategoryEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventCategoryPayload>>,
      DeleteEventCategoryPayloadEventCategoryEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventCategoryPayload>>,
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
  DeleteEventRecommendationPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventRecommendationPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventRecommendationPayload>>,
      Record<string, never>
    >
    deletedEventRecommendationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventRecommendationPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventRecommendationPayload>>,
      Record<string, never>
    >
    eventRecommendation?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventRecommendationPayload>>,
      Record<string, never>
    >
    eventRecommendationEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventRecommendationPayload>>,
      DeleteEventRecommendationPayloadEventRecommendationEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventRecommendationPayload>>,
      Record<string, never>
    >
  }
  DeleteEventUploadPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventUploadPayload>>,
      Record<string, never>
    >
    deletedEventUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventUploadPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventUploadPayload>>,
      Record<string, never>
    >
    eventUpload?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventUploadPayload>>,
      Record<string, never>
    >
    eventUploadEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventUploadPayload>>,
      DeleteEventUploadPayloadEventUploadEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventUploadPayload>>,
      Record<string, never>
    >
    uploadByUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteEventUploadPayload>>,
      Record<string, never>
    >
  }
  DeleteInvitationPayload?: {
    accountByUpdatedBy?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteInvitationPayload>>,
      Record<string, never>
    >
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
  DeleteLegalTermAcceptancePayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteLegalTermAcceptancePayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteLegalTermAcceptancePayload>>,
      Record<string, never>
    >
    deletedLegalTermAcceptanceId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteLegalTermAcceptancePayload>>,
      Record<string, never>
    >
    legalTermAcceptance?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteLegalTermAcceptancePayload>>,
      Record<string, never>
    >
    legalTermAcceptanceEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteLegalTermAcceptancePayload>>,
      DeleteLegalTermAcceptancePayloadLegalTermAcceptanceEdgeArgs
    >
    legalTermByLegalTermId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteLegalTermAcceptancePayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<DeleteLegalTermAcceptancePayload>>,
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
    createdAt?: GraphCacheUpdateResolver<
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
    eventCategoryMappingsByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      EventEventCategoryMappingsByEventIdArgs
    >
    eventGroupingsByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      EventEventGroupingsByEventIdArgs
    >
    eventRecommendationsByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      EventEventRecommendationsByEventIdArgs
    >
    eventUploadsByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      EventEventUploadsByEventIdArgs
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
    reportsByTargetEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Event>>,
      EventReportsByTargetEventIdArgs
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
  EventCategoriesConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoriesConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoriesConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoriesConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoriesConnection>>,
      Record<string, never>
    >
  }
  EventCategoriesEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoriesEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoriesEdge>>,
      Record<string, never>
    >
  }
  EventCategory?: {
    accountInterestsByCategory?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategory>>,
      EventCategoryAccountInterestsByCategoryArgs
    >
    category?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategory>>,
      Record<string, never>
    >
    eventCategoryMappingsByCategory?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategory>>,
      EventCategoryEventCategoryMappingsByCategoryArgs
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategory>>,
      Record<string, never>
    >
  }
  EventCategoryMapping?: {
    category?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoryMapping>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoryMapping>>,
      Record<string, never>
    >
    eventCategoryByCategory?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoryMapping>>,
      Record<string, never>
    >
    eventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoryMapping>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoryMapping>>,
      Record<string, never>
    >
  }
  EventCategoryMappingsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoryMappingsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoryMappingsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoryMappingsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoryMappingsConnection>>,
      Record<string, never>
    >
  }
  EventCategoryMappingsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoryMappingsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventCategoryMappingsEdge>>,
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
    createdAt?: GraphCacheUpdateResolver<
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
  EventRecommendation?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventRecommendation>>,
      Record<string, never>
    >
    accountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventRecommendation>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventRecommendation>>,
      Record<string, never>
    >
    eventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventRecommendation>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventRecommendation>>,
      Record<string, never>
    >
    predictedScore?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventRecommendation>>,
      Record<string, never>
    >
    score?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventRecommendation>>,
      Record<string, never>
    >
  }
  EventRecommendationsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventRecommendationsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventRecommendationsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventRecommendationsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventRecommendationsConnection>>,
      Record<string, never>
    >
  }
  EventRecommendationsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventRecommendationsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventRecommendationsEdge>>,
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
  EventUpload?: {
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUpload>>,
      Record<string, never>
    >
    eventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUpload>>,
      Record<string, never>
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUpload>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUpload>>,
      Record<string, never>
    >
    uploadByUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUpload>>,
      Record<string, never>
    >
    uploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUpload>>,
      Record<string, never>
    >
  }
  EventUploadsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUploadsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUploadsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUploadsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUploadsConnection>>,
      Record<string, never>
    >
  }
  EventUploadsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUploadsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<EventUploadsEdge>>,
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
    accountByUpdatedBy?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Invitation>>,
      Record<string, never>
    >
    contactByContactId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Invitation>>,
      Record<string, never>
    >
    contactId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Invitation>>,
      Record<string, never>
    >
    createdAt?: GraphCacheUpdateResolver<
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
    updatedAt?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Invitation>>,
      Record<string, never>
    >
    updatedBy?: GraphCacheUpdateResolver<
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
  InvitationFlat?: {
    contactAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    contactAddress?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    contactAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    contactEmailAddress?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    contactEmailAddressHash?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    contactFirstName?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    contactId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    contactLastName?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    contactPhoneNumber?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    contactUrl?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventDescription?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventEnd?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventInviteeCountMaximum?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventIsArchived?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventIsInPerson?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventIsRemote?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventLocation?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventName?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventSlug?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventStart?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventUrl?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    eventVisibility?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    invitationContactId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    invitationEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    invitationFeedback?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    invitationFeedbackPaper?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
    invitationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlat>>,
      Record<string, never>
    >
  }
  InvitationFlatsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlatsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlatsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlatsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlatsConnection>>,
      Record<string, never>
    >
  }
  InvitationFlatsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlatsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<InvitationFlatsEdge>>,
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
  LegalTerm?: {
    createdAt?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTerm>>,
      Record<string, never>
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTerm>>,
      Record<string, never>
    >
    language?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTerm>>,
      Record<string, never>
    >
    legalTermAcceptancesByLegalTermId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTerm>>,
      LegalTermLegalTermAcceptancesByLegalTermIdArgs
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTerm>>,
      Record<string, never>
    >
    term?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTerm>>,
      Record<string, never>
    >
    version?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTerm>>,
      Record<string, never>
    >
  }
  LegalTermAcceptance?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermAcceptance>>,
      Record<string, never>
    >
    accountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermAcceptance>>,
      Record<string, never>
    >
    createdAt?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermAcceptance>>,
      Record<string, never>
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermAcceptance>>,
      Record<string, never>
    >
    legalTermByLegalTermId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermAcceptance>>,
      Record<string, never>
    >
    legalTermId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermAcceptance>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermAcceptance>>,
      Record<string, never>
    >
  }
  LegalTermAcceptancesConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermAcceptancesConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermAcceptancesConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermAcceptancesConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermAcceptancesConnection>>,
      Record<string, never>
    >
  }
  LegalTermAcceptancesEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermAcceptancesEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermAcceptancesEdge>>,
      Record<string, never>
    >
  }
  LegalTermsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermsConnection>>,
      Record<string, never>
    >
  }
  LegalTermsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<LegalTermsEdge>>,
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
  Report?: {
    accountByAuthorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Report>>,
      Record<string, never>
    >
    accountByTargetAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Report>>,
      Record<string, never>
    >
    authorAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Report>>,
      Record<string, never>
    >
    createdAt?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Report>>,
      Record<string, never>
    >
    eventByTargetEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Report>>,
      Record<string, never>
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Report>>,
      Record<string, never>
    >
    nodeId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Report>>,
      Record<string, never>
    >
    reason?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Report>>,
      Record<string, never>
    >
    targetAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Report>>,
      Record<string, never>
    >
    targetEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Report>>,
      Record<string, never>
    >
    targetUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Report>>,
      Record<string, never>
    >
    uploadByTargetUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Report>>,
      Record<string, never>
    >
  }
  ReportsConnection?: {
    edges?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ReportsConnection>>,
      Record<string, never>
    >
    nodes?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ReportsConnection>>,
      Record<string, never>
    >
    pageInfo?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ReportsConnection>>,
      Record<string, never>
    >
    totalCount?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ReportsConnection>>,
      Record<string, never>
    >
  }
  ReportsEdge?: {
    cursor?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ReportsEdge>>,
      Record<string, never>
    >
    node?: GraphCacheUpdateResolver<
      Maybe<WithTypename<ReportsEdge>>,
      Record<string, never>
    >
  }
  UpdateAccountInterestPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountInterestPayload>>,
      Record<string, never>
    >
    accountInterest?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountInterestPayload>>,
      Record<string, never>
    >
    accountInterestEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountInterestPayload>>,
      UpdateAccountInterestPayloadAccountInterestEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountInterestPayload>>,
      Record<string, never>
    >
    eventCategoryByCategory?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountInterestPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountInterestPayload>>,
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
  UpdateAccountPreferenceEventSizePayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountPreferenceEventSizePayload>>,
      Record<string, never>
    >
    accountPreferenceEventSize?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountPreferenceEventSizePayload>>,
      Record<string, never>
    >
    accountPreferenceEventSizeEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountPreferenceEventSizePayload>>,
      UpdateAccountPreferenceEventSizePayloadAccountPreferenceEventSizeEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountPreferenceEventSizePayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountPreferenceEventSizePayload>>,
      Record<string, never>
    >
  }
  UpdateAccountSocialNetworkPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountSocialNetworkPayload>>,
      Record<string, never>
    >
    accountSocialNetwork?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountSocialNetworkPayload>>,
      Record<string, never>
    >
    accountSocialNetworkEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountSocialNetworkPayload>>,
      UpdateAccountSocialNetworkPayloadAccountSocialNetworkEdgeArgs
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountSocialNetworkPayload>>,
      Record<string, never>
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateAccountSocialNetworkPayload>>,
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
  UpdateEventCategoryMappingPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventCategoryMappingPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventCategoryMappingPayload>>,
      Record<string, never>
    >
    eventCategoryByCategory?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventCategoryMappingPayload>>,
      Record<string, never>
    >
    eventCategoryMapping?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventCategoryMappingPayload>>,
      Record<string, never>
    >
    eventCategoryMappingEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventCategoryMappingPayload>>,
      UpdateEventCategoryMappingPayloadEventCategoryMappingEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventCategoryMappingPayload>>,
      Record<string, never>
    >
  }
  UpdateEventCategoryPayload?: {
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventCategoryPayload>>,
      Record<string, never>
    >
    eventCategory?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventCategoryPayload>>,
      Record<string, never>
    >
    eventCategoryEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventCategoryPayload>>,
      UpdateEventCategoryPayloadEventCategoryEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventCategoryPayload>>,
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
  UpdateEventRecommendationPayload?: {
    accountByAccountId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventRecommendationPayload>>,
      Record<string, never>
    >
    clientMutationId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventRecommendationPayload>>,
      Record<string, never>
    >
    eventByEventId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventRecommendationPayload>>,
      Record<string, never>
    >
    eventRecommendation?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventRecommendationPayload>>,
      Record<string, never>
    >
    eventRecommendationEdge?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventRecommendationPayload>>,
      UpdateEventRecommendationPayloadEventRecommendationEdgeArgs
    >
    query?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateEventRecommendationPayload>>,
      Record<string, never>
    >
  }
  UpdateInvitationPayload?: {
    accountByUpdatedBy?: GraphCacheUpdateResolver<
      Maybe<WithTypename<UpdateInvitationPayload>>,
      Record<string, never>
    >
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
    createdAt?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Upload>>,
      Record<string, never>
    >
    eventUploadsByUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Upload>>,
      UploadEventUploadsByUploadIdArgs
    >
    id?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Upload>>,
      Record<string, never>
    >
    name?: GraphCacheUpdateResolver<
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
    reportsByTargetUploadId?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Upload>>,
      UploadReportsByTargetUploadIdArgs
    >
    sizeByte?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Upload>>,
      Record<string, never>
    >
    storageKey?: GraphCacheUpdateResolver<
      Maybe<WithTypename<Upload>>,
      Record<string, never>
    >
    type?: GraphCacheUpdateResolver<
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

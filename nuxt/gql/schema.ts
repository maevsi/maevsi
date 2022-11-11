/* eslint-disable no-use-before-define */
import {
  Resolver as GraphCacheResolver,
  UpdateResolver as GraphCacheUpdateResolver,
  OptimisticMutationResolver as GraphCacheOptimisticMutationResolver,
  StorageAdapter as GraphCacheStorageAdapter,
} from '@urql/exchange-graphcache'
import { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast'
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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigInt: any
  Cursor: any
  Datetime: any
  Jwt: any
  UUID: any
}

/** All input for the `accountDelete` mutation. */
export type AccountDeleteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  password: Scalars['String']
}

/** The output of our `accountDelete` mutation. */
export type AccountDeletePayload = {
  __typename?: 'AccountDeletePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `accountEmailAddressVerification` mutation. */
export type AccountEmailAddressVerificationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  code: Scalars['UUID']
}

/** The output of our `accountEmailAddressVerification` mutation. */
export type AccountEmailAddressVerificationPayload = {
  __typename?: 'AccountEmailAddressVerificationPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `accountPasswordChange` mutation. */
export type AccountPasswordChangeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  passwordCurrent: Scalars['String']
  passwordNew: Scalars['String']
}

/** The output of our `accountPasswordChange` mutation. */
export type AccountPasswordChangePayload = {
  __typename?: 'AccountPasswordChangePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `accountPasswordReset` mutation. */
export type AccountPasswordResetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  code: Scalars['UUID']
  password: Scalars['String']
}

/** The output of our `accountPasswordReset` mutation. */
export type AccountPasswordResetPayload = {
  __typename?: 'AccountPasswordResetPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `accountPasswordResetRequest` mutation. */
export type AccountPasswordResetRequestInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  emailAddress: Scalars['String']
  language: Scalars['String']
}

/** The output of our `accountPasswordResetRequest` mutation. */
export type AccountPasswordResetRequestPayload = {
  __typename?: 'AccountPasswordResetRequestPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `accountRegistration` mutation. */
export type AccountRegistrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  emailAddress: Scalars['String']
  language: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

/** The output of our `accountRegistration` mutation. */
export type AccountRegistrationPayload = {
  __typename?: 'AccountRegistrationPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `accountRegistrationRefresh` mutation. */
export type AccountRegistrationRefreshInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  language: Scalars['String']
  username: Scalars['String']
}

/** The output of our `accountRegistrationRefresh` mutation. */
export type AccountRegistrationRefreshPayload = {
  __typename?: 'AccountRegistrationRefreshPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `authenticate` mutation. */
export type AuthenticateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  password: Scalars['String']
  username: Scalars['String']
}

/** The output of our `authenticate` mutation. */
export type AuthenticatePayload = {
  __typename?: 'AuthenticatePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  jwt?: Maybe<Scalars['Jwt']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** Contact data. */
export type Contact = Node & {
  __typename?: 'Contact'
  /** The contact account's username. */
  accountUsername?: Maybe<Scalars['String']>
  /** The contact's physical address. */
  address?: Maybe<Scalars['String']>
  /** The contact author's username. */
  authorAccountUsername: Scalars['String']
  /** The contact's email address. */
  emailAddress?: Maybe<Scalars['String']>
  /** The contact's email address's md5 hash. */
  emailAddressHash?: Maybe<Scalars['String']>
  /** The contact's first name. */
  firstName?: Maybe<Scalars['String']>
  /** The contact's internal id. */
  id: Scalars['BigInt']
  /** Reads and enables pagination through a set of `Invitation`. */
  invitationsByContactId: InvitationsConnection
  /** The contact's last name. */
  lastName?: Maybe<Scalars['String']>
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  /** The contact's international phone number. */
  phoneNumber?: Maybe<Scalars['String']>
  /** The contact's website url. */
  url?: Maybe<Scalars['String']>
}

/** Contact data. */
export type ContactInvitationsByContactIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  condition?: InputMaybe<InvitationCondition>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<InvitationsOrderBy>>
}

/** A condition to be used against `Contact` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ContactCondition = {
  /** Checks for equality with the object’s `accountUsername` field. */
  accountUsername?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `address` field. */
  address?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `authorAccountUsername` field. */
  authorAccountUsername?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `emailAddress` field. */
  emailAddress?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `emailAddressHash` field. */
  emailAddressHash?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']>
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `phoneNumber` field. */
  phoneNumber?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']>
}

/** An input for mutations affecting `Contact` */
export type ContactInput = {
  /** The contact account's username. */
  accountUsername?: InputMaybe<Scalars['String']>
  /** The contact's physical address. */
  address?: InputMaybe<Scalars['String']>
  /** The contact author's username. */
  authorAccountUsername: Scalars['String']
  /** The contact's email address. */
  emailAddress?: InputMaybe<Scalars['String']>
  /** The contact's first name. */
  firstName?: InputMaybe<Scalars['String']>
  /** The contact's last name. */
  lastName?: InputMaybe<Scalars['String']>
  /** The contact's international phone number. */
  phoneNumber?: InputMaybe<Scalars['String']>
  /** The contact's website url. */
  url?: InputMaybe<Scalars['String']>
}

/** Represents an update to a `Contact`. Fields that are set will be updated. */
export type ContactPatch = {
  /** The contact account's username. */
  accountUsername?: InputMaybe<Scalars['String']>
  /** The contact's physical address. */
  address?: InputMaybe<Scalars['String']>
  /** The contact author's username. */
  authorAccountUsername?: InputMaybe<Scalars['String']>
  /** The contact's email address. */
  emailAddress?: InputMaybe<Scalars['String']>
  /** The contact's first name. */
  firstName?: InputMaybe<Scalars['String']>
  /** The contact's last name. */
  lastName?: InputMaybe<Scalars['String']>
  /** The contact's international phone number. */
  phoneNumber?: InputMaybe<Scalars['String']>
  /** The contact's website url. */
  url?: InputMaybe<Scalars['String']>
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
  totalCount: Scalars['Int']
}

/** A `Contact` edge in the connection. */
export type ContactsEdge = {
  __typename?: 'ContactsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Contact` at the end of the edge. */
  node: Contact
}

/** Methods to use when ordering `Contact`. */
export enum ContactsOrderBy {
  AccountUsernameAsc = 'ACCOUNT_USERNAME_ASC',
  AccountUsernameDesc = 'ACCOUNT_USERNAME_DESC',
  AddressAsc = 'ADDRESS_ASC',
  AddressDesc = 'ADDRESS_DESC',
  AuthorAccountUsernameAsc = 'AUTHOR_ACCOUNT_USERNAME_ASC',
  AuthorAccountUsernameDesc = 'AUTHOR_ACCOUNT_USERNAME_DESC',
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

/** All input for the create `Contact` mutation. */
export type CreateContactInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The `Contact` to be created by this mutation. */
  contact: ContactInput
}

/** The output of our create `Contact` mutation. */
export type CreateContactPayload = {
  __typename?: 'CreateContactPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
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
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The `EventGroup` to be created by this mutation. */
  eventGroup: EventGroupInput
}

/** The output of our create `EventGroup` mutation. */
export type CreateEventGroupPayload = {
  __typename?: 'CreateEventGroupPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
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
  clientMutationId?: InputMaybe<Scalars['String']>
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
  clientMutationId?: Maybe<Scalars['String']>
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
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The `Event` to be created by this mutation. */
  event: EventInput
}

/** The output of our create `Event` mutation. */
export type CreateEventPayload = {
  __typename?: 'CreateEventPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
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
  clientMutationId?: InputMaybe<Scalars['String']>
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
  clientMutationId?: Maybe<Scalars['String']>
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
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The `ProfilePicture` to be created by this mutation. */
  profilePicture: ProfilePictureInput
}

/** The output of our create `ProfilePicture` mutation. */
export type CreateProfilePicturePayload = {
  __typename?: 'CreateProfilePicturePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ProfilePicture` that was created by this mutation. */
  profilePicture?: Maybe<ProfilePicture>
  /** An edge for our `ProfilePicture`. May be used by Relay 1. */
  profilePictureEdge?: Maybe<ProfilePicturesEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Upload` that is related to this `ProfilePicture`. */
  uploadByUploadStorageKey?: Maybe<Upload>
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
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The `Upload` to be created by this mutation. */
  upload: UploadInput
}

/** The output of our create `Upload` mutation. */
export type CreateUploadPayload = {
  __typename?: 'CreateUploadPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
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

/** All input for the `deleteContactByAuthorAccountUsernameAndAccountUsername` mutation. */
export type DeleteContactByAuthorAccountUsernameAndAccountUsernameInput = {
  /** The contact account's username. */
  accountUsername: Scalars['String']
  /** The contact author's username. */
  authorAccountUsername: Scalars['String']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
}

/** All input for the `deleteContactById` mutation. */
export type DeleteContactByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The contact's internal id. */
  id: Scalars['BigInt']
}

/** All input for the `deleteContact` mutation. */
export type DeleteContactInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Contact` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `Contact` mutation. */
export type DeleteContactPayload = {
  __typename?: 'DeleteContactPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `Contact` that was deleted by this mutation. */
  contact?: Maybe<Contact>
  /** An edge for our `Contact`. May be used by Relay 1. */
  contactEdge?: Maybe<ContactsEdge>
  deletedContactId?: Maybe<Scalars['ID']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `Contact` mutation. */
export type DeleteContactPayloadContactEdgeArgs = {
  orderBy?: InputMaybe<Array<ContactsOrderBy>>
}

/** All input for the `deleteEventByAuthorUsernameAndSlug` mutation. */
export type DeleteEventByAuthorUsernameAndSlugInput = {
  /** The event author's username. */
  authorUsername: Scalars['String']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The event's name, slugified. */
  slug: Scalars['String']
}

/** All input for the `deleteEventById` mutation. */
export type DeleteEventByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The event's internal id. */
  id: Scalars['BigInt']
}

/** All input for the `deleteEventGroupByAuthorUsernameAndSlug` mutation. */
export type DeleteEventGroupByAuthorUsernameAndSlugInput = {
  /** The event group author's username. */
  authorUsername: Scalars['String']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The event group's name, slugified. */
  slug: Scalars['String']
}

/** All input for the `deleteEventGroupById` mutation. */
export type DeleteEventGroupByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The event group's internal id. */
  id: Scalars['BigInt']
}

/** All input for the `deleteEventGroup` mutation. */
export type DeleteEventGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `EventGroup` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `EventGroup` mutation. */
export type DeleteEventGroupPayload = {
  __typename?: 'DeleteEventGroupPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  deletedEventGroupId?: Maybe<Scalars['ID']>
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
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The event grouping's internal event group id. */
  eventGroupId: Scalars['BigInt']
  /** The event grouping's internal event id. */
  eventId: Scalars['BigInt']
}

/** All input for the `deleteEventGroupingById` mutation. */
export type DeleteEventGroupingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The event grouping's internal id. */
  id: Scalars['BigInt']
}

/** All input for the `deleteEventGrouping` mutation. */
export type DeleteEventGroupingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `EventGrouping` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `EventGrouping` mutation. */
export type DeleteEventGroupingPayload = {
  __typename?: 'DeleteEventGroupingPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  deletedEventGroupingId?: Maybe<Scalars['ID']>
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
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Event` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `Event` mutation. */
export type DeleteEventPayload = {
  __typename?: 'DeleteEventPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  deletedEventId?: Maybe<Scalars['ID']>
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
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The contact's internal id for which the invitation is valid. */
  contactId: Scalars['BigInt']
  /** The event's internal id for which the invitation is valid. */
  eventId: Scalars['BigInt']
}

/** All input for the `deleteInvitationById` mutation. */
export type DeleteInvitationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The invitations's internal id. */
  id: Scalars['BigInt']
}

/** All input for the `deleteInvitationByUuid` mutation. */
export type DeleteInvitationByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The invitations's invitation code. */
  uuid: Scalars['UUID']
}

/** All input for the `deleteInvitation` mutation. */
export type DeleteInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Invitation` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `Invitation` mutation. */
export type DeleteInvitationPayload = {
  __typename?: 'DeleteInvitationPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** Reads a single `Contact` that is related to this `Invitation`. */
  contactByContactId?: Maybe<Contact>
  deletedInvitationId?: Maybe<Scalars['ID']>
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

/** All input for the `deleteProfilePictureById` mutation. */
export type DeleteProfilePictureByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The profile picture's internal id. */
  id: Scalars['BigInt']
}

/** All input for the `deleteProfilePictureByUsername` mutation. */
export type DeleteProfilePictureByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The account's username. */
  username: Scalars['String']
}

/** All input for the `deleteProfilePicture` mutation. */
export type DeleteProfilePictureInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `ProfilePicture` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `ProfilePicture` mutation. */
export type DeleteProfilePicturePayload = {
  __typename?: 'DeleteProfilePicturePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  deletedProfilePictureId?: Maybe<Scalars['ID']>
  /** The `ProfilePicture` that was deleted by this mutation. */
  profilePicture?: Maybe<ProfilePicture>
  /** An edge for our `ProfilePicture`. May be used by Relay 1. */
  profilePictureEdge?: Maybe<ProfilePicturesEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Upload` that is related to this `ProfilePicture`. */
  uploadByUploadStorageKey?: Maybe<Upload>
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
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The upload's internal id. */
  id: Scalars['BigInt']
}

/** All input for the `deleteUploadByStorageKey` mutation. */
export type DeleteUploadByStorageKeyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The upload's storage key. */
  storageKey: Scalars['String']
}

/** All input for the `deleteUploadByUuid` mutation. */
export type DeleteUploadByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The upload's UUID. */
  uuid: Scalars['UUID']
}

/** All input for the `deleteUpload` mutation. */
export type DeleteUploadInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Upload` to be deleted. */
  nodeId: Scalars['ID']
}

/** The output of our delete `Upload` mutation. */
export type DeleteUploadPayload = {
  __typename?: 'DeleteUploadPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  deletedUploadId?: Maybe<Scalars['ID']>
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
  /** The event author's username. */
  authorUsername: Scalars['String']
  /** The event's description. */
  description?: Maybe<Scalars['String']>
  /** The event's end date and time, with timezone. */
  end?: Maybe<Scalars['Datetime']>
  /** Reads and enables pagination through a set of `EventGrouping`. */
  eventGroupingsByEventId: EventGroupingsConnection
  /** The event's internal id. */
  id: Scalars['BigInt']
  /** Reads and enables pagination through a set of `Invitation`. */
  invitationsByEventId: InvitationsConnection
  /** The event's maximum invitee count. */
  inviteeCountMaximum?: Maybe<Scalars['Int']>
  /** Indicates whether the event is archived. */
  isArchived: Scalars['Boolean']
  /** Indicates whether the event takes place in person. */
  isInPerson?: Maybe<Scalars['Boolean']>
  /** Indicates whether the event takes place remotely. */
  isRemote?: Maybe<Scalars['Boolean']>
  /** The event's location as it can be shown on a map. */
  location?: Maybe<Scalars['String']>
  /** The event's name. */
  name: Scalars['String']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  /** The event's name, slugified. */
  slug: Scalars['String']
  /** The event's start date and time, with timezone. */
  start: Scalars['Datetime']
  /** The event's unified resource locator. */
  url?: Maybe<Scalars['String']>
  /** The event's visibility. */
  visibility: EventVisibility
}

/** An event. */
export type EventEventGroupingsByEventIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  condition?: InputMaybe<EventGroupingCondition>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<EventGroupingsOrderBy>>
}

/** An event. */
export type EventInvitationsByEventIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  condition?: InputMaybe<InvitationCondition>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<InvitationsOrderBy>>
}

/** A condition to be used against `Event` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EventCondition = {
  /** Checks for equality with the object’s `authorUsername` field. */
  authorUsername?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `end` field. */
  end?: InputMaybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']>
  /** Checks for equality with the object’s `inviteeCountMaximum` field. */
  inviteeCountMaximum?: InputMaybe<Scalars['Int']>
  /** Checks for equality with the object’s `isArchived` field. */
  isArchived?: InputMaybe<Scalars['Boolean']>
  /** Checks for equality with the object’s `isInPerson` field. */
  isInPerson?: InputMaybe<Scalars['Boolean']>
  /** Checks for equality with the object’s `isRemote` field. */
  isRemote?: InputMaybe<Scalars['Boolean']>
  /** Checks for equality with the object’s `location` field. */
  location?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `start` field. */
  start?: InputMaybe<Scalars['Datetime']>
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `visibility` field. */
  visibility?: InputMaybe<EventVisibility>
}

/** All input for the `eventDelete` mutation. */
export type EventDeleteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  id: Scalars['BigInt']
  password: Scalars['String']
}

/** The output of our `eventDelete` mutation. */
export type EventDeletePayload = {
  __typename?: 'EventDeletePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
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
  /** The event group author's username. */
  authorUsername: Scalars['String']
  /** The event group's description. */
  description?: Maybe<Scalars['String']>
  /** Reads and enables pagination through a set of `EventGrouping`. */
  eventGroupingsByEventGroupId: EventGroupingsConnection
  /** The event group's internal id. */
  id: Scalars['BigInt']
  /** Indicates whether the event group is archived. */
  isArchived: Scalars['Boolean']
  /** The event group's name. */
  name: Scalars['String']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  /** The event group's name, slugified. */
  slug: Scalars['String']
}

/** A group of events. */
export type EventGroupEventGroupingsByEventGroupIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  condition?: InputMaybe<EventGroupingCondition>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<EventGroupingsOrderBy>>
}

/**
 * A condition to be used against `EventGroup` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type EventGroupCondition = {
  /** Checks for equality with the object’s `authorUsername` field. */
  authorUsername?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']>
  /** Checks for equality with the object’s `isArchived` field. */
  isArchived?: InputMaybe<Scalars['Boolean']>
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']>
}

/** An input for mutations affecting `EventGroup` */
export type EventGroupInput = {
  /** The event group author's username. */
  authorUsername: Scalars['String']
  /** The event group's description. */
  description?: InputMaybe<Scalars['String']>
  /** Indicates whether the event group is archived. */
  isArchived?: InputMaybe<Scalars['Boolean']>
  /** The event group's name. */
  name: Scalars['String']
}

/** Represents an update to a `EventGroup`. Fields that are set will be updated. */
export type EventGroupPatch = {
  /** The event group author's username. */
  authorUsername?: InputMaybe<Scalars['String']>
  /** The event group's description. */
  description?: InputMaybe<Scalars['String']>
  /** Indicates whether the event group is archived. */
  isArchived?: InputMaybe<Scalars['Boolean']>
  /** The event group's name. */
  name?: InputMaybe<Scalars['String']>
}

/** A bidirectional mapping between an event and an event group. */
export type EventGrouping = Node & {
  __typename?: 'EventGrouping'
  /** Reads a single `Event` that is related to this `EventGrouping`. */
  eventByEventId?: Maybe<Event>
  /** Reads a single `EventGroup` that is related to this `EventGrouping`. */
  eventGroupByEventGroupId?: Maybe<EventGroup>
  /** The event grouping's internal event group id. */
  eventGroupId: Scalars['BigInt']
  /** The event grouping's internal event id. */
  eventId: Scalars['BigInt']
  /** The event grouping's internal id. */
  id: Scalars['BigInt']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
}

/**
 * A condition to be used against `EventGrouping` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EventGroupingCondition = {
  /** Checks for equality with the object’s `eventGroupId` field. */
  eventGroupId?: InputMaybe<Scalars['BigInt']>
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['BigInt']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']>
}

/** An input for mutations affecting `EventGrouping` */
export type EventGroupingInput = {
  /** The event grouping's internal event group id. */
  eventGroupId: Scalars['BigInt']
  /** The event grouping's internal event id. */
  eventId: Scalars['BigInt']
}

/** Represents an update to a `EventGrouping`. Fields that are set will be updated. */
export type EventGroupingPatch = {
  /** The event grouping's internal event group id. */
  eventGroupId?: InputMaybe<Scalars['BigInt']>
  /** The event grouping's internal event id. */
  eventId?: InputMaybe<Scalars['BigInt']>
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
  totalCount: Scalars['Int']
}

/** A `EventGrouping` edge in the connection. */
export type EventGroupingsEdge = {
  __typename?: 'EventGroupingsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
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
  totalCount: Scalars['Int']
}

/** A `EventGroup` edge in the connection. */
export type EventGroupsEdge = {
  __typename?: 'EventGroupsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `EventGroup` at the end of the edge. */
  node: EventGroup
}

/** Methods to use when ordering `EventGroup`. */
export enum EventGroupsOrderBy {
  AuthorUsernameAsc = 'AUTHOR_USERNAME_ASC',
  AuthorUsernameDesc = 'AUTHOR_USERNAME_DESC',
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
  /** The event author's username. */
  authorUsername: Scalars['String']
  /** The event's description. */
  description?: InputMaybe<Scalars['String']>
  /** The event's end date and time, with timezone. */
  end?: InputMaybe<Scalars['Datetime']>
  /** The event's maximum invitee count. */
  inviteeCountMaximum?: InputMaybe<Scalars['Int']>
  /** Indicates whether the event is archived. */
  isArchived?: InputMaybe<Scalars['Boolean']>
  /** Indicates whether the event takes place in person. */
  isInPerson?: InputMaybe<Scalars['Boolean']>
  /** Indicates whether the event takes place remotely. */
  isRemote?: InputMaybe<Scalars['Boolean']>
  /** The event's location as it can be shown on a map. */
  location?: InputMaybe<Scalars['String']>
  /** The event's name. */
  name: Scalars['String']
  /** The event's name, slugified. */
  slug: Scalars['String']
  /** The event's start date and time, with timezone. */
  start: Scalars['Datetime']
  /** The event's unified resource locator. */
  url?: InputMaybe<Scalars['String']>
  /** The event's visibility. */
  visibility: EventVisibility
}

/** Represents an update to a `Event`. Fields that are set will be updated. */
export type EventPatch = {
  /** The event author's username. */
  authorUsername?: InputMaybe<Scalars['String']>
  /** The event's description. */
  description?: InputMaybe<Scalars['String']>
  /** The event's end date and time, with timezone. */
  end?: InputMaybe<Scalars['Datetime']>
  /** The event's maximum invitee count. */
  inviteeCountMaximum?: InputMaybe<Scalars['Int']>
  /** Indicates whether the event is archived. */
  isArchived?: InputMaybe<Scalars['Boolean']>
  /** Indicates whether the event takes place in person. */
  isInPerson?: InputMaybe<Scalars['Boolean']>
  /** Indicates whether the event takes place remotely. */
  isRemote?: InputMaybe<Scalars['Boolean']>
  /** The event's location as it can be shown on a map. */
  location?: InputMaybe<Scalars['String']>
  /** The event's name. */
  name?: InputMaybe<Scalars['String']>
  /** The event's name, slugified. */
  slug?: InputMaybe<Scalars['String']>
  /** The event's start date and time, with timezone. */
  start?: InputMaybe<Scalars['Datetime']>
  /** The event's unified resource locator. */
  url?: InputMaybe<Scalars['String']>
  /** The event's visibility. */
  visibility?: InputMaybe<EventVisibility>
}

/** All input for the `eventUnlock` mutation. */
export type EventUnlockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  invitationCode: Scalars['UUID']
}

/** The output of our `eventUnlock` mutation. */
export type EventUnlockPayload = {
  __typename?: 'EventUnlockPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  eventUnlockResponse?: Maybe<EventUnlockResponse>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

export type EventUnlockResponse = {
  __typename?: 'EventUnlockResponse'
  authorUsername?: Maybe<Scalars['String']>
  eventSlug?: Maybe<Scalars['String']>
  jwt?: Maybe<Scalars['Jwt']>
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
  totalCount: Scalars['Int']
}

/** A `Event` edge in the connection. */
export type EventsEdge = {
  __typename?: 'EventsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Event` at the end of the edge. */
  node: Event
}

/** Methods to use when ordering `Event`. */
export enum EventsOrderBy {
  AuthorUsernameAsc = 'AUTHOR_USERNAME_ASC',
  AuthorUsernameDesc = 'AUTHOR_USERNAME_DESC',
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

/** A connection to a list of `BigInt` values. */
export type EventsOrganizedConnection = {
  __typename?: 'EventsOrganizedConnection'
  /** A list of edges which contains the `BigInt` and cursor to aid in pagination. */
  edges: Array<EventsOrganizedEdge>
  /** A list of `BigInt` objects. */
  nodes: Array<Maybe<Scalars['BigInt']>>
  /** The count of *all* `BigInt` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** A `BigInt` edge in the connection. */
export type EventsOrganizedEdge = {
  __typename?: 'EventsOrganizedEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `BigInt` at the end of the edge. */
  node?: Maybe<Scalars['BigInt']>
}

/** An invitation for a contact. A bidirectional mapping between an event and a contact. */
export type Invitation = Node & {
  __typename?: 'Invitation'
  /** Reads a single `Contact` that is related to this `Invitation`. */
  contactByContactId?: Maybe<Contact>
  /** The contact's internal id for which the invitation is valid. */
  contactId: Scalars['BigInt']
  /** Reads a single `Event` that is related to this `Invitation`. */
  eventByEventId?: Maybe<Event>
  /** The event's internal id for which the invitation is valid. */
  eventId: Scalars['BigInt']
  /** The invitation's general feedback status. */
  feedback?: Maybe<InvitationFeedback>
  /** The invitation's paper feedback status. */
  feedbackPaper?: Maybe<InvitationFeedbackPaper>
  /** The invitations's internal id. */
  id: Scalars['BigInt']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  /** The invitations's invitation code. */
  uuid: Scalars['UUID']
}

/**
 * A condition to be used against `Invitation` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type InvitationCondition = {
  /** Checks for equality with the object’s `contactId` field. */
  contactId?: InputMaybe<Scalars['BigInt']>
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['BigInt']>
  /** Checks for equality with the object’s `feedback` field. */
  feedback?: InputMaybe<InvitationFeedback>
  /** Checks for equality with the object’s `feedbackPaper` field. */
  feedbackPaper?: InputMaybe<InvitationFeedbackPaper>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']>
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: InputMaybe<Scalars['UUID']>
}

/** A `BigInt` edge in the connection. */
export type InvitationContactIdEdge = {
  __typename?: 'InvitationContactIdEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `BigInt` at the end of the edge. */
  node?: Maybe<Scalars['BigInt']>
}

/** A connection to a list of `BigInt` values. */
export type InvitationContactIdsConnection = {
  __typename?: 'InvitationContactIdsConnection'
  /** A list of edges which contains the `BigInt` and cursor to aid in pagination. */
  edges: Array<InvitationContactIdEdge>
  /** A list of `BigInt` objects. */
  nodes: Array<Maybe<Scalars['BigInt']>>
  /** The count of *all* `BigInt` you could get from the connection. */
  totalCount: Scalars['Int']
}

/** Possible answers to an invitation: accepted, canceled. */
export enum InvitationFeedback {
  Accepted = 'ACCEPTED',
  Canceled = 'CANCELED',
}

/** Possible choices on how to receive a paper invitation: paper, digital. */
export enum InvitationFeedbackPaper {
  Digital = 'DIGITAL',
  None = 'NONE',
  Paper = 'PAPER',
}

/** An input for mutations affecting `Invitation` */
export type InvitationInput = {
  /** The contact's internal id for which the invitation is valid. */
  contactId: Scalars['BigInt']
  /** The event's internal id for which the invitation is valid. */
  eventId: Scalars['BigInt']
  /** The invitation's general feedback status. */
  feedback?: InputMaybe<InvitationFeedback>
  /** The invitation's paper feedback status. */
  feedbackPaper?: InputMaybe<InvitationFeedbackPaper>
}

/** Represents an update to a `Invitation`. Fields that are set will be updated. */
export type InvitationPatch = {
  /** The contact's internal id for which the invitation is valid. */
  contactId?: InputMaybe<Scalars['BigInt']>
  /** The event's internal id for which the invitation is valid. */
  eventId?: InputMaybe<Scalars['BigInt']>
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
  totalCount: Scalars['Int']
}

/** A `Invitation` edge in the connection. */
export type InvitationsEdge = {
  __typename?: 'InvitationsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
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
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
}

/** All input for the `invite` mutation. */
export type InviteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  invitationId: Scalars['BigInt']
  language: Scalars['String']
}

/** The output of our `invite` mutation. */
export type InvitePayload = {
  __typename?: 'InvitePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** All input for the `jwtRefresh` mutation. */
export type JwtRefreshInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  jwtId: Scalars['UUID']
}

/** The output of our `jwtRefresh` mutation. */
export type JwtRefreshPayload = {
  __typename?: 'JwtRefreshPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  jwt?: Maybe<Scalars['Jwt']>
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
  /** Creates a JWT token that will securely identify an account and give it certain permissions. */
  authenticate?: Maybe<AuthenticatePayload>
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
  /** Deletes a single `Contact` using its globally unique id. */
  deleteContact?: Maybe<DeleteContactPayload>
  /** Deletes a single `Contact` using a unique key. */
  deleteContactByAuthorAccountUsernameAndAccountUsername?: Maybe<DeleteContactPayload>
  /** Deletes a single `Contact` using a unique key. */
  deleteContactById?: Maybe<DeleteContactPayload>
  /** Deletes a single `Event` using its globally unique id. */
  deleteEvent?: Maybe<DeleteEventPayload>
  /** Deletes a single `Event` using a unique key. */
  deleteEventByAuthorUsernameAndSlug?: Maybe<DeleteEventPayload>
  /** Deletes a single `Event` using a unique key. */
  deleteEventById?: Maybe<DeleteEventPayload>
  /** Deletes a single `EventGroup` using its globally unique id. */
  deleteEventGroup?: Maybe<DeleteEventGroupPayload>
  /** Deletes a single `EventGroup` using a unique key. */
  deleteEventGroupByAuthorUsernameAndSlug?: Maybe<DeleteEventGroupPayload>
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
  /** Deletes a single `Invitation` using a unique key. */
  deleteInvitationByUuid?: Maybe<DeleteInvitationPayload>
  /** Deletes a single `ProfilePicture` using its globally unique id. */
  deleteProfilePicture?: Maybe<DeleteProfilePicturePayload>
  /** Deletes a single `ProfilePicture` using a unique key. */
  deleteProfilePictureById?: Maybe<DeleteProfilePicturePayload>
  /** Deletes a single `ProfilePicture` using a unique key. */
  deleteProfilePictureByUsername?: Maybe<DeleteProfilePicturePayload>
  /** Deletes a single `Upload` using its globally unique id. */
  deleteUpload?: Maybe<DeleteUploadPayload>
  /** Deletes a single `Upload` using a unique key. */
  deleteUploadById?: Maybe<DeleteUploadPayload>
  /** Deletes a single `Upload` using a unique key. */
  deleteUploadByStorageKey?: Maybe<DeleteUploadPayload>
  /** Deletes a single `Upload` using a unique key. */
  deleteUploadByUuid?: Maybe<DeleteUploadPayload>
  /** Allows to delete an event. */
  eventDelete?: Maybe<EventDeletePayload>
  /** Allows to enter invitation codes. */
  eventUnlock?: Maybe<EventUnlockPayload>
  /** Adds a notification for the invitation channel. */
  invite?: Maybe<InvitePayload>
  /** Refreshes a JWT. */
  jwtRefresh?: Maybe<JwtRefreshPayload>
  /** Allows to set the acknowledgement state of a notification. */
  notificationAcknowledge?: Maybe<NotificationAcknowledgePayload>
  /** Sets the picture with the given storage key as the invoker's profile picture. */
  profilePictureSet?: Maybe<ProfilePictureSetPayload>
  /** Updates a single `Contact` using its globally unique id and a patch. */
  updateContact?: Maybe<UpdateContactPayload>
  /** Updates a single `Contact` using a unique key and a patch. */
  updateContactByAuthorAccountUsernameAndAccountUsername?: Maybe<UpdateContactPayload>
  /** Updates a single `Contact` using a unique key and a patch. */
  updateContactById?: Maybe<UpdateContactPayload>
  /** Updates a single `Event` using its globally unique id and a patch. */
  updateEvent?: Maybe<UpdateEventPayload>
  /** Updates a single `Event` using a unique key and a patch. */
  updateEventByAuthorUsernameAndSlug?: Maybe<UpdateEventPayload>
  /** Updates a single `Event` using a unique key and a patch. */
  updateEventById?: Maybe<UpdateEventPayload>
  /** Updates a single `EventGroup` using its globally unique id and a patch. */
  updateEventGroup?: Maybe<UpdateEventGroupPayload>
  /** Updates a single `EventGroup` using a unique key and a patch. */
  updateEventGroupByAuthorUsernameAndSlug?: Maybe<UpdateEventGroupPayload>
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
  /** Updates a single `Invitation` using a unique key and a patch. */
  updateInvitationByUuid?: Maybe<UpdateInvitationPayload>
  /** Updates a single `ProfilePicture` using its globally unique id and a patch. */
  updateProfilePicture?: Maybe<UpdateProfilePicturePayload>
  /** Updates a single `ProfilePicture` using a unique key and a patch. */
  updateProfilePictureById?: Maybe<UpdateProfilePicturePayload>
  /** Updates a single `ProfilePicture` using a unique key and a patch. */
  updateProfilePictureByUsername?: Maybe<UpdateProfilePicturePayload>
  /** Updates a single `Upload` using its globally unique id and a patch. */
  updateUpload?: Maybe<UpdateUploadPayload>
  /** Updates a single `Upload` using a unique key and a patch. */
  updateUploadById?: Maybe<UpdateUploadPayload>
  /** Updates a single `Upload` using a unique key and a patch. */
  updateUploadByStorageKey?: Maybe<UpdateUploadPayload>
  /** Updates a single `Upload` using a unique key and a patch. */
  updateUploadByUuid?: Maybe<UpdateUploadPayload>
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
export type MutationAuthenticateArgs = {
  input: AuthenticateInput
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
export type MutationDeleteContactArgs = {
  input: DeleteContactInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteContactByAuthorAccountUsernameAndAccountUsernameArgs =
  {
    input: DeleteContactByAuthorAccountUsernameAndAccountUsernameInput
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
export type MutationDeleteEventByAuthorUsernameAndSlugArgs = {
  input: DeleteEventByAuthorUsernameAndSlugInput
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
export type MutationDeleteEventGroupByAuthorUsernameAndSlugArgs = {
  input: DeleteEventGroupByAuthorUsernameAndSlugInput
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
export type MutationDeleteInvitationByUuidArgs = {
  input: DeleteInvitationByUuidInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProfilePictureArgs = {
  input: DeleteProfilePictureInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProfilePictureByIdArgs = {
  input: DeleteProfilePictureByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProfilePictureByUsernameArgs = {
  input: DeleteProfilePictureByUsernameInput
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
export type MutationDeleteUploadByUuidArgs = {
  input: DeleteUploadByUuidInput
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
export type MutationUpdateContactArgs = {
  input: UpdateContactInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateContactByAuthorAccountUsernameAndAccountUsernameArgs =
  {
    input: UpdateContactByAuthorAccountUsernameAndAccountUsernameInput
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
export type MutationUpdateEventByAuthorUsernameAndSlugArgs = {
  input: UpdateEventByAuthorUsernameAndSlugInput
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
export type MutationUpdateEventGroupByAuthorUsernameAndSlugArgs = {
  input: UpdateEventGroupByAuthorUsernameAndSlugInput
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
export type MutationUpdateInvitationByUuidArgs = {
  input: UpdateInvitationByUuidInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProfilePictureArgs = {
  input: UpdateProfilePictureInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProfilePictureByIdArgs = {
  input: UpdateProfilePictureByIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProfilePictureByUsernameArgs = {
  input: UpdateProfilePictureByUsernameInput
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
export type MutationUpdateUploadByUuidArgs = {
  input: UpdateUploadByUuidInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUploadCreateArgs = {
  input: UploadCreateInput
}

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
}

/** All input for the `notificationAcknowledge` mutation. */
export type NotificationAcknowledgeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  id: Scalars['BigInt']
  isAcknowledged: Scalars['Boolean']
}

/** The output of our `notificationAcknowledge` mutation. */
export type NotificationAcknowledgePayload = {
  __typename?: 'NotificationAcknowledgePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo'
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>
}

/** Mapping of usernames to upload storage keys. */
export type ProfilePicture = Node & {
  __typename?: 'ProfilePicture'
  /** The profile picture's internal id. */
  id: Scalars['BigInt']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  /** Reads a single `Upload` that is related to this `ProfilePicture`. */
  uploadByUploadStorageKey?: Maybe<Upload>
  /** The upload's storage key. */
  uploadStorageKey: Scalars['String']
  /** The account's username. */
  username: Scalars['String']
}

/**
 * A condition to be used against `ProfilePicture` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ProfilePictureCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']>
  /** Checks for equality with the object’s `uploadStorageKey` field. */
  uploadStorageKey?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `username` field. */
  username?: InputMaybe<Scalars['String']>
}

/** An input for mutations affecting `ProfilePicture` */
export type ProfilePictureInput = {
  /** The upload's storage key. */
  uploadStorageKey: Scalars['String']
  /** The account's username. */
  username: Scalars['String']
}

/** Represents an update to a `ProfilePicture`. Fields that are set will be updated. */
export type ProfilePicturePatch = {
  /** The upload's storage key. */
  uploadStorageKey?: InputMaybe<Scalars['String']>
  /** The account's username. */
  username?: InputMaybe<Scalars['String']>
}

/** All input for the `profilePictureSet` mutation. */
export type ProfilePictureSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  storageKey: Scalars['String']
}

/** The output of our `profilePictureSet` mutation. */
export type ProfilePictureSetPayload = {
  __typename?: 'ProfilePictureSetPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
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
  totalCount: Scalars['Int']
}

/** A `ProfilePicture` edge in the connection. */
export type ProfilePicturesEdge = {
  __typename?: 'ProfilePicturesEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `ProfilePicture` at the end of the edge. */
  node: ProfilePicture
}

/** Methods to use when ordering `ProfilePicture`. */
export enum ProfilePicturesOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UploadStorageKeyAsc = 'UPLOAD_STORAGE_KEY_ASC',
  UploadStorageKeyDesc = 'UPLOAD_STORAGE_KEY_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query'
  /** Shows if an account exists. */
  accountIsExisting?: Maybe<Scalars['Boolean']>
  /** Gets the total upload quota in bytes for the invoking account. */
  accountUploadQuotaBytes?: Maybe<Scalars['BigInt']>
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
  contactByAuthorAccountUsernameAndAccountUsername?: Maybe<Contact>
  contactById?: Maybe<Contact>
  /** Reads a single `Event` using its globally unique `ID`. */
  event?: Maybe<Event>
  eventByAuthorUsernameAndSlug?: Maybe<Event>
  eventById?: Maybe<Event>
  /** Reads a single `EventGroup` using its globally unique `ID`. */
  eventGroup?: Maybe<EventGroup>
  eventGroupByAuthorUsernameAndSlug?: Maybe<EventGroup>
  eventGroupById?: Maybe<EventGroup>
  /** Reads a single `EventGrouping` using its globally unique `ID`. */
  eventGrouping?: Maybe<EventGrouping>
  eventGroupingByEventIdAndEventGroupId?: Maybe<EventGrouping>
  eventGroupingById?: Maybe<EventGrouping>
  /** Add a function that returns the maximum invitee count of an accessible event. */
  eventInviteeCountMaximum?: Maybe<Scalars['Int']>
  /** Shows if an event exists. */
  eventIsExisting?: Maybe<Scalars['Boolean']>
  /** Add a function that returns all event ids for which the invoker is the author. */
  eventsOrganized?: Maybe<EventsOrganizedConnection>
  /** Reads a single `Invitation` using its globally unique `ID`. */
  invitation?: Maybe<Invitation>
  invitationByEventIdAndContactId?: Maybe<Invitation>
  invitationById?: Maybe<Invitation>
  invitationByUuid?: Maybe<Invitation>
  /** Returns the current invitation claims as UUID array. */
  invitationClaimArray?: Maybe<Array<Maybe<Scalars['UUID']>>>
  /** Returns contact ids that are accessible through invitations. */
  invitationContactIds?: Maybe<InvitationContactIdsConnection>
  /** Returns the invitee count for an event. */
  inviteeCount?: Maybe<Scalars['Int']>
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']
  /** Reads a single `ProfilePicture` using its globally unique `ID`. */
  profilePicture?: Maybe<ProfilePicture>
  profilePictureById?: Maybe<ProfilePicture>
  profilePictureByUsername?: Maybe<ProfilePicture>
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query
  /** Reads a single `Upload` using its globally unique `ID`. */
  upload?: Maybe<Upload>
  uploadById?: Maybe<Upload>
  uploadByStorageKey?: Maybe<Upload>
  uploadByUuid?: Maybe<Upload>
}

/** The root query type which gives access points into the data universe. */
export type QueryAccountIsExistingArgs = {
  username: Scalars['String']
}

/** The root query type which gives access points into the data universe. */
export type QueryAllContactsArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  condition?: InputMaybe<ContactCondition>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<ContactsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllEventGroupingsArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  condition?: InputMaybe<EventGroupingCondition>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<EventGroupingsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllEventGroupsArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  condition?: InputMaybe<EventGroupCondition>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<EventGroupsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  condition?: InputMaybe<EventCondition>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<EventsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllInvitationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  condition?: InputMaybe<InvitationCondition>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<InvitationsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllProfilePicturesArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  condition?: InputMaybe<ProfilePictureCondition>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<ProfilePicturesOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryAllUploadsArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  condition?: InputMaybe<UploadCondition>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<UploadsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryContactArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryContactByAuthorAccountUsernameAndAccountUsernameArgs = {
  accountUsername: Scalars['String']
  authorAccountUsername: Scalars['String']
}

/** The root query type which gives access points into the data universe. */
export type QueryContactByIdArgs = {
  id: Scalars['BigInt']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventByAuthorUsernameAndSlugArgs = {
  authorUsername: Scalars['String']
  slug: Scalars['String']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventByIdArgs = {
  id: Scalars['BigInt']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventGroupArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventGroupByAuthorUsernameAndSlugArgs = {
  authorUsername: Scalars['String']
  slug: Scalars['String']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventGroupByIdArgs = {
  id: Scalars['BigInt']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventGroupingArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventGroupingByEventIdAndEventGroupIdArgs = {
  eventGroupId: Scalars['BigInt']
  eventId: Scalars['BigInt']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventGroupingByIdArgs = {
  id: Scalars['BigInt']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventInviteeCountMaximumArgs = {
  eventId: Scalars['BigInt']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventIsExistingArgs = {
  authorUsername: Scalars['String']
  slug: Scalars['String']
}

/** The root query type which gives access points into the data universe. */
export type QueryEventsOrganizedArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** The root query type which gives access points into the data universe. */
export type QueryInvitationArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryInvitationByEventIdAndContactIdArgs = {
  contactId: Scalars['BigInt']
  eventId: Scalars['BigInt']
}

/** The root query type which gives access points into the data universe. */
export type QueryInvitationByIdArgs = {
  id: Scalars['BigInt']
}

/** The root query type which gives access points into the data universe. */
export type QueryInvitationByUuidArgs = {
  uuid: Scalars['UUID']
}

/** The root query type which gives access points into the data universe. */
export type QueryInvitationContactIdsArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** The root query type which gives access points into the data universe. */
export type QueryInviteeCountArgs = {
  eventId: Scalars['BigInt']
}

/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryProfilePictureArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryProfilePictureByIdArgs = {
  id: Scalars['BigInt']
}

/** The root query type which gives access points into the data universe. */
export type QueryProfilePictureByUsernameArgs = {
  username: Scalars['String']
}

/** The root query type which gives access points into the data universe. */
export type QueryUploadArgs = {
  nodeId: Scalars['ID']
}

/** The root query type which gives access points into the data universe. */
export type QueryUploadByIdArgs = {
  id: Scalars['BigInt']
}

/** The root query type which gives access points into the data universe. */
export type QueryUploadByStorageKeyArgs = {
  storageKey: Scalars['String']
}

/** The root query type which gives access points into the data universe. */
export type QueryUploadByUuidArgs = {
  uuid: Scalars['UUID']
}

/** All input for the `updateContactByAuthorAccountUsernameAndAccountUsername` mutation. */
export type UpdateContactByAuthorAccountUsernameAndAccountUsernameInput = {
  /** The contact account's username. */
  accountUsername: Scalars['String']
  /** The contact author's username. */
  authorAccountUsername: Scalars['String']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Contact` being updated. */
  contactPatch: ContactPatch
}

/** All input for the `updateContactById` mutation. */
export type UpdateContactByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Contact` being updated. */
  contactPatch: ContactPatch
  /** The contact's internal id. */
  id: Scalars['BigInt']
}

/** All input for the `updateContact` mutation. */
export type UpdateContactInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Contact` being updated. */
  contactPatch: ContactPatch
  /** The globally unique `ID` which will identify a single `Contact` to be updated. */
  nodeId: Scalars['ID']
}

/** The output of our update `Contact` mutation. */
export type UpdateContactPayload = {
  __typename?: 'UpdateContactPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
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

/** All input for the `updateEventByAuthorUsernameAndSlug` mutation. */
export type UpdateEventByAuthorUsernameAndSlugInput = {
  /** The event author's username. */
  authorUsername: Scalars['String']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Event` being updated. */
  eventPatch: EventPatch
  /** The event's name, slugified. */
  slug: Scalars['String']
}

/** All input for the `updateEventById` mutation. */
export type UpdateEventByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Event` being updated. */
  eventPatch: EventPatch
  /** The event's internal id. */
  id: Scalars['BigInt']
}

/** All input for the `updateEventGroupByAuthorUsernameAndSlug` mutation. */
export type UpdateEventGroupByAuthorUsernameAndSlugInput = {
  /** The event group author's username. */
  authorUsername: Scalars['String']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `EventGroup` being updated. */
  eventGroupPatch: EventGroupPatch
  /** The event group's name, slugified. */
  slug: Scalars['String']
}

/** All input for the `updateEventGroupById` mutation. */
export type UpdateEventGroupByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `EventGroup` being updated. */
  eventGroupPatch: EventGroupPatch
  /** The event group's internal id. */
  id: Scalars['BigInt']
}

/** All input for the `updateEventGroup` mutation. */
export type UpdateEventGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `EventGroup` being updated. */
  eventGroupPatch: EventGroupPatch
  /** The globally unique `ID` which will identify a single `EventGroup` to be updated. */
  nodeId: Scalars['ID']
}

/** The output of our update `EventGroup` mutation. */
export type UpdateEventGroupPayload = {
  __typename?: 'UpdateEventGroupPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
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
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The event grouping's internal event group id. */
  eventGroupId: Scalars['BigInt']
  /** An object where the defined keys will be set on the `EventGrouping` being updated. */
  eventGroupingPatch: EventGroupingPatch
  /** The event grouping's internal event id. */
  eventId: Scalars['BigInt']
}

/** All input for the `updateEventGroupingById` mutation. */
export type UpdateEventGroupingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `EventGrouping` being updated. */
  eventGroupingPatch: EventGroupingPatch
  /** The event grouping's internal id. */
  id: Scalars['BigInt']
}

/** All input for the `updateEventGrouping` mutation. */
export type UpdateEventGroupingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `EventGrouping` being updated. */
  eventGroupingPatch: EventGroupingPatch
  /** The globally unique `ID` which will identify a single `EventGrouping` to be updated. */
  nodeId: Scalars['ID']
}

/** The output of our update `EventGrouping` mutation. */
export type UpdateEventGroupingPayload = {
  __typename?: 'UpdateEventGroupingPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
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
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Event` being updated. */
  eventPatch: EventPatch
  /** The globally unique `ID` which will identify a single `Event` to be updated. */
  nodeId: Scalars['ID']
}

/** The output of our update `Event` mutation. */
export type UpdateEventPayload = {
  __typename?: 'UpdateEventPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
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
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The contact's internal id for which the invitation is valid. */
  contactId: Scalars['BigInt']
  /** The event's internal id for which the invitation is valid. */
  eventId: Scalars['BigInt']
  /** An object where the defined keys will be set on the `Invitation` being updated. */
  invitationPatch: InvitationPatch
}

/** All input for the `updateInvitationById` mutation. */
export type UpdateInvitationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The invitations's internal id. */
  id: Scalars['BigInt']
  /** An object where the defined keys will be set on the `Invitation` being updated. */
  invitationPatch: InvitationPatch
}

/** All input for the `updateInvitationByUuid` mutation. */
export type UpdateInvitationByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Invitation` being updated. */
  invitationPatch: InvitationPatch
  /** The invitations's invitation code. */
  uuid: Scalars['UUID']
}

/** All input for the `updateInvitation` mutation. */
export type UpdateInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Invitation` being updated. */
  invitationPatch: InvitationPatch
  /** The globally unique `ID` which will identify a single `Invitation` to be updated. */
  nodeId: Scalars['ID']
}

/** The output of our update `Invitation` mutation. */
export type UpdateInvitationPayload = {
  __typename?: 'UpdateInvitationPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
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

/** All input for the `updateProfilePictureById` mutation. */
export type UpdateProfilePictureByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The profile picture's internal id. */
  id: Scalars['BigInt']
  /** An object where the defined keys will be set on the `ProfilePicture` being updated. */
  profilePicturePatch: ProfilePicturePatch
}

/** All input for the `updateProfilePictureByUsername` mutation. */
export type UpdateProfilePictureByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `ProfilePicture` being updated. */
  profilePicturePatch: ProfilePicturePatch
  /** The account's username. */
  username: Scalars['String']
}

/** All input for the `updateProfilePicture` mutation. */
export type UpdateProfilePictureInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `ProfilePicture` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `ProfilePicture` being updated. */
  profilePicturePatch: ProfilePicturePatch
}

/** The output of our update `ProfilePicture` mutation. */
export type UpdateProfilePicturePayload = {
  __typename?: 'UpdateProfilePicturePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** The `ProfilePicture` that was updated by this mutation. */
  profilePicture?: Maybe<ProfilePicture>
  /** An edge for our `ProfilePicture`. May be used by Relay 1. */
  profilePictureEdge?: Maybe<ProfilePicturesEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Upload` that is related to this `ProfilePicture`. */
  uploadByUploadStorageKey?: Maybe<Upload>
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
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The upload's internal id. */
  id: Scalars['BigInt']
  /** An object where the defined keys will be set on the `Upload` being updated. */
  uploadPatch: UploadPatch
}

/** All input for the `updateUploadByStorageKey` mutation. */
export type UpdateUploadByStorageKeyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The upload's storage key. */
  storageKey: Scalars['String']
  /** An object where the defined keys will be set on the `Upload` being updated. */
  uploadPatch: UploadPatch
}

/** All input for the `updateUploadByUuid` mutation. */
export type UpdateUploadByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** An object where the defined keys will be set on the `Upload` being updated. */
  uploadPatch: UploadPatch
  /** The upload's UUID. */
  uuid: Scalars['UUID']
}

/** All input for the `updateUpload` mutation. */
export type UpdateUploadInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The globally unique `ID` which will identify a single `Upload` to be updated. */
  nodeId: Scalars['ID']
  /** An object where the defined keys will be set on the `Upload` being updated. */
  uploadPatch: UploadPatch
}

/** The output of our update `Upload` mutation. */
export type UpdateUploadPayload = {
  __typename?: 'UpdateUploadPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
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
  /** The upload's internal id. */
  id: Scalars['BigInt']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']
  /** Reads and enables pagination through a set of `ProfilePicture`. */
  profilePicturesByUploadStorageKey: ProfilePicturesConnection
  /** The upload's size in bytes. */
  sizeByte: Scalars['BigInt']
  /** The upload's storage key. */
  storageKey?: Maybe<Scalars['String']>
  /** The uploader's username. */
  username: Scalars['String']
  /** The upload's UUID. */
  uuid: Scalars['UUID']
}

/** An upload. */
export type UploadProfilePicturesByUploadStorageKeyArgs = {
  after?: InputMaybe<Scalars['Cursor']>
  before?: InputMaybe<Scalars['Cursor']>
  condition?: InputMaybe<ProfilePictureCondition>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<ProfilePicturesOrderBy>>
}

/** A condition to be used against `Upload` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UploadCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['BigInt']>
  /** Checks for equality with the object’s `sizeByte` field. */
  sizeByte?: InputMaybe<Scalars['BigInt']>
  /** Checks for equality with the object’s `storageKey` field. */
  storageKey?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `username` field. */
  username?: InputMaybe<Scalars['String']>
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: InputMaybe<Scalars['UUID']>
}

/** All input for the `uploadCreate` mutation. */
export type UploadCreateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>
  sizeByte: Scalars['BigInt']
}

/** The output of our `uploadCreate` mutation. */
export type UploadCreatePayload = {
  __typename?: 'UploadCreatePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  uuid?: Maybe<Scalars['UUID']>
}

/** An input for mutations affecting `Upload` */
export type UploadInput = {
  /** The upload's size in bytes. */
  sizeByte: Scalars['BigInt']
  /** The upload's storage key. */
  storageKey?: InputMaybe<Scalars['String']>
  /** The uploader's username. */
  username: Scalars['String']
  /** The upload's UUID. */
  uuid?: InputMaybe<Scalars['UUID']>
}

/** Represents an update to a `Upload`. Fields that are set will be updated. */
export type UploadPatch = {
  /** The upload's size in bytes. */
  sizeByte?: InputMaybe<Scalars['BigInt']>
  /** The upload's storage key. */
  storageKey?: InputMaybe<Scalars['String']>
  /** The uploader's username. */
  username?: InputMaybe<Scalars['String']>
  /** The upload's UUID. */
  uuid?: InputMaybe<Scalars['UUID']>
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
  totalCount: Scalars['Int']
}

/** A `Upload` edge in the connection. */
export type UploadsEdge = {
  __typename?: 'UploadsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>
  /** The `Upload` at the end of the edge. */
  node: Upload
}

/** Methods to use when ordering `Upload`. */
export enum UploadsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SizeByteAsc = 'SIZE_BYTE_ASC',
  SizeByteDesc = 'SIZE_BYTE_DESC',
  StorageKeyAsc = 'STORAGE_KEY_ASC',
  StorageKeyDesc = 'STORAGE_KEY_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
}

export type WithTypename<T extends { __typename?: any }> = Partial<T> & {
  __typename: NonNullable<T['__typename']>
}

export type GraphCacheKeysConfig = {
  AccountDeletePayload?: (
    data: WithTypename<AccountDeletePayload>
  ) => null | string
  AccountEmailAddressVerificationPayload?: (
    data: WithTypename<AccountEmailAddressVerificationPayload>
  ) => null | string
  AccountPasswordChangePayload?: (
    data: WithTypename<AccountPasswordChangePayload>
  ) => null | string
  AccountPasswordResetPayload?: (
    data: WithTypename<AccountPasswordResetPayload>
  ) => null | string
  AccountPasswordResetRequestPayload?: (
    data: WithTypename<AccountPasswordResetRequestPayload>
  ) => null | string
  AccountRegistrationPayload?: (
    data: WithTypename<AccountRegistrationPayload>
  ) => null | string
  AccountRegistrationRefreshPayload?: (
    data: WithTypename<AccountRegistrationRefreshPayload>
  ) => null | string
  AuthenticatePayload?: (
    data: WithTypename<AuthenticatePayload>
  ) => null | string
  Contact?: (data: WithTypename<Contact>) => null | string
  ContactsConnection?: (data: WithTypename<ContactsConnection>) => null | string
  ContactsEdge?: (data: WithTypename<ContactsEdge>) => null | string
  CreateContactPayload?: (
    data: WithTypename<CreateContactPayload>
  ) => null | string
  CreateEventGroupPayload?: (
    data: WithTypename<CreateEventGroupPayload>
  ) => null | string
  CreateEventGroupingPayload?: (
    data: WithTypename<CreateEventGroupingPayload>
  ) => null | string
  CreateEventPayload?: (data: WithTypename<CreateEventPayload>) => null | string
  CreateInvitationPayload?: (
    data: WithTypename<CreateInvitationPayload>
  ) => null | string
  CreateProfilePicturePayload?: (
    data: WithTypename<CreateProfilePicturePayload>
  ) => null | string
  CreateUploadPayload?: (
    data: WithTypename<CreateUploadPayload>
  ) => null | string
  DeleteContactPayload?: (
    data: WithTypename<DeleteContactPayload>
  ) => null | string
  DeleteEventGroupPayload?: (
    data: WithTypename<DeleteEventGroupPayload>
  ) => null | string
  DeleteEventGroupingPayload?: (
    data: WithTypename<DeleteEventGroupingPayload>
  ) => null | string
  DeleteEventPayload?: (data: WithTypename<DeleteEventPayload>) => null | string
  DeleteInvitationPayload?: (
    data: WithTypename<DeleteInvitationPayload>
  ) => null | string
  DeleteProfilePicturePayload?: (
    data: WithTypename<DeleteProfilePicturePayload>
  ) => null | string
  DeleteUploadPayload?: (
    data: WithTypename<DeleteUploadPayload>
  ) => null | string
  Event?: (data: WithTypename<Event>) => null | string
  EventDeletePayload?: (data: WithTypename<EventDeletePayload>) => null | string
  EventGroup?: (data: WithTypename<EventGroup>) => null | string
  EventGrouping?: (data: WithTypename<EventGrouping>) => null | string
  EventGroupingsConnection?: (
    data: WithTypename<EventGroupingsConnection>
  ) => null | string
  EventGroupingsEdge?: (data: WithTypename<EventGroupingsEdge>) => null | string
  EventGroupsConnection?: (
    data: WithTypename<EventGroupsConnection>
  ) => null | string
  EventGroupsEdge?: (data: WithTypename<EventGroupsEdge>) => null | string
  EventUnlockPayload?: (data: WithTypename<EventUnlockPayload>) => null | string
  EventUnlockResponse?: (
    data: WithTypename<EventUnlockResponse>
  ) => null | string
  EventsConnection?: (data: WithTypename<EventsConnection>) => null | string
  EventsEdge?: (data: WithTypename<EventsEdge>) => null | string
  EventsOrganizedConnection?: (
    data: WithTypename<EventsOrganizedConnection>
  ) => null | string
  EventsOrganizedEdge?: (
    data: WithTypename<EventsOrganizedEdge>
  ) => null | string
  Invitation?: (data: WithTypename<Invitation>) => null | string
  InvitationContactIdEdge?: (
    data: WithTypename<InvitationContactIdEdge>
  ) => null | string
  InvitationContactIdsConnection?: (
    data: WithTypename<InvitationContactIdsConnection>
  ) => null | string
  InvitationsConnection?: (
    data: WithTypename<InvitationsConnection>
  ) => null | string
  InvitationsEdge?: (data: WithTypename<InvitationsEdge>) => null | string
  InvitePayload?: (data: WithTypename<InvitePayload>) => null | string
  JwtRefreshPayload?: (data: WithTypename<JwtRefreshPayload>) => null | string
  NotificationAcknowledgePayload?: (
    data: WithTypename<NotificationAcknowledgePayload>
  ) => null | string
  PageInfo?: (data: WithTypename<PageInfo>) => null | string
  ProfilePicture?: (data: WithTypename<ProfilePicture>) => null | string
  ProfilePictureSetPayload?: (
    data: WithTypename<ProfilePictureSetPayload>
  ) => null | string
  ProfilePicturesConnection?: (
    data: WithTypename<ProfilePicturesConnection>
  ) => null | string
  ProfilePicturesEdge?: (
    data: WithTypename<ProfilePicturesEdge>
  ) => null | string
  UpdateContactPayload?: (
    data: WithTypename<UpdateContactPayload>
  ) => null | string
  UpdateEventGroupPayload?: (
    data: WithTypename<UpdateEventGroupPayload>
  ) => null | string
  UpdateEventGroupingPayload?: (
    data: WithTypename<UpdateEventGroupingPayload>
  ) => null | string
  UpdateEventPayload?: (data: WithTypename<UpdateEventPayload>) => null | string
  UpdateInvitationPayload?: (
    data: WithTypename<UpdateInvitationPayload>
  ) => null | string
  UpdateProfilePicturePayload?: (
    data: WithTypename<UpdateProfilePicturePayload>
  ) => null | string
  UpdateUploadPayload?: (
    data: WithTypename<UpdateUploadPayload>
  ) => null | string
  Upload?: (data: WithTypename<Upload>) => null | string
  UploadCreatePayload?: (
    data: WithTypename<UploadCreatePayload>
  ) => null | string
  UploadsConnection?: (data: WithTypename<UploadsConnection>) => null | string
  UploadsEdge?: (data: WithTypename<UploadsEdge>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    accountIsExisting?: GraphCacheResolver<
      WithTypename<Query>,
      QueryAccountIsExistingArgs,
      Scalars['Boolean'] | string
    >
    accountUploadQuotaBytes?: GraphCacheResolver<
      WithTypename<Query>,
      Record<string, never>,
      Scalars['BigInt'] | string
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
    contactByAuthorAccountUsernameAndAccountUsername?: GraphCacheResolver<
      WithTypename<Query>,
      QueryContactByAuthorAccountUsernameAndAccountUsernameArgs,
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
    eventByAuthorUsernameAndSlug?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventByAuthorUsernameAndSlugArgs,
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
    eventGroupByAuthorUsernameAndSlug?: GraphCacheResolver<
      WithTypename<Query>,
      QueryEventGroupByAuthorUsernameAndSlugArgs,
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
    invitationByUuid?: GraphCacheResolver<
      WithTypename<Query>,
      QueryInvitationByUuidArgs,
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
    profilePictureById?: GraphCacheResolver<
      WithTypename<Query>,
      QueryProfilePictureByIdArgs,
      WithTypename<ProfilePicture> | string
    >
    profilePictureByUsername?: GraphCacheResolver<
      WithTypename<Query>,
      QueryProfilePictureByUsernameArgs,
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
    uploadByUuid?: GraphCacheResolver<
      WithTypename<Query>,
      QueryUploadByUuidArgs,
      WithTypename<Upload> | string
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
    accountUsername?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['String'] | string
    >
    address?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['String'] | string
    >
    authorAccountUsername?: GraphCacheResolver<
      WithTypename<Contact>,
      Record<string, never>,
      Scalars['String'] | string
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
      Scalars['BigInt'] | string
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
  CreateContactPayload?: {
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
    uploadByUploadStorageKey?: GraphCacheResolver<
      WithTypename<CreateProfilePicturePayload>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
  }
  CreateUploadPayload?: {
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
  DeleteContactPayload?: {
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
    uploadByUploadStorageKey?: GraphCacheResolver<
      WithTypename<DeleteProfilePicturePayload>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
  }
  DeleteUploadPayload?: {
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
    authorUsername?: GraphCacheResolver<
      WithTypename<Event>,
      Record<string, never>,
      Scalars['String'] | string
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
      Scalars['BigInt'] | string
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
    authorUsername?: GraphCacheResolver<
      WithTypename<EventGroup>,
      Record<string, never>,
      Scalars['String'] | string
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
      Scalars['BigInt'] | string
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
      Scalars['BigInt'] | string
    >
    eventId?: GraphCacheResolver<
      WithTypename<EventGrouping>,
      Record<string, never>,
      Scalars['BigInt'] | string
    >
    id?: GraphCacheResolver<
      WithTypename<EventGrouping>,
      Record<string, never>,
      Scalars['BigInt'] | string
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
    authorUsername?: GraphCacheResolver<
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
      Array<Scalars['BigInt'] | string>
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
      Scalars['BigInt'] | string
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
      Scalars['BigInt'] | string
    >
    eventByEventId?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      WithTypename<Event> | string
    >
    eventId?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      Scalars['BigInt'] | string
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
      Scalars['BigInt'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<Invitation>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    uuid?: GraphCacheResolver<
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
      Scalars['BigInt'] | string
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
      Array<Scalars['BigInt'] | string>
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
    id?: GraphCacheResolver<
      WithTypename<ProfilePicture>,
      Record<string, never>,
      Scalars['BigInt'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<ProfilePicture>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    uploadByUploadStorageKey?: GraphCacheResolver<
      WithTypename<ProfilePicture>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
    uploadStorageKey?: GraphCacheResolver<
      WithTypename<ProfilePicture>,
      Record<string, never>,
      Scalars['String'] | string
    >
    username?: GraphCacheResolver<
      WithTypename<ProfilePicture>,
      Record<string, never>,
      Scalars['String'] | string
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
  UpdateContactPayload?: {
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
    uploadByUploadStorageKey?: GraphCacheResolver<
      WithTypename<UpdateProfilePicturePayload>,
      Record<string, never>,
      WithTypename<Upload> | string
    >
  }
  UpdateUploadPayload?: {
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
    id?: GraphCacheResolver<
      WithTypename<Upload>,
      Record<string, never>,
      Scalars['BigInt'] | string
    >
    nodeId?: GraphCacheResolver<
      WithTypename<Upload>,
      Record<string, never>,
      Scalars['ID'] | string
    >
    profilePicturesByUploadStorageKey?: GraphCacheResolver<
      WithTypename<Upload>,
      UploadProfilePicturesByUploadStorageKeyArgs,
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
    username?: GraphCacheResolver<
      WithTypename<Upload>,
      Record<string, never>,
      Scalars['String'] | string
    >
    uuid?: GraphCacheResolver<
      WithTypename<Upload>,
      Record<string, never>,
      Scalars['UUID'] | string
    >
  }
  UploadCreatePayload?: {
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
    uuid?: GraphCacheResolver<
      WithTypename<UploadCreatePayload>,
      Record<string, never>,
      Scalars['UUID'] | string
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
  authenticate?: GraphCacheOptimisticMutationResolver<
    MutationAuthenticateArgs,
    Maybe<WithTypename<AuthenticatePayload>>
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
  deleteContact?: GraphCacheOptimisticMutationResolver<
    MutationDeleteContactArgs,
    Maybe<WithTypename<DeleteContactPayload>>
  >
  deleteContactByAuthorAccountUsernameAndAccountUsername?: GraphCacheOptimisticMutationResolver<
    MutationDeleteContactByAuthorAccountUsernameAndAccountUsernameArgs,
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
  deleteEventByAuthorUsernameAndSlug?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventByAuthorUsernameAndSlugArgs,
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
  deleteEventGroupByAuthorUsernameAndSlug?: GraphCacheOptimisticMutationResolver<
    MutationDeleteEventGroupByAuthorUsernameAndSlugArgs,
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
  deleteInvitationByUuid?: GraphCacheOptimisticMutationResolver<
    MutationDeleteInvitationByUuidArgs,
    Maybe<WithTypename<DeleteInvitationPayload>>
  >
  deleteProfilePicture?: GraphCacheOptimisticMutationResolver<
    MutationDeleteProfilePictureArgs,
    Maybe<WithTypename<DeleteProfilePicturePayload>>
  >
  deleteProfilePictureById?: GraphCacheOptimisticMutationResolver<
    MutationDeleteProfilePictureByIdArgs,
    Maybe<WithTypename<DeleteProfilePicturePayload>>
  >
  deleteProfilePictureByUsername?: GraphCacheOptimisticMutationResolver<
    MutationDeleteProfilePictureByUsernameArgs,
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
  deleteUploadByUuid?: GraphCacheOptimisticMutationResolver<
    MutationDeleteUploadByUuidArgs,
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
  updateContact?: GraphCacheOptimisticMutationResolver<
    MutationUpdateContactArgs,
    Maybe<WithTypename<UpdateContactPayload>>
  >
  updateContactByAuthorAccountUsernameAndAccountUsername?: GraphCacheOptimisticMutationResolver<
    MutationUpdateContactByAuthorAccountUsernameAndAccountUsernameArgs,
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
  updateEventByAuthorUsernameAndSlug?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventByAuthorUsernameAndSlugArgs,
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
  updateEventGroupByAuthorUsernameAndSlug?: GraphCacheOptimisticMutationResolver<
    MutationUpdateEventGroupByAuthorUsernameAndSlugArgs,
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
  updateInvitationByUuid?: GraphCacheOptimisticMutationResolver<
    MutationUpdateInvitationByUuidArgs,
    Maybe<WithTypename<UpdateInvitationPayload>>
  >
  updateProfilePicture?: GraphCacheOptimisticMutationResolver<
    MutationUpdateProfilePictureArgs,
    Maybe<WithTypename<UpdateProfilePicturePayload>>
  >
  updateProfilePictureById?: GraphCacheOptimisticMutationResolver<
    MutationUpdateProfilePictureByIdArgs,
    Maybe<WithTypename<UpdateProfilePicturePayload>>
  >
  updateProfilePictureByUsername?: GraphCacheOptimisticMutationResolver<
    MutationUpdateProfilePictureByUsernameArgs,
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
  updateUploadByUuid?: GraphCacheOptimisticMutationResolver<
    MutationUpdateUploadByUuidArgs,
    Maybe<WithTypename<UpdateUploadPayload>>
  >
  uploadCreate?: GraphCacheOptimisticMutationResolver<
    MutationUploadCreateArgs,
    Maybe<WithTypename<UploadCreatePayload>>
  >
}

export type GraphCacheUpdaters = {
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
    authenticate?: GraphCacheUpdateResolver<
      { authenticate: Maybe<WithTypename<AuthenticatePayload>> },
      MutationAuthenticateArgs
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
    deleteContact?: GraphCacheUpdateResolver<
      { deleteContact: Maybe<WithTypename<DeleteContactPayload>> },
      MutationDeleteContactArgs
    >
    deleteContactByAuthorAccountUsernameAndAccountUsername?: GraphCacheUpdateResolver<
      {
        deleteContactByAuthorAccountUsernameAndAccountUsername: Maybe<
          WithTypename<DeleteContactPayload>
        >
      },
      MutationDeleteContactByAuthorAccountUsernameAndAccountUsernameArgs
    >
    deleteContactById?: GraphCacheUpdateResolver<
      { deleteContactById: Maybe<WithTypename<DeleteContactPayload>> },
      MutationDeleteContactByIdArgs
    >
    deleteEvent?: GraphCacheUpdateResolver<
      { deleteEvent: Maybe<WithTypename<DeleteEventPayload>> },
      MutationDeleteEventArgs
    >
    deleteEventByAuthorUsernameAndSlug?: GraphCacheUpdateResolver<
      {
        deleteEventByAuthorUsernameAndSlug: Maybe<
          WithTypename<DeleteEventPayload>
        >
      },
      MutationDeleteEventByAuthorUsernameAndSlugArgs
    >
    deleteEventById?: GraphCacheUpdateResolver<
      { deleteEventById: Maybe<WithTypename<DeleteEventPayload>> },
      MutationDeleteEventByIdArgs
    >
    deleteEventGroup?: GraphCacheUpdateResolver<
      { deleteEventGroup: Maybe<WithTypename<DeleteEventGroupPayload>> },
      MutationDeleteEventGroupArgs
    >
    deleteEventGroupByAuthorUsernameAndSlug?: GraphCacheUpdateResolver<
      {
        deleteEventGroupByAuthorUsernameAndSlug: Maybe<
          WithTypename<DeleteEventGroupPayload>
        >
      },
      MutationDeleteEventGroupByAuthorUsernameAndSlugArgs
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
    deleteInvitationByUuid?: GraphCacheUpdateResolver<
      { deleteInvitationByUuid: Maybe<WithTypename<DeleteInvitationPayload>> },
      MutationDeleteInvitationByUuidArgs
    >
    deleteProfilePicture?: GraphCacheUpdateResolver<
      {
        deleteProfilePicture: Maybe<WithTypename<DeleteProfilePicturePayload>>
      },
      MutationDeleteProfilePictureArgs
    >
    deleteProfilePictureById?: GraphCacheUpdateResolver<
      {
        deleteProfilePictureById: Maybe<
          WithTypename<DeleteProfilePicturePayload>
        >
      },
      MutationDeleteProfilePictureByIdArgs
    >
    deleteProfilePictureByUsername?: GraphCacheUpdateResolver<
      {
        deleteProfilePictureByUsername: Maybe<
          WithTypename<DeleteProfilePicturePayload>
        >
      },
      MutationDeleteProfilePictureByUsernameArgs
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
    deleteUploadByUuid?: GraphCacheUpdateResolver<
      { deleteUploadByUuid: Maybe<WithTypename<DeleteUploadPayload>> },
      MutationDeleteUploadByUuidArgs
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
    updateContact?: GraphCacheUpdateResolver<
      { updateContact: Maybe<WithTypename<UpdateContactPayload>> },
      MutationUpdateContactArgs
    >
    updateContactByAuthorAccountUsernameAndAccountUsername?: GraphCacheUpdateResolver<
      {
        updateContactByAuthorAccountUsernameAndAccountUsername: Maybe<
          WithTypename<UpdateContactPayload>
        >
      },
      MutationUpdateContactByAuthorAccountUsernameAndAccountUsernameArgs
    >
    updateContactById?: GraphCacheUpdateResolver<
      { updateContactById: Maybe<WithTypename<UpdateContactPayload>> },
      MutationUpdateContactByIdArgs
    >
    updateEvent?: GraphCacheUpdateResolver<
      { updateEvent: Maybe<WithTypename<UpdateEventPayload>> },
      MutationUpdateEventArgs
    >
    updateEventByAuthorUsernameAndSlug?: GraphCacheUpdateResolver<
      {
        updateEventByAuthorUsernameAndSlug: Maybe<
          WithTypename<UpdateEventPayload>
        >
      },
      MutationUpdateEventByAuthorUsernameAndSlugArgs
    >
    updateEventById?: GraphCacheUpdateResolver<
      { updateEventById: Maybe<WithTypename<UpdateEventPayload>> },
      MutationUpdateEventByIdArgs
    >
    updateEventGroup?: GraphCacheUpdateResolver<
      { updateEventGroup: Maybe<WithTypename<UpdateEventGroupPayload>> },
      MutationUpdateEventGroupArgs
    >
    updateEventGroupByAuthorUsernameAndSlug?: GraphCacheUpdateResolver<
      {
        updateEventGroupByAuthorUsernameAndSlug: Maybe<
          WithTypename<UpdateEventGroupPayload>
        >
      },
      MutationUpdateEventGroupByAuthorUsernameAndSlugArgs
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
    updateInvitationByUuid?: GraphCacheUpdateResolver<
      { updateInvitationByUuid: Maybe<WithTypename<UpdateInvitationPayload>> },
      MutationUpdateInvitationByUuidArgs
    >
    updateProfilePicture?: GraphCacheUpdateResolver<
      {
        updateProfilePicture: Maybe<WithTypename<UpdateProfilePicturePayload>>
      },
      MutationUpdateProfilePictureArgs
    >
    updateProfilePictureById?: GraphCacheUpdateResolver<
      {
        updateProfilePictureById: Maybe<
          WithTypename<UpdateProfilePicturePayload>
        >
      },
      MutationUpdateProfilePictureByIdArgs
    >
    updateProfilePictureByUsername?: GraphCacheUpdateResolver<
      {
        updateProfilePictureByUsername: Maybe<
          WithTypename<UpdateProfilePicturePayload>
        >
      },
      MutationUpdateProfilePictureByUsernameArgs
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
    updateUploadByUuid?: GraphCacheUpdateResolver<
      { updateUploadByUuid: Maybe<WithTypename<UpdateUploadPayload>> },
      MutationUpdateUploadByUuidArgs
    >
    uploadCreate?: GraphCacheUpdateResolver<
      { uploadCreate: Maybe<WithTypename<UploadCreatePayload>> },
      MutationUploadCreateArgs
    >
  }
  Subscription?: {}
}

export type GraphCacheConfig = {
  schema?: IntrospectionData
  updates?: GraphCacheUpdaters
  keys?: GraphCacheKeysConfig
  optimistic?: GraphCacheOptimisticUpdaters
  resolvers?: GraphCacheResolvers
  storage?: GraphCacheStorageAdapter
}

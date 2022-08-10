/* eslint-disable no-use-before-define */
import { gql } from 'graphql-tag'
import * as Urql from '@urql/vue'
export type Maybe<T> = T | undefined
export type InputMaybe<T> = T | undefined
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
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

export type ContactFieldsFragment = {
  __typename?: 'Contact'
  nodeId: string
  id: any
  accountUsername?: string | undefined
  address?: string | undefined
  authorAccountUsername: string
  emailAddress?: string | undefined
  emailAddressHash?: string | undefined
  firstName?: string | undefined
  lastName?: string | undefined
  phoneNumber?: string | undefined
  url?: string | undefined
}

export type EventFieldsFragment = {
  __typename?: 'Event'
  id: any
  nodeId: string
  authorUsername: string
  description?: string | undefined
  end?: any | undefined
  inviteeCountMaximum?: number | undefined
  isArchived: boolean
  isInPerson?: boolean | undefined
  isRemote?: boolean | undefined
  location?: string | undefined
  name: string
  slug: string
  start: any
  url?: string | undefined
  visibility: EventVisibility
}

export type InvitationFieldsFragment = {
  __typename?: 'Invitation'
  id: any
  nodeId: string
  contactId: any
  eventId: any
  feedback?: InvitationFeedback | undefined
  feedbackPaper?: InvitationFeedbackPaper | undefined
  uuid: any
}

export type ProfilePictureFieldsFragment = {
  __typename?: 'ProfilePicture'
  id: any
  nodeId: string
  uploadStorageKey: string
  username: string
}

export type UploadFieldsFragment = {
  __typename?: 'Upload'
  id: any
  nodeId: string
  sizeByte: any
  storageKey?: string | undefined
  username: string
  uuid: any
}

export type AuthenticateMutationVariables = Exact<{
  password: Scalars['String']
  username: Scalars['String']
}>

export type AuthenticateMutation = {
  __typename?: 'Mutation'
  authenticate?:
    | {
        __typename?: 'AuthenticatePayload'
        clientMutationId?: string | undefined
        jwt?: any | undefined
      }
    | undefined
}

export type AccountDeleteMutationVariables = Exact<{
  password: Scalars['String']
}>

export type AccountDeleteMutation = {
  __typename?: 'Mutation'
  accountDelete?:
    | {
        __typename?: 'AccountDeletePayload'
        clientMutationId?: string | undefined
      }
    | undefined
}

export type AccountEmailAddressVerificationMutationVariables = Exact<{
  code: Scalars['UUID']
}>

export type AccountEmailAddressVerificationMutation = {
  __typename?: 'Mutation'
  accountEmailAddressVerification?:
    | {
        __typename?: 'AccountEmailAddressVerificationPayload'
        clientMutationId?: string | undefined
      }
    | undefined
}

export type JwtRefreshMutationVariables = Exact<{
  id: Scalars['UUID']
}>

export type JwtRefreshMutation = {
  __typename?: 'Mutation'
  jwtRefresh?:
    | {
        __typename?: 'JwtRefreshPayload'
        clientMutationId?: string | undefined
        jwt?: any | undefined
      }
    | undefined
}

export type AccountPasswordChangeMutationVariables = Exact<{
  passwordCurrent: Scalars['String']
  passwordNew: Scalars['String']
}>

export type AccountPasswordChangeMutation = {
  __typename?: 'Mutation'
  accountPasswordChange?:
    | {
        __typename?: 'AccountPasswordChangePayload'
        clientMutationId?: string | undefined
      }
    | undefined
}

export type AccountPasswordResetMutationVariables = Exact<{
  code: Scalars['UUID']
  password: Scalars['String']
}>

export type AccountPasswordResetMutation = {
  __typename?: 'Mutation'
  accountPasswordReset?:
    | {
        __typename?: 'AccountPasswordResetPayload'
        clientMutationId?: string | undefined
      }
    | undefined
}

export type AccountPasswordResetRequestMutationVariables = Exact<{
  emailAddress: Scalars['String']
  language: Scalars['String']
}>

export type AccountPasswordResetRequestMutation = {
  __typename?: 'Mutation'
  accountPasswordResetRequest?:
    | {
        __typename?: 'AccountPasswordResetRequestPayload'
        clientMutationId?: string | undefined
      }
    | undefined
}

export type AccountRegistrationMutationVariables = Exact<{
  emailAddress: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
  language: Scalars['String']
}>

export type AccountRegistrationMutation = {
  __typename?: 'Mutation'
  accountRegistration?:
    | {
        __typename?: 'AccountRegistrationPayload'
        clientMutationId?: string | undefined
      }
    | undefined
}

export type AccountRegistrationRefreshMutationVariables = Exact<{
  username: Scalars['String']
  language: Scalars['String']
}>

export type AccountRegistrationRefreshMutation = {
  __typename?: 'Mutation'
  accountRegistrationRefresh?:
    | {
        __typename?: 'AccountRegistrationRefreshPayload'
        clientMutationId?: string | undefined
      }
    | undefined
}

export type CreateContactMutationVariables = Exact<{
  contactInput: ContactInput
}>

export type CreateContactMutation = {
  __typename?: 'Mutation'
  createContact?:
    | {
        __typename?: 'CreateContactPayload'
        contact?:
          | {
              __typename?: 'Contact'
              nodeId: string
              id: any
              accountUsername?: string | undefined
              address?: string | undefined
              authorAccountUsername: string
              emailAddress?: string | undefined
              emailAddressHash?: string | undefined
              firstName?: string | undefined
              lastName?: string | undefined
              phoneNumber?: string | undefined
              url?: string | undefined
            }
          | undefined
      }
    | undefined
}

export type DeleteContactMutationVariables = Exact<{
  nodeId: Scalars['ID']
}>

export type DeleteContactMutation = {
  __typename?: 'Mutation'
  deleteContact?:
    | {
        __typename?: 'DeleteContactPayload'
        clientMutationId?: string | undefined
        contact?:
          | {
              __typename?: 'Contact'
              nodeId: string
              id: any
              accountUsername?: string | undefined
              address?: string | undefined
              authorAccountUsername: string
              emailAddress?: string | undefined
              emailAddressHash?: string | undefined
              firstName?: string | undefined
              lastName?: string | undefined
              phoneNumber?: string | undefined
              url?: string | undefined
            }
          | undefined
      }
    | undefined
}

export type UpdateContactByIdMutationVariables = Exact<{
  id: Scalars['BigInt']
  contactPatch: ContactPatch
}>

export type UpdateContactByIdMutation = {
  __typename?: 'Mutation'
  updateContactById?:
    | {
        __typename?: 'UpdateContactPayload'
        contact?:
          | {
              __typename?: 'Contact'
              nodeId: string
              id: any
              accountUsername?: string | undefined
              address?: string | undefined
              authorAccountUsername: string
              emailAddress?: string | undefined
              emailAddressHash?: string | undefined
              firstName?: string | undefined
              lastName?: string | undefined
              phoneNumber?: string | undefined
              url?: string | undefined
            }
          | undefined
      }
    | undefined
}

export type CreateEventMutationVariables = Exact<{
  createEventInput: CreateEventInput
}>

export type CreateEventMutation = {
  __typename?: 'Mutation'
  createEvent?:
    | {
        __typename?: 'CreateEventPayload'
        event?:
          | {
              __typename?: 'Event'
              id: any
              nodeId: string
              authorUsername: string
              description?: string | undefined
              end?: any | undefined
              inviteeCountMaximum?: number | undefined
              isArchived: boolean
              isInPerson?: boolean | undefined
              isRemote?: boolean | undefined
              location?: string | undefined
              name: string
              slug: string
              start: any
              url?: string | undefined
              visibility: EventVisibility
            }
          | undefined
      }
    | undefined
}

export type EventDeleteMutationVariables = Exact<{
  id: Scalars['BigInt']
  password: Scalars['String']
}>

export type EventDeleteMutation = {
  __typename?: 'Mutation'
  eventDelete?:
    | {
        __typename?: 'EventDeletePayload'
        clientMutationId?: string | undefined
        event?:
          | {
              __typename?: 'Event'
              id: any
              nodeId: string
              authorUsername: string
              description?: string | undefined
              end?: any | undefined
              inviteeCountMaximum?: number | undefined
              isArchived: boolean
              isInPerson?: boolean | undefined
              isRemote?: boolean | undefined
              location?: string | undefined
              name: string
              slug: string
              start: any
              url?: string | undefined
              visibility: EventVisibility
            }
          | undefined
      }
    | undefined
}

export type EventUnlockMutationVariables = Exact<{
  invitationCode: Scalars['UUID']
}>

export type EventUnlockMutation = {
  __typename?: 'Mutation'
  eventUnlock?:
    | {
        __typename?: 'EventUnlockPayload'
        eventUnlockResponse?:
          | {
              __typename?: 'EventUnlockResponse'
              eventSlug?: string | undefined
              jwt?: any | undefined
              authorUsername?: string | undefined
            }
          | undefined
      }
    | undefined
}

export type UpdateEventByIdMutationVariables = Exact<{
  id: Scalars['BigInt']
  eventPatch: EventPatch
}>

export type UpdateEventByIdMutation = {
  __typename?: 'Mutation'
  updateEventById?:
    | {
        __typename?: 'UpdateEventPayload'
        event?:
          | {
              __typename?: 'Event'
              id: any
              nodeId: string
              authorUsername: string
              description?: string | undefined
              end?: any | undefined
              inviteeCountMaximum?: number | undefined
              isArchived: boolean
              isInPerson?: boolean | undefined
              isRemote?: boolean | undefined
              location?: string | undefined
              name: string
              slug: string
              start: any
              url?: string | undefined
              visibility: EventVisibility
            }
          | undefined
      }
    | undefined
}

export type CreateInvitationMutationVariables = Exact<{
  invitationInput: InvitationInput
}>

export type CreateInvitationMutation = {
  __typename?: 'Mutation'
  createInvitation?:
    | {
        __typename?: 'CreateInvitationPayload'
        invitation?:
          | {
              __typename?: 'Invitation'
              uuid: any
              contactByContactId?:
                | {
                    __typename?: 'Contact'
                    nodeId: string
                    id: any
                    accountUsername?: string | undefined
                    address?: string | undefined
                    authorAccountUsername: string
                    emailAddress?: string | undefined
                    emailAddressHash?: string | undefined
                    firstName?: string | undefined
                    lastName?: string | undefined
                    phoneNumber?: string | undefined
                    url?: string | undefined
                  }
                | undefined
            }
          | undefined
      }
    | undefined
}

export type DeleteInvitationByUuidMutationVariables = Exact<{
  uuid: Scalars['UUID']
}>

export type DeleteInvitationByUuidMutation = {
  __typename?: 'Mutation'
  deleteInvitationByUuid?:
    | {
        __typename?: 'DeleteInvitationPayload'
        clientMutationId?: string | undefined
      }
    | undefined
}

export type UpdateInvitationByIdMutationVariables = Exact<{
  id: Scalars['BigInt']
  invitationPatch: InvitationPatch
}>

export type UpdateInvitationByIdMutation = {
  __typename?: 'Mutation'
  updateInvitationById?:
    | {
        __typename?: 'UpdateInvitationPayload'
        invitation?:
          | {
              __typename?: 'Invitation'
              id: any
              nodeId: string
              contactId: any
              eventId: any
              feedback?: InvitationFeedback | undefined
              feedbackPaper?: InvitationFeedbackPaper | undefined
              uuid: any
              contactByContactId?:
                | {
                    __typename?: 'Contact'
                    nodeId: string
                    id: any
                    accountUsername?: string | undefined
                    address?: string | undefined
                    authorAccountUsername: string
                    emailAddress?: string | undefined
                    emailAddressHash?: string | undefined
                    firstName?: string | undefined
                    lastName?: string | undefined
                    phoneNumber?: string | undefined
                    url?: string | undefined
                  }
                | undefined
            }
          | undefined
      }
    | undefined
}

export type InviteMutationVariables = Exact<{
  invitationId: Scalars['BigInt']
  language: Scalars['String']
}>

export type InviteMutation = {
  __typename?: 'Mutation'
  invite?:
    | { __typename?: 'InvitePayload'; clientMutationId?: string | undefined }
    | undefined
}

export type ProfilePictureSetMutationVariables = Exact<{
  storageKey: Scalars['String']
}>

export type ProfilePictureSetMutation = {
  __typename?: 'Mutation'
  profilePictureSet?:
    | {
        __typename?: 'ProfilePictureSetPayload'
        clientMutationId?: string | undefined
      }
    | undefined
}

export type UploadCreateMutationVariables = Exact<{
  uploadCreateInput: UploadCreateInput
}>

export type UploadCreateMutation = {
  __typename?: 'Mutation'
  uploadCreate?:
    | {
        __typename?: 'UploadCreatePayload'
        clientMutationId?: string | undefined
        uuid?: any | undefined
      }
    | undefined
}

export type AccountIsExistingQueryVariables = Exact<{
  username: Scalars['String']
}>

export type AccountIsExistingQuery = {
  __typename?: 'Query'
  accountIsExisting?: boolean | undefined
}

export type AccountUploadQuotaBytesQueryVariables = Exact<{
  [key: string]: never
}>

export type AccountUploadQuotaBytesQuery = {
  __typename?: 'Query'
  accountUploadQuotaBytes?: any | undefined
}

export type AllContactsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['Cursor']>
  authorAccountUsername?: InputMaybe<Scalars['String']>
  first: Scalars['Int']
}>

export type AllContactsQuery = {
  __typename?: 'Query'
  allContacts?:
    | {
        __typename?: 'ContactsConnection'
        totalCount: number
        nodes: Array<{
          __typename?: 'Contact'
          nodeId: string
          id: any
          accountUsername?: string | undefined
          address?: string | undefined
          authorAccountUsername: string
          emailAddress?: string | undefined
          emailAddressHash?: string | undefined
          firstName?: string | undefined
          lastName?: string | undefined
          phoneNumber?: string | undefined
          url?: string | undefined
        }>
        pageInfo: {
          __typename?: 'PageInfo'
          hasNextPage: boolean
          endCursor?: any | undefined
        }
      }
    | undefined
}

export type EventByAuthorUsernameAndSlugQueryVariables = Exact<{
  authorUsername: Scalars['String']
  slug: Scalars['String']
  invitationUuid?: InputMaybe<Scalars['UUID']>
}>

export type EventByAuthorUsernameAndSlugQuery = {
  __typename?: 'Query'
  eventByAuthorUsernameAndSlug?:
    | {
        __typename?: 'Event'
        id: any
        nodeId: string
        authorUsername: string
        description?: string | undefined
        end?: any | undefined
        inviteeCountMaximum?: number | undefined
        isArchived: boolean
        isInPerson?: boolean | undefined
        isRemote?: boolean | undefined
        location?: string | undefined
        name: string
        slug: string
        start: any
        url?: string | undefined
        visibility: EventVisibility
        invitationsByEventId: {
          __typename?: 'InvitationsConnection'
          nodes: Array<{
            __typename?: 'Invitation'
            id: any
            nodeId: string
            contactId: any
            eventId: any
            feedback?: InvitationFeedback | undefined
            feedbackPaper?: InvitationFeedbackPaper | undefined
            uuid: any
            contactByContactId?:
              | {
                  __typename?: 'Contact'
                  nodeId: string
                  id: any
                  accountUsername?: string | undefined
                  address?: string | undefined
                  authorAccountUsername: string
                  emailAddress?: string | undefined
                  emailAddressHash?: string | undefined
                  firstName?: string | undefined
                  lastName?: string | undefined
                  phoneNumber?: string | undefined
                  url?: string | undefined
                }
              | undefined
          }>
        }
      }
    | undefined
}

export type EventIsExistingQueryVariables = Exact<{
  authorUsername: Scalars['String']
  slug: Scalars['String']
}>

export type EventIsExistingQuery = {
  __typename?: 'Query'
  eventIsExisting?: boolean | undefined
}

export type AllEventsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['Cursor']>
  authorUsername?: InputMaybe<Scalars['String']>
  first: Scalars['Int']
}>

export type AllEventsQuery = {
  __typename?: 'Query'
  allEvents?:
    | {
        __typename?: 'EventsConnection'
        totalCount: number
        nodes: Array<{
          __typename?: 'Event'
          id: any
          nodeId: string
          authorUsername: string
          description?: string | undefined
          end?: any | undefined
          inviteeCountMaximum?: number | undefined
          isArchived: boolean
          isInPerson?: boolean | undefined
          isRemote?: boolean | undefined
          location?: string | undefined
          name: string
          slug: string
          start: any
          url?: string | undefined
          visibility: EventVisibility
        }>
        pageInfo: {
          __typename?: 'PageInfo'
          hasNextPage: boolean
          endCursor?: any | undefined
        }
      }
    | undefined
}

export type AllInvitationsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['Cursor']>
  eventId: Scalars['BigInt']
  first: Scalars['Int']
}>

export type AllInvitationsQuery = {
  __typename?: 'Query'
  allInvitations?:
    | {
        __typename?: 'InvitationsConnection'
        totalCount: number
        nodes: Array<{
          __typename?: 'Invitation'
          id: any
          nodeId: string
          contactId: any
          eventId: any
          feedback?: InvitationFeedback | undefined
          feedbackPaper?: InvitationFeedbackPaper | undefined
          uuid: any
          contactByContactId?:
            | {
                __typename?: 'Contact'
                nodeId: string
                id: any
                accountUsername?: string | undefined
                address?: string | undefined
                authorAccountUsername: string
                emailAddress?: string | undefined
                emailAddressHash?: string | undefined
                firstName?: string | undefined
                lastName?: string | undefined
                phoneNumber?: string | undefined
                url?: string | undefined
              }
            | undefined
        }>
        pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean }
      }
    | undefined
}

export type ProfilePictureByUsernameQueryVariables = Exact<{
  username: Scalars['String']
}>

export type ProfilePictureByUsernameQuery = {
  __typename?: 'Query'
  profilePictureByUsername?:
    | {
        __typename?: 'ProfilePicture'
        id: any
        nodeId: string
        uploadStorageKey: string
        username: string
      }
    | undefined
}

export type AllUploadsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['Cursor']>
  first: Scalars['Int']
  username?: InputMaybe<Scalars['String']>
}>

export type AllUploadsQuery = {
  __typename?: 'Query'
  allUploads?:
    | {
        __typename?: 'UploadsConnection'
        totalCount: number
        nodes: Array<{
          __typename?: 'Upload'
          id: any
          nodeId: string
          sizeByte: any
          storageKey?: string | undefined
          username: string
          uuid: any
        }>
        pageInfo: {
          __typename?: 'PageInfo'
          hasNextPage: boolean
          endCursor?: any | undefined
        }
      }
    | undefined
}

export const ContactFieldsFragmentDoc = gql`
  fragment contactFields on Contact {
    nodeId
    id
    accountUsername
    address
    authorAccountUsername
    emailAddress
    emailAddressHash
    firstName
    lastName
    phoneNumber
    url
  }
`
export const EventFieldsFragmentDoc = gql`
  fragment eventFields on Event {
    id
    nodeId
    authorUsername
    description
    end
    inviteeCountMaximum
    isArchived
    isInPerson
    isRemote
    location
    name
    slug
    start
    url
    visibility
  }
`
export const InvitationFieldsFragmentDoc = gql`
  fragment invitationFields on Invitation {
    id
    nodeId
    contactId
    eventId
    feedback
    feedbackPaper
    uuid
  }
`
export const ProfilePictureFieldsFragmentDoc = gql`
  fragment profilePictureFields on ProfilePicture {
    id
    nodeId
    uploadStorageKey
    username
  }
`
export const UploadFieldsFragmentDoc = gql`
  fragment uploadFields on Upload {
    id
    nodeId
    sizeByte
    storageKey
    username
    uuid
  }
`
export const AuthenticateDocument = gql`
  mutation authenticate($password: String!, $username: String!) {
    authenticate(input: { password: $password, username: $username }) {
      clientMutationId
      jwt
    }
  }
`

export function useAuthenticateMutation() {
  return Urql.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(
    AuthenticateDocument
  )
}
export const AccountDeleteDocument = gql`
  mutation accountDelete($password: String!) {
    accountDelete(input: { password: $password }) {
      clientMutationId
    }
  }
`

export function useAccountDeleteMutation() {
  return Urql.useMutation<
    AccountDeleteMutation,
    AccountDeleteMutationVariables
  >(AccountDeleteDocument)
}
export const AccountEmailAddressVerificationDocument = gql`
  mutation accountEmailAddressVerification($code: UUID!) {
    accountEmailAddressVerification(input: { code: $code }) {
      clientMutationId
    }
  }
`

export function useAccountEmailAddressVerificationMutation() {
  return Urql.useMutation<
    AccountEmailAddressVerificationMutation,
    AccountEmailAddressVerificationMutationVariables
  >(AccountEmailAddressVerificationDocument)
}
export const JwtRefreshDocument = gql`
  mutation jwtRefresh($id: UUID!) {
    jwtRefresh(input: { jwtId: $id }) {
      clientMutationId
      jwt
    }
  }
`

export function useJwtRefreshMutation() {
  return Urql.useMutation<JwtRefreshMutation, JwtRefreshMutationVariables>(
    JwtRefreshDocument
  )
}
export const AccountPasswordChangeDocument = gql`
  mutation accountPasswordChange(
    $passwordCurrent: String!
    $passwordNew: String!
  ) {
    accountPasswordChange(
      input: { passwordCurrent: $passwordCurrent, passwordNew: $passwordNew }
    ) {
      clientMutationId
    }
  }
`

export function useAccountPasswordChangeMutation() {
  return Urql.useMutation<
    AccountPasswordChangeMutation,
    AccountPasswordChangeMutationVariables
  >(AccountPasswordChangeDocument)
}
export const AccountPasswordResetDocument = gql`
  mutation accountPasswordReset($code: UUID!, $password: String!) {
    accountPasswordReset(input: { code: $code, password: $password }) {
      clientMutationId
    }
  }
`

export function useAccountPasswordResetMutation() {
  return Urql.useMutation<
    AccountPasswordResetMutation,
    AccountPasswordResetMutationVariables
  >(AccountPasswordResetDocument)
}
export const AccountPasswordResetRequestDocument = gql`
  mutation accountPasswordResetRequest(
    $emailAddress: String!
    $language: String!
  ) {
    accountPasswordResetRequest(
      input: { emailAddress: $emailAddress, language: $language }
    ) {
      clientMutationId
    }
  }
`

export function useAccountPasswordResetRequestMutation() {
  return Urql.useMutation<
    AccountPasswordResetRequestMutation,
    AccountPasswordResetRequestMutationVariables
  >(AccountPasswordResetRequestDocument)
}
export const AccountRegistrationDocument = gql`
  mutation accountRegistration(
    $emailAddress: String!
    $password: String!
    $username: String!
    $language: String!
  ) {
    accountRegistration(
      input: {
        emailAddress: $emailAddress
        password: $password
        username: $username
        language: $language
      }
    ) {
      clientMutationId
    }
  }
`

export function useAccountRegistrationMutation() {
  return Urql.useMutation<
    AccountRegistrationMutation,
    AccountRegistrationMutationVariables
  >(AccountRegistrationDocument)
}
export const AccountRegistrationRefreshDocument = gql`
  mutation accountRegistrationRefresh($username: String!, $language: String!) {
    accountRegistrationRefresh(
      input: { language: $language, username: $username }
    ) {
      clientMutationId
    }
  }
`

export function useAccountRegistrationRefreshMutation() {
  return Urql.useMutation<
    AccountRegistrationRefreshMutation,
    AccountRegistrationRefreshMutationVariables
  >(AccountRegistrationRefreshDocument)
}
export const CreateContactDocument = gql`
  mutation createContact($contactInput: ContactInput!) {
    createContact(input: { contact: $contactInput }) {
      contact {
        ...contactFields
      }
    }
  }
  ${ContactFieldsFragmentDoc}
`

export function useCreateContactMutation() {
  return Urql.useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CreateContactDocument)
}
export const DeleteContactDocument = gql`
  mutation deleteContact($nodeId: ID!) {
    deleteContact(input: { nodeId: $nodeId }) {
      clientMutationId
      contact {
        ...contactFields
      }
    }
  }
  ${ContactFieldsFragmentDoc}
`

export function useDeleteContactMutation() {
  return Urql.useMutation<
    DeleteContactMutation,
    DeleteContactMutationVariables
  >(DeleteContactDocument)
}
export const UpdateContactByIdDocument = gql`
  mutation updateContactById($id: BigInt!, $contactPatch: ContactPatch!) {
    updateContactById(input: { id: $id, contactPatch: $contactPatch }) {
      contact {
        ...contactFields
      }
    }
  }
  ${ContactFieldsFragmentDoc}
`

export function useUpdateContactByIdMutation() {
  return Urql.useMutation<
    UpdateContactByIdMutation,
    UpdateContactByIdMutationVariables
  >(UpdateContactByIdDocument)
}
export const CreateEventDocument = gql`
  mutation createEvent($createEventInput: CreateEventInput!) {
    createEvent(input: $createEventInput) {
      event {
        ...eventFields
      }
    }
  }
  ${EventFieldsFragmentDoc}
`

export function useCreateEventMutation() {
  return Urql.useMutation<CreateEventMutation, CreateEventMutationVariables>(
    CreateEventDocument
  )
}
export const EventDeleteDocument = gql`
  mutation eventDelete($id: BigInt!, $password: String!) {
    eventDelete(input: { id: $id, password: $password }) {
      clientMutationId
      event {
        ...eventFields
      }
    }
  }
  ${EventFieldsFragmentDoc}
`

export function useEventDeleteMutation() {
  return Urql.useMutation<EventDeleteMutation, EventDeleteMutationVariables>(
    EventDeleteDocument
  )
}
export const EventUnlockDocument = gql`
  mutation eventUnlock($invitationCode: UUID!) {
    eventUnlock(input: { invitationCode: $invitationCode }) {
      eventUnlockResponse {
        eventSlug
        jwt
        authorUsername
      }
    }
  }
`

export function useEventUnlockMutation() {
  return Urql.useMutation<EventUnlockMutation, EventUnlockMutationVariables>(
    EventUnlockDocument
  )
}
export const UpdateEventByIdDocument = gql`
  mutation updateEventById($id: BigInt!, $eventPatch: EventPatch!) {
    updateEventById(input: { id: $id, eventPatch: $eventPatch }) {
      event {
        ...eventFields
      }
    }
  }
  ${EventFieldsFragmentDoc}
`

export function useUpdateEventByIdMutation() {
  return Urql.useMutation<
    UpdateEventByIdMutation,
    UpdateEventByIdMutationVariables
  >(UpdateEventByIdDocument)
}
export const CreateInvitationDocument = gql`
  mutation createInvitation($invitationInput: InvitationInput!) {
    createInvitation(input: { invitation: $invitationInput }) {
      invitation {
        contactByContactId {
          ...contactFields
        }
        uuid
      }
    }
  }
  ${ContactFieldsFragmentDoc}
`

export function useCreateInvitationMutation() {
  return Urql.useMutation<
    CreateInvitationMutation,
    CreateInvitationMutationVariables
  >(CreateInvitationDocument)
}
export const DeleteInvitationByUuidDocument = gql`
  mutation deleteInvitationByUuid($uuid: UUID!) {
    deleteInvitationByUuid(input: { uuid: $uuid }) {
      clientMutationId
    }
  }
`

export function useDeleteInvitationByUuidMutation() {
  return Urql.useMutation<
    DeleteInvitationByUuidMutation,
    DeleteInvitationByUuidMutationVariables
  >(DeleteInvitationByUuidDocument)
}
export const UpdateInvitationByIdDocument = gql`
  mutation updateInvitationById(
    $id: BigInt!
    $invitationPatch: InvitationPatch!
  ) {
    updateInvitationById(
      input: { id: $id, invitationPatch: $invitationPatch }
    ) {
      invitation {
        ...invitationFields
        contactByContactId {
          ...contactFields
        }
      }
    }
  }
  ${InvitationFieldsFragmentDoc}
  ${ContactFieldsFragmentDoc}
`

export function useUpdateInvitationByIdMutation() {
  return Urql.useMutation<
    UpdateInvitationByIdMutation,
    UpdateInvitationByIdMutationVariables
  >(UpdateInvitationByIdDocument)
}
export const InviteDocument = gql`
  mutation invite($invitationId: BigInt!, $language: String!) {
    invite(input: { invitationId: $invitationId, language: $language }) {
      clientMutationId
    }
  }
`

export function useInviteMutation() {
  return Urql.useMutation<InviteMutation, InviteMutationVariables>(
    InviteDocument
  )
}
export const ProfilePictureSetDocument = gql`
  mutation profilePictureSet($storageKey: String!) {
    profilePictureSet(input: { storageKey: $storageKey }) {
      clientMutationId
    }
  }
`

export function useProfilePictureSetMutation() {
  return Urql.useMutation<
    ProfilePictureSetMutation,
    ProfilePictureSetMutationVariables
  >(ProfilePictureSetDocument)
}
export const UploadCreateDocument = gql`
  mutation uploadCreate($uploadCreateInput: UploadCreateInput!) {
    uploadCreate(input: $uploadCreateInput) {
      clientMutationId
      uuid
    }
  }
`

export function useUploadCreateMutation() {
  return Urql.useMutation<UploadCreateMutation, UploadCreateMutationVariables>(
    UploadCreateDocument
  )
}
export const AccountIsExistingDocument = gql`
  query accountIsExisting($username: String!) {
    accountIsExisting(username: $username)
  }
`

export function useAccountIsExistingQuery(
  options: Omit<
    Urql.UseQueryArgs<never, AccountIsExistingQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<AccountIsExistingQuery>({
    query: AccountIsExistingDocument,
    ...options,
  })
}
export const AccountUploadQuotaBytesDocument = gql`
  query accountUploadQuotaBytes {
    accountUploadQuotaBytes
  }
`

export function useAccountUploadQuotaBytesQuery(
  options: Omit<
    Urql.UseQueryArgs<never, AccountUploadQuotaBytesQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<AccountUploadQuotaBytesQuery>({
    query: AccountUploadQuotaBytesDocument,
    ...options,
  })
}
export const AllContactsDocument = gql`
  query allContacts(
    $after: Cursor
    $authorAccountUsername: String
    $first: Int!
  ) {
    allContacts(
      after: $after
      condition: { authorAccountUsername: $authorAccountUsername }
      first: $first
      orderBy: [ACCOUNT_USERNAME_ASC, FIRST_NAME_ASC, LAST_NAME_ASC]
    ) {
      nodes {
        ...contactFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
  ${ContactFieldsFragmentDoc}
`

export function useAllContactsQuery(
  options: Omit<
    Urql.UseQueryArgs<never, AllContactsQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<AllContactsQuery>({
    query: AllContactsDocument,
    ...options,
  })
}
export const EventByAuthorUsernameAndSlugDocument = gql`
  query eventByAuthorUsernameAndSlug(
    $authorUsername: String!
    $slug: String!
    $invitationUuid: UUID
  ) {
    eventByAuthorUsernameAndSlug(authorUsername: $authorUsername, slug: $slug) {
      ...eventFields
      invitationsByEventId(condition: { uuid: $invitationUuid }) {
        nodes {
          ...invitationFields
          contactByContactId {
            ...contactFields
          }
        }
      }
    }
  }
  ${EventFieldsFragmentDoc}
  ${InvitationFieldsFragmentDoc}
  ${ContactFieldsFragmentDoc}
`

export function useEventByAuthorUsernameAndSlugQuery(
  options: Omit<
    Urql.UseQueryArgs<never, EventByAuthorUsernameAndSlugQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<EventByAuthorUsernameAndSlugQuery>({
    query: EventByAuthorUsernameAndSlugDocument,
    ...options,
  })
}
export const EventIsExistingDocument = gql`
  query eventIsExisting($authorUsername: String!, $slug: String!) {
    eventIsExisting(authorUsername: $authorUsername, slug: $slug)
  }
`

export function useEventIsExistingQuery(
  options: Omit<
    Urql.UseQueryArgs<never, EventIsExistingQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<EventIsExistingQuery>({
    query: EventIsExistingDocument,
    ...options,
  })
}
export const AllEventsDocument = gql`
  query allEvents($after: Cursor, $authorUsername: String, $first: Int!) {
    allEvents(
      after: $after
      condition: { authorUsername: $authorUsername }
      first: $first
      orderBy: START_DESC
    ) {
      nodes {
        ...eventFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
  ${EventFieldsFragmentDoc}
`

export function useAllEventsQuery(
  options: Omit<Urql.UseQueryArgs<never, AllEventsQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<AllEventsQuery>({ query: AllEventsDocument, ...options })
}
export const AllInvitationsDocument = gql`
  query allInvitations($after: Cursor, $eventId: BigInt!, $first: Int!) {
    allInvitations(
      after: $after
      condition: { eventId: $eventId }
      first: $first
    ) {
      nodes {
        ...invitationFields
        contactByContactId {
          ...contactFields
        }
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
  ${InvitationFieldsFragmentDoc}
  ${ContactFieldsFragmentDoc}
`

export function useAllInvitationsQuery(
  options: Omit<
    Urql.UseQueryArgs<never, AllInvitationsQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<AllInvitationsQuery>({
    query: AllInvitationsDocument,
    ...options,
  })
}
export const ProfilePictureByUsernameDocument = gql`
  query profilePictureByUsername($username: String!) {
    profilePictureByUsername(username: $username) {
      ...profilePictureFields
    }
  }
  ${ProfilePictureFieldsFragmentDoc}
`

export function useProfilePictureByUsernameQuery(
  options: Omit<
    Urql.UseQueryArgs<never, ProfilePictureByUsernameQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<ProfilePictureByUsernameQuery>({
    query: ProfilePictureByUsernameDocument,
    ...options,
  })
}
export const AllUploadsDocument = gql`
  query allUploads($after: Cursor, $first: Int!, $username: String) {
    allUploads(
      after: $after
      condition: { username: $username }
      first: $first
    ) {
      nodes {
        ...uploadFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
  ${UploadFieldsFragmentDoc}
`

export function useAllUploadsQuery(
  options: Omit<
    Urql.UseQueryArgs<never, AllUploadsQueryVariables>,
    'query'
  > = {}
) {
  return Urql.useQuery<AllUploadsQuery>({
    query: AllUploadsDocument,
    ...options,
  })
}

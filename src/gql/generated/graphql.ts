/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
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
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: { input: any; output: any }
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: { input: any; output: any }
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: { input: any; output: any }
  /**
   * A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
   * which securely represents claims between two parties.
   */
  Jwt: { input: any; output: any }
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: { input: any; output: any }
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

/** All input for the `accountEmailAddressVerification` mutation. */
export type AccountEmailAddressVerificationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  code: Scalars['UUID']['input']
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

/** Possible visibilities of events and event groups: public, private. */
export enum EventVisibility {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
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

/** All input for the `jwtRefresh` mutation. */
export type JwtRefreshInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  jwtId: Scalars['UUID']['input']
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

export type AccountItemFragment = {
  __typename?: 'Account'
  nodeId: string
  id: any
  username: string
} & { ' $fragmentName'?: 'AccountItemFragment' }

export type AchievementItemFragment = {
  __typename?: 'Achievement'
  nodeId: string
  id: any
  accountId: any
  achievement: AchievementType
  level: number
} & { ' $fragmentName'?: 'AchievementItemFragment' }

export type ContactItemFragment = {
  __typename?: 'Contact'
  nodeId: string
  id: any
  accountId?: any | null
  authorAccountId: any
  address?: string | null
  emailAddress?: string | null
  emailAddressHash?: string | null
  firstName?: string | null
  lastName?: string | null
  phoneNumber?: string | null
  url?: string | null
  accountByAccountId?: {
    __typename?: 'Account'
    id: any
    username: string
  } | null
  accountByAuthorAccountId?: {
    __typename?: 'Account'
    id: any
    username: string
  } | null
} & { ' $fragmentName'?: 'ContactItemFragment' }

export type EventItemFragment = {
  __typename?: 'Event'
  id: any
  nodeId: string
  authorAccountId: any
  description?: string | null
  end?: any | null
  inviteeCountMaximum?: number | null
  isArchived: boolean
  isInPerson?: boolean | null
  isRemote?: boolean | null
  location?: string | null
  name: string
  slug: string
  start: any
  url?: string | null
  visibility: EventVisibility
  accountByAuthorAccountId?: {
    __typename?: 'Account'
    id: any
    username: string
  } | null
} & { ' $fragmentName'?: 'EventItemFragment' }

export type InvitationItemFragment = {
  __typename?: 'Invitation'
  id: any
  nodeId: string
  contactId: any
  eventId: any
  feedback?: InvitationFeedback | null
  feedbackPaper?: InvitationFeedbackPaper | null
  contactByContactId?:
    | ({ __typename?: 'Contact' } & {
        ' $fragmentRefs'?: { ContactItemFragment: ContactItemFragment }
      })
    | null
} & { ' $fragmentName'?: 'InvitationItemFragment' }

export type ProfilePictureItemFragment = {
  __typename?: 'ProfilePicture'
  id: any
  nodeId: string
  accountId: any
  uploadByUploadId?:
    | ({ __typename?: 'Upload' } & {
        ' $fragmentRefs'?: { UploadItemFragment: UploadItemFragment }
      })
    | null
} & { ' $fragmentName'?: 'ProfilePictureItemFragment' }

export type UploadItemFragment = {
  __typename?: 'Upload'
  id: any
  nodeId: string
  accountId: any
  sizeByte: any
  storageKey?: string | null
} & { ' $fragmentName'?: 'UploadItemFragment' }

export type AuthenticateMutationVariables = Exact<{
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}>

export type AuthenticateMutation = {
  __typename?: 'Mutation'
  authenticate?: {
    __typename?: 'AuthenticatePayload'
    clientMutationId?: string | null
    jwt?: any | null
  } | null
}

export type AccountDeleteMutationVariables = Exact<{
  password: Scalars['String']['input']
}>

export type AccountDeleteMutation = {
  __typename?: 'Mutation'
  accountDelete?: {
    __typename?: 'AccountDeletePayload'
    clientMutationId?: string | null
  } | null
}

export type AccountEmailAddressVerificationMutationVariables = Exact<{
  code: Scalars['UUID']['input']
}>

export type AccountEmailAddressVerificationMutation = {
  __typename?: 'Mutation'
  accountEmailAddressVerification?: {
    __typename?: 'AccountEmailAddressVerificationPayload'
    clientMutationId?: string | null
  } | null
}

export type JwtRefreshMutationVariables = Exact<{
  id: Scalars['UUID']['input']
}>

export type JwtRefreshMutation = {
  __typename?: 'Mutation'
  jwtRefresh?: {
    __typename?: 'JwtRefreshPayload'
    clientMutationId?: string | null
    jwt?: any | null
  } | null
}

export type AccountPasswordChangeMutationVariables = Exact<{
  passwordCurrent: Scalars['String']['input']
  passwordNew: Scalars['String']['input']
}>

export type AccountPasswordChangeMutation = {
  __typename?: 'Mutation'
  accountPasswordChange?: {
    __typename?: 'AccountPasswordChangePayload'
    clientMutationId?: string | null
  } | null
}

export type AccountPasswordResetMutationVariables = Exact<{
  code: Scalars['UUID']['input']
  password: Scalars['String']['input']
}>

export type AccountPasswordResetMutation = {
  __typename?: 'Mutation'
  accountPasswordReset?: {
    __typename?: 'AccountPasswordResetPayload'
    clientMutationId?: string | null
  } | null
}

export type AccountPasswordResetRequestMutationVariables = Exact<{
  emailAddress: Scalars['String']['input']
  language: Scalars['String']['input']
}>

export type AccountPasswordResetRequestMutation = {
  __typename?: 'Mutation'
  accountPasswordResetRequest?: {
    __typename?: 'AccountPasswordResetRequestPayload'
    clientMutationId?: string | null
  } | null
}

export type AccountRegistrationMutationVariables = Exact<{
  emailAddress: Scalars['String']['input']
  password: Scalars['String']['input']
  username: Scalars['String']['input']
  language: Scalars['String']['input']
}>

export type AccountRegistrationMutation = {
  __typename?: 'Mutation'
  accountRegistration?: {
    __typename?: 'AccountRegistrationPayload'
    clientMutationId?: string | null
  } | null
}

export type AccountRegistrationRefreshMutationVariables = Exact<{
  accountId: Scalars['UUID']['input']
  language: Scalars['String']['input']
}>

export type AccountRegistrationRefreshMutation = {
  __typename?: 'Mutation'
  accountRegistrationRefresh?: {
    __typename?: 'AccountRegistrationRefreshPayload'
    clientMutationId?: string | null
  } | null
}

export type AchievementUnlockMutationVariables = Exact<{
  code: Scalars['UUID']['input']
  alias: Scalars['String']['input']
}>

export type AchievementUnlockMutation = {
  __typename?: 'Mutation'
  achievementUnlock?: {
    __typename?: 'AchievementUnlockPayload'
    clientMutationId?: string | null
    uuid?: any | null
  } | null
}

export type CreateContactMutationVariables = Exact<{
  contactInput: ContactInput
}>

export type CreateContactMutation = {
  __typename?: 'Mutation'
  createContact?: {
    __typename?: 'CreateContactPayload'
    contact?:
      | ({ __typename?: 'Contact' } & {
          ' $fragmentRefs'?: { ContactItemFragment: ContactItemFragment }
        })
      | null
  } | null
}

export type DeleteContactByIdMutationVariables = Exact<{
  id: Scalars['UUID']['input']
}>

export type DeleteContactByIdMutation = {
  __typename?: 'Mutation'
  deleteContactById?: {
    __typename?: 'DeleteContactPayload'
    clientMutationId?: string | null
    contact?:
      | ({ __typename?: 'Contact' } & {
          ' $fragmentRefs'?: { ContactItemFragment: ContactItemFragment }
        })
      | null
  } | null
}

export type UpdateContactByIdMutationVariables = Exact<{
  id: Scalars['UUID']['input']
  contactPatch: ContactPatch
}>

export type UpdateContactByIdMutation = {
  __typename?: 'Mutation'
  updateContactById?: {
    __typename?: 'UpdateContactPayload'
    contact?:
      | ({ __typename?: 'Contact' } & {
          ' $fragmentRefs'?: { ContactItemFragment: ContactItemFragment }
        })
      | null
  } | null
}

export type CreateEventMutationVariables = Exact<{
  createEventInput: CreateEventInput
}>

export type CreateEventMutation = {
  __typename?: 'Mutation'
  createEvent?: {
    __typename?: 'CreateEventPayload'
    event?:
      | ({ __typename?: 'Event' } & {
          ' $fragmentRefs'?: { EventItemFragment: EventItemFragment }
        })
      | null
  } | null
}

export type EventDeleteMutationVariables = Exact<{
  id: Scalars['UUID']['input']
  password: Scalars['String']['input']
}>

export type EventDeleteMutation = {
  __typename?: 'Mutation'
  eventDelete?: {
    __typename?: 'EventDeletePayload'
    clientMutationId?: string | null
    event?:
      | ({ __typename?: 'Event' } & {
          ' $fragmentRefs'?: { EventItemFragment: EventItemFragment }
        })
      | null
  } | null
}

export type EventUnlockMutationVariables = Exact<{
  invitationId: Scalars['UUID']['input']
}>

export type EventUnlockMutation = {
  __typename?: 'Mutation'
  eventUnlock?: {
    __typename?: 'EventUnlockPayload'
    eventUnlockResponse?: {
      __typename?: 'EventUnlockResponse'
      authorAccountUsername?: string | null
      eventSlug?: string | null
      jwt?: any | null
    } | null
  } | null
}

export type UpdateEventByIdMutationVariables = Exact<{
  id: Scalars['UUID']['input']
  eventPatch: EventPatch
}>

export type UpdateEventByIdMutation = {
  __typename?: 'Mutation'
  updateEventById?: {
    __typename?: 'UpdateEventPayload'
    event?:
      | ({ __typename?: 'Event' } & {
          ' $fragmentRefs'?: { EventItemFragment: EventItemFragment }
        })
      | null
  } | null
}

export type CreateInvitationMutationVariables = Exact<{
  invitationInput: InvitationInput
}>

export type CreateInvitationMutation = {
  __typename?: 'Mutation'
  createInvitation?: {
    __typename?: 'CreateInvitationPayload'
    invitation?: {
      __typename?: 'Invitation'
      id: any
      contactByContactId?:
        | ({ __typename?: 'Contact' } & {
            ' $fragmentRefs'?: { ContactItemFragment: ContactItemFragment }
          })
        | null
    } | null
  } | null
}

export type DeleteInvitationByIdMutationVariables = Exact<{
  id: Scalars['UUID']['input']
}>

export type DeleteInvitationByIdMutation = {
  __typename?: 'Mutation'
  deleteInvitationById?: {
    __typename?: 'DeleteInvitationPayload'
    clientMutationId?: string | null
  } | null
}

export type UpdateInvitationByIdMutationVariables = Exact<{
  id: Scalars['UUID']['input']
  invitationPatch: InvitationPatch
}>

export type UpdateInvitationByIdMutation = {
  __typename?: 'Mutation'
  updateInvitationById?: {
    __typename?: 'UpdateInvitationPayload'
    invitation?:
      | ({
          __typename?: 'Invitation'
          contactByContactId?:
            | ({ __typename?: 'Contact' } & {
                ' $fragmentRefs'?: { ContactItemFragment: ContactItemFragment }
              })
            | null
        } & {
          ' $fragmentRefs'?: { InvitationItemFragment: InvitationItemFragment }
        })
      | null
  } | null
}

export type InviteMutationVariables = Exact<{
  invitationId: Scalars['UUID']['input']
  language: Scalars['String']['input']
}>

export type InviteMutation = {
  __typename?: 'Mutation'
  invite?: {
    __typename?: 'InvitePayload'
    clientMutationId?: string | null
  } | null
}

export type ProfilePictureSetMutationVariables = Exact<{
  uploadId: Scalars['UUID']['input']
}>

export type ProfilePictureSetMutation = {
  __typename?: 'Mutation'
  profilePictureSet?: {
    __typename?: 'ProfilePictureSetPayload'
    clientMutationId?: string | null
  } | null
}

export type UploadCreateMutationVariables = Exact<{
  uploadCreateInput: UploadCreateInput
}>

export type UploadCreateMutation = {
  __typename?: 'Mutation'
  uploadCreate?: {
    __typename?: 'UploadCreatePayload'
    clientMutationId?: string | null
    upload?: { __typename?: 'Upload'; id: any } | null
  } | null
}

export type AccountByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input']
}>

export type AccountByIdQuery = {
  __typename?: 'Query'
  accountById?:
    | ({ __typename?: 'Account' } & {
        ' $fragmentRefs'?: { AccountItemFragment: AccountItemFragment }
      })
    | null
}

export type AccountByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input']
}>

export type AccountByUsernameQuery = {
  __typename?: 'Query'
  accountByUsername?:
    | ({ __typename?: 'Account' } & {
        ' $fragmentRefs'?: { AccountItemFragment: AccountItemFragment }
      })
    | null
}

export type AccountUploadQuotaBytesQueryVariables = Exact<{
  [key: string]: never
}>

export type AccountUploadQuotaBytesQuery = {
  __typename?: 'Query'
  accountUploadQuotaBytes?: any | null
}

export type AllAchievementsQueryVariables = Exact<{
  accountId?: InputMaybe<Scalars['UUID']['input']>
}>

export type AllAchievementsQuery = {
  __typename?: 'Query'
  allAchievements?: {
    __typename?: 'AchievementsConnection'
    nodes: Array<
      { __typename?: 'Achievement' } & {
        ' $fragmentRefs'?: { AchievementItemFragment: AchievementItemFragment }
      }
    >
  } | null
}

export type AllContactsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['Cursor']['input']>
  authorAccountId?: InputMaybe<Scalars['UUID']['input']>
  first: Scalars['Int']['input']
}>

export type AllContactsQuery = {
  __typename?: 'Query'
  allContacts?: {
    __typename?: 'ContactsConnection'
    totalCount: number
    nodes: Array<
      { __typename?: 'Contact' } & {
        ' $fragmentRefs'?: { ContactItemFragment: ContactItemFragment }
      }
    >
    pageInfo: {
      __typename?: 'PageInfo'
      hasNextPage: boolean
      endCursor?: any | null
    }
  } | null
}

export type EventByAuthorAccountIdAndSlugQueryVariables = Exact<{
  authorAccountId: Scalars['UUID']['input']
  slug: Scalars['String']['input']
  invitationId?: InputMaybe<Scalars['UUID']['input']>
}>

export type EventByAuthorAccountIdAndSlugQuery = {
  __typename?: 'Query'
  eventByAuthorAccountIdAndSlug?:
    | ({
        __typename?: 'Event'
        invitationsByEventId: {
          __typename?: 'InvitationsConnection'
          nodes: Array<
            {
              __typename?: 'Invitation'
              contactByContactId?:
                | ({ __typename?: 'Contact' } & {
                    ' $fragmentRefs'?: {
                      ContactItemFragment: ContactItemFragment
                    }
                  })
                | null
            } & {
              ' $fragmentRefs'?: {
                InvitationItemFragment: InvitationItemFragment
              }
            }
          >
        }
      } & { ' $fragmentRefs'?: { EventItemFragment: EventItemFragment } })
    | null
}

export type EventIsExistingQueryVariables = Exact<{
  authorAccountId: Scalars['UUID']['input']
  slug: Scalars['String']['input']
}>

export type EventIsExistingQuery = {
  __typename?: 'Query'
  eventIsExisting?: boolean | null
}

export type AllEventsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['Cursor']['input']>
  authorAccountId?: InputMaybe<Scalars['UUID']['input']>
  first: Scalars['Int']['input']
}>

export type AllEventsQuery = {
  __typename?: 'Query'
  allEvents?: {
    __typename?: 'EventsConnection'
    totalCount: number
    nodes: Array<
      { __typename?: 'Event' } & {
        ' $fragmentRefs'?: { EventItemFragment: EventItemFragment }
      }
    >
    pageInfo: {
      __typename?: 'PageInfo'
      hasNextPage: boolean
      endCursor?: any | null
    }
  } | null
}

export type AllInvitationsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['Cursor']['input']>
  eventId: Scalars['UUID']['input']
  first: Scalars['Int']['input']
}>

export type AllInvitationsQuery = {
  __typename?: 'Query'
  allInvitations?: {
    __typename?: 'InvitationsConnection'
    totalCount: number
    nodes: Array<
      { __typename?: 'Invitation' } & {
        ' $fragmentRefs'?: { InvitationItemFragment: InvitationItemFragment }
      }
    >
    pageInfo: {
      __typename?: 'PageInfo'
      hasNextPage: boolean
      endCursor?: any | null
    }
  } | null
}

export type ProfilePictureByAccountIdQueryVariables = Exact<{
  accountId: Scalars['UUID']['input']
}>

export type ProfilePictureByAccountIdQuery = {
  __typename?: 'Query'
  profilePictureByAccountId?:
    | ({ __typename?: 'ProfilePicture' } & {
        ' $fragmentRefs'?: {
          ProfilePictureItemFragment: ProfilePictureItemFragment
        }
      })
    | null
}

export type AllUploadsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['Cursor']['input']>
  first: Scalars['Int']['input']
  accountId?: InputMaybe<Scalars['UUID']['input']>
}>

export type AllUploadsQuery = {
  __typename?: 'Query'
  allUploads?: {
    __typename?: 'UploadsConnection'
    totalCount: number
    nodes: Array<
      { __typename?: 'Upload' } & {
        ' $fragmentRefs'?: { UploadItemFragment: UploadItemFragment }
      }
    >
    pageInfo: {
      __typename?: 'PageInfo'
      hasNextPage: boolean
      endCursor?: any | null
    }
  } | null
}

export const AccountItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Account' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AccountItemFragment, unknown>
export const AchievementItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AchievementItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Achievement' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'achievement' } },
          { kind: 'Field', name: { kind: 'Name', value: 'level' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AchievementItemFragment, unknown>
export const EventItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Event' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inviteeCountMaximum' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isArchived' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isInPerson' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isRemote' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'visibility' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventItemFragment, unknown>
export const ContactItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContactItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Contact' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddressHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContactItemFragment, unknown>
export const InvitationItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InvitationItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Invitation' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contactId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'feedback' } },
          { kind: 'Field', name: { kind: 'Name', value: 'feedbackPaper' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'contactByContactId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ContactItem' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContactItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Contact' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddressHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvitationItemFragment, unknown>
export const UploadItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UploadItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Upload' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sizeByte' } },
          { kind: 'Field', name: { kind: 'Name', value: 'storageKey' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UploadItemFragment, unknown>
export const ProfilePictureItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProfilePictureItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProfilePicture' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'uploadByUploadId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UploadItem' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UploadItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Upload' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sizeByte' } },
          { kind: 'Field', name: { kind: 'Name', value: 'storageKey' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProfilePictureItemFragment, unknown>
export const AuthenticateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'authenticate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'username' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authenticate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'password' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'username' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'username' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'jwt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthenticateMutation,
  AuthenticateMutationVariables
>
export const AccountDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'accountDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'password' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AccountDeleteMutation,
  AccountDeleteMutationVariables
>
export const AccountEmailAddressVerificationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'accountEmailAddressVerification' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'code' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountEmailAddressVerification' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'code' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'code' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AccountEmailAddressVerificationMutation,
  AccountEmailAddressVerificationMutationVariables
>
export const JwtRefreshDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'jwtRefresh' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'jwtRefresh' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'jwtId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'jwt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<JwtRefreshMutation, JwtRefreshMutationVariables>
export const AccountPasswordChangeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'accountPasswordChange' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'passwordCurrent' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'passwordNew' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountPasswordChange' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'passwordCurrent' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'passwordCurrent' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'passwordNew' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'passwordNew' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AccountPasswordChangeMutation,
  AccountPasswordChangeMutationVariables
>
export const AccountPasswordResetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'accountPasswordReset' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'code' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountPasswordReset' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'code' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'code' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'password' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AccountPasswordResetMutation,
  AccountPasswordResetMutationVariables
>
export const AccountPasswordResetRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'accountPasswordResetRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'emailAddress' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'language' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountPasswordResetRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'emailAddress' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'emailAddress' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'language' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'language' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AccountPasswordResetRequestMutation,
  AccountPasswordResetRequestMutationVariables
>
export const AccountRegistrationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'accountRegistration' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'emailAddress' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'username' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'language' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountRegistration' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'emailAddress' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'emailAddress' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'password' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'username' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'username' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'language' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'language' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AccountRegistrationMutation,
  AccountRegistrationMutationVariables
>
export const AccountRegistrationRefreshDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'accountRegistrationRefresh' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'language' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountRegistrationRefresh' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'language' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'language' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'accountId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'accountId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AccountRegistrationRefreshMutation,
  AccountRegistrationRefreshMutationVariables
>
export const AchievementUnlockDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'achievementUnlock' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'code' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'alias' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'achievementUnlock' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'code' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'code' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'alias' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'alias' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AchievementUnlockMutation,
  AchievementUnlockMutationVariables
>
export const CreateContactDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createContact' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'contactInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ContactInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createContact' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'contact' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'contactInput' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contact' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ContactItem' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContactItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Contact' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddressHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateContactMutation,
  CreateContactMutationVariables
>
export const DeleteContactByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteContactById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteContactById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contact' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ContactItem' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContactItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Contact' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddressHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteContactByIdMutation,
  DeleteContactByIdMutationVariables
>
export const UpdateContactByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateContactById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'contactPatch' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ContactPatch' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateContactById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'contactPatch' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'contactPatch' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contact' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ContactItem' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContactItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Contact' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddressHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateContactByIdMutation,
  UpdateContactByIdMutationVariables
>
export const CreateEventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createEvent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createEventInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateEventInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createEvent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createEventInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'EventItem' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Event' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inviteeCountMaximum' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isArchived' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isInPerson' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isRemote' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'visibility' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>
export const EventDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'eventDelete' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'eventDelete' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'password' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'EventItem' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Event' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inviteeCountMaximum' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isArchived' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isInPerson' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isRemote' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'visibility' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventDeleteMutation, EventDeleteMutationVariables>
export const EventUnlockDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'eventUnlock' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'invitationId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'eventUnlock' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'invitationId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'invitationId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'eventUnlockResponse' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'authorAccountUsername' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'eventSlug' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'jwt' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventUnlockMutation, EventUnlockMutationVariables>
export const UpdateEventByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateEventById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'eventPatch' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'EventPatch' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateEventById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'eventPatch' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'eventPatch' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'EventItem' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Event' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inviteeCountMaximum' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isArchived' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isInPerson' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isRemote' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'visibility' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateEventByIdMutation,
  UpdateEventByIdMutationVariables
>
export const CreateInvitationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createInvitation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'invitationInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'InvitationInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createInvitation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'invitation' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'invitationInput' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'invitation' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contactByContactId' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'ContactItem' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContactItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Contact' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddressHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateInvitationMutation,
  CreateInvitationMutationVariables
>
export const DeleteInvitationByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteInvitationById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteInvitationById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteInvitationByIdMutation,
  DeleteInvitationByIdMutationVariables
>
export const UpdateInvitationByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateInvitationById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'invitationPatch' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'InvitationPatch' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateInvitationById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'invitationPatch' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'invitationPatch' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'invitation' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'InvitationItem' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'contactByContactId' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'ContactItem' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContactItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Contact' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddressHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InvitationItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Invitation' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contactId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'feedback' } },
          { kind: 'Field', name: { kind: 'Name', value: 'feedbackPaper' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'contactByContactId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ContactItem' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateInvitationByIdMutation,
  UpdateInvitationByIdMutationVariables
>
export const InviteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'invite' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'invitationId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'language' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'invite' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'invitationId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'invitationId' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'language' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'language' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InviteMutation, InviteMutationVariables>
export const ProfilePictureSetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'profilePictureSet' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'uploadId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profilePictureSet' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'uploadId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'uploadId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ProfilePictureSetMutation,
  ProfilePictureSetMutationVariables
>
export const UploadCreateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'uploadCreate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'uploadCreateInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UploadCreateInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'uploadCreate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'uploadCreateInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'upload' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UploadCreateMutation,
  UploadCreateMutationVariables
>
export const AccountByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'accountById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AccountItem' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Account' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AccountByIdQuery, AccountByIdQueryVariables>
export const AccountByUsernameDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'accountByUsername' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'username' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByUsername' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'username' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'username' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AccountItem' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Account' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AccountByUsernameQuery,
  AccountByUsernameQueryVariables
>
export const AccountUploadQuotaBytesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'accountUploadQuotaBytes' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountUploadQuotaBytes' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AccountUploadQuotaBytesQuery,
  AccountUploadQuotaBytesQueryVariables
>
export const AllAchievementsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'allAchievements' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'allAchievements' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'condition' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'accountId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'accountId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AchievementItem' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AchievementItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Achievement' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'achievement' } },
          { kind: 'Field', name: { kind: 'Name', value: 'level' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AllAchievementsQuery,
  AllAchievementsQueryVariables
>
export const AllContactsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'allContacts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Cursor' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'authorAccountId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'allContacts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'after' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'condition' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'authorAccountId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'authorAccountId' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'ListValue',
                  values: [
                    { kind: 'EnumValue', value: 'FIRST_NAME_ASC' },
                    { kind: 'EnumValue', value: 'LAST_NAME_ASC' },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ContactItem' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasNextPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endCursor' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContactItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Contact' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddressHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllContactsQuery, AllContactsQueryVariables>
export const EventByAuthorAccountIdAndSlugDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'eventByAuthorAccountIdAndSlug' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'authorAccountId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'invitationId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'eventByAuthorAccountIdAndSlug' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'authorAccountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'authorAccountId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'slug' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EventItem' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'invitationsByEventId' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'condition' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'invitationId' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nodes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'InvitationItem' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'contactByContactId',
                              },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: {
                                      kind: 'Name',
                                      value: 'ContactItem',
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContactItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Contact' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddressHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Event' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inviteeCountMaximum' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isArchived' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isInPerson' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isRemote' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'visibility' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InvitationItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Invitation' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contactId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'feedback' } },
          { kind: 'Field', name: { kind: 'Name', value: 'feedbackPaper' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'contactByContactId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ContactItem' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EventByAuthorAccountIdAndSlugQuery,
  EventByAuthorAccountIdAndSlugQueryVariables
>
export const EventIsExistingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'eventIsExisting' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'authorAccountId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'eventIsExisting' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'authorAccountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'authorAccountId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'slug' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EventIsExistingQuery,
  EventIsExistingQueryVariables
>
export const AllEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'allEvents' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Cursor' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'authorAccountId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'allEvents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'after' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'condition' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'authorAccountId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'authorAccountId' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'START_DESC' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'EventItem' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasNextPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endCursor' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Event' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inviteeCountMaximum' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'isArchived' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isInPerson' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isRemote' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'visibility' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllEventsQuery, AllEventsQueryVariables>
export const AllInvitationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'allInvitations' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Cursor' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'eventId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'allInvitations' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'after' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'condition' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'eventId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'eventId' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'InvitationItem' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasNextPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endCursor' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ContactItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Contact' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountByAuthorAccountId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'authorAccountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailAddressHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InvitationItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Invitation' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contactId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'eventId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'feedback' } },
          { kind: 'Field', name: { kind: 'Name', value: 'feedbackPaper' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'contactByContactId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ContactItem' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllInvitationsQuery, AllInvitationsQueryVariables>
export const ProfilePictureByAccountIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'profilePictureByAccountId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profilePictureByAccountId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProfilePictureItem' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UploadItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Upload' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sizeByte' } },
          { kind: 'Field', name: { kind: 'Name', value: 'storageKey' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProfilePictureItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProfilePicture' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'uploadByUploadId' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UploadItem' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ProfilePictureByAccountIdQuery,
  ProfilePictureByAccountIdQueryVariables
>
export const AllUploadsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'allUploads' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Cursor' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'allUploads' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'after' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'condition' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'accountId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'accountId' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'UploadItem' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasNextPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endCursor' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UploadItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Upload' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'nodeId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sizeByte' } },
          { kind: 'Field', name: { kind: 'Name', value: 'storageKey' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllUploadsQuery, AllUploadsQueryVariables>

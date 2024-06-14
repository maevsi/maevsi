/* eslint-disable */
import * as types from './graphql'
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  fragment AccountItem on Account {\n    nodeId\n    id\n    username\n  }\n':
    types.AccountItemFragmentDoc,
  '\n  fragment AchievementItem on Achievement {\n    nodeId\n    id\n    accountId\n    achievement\n    level\n  }\n':
    types.AchievementItemFragmentDoc,
  '\n  fragment ContactItem on Contact {\n    nodeId\n    id\n    accountId\n    accountByAccountId {\n      id\n      username\n    }\n    accountByAuthorAccountId {\n      id\n      username\n    }\n    authorAccountId\n    address\n    emailAddress\n    emailAddressHash\n    firstName\n    lastName\n    phoneNumber\n    url\n  }\n':
    types.ContactItemFragmentDoc,
  '\n  fragment EventItem on Event {\n    id\n    nodeId\n    authorAccountId\n    accountByAuthorAccountId {\n      id\n      username\n    }\n    description\n    end\n    inviteeCountMaximum\n    isArchived\n    isInPerson\n    isRemote\n    location\n    name\n    slug\n    start\n    url\n    visibility\n  }\n':
    types.EventItemFragmentDoc,
  '\n  fragment InvitationItem on Invitation {\n    id\n    nodeId\n    contactId\n    eventId\n    feedback\n    feedbackPaper\n    contactByContactId {\n      ...ContactItem\n    }\n  }\n':
    types.InvitationItemFragmentDoc,
  '\n  fragment ProfilePictureItem on ProfilePicture {\n    id\n    nodeId\n    accountId\n    uploadByUploadId {\n      ...UploadItem\n    }\n  }\n':
    types.ProfilePictureItemFragmentDoc,
  '\n  fragment UploadItem on Upload {\n    id\n    nodeId\n    accountId\n    sizeByte\n    storageKey\n  }\n':
    types.UploadItemFragmentDoc,
  '\n  mutation authenticate($password: String!, $username: String!) {\n    authenticate(input: { password: $password, username: $username }) {\n      clientMutationId\n      jwt\n    }\n  }\n':
    types.AuthenticateDocument,
  '\n      mutation accountDelete($password: String!) {\n        accountDelete(input: { password: $password }) {\n          clientMutationId\n        }\n      }\n    ':
    types.AccountDeleteDocument,
  '\n      mutation accountEmailAddressVerification($code: UUID!) {\n        accountEmailAddressVerification(input: { code: $code }) {\n          clientMutationId\n        }\n      }\n    ':
    types.AccountEmailAddressVerificationDocument,
  '\n  mutation jwtRefresh($id: UUID!) {\n    jwtRefresh(input: { jwtId: $id }) {\n      clientMutationId\n      jwt\n    }\n  }\n':
    types.JwtRefreshDocument,
  '\n      mutation accountPasswordChange(\n        $passwordCurrent: String!\n        $passwordNew: String!\n      ) {\n        accountPasswordChange(\n          input: {\n            passwordCurrent: $passwordCurrent\n            passwordNew: $passwordNew\n          }\n        ) {\n          clientMutationId\n        }\n      }\n    ':
    types.AccountPasswordChangeDocument,
  '\n      mutation accountPasswordReset($code: UUID!, $password: String!) {\n        accountPasswordReset(input: { code: $code, password: $password }) {\n          clientMutationId\n        }\n      }\n    ':
    types.AccountPasswordResetDocument,
  '\n      mutation accountPasswordResetRequest(\n        $emailAddress: String!\n        $language: String!\n      ) {\n        accountPasswordResetRequest(\n          input: { emailAddress: $emailAddress, language: $language }\n        ) {\n          clientMutationId\n        }\n      }\n    ':
    types.AccountPasswordResetRequestDocument,
  '\n      mutation accountRegistration(\n        $emailAddress: String!\n        $password: String!\n        $username: String!\n        $language: String!\n      ) {\n        accountRegistration(\n          input: {\n            emailAddress: $emailAddress\n            password: $password\n            username: $username\n            language: $language\n          }\n        ) {\n          clientMutationId\n        }\n      }\n    ':
    types.AccountRegistrationDocument,
  '\n      mutation accountRegistrationRefresh(\n        $accountId: UUID!\n        $language: String!\n      ) {\n        accountRegistrationRefresh(\n          input: { language: $language, accountId: $accountId }\n        ) {\n          clientMutationId\n        }\n      }\n    ':
    types.AccountRegistrationRefreshDocument,
  '\n      mutation achievementUnlock($code: UUID!, $alias: String!) {\n        achievementUnlock(input: { code: $code, alias: $alias }) {\n          clientMutationId\n          uuid\n        }\n      }\n    ':
    types.AchievementUnlockDocument,
  '\n      mutation createContact($contactInput: ContactInput!) {\n        createContact(input: { contact: $contactInput }) {\n          contact {\n            ...ContactItem\n          }\n        }\n      }\n    ':
    types.CreateContactDocument,
  '\n      mutation deleteContactById($id: UUID!) {\n        deleteContactById(input: { id: $id }) {\n          clientMutationId\n          contact {\n            ...ContactItem\n          }\n        }\n      }\n    ':
    types.DeleteContactByIdDocument,
  '\n      mutation updateContactById($id: UUID!, $contactPatch: ContactPatch!) {\n        updateContactById(input: { id: $id, contactPatch: $contactPatch }) {\n          contact {\n            ...ContactItem\n          }\n        }\n      }\n    ':
    types.UpdateContactByIdDocument,
  '\n      mutation createEvent($createEventInput: CreateEventInput!) {\n        createEvent(input: $createEventInput) {\n          event {\n            ...EventItem\n          }\n        }\n      }\n    ':
    types.CreateEventDocument,
  '\n      mutation eventDelete($id: UUID!, $password: String!) {\n        eventDelete(input: { id: $id, password: $password }) {\n          clientMutationId\n          event {\n            ...EventItem\n          }\n        }\n      }\n    ':
    types.EventDeleteDocument,
  '\n  mutation eventUnlock($invitationId: UUID!) {\n    eventUnlock(input: { invitationId: $invitationId }) {\n      eventUnlockResponse {\n        authorAccountUsername\n        eventSlug\n        jwt\n      }\n    }\n  }\n':
    types.EventUnlockDocument,
  '\n      mutation updateEventById($id: UUID!, $eventPatch: EventPatch!) {\n        updateEventById(input: { id: $id, eventPatch: $eventPatch }) {\n          event {\n            ...EventItem\n          }\n        }\n      }\n    ':
    types.UpdateEventByIdDocument,
  '\n      mutation createInvitation($invitationInput: InvitationInput!) {\n        createInvitation(input: { invitation: $invitationInput }) {\n          invitation {\n            contactByContactId {\n              ...ContactItem\n            }\n            id\n          }\n        }\n      }\n    ':
    types.CreateInvitationDocument,
  '\n      mutation deleteInvitationById($id: UUID!) {\n        deleteInvitationById(input: { id: $id }) {\n          clientMutationId\n        }\n      }\n    ':
    types.DeleteInvitationByIdDocument,
  '\n      mutation updateInvitationById(\n        $id: UUID!\n        $invitationPatch: InvitationPatch!\n      ) {\n        updateInvitationById(\n          input: { id: $id, invitationPatch: $invitationPatch }\n        ) {\n          invitation {\n            ...InvitationItem\n            contactByContactId {\n              ...ContactItem\n            }\n          }\n        }\n      }\n    ':
    types.UpdateInvitationByIdDocument,
  '\n      mutation invite($invitationId: UUID!, $language: String!) {\n        invite(input: { invitationId: $invitationId, language: $language }) {\n          clientMutationId\n        }\n      }\n    ':
    types.InviteDocument,
  '\n      mutation profilePictureSet($uploadId: UUID!) {\n        profilePictureSet(input: { uploadId: $uploadId }) {\n          clientMutationId\n        }\n      }\n    ':
    types.ProfilePictureSetDocument,
  '\n      mutation uploadCreate($uploadCreateInput: UploadCreateInput!) {\n        uploadCreate(input: $uploadCreateInput) {\n          clientMutationId\n          upload {\n            id\n          }\n        }\n      }\n    ':
    types.UploadCreateDocument,
  '\n  query accountById($id: UUID!) {\n    accountById(id: $id) {\n      ...AccountItem\n    }\n  }\n':
    types.AccountByIdDocument,
  '\n  query accountByUsername($username: String!) {\n    accountByUsername(username: $username) {\n      ...AccountItem\n    }\n  }\n':
    types.AccountByUsernameDocument,
  '\n      query accountUploadQuotaBytes {\n        accountUploadQuotaBytes\n      }\n    ':
    types.AccountUploadQuotaBytesDocument,
  '\n      query allAchievements($accountId: UUID) {\n        allAchievements(condition: { accountId: $accountId }) {\n          nodes {\n            ...AchievementItem\n          }\n        }\n      }\n    ':
    types.AllAchievementsDocument,
  '\n      query allContacts($after: Cursor, $authorAccountId: UUID, $first: Int!) {\n        allContacts(\n          after: $after\n          condition: { authorAccountId: $authorAccountId }\n          first: $first\n          orderBy: [FIRST_NAME_ASC, LAST_NAME_ASC]\n        ) {\n          nodes {\n            ...ContactItem\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          totalCount\n        }\n      }\n    ':
    types.AllContactsDocument,
  '\n  query eventByAuthorAccountIdAndSlug(\n    $authorAccountId: UUID!\n    $slug: String!\n    $invitationId: UUID\n  ) {\n    eventByAuthorAccountIdAndSlug(\n      authorAccountId: $authorAccountId\n      slug: $slug\n    ) {\n      ...EventItem\n      invitationsByEventId(condition: { id: $invitationId }) {\n        nodes {\n          ...InvitationItem\n          contactByContactId {\n            ...ContactItem\n          }\n        }\n      }\n    }\n  }\n':
    types.EventByAuthorAccountIdAndSlugDocument,
  '\n  query eventIsExisting($authorAccountId: UUID!, $slug: String!) {\n    eventIsExisting(authorAccountId: $authorAccountId, slug: $slug)\n  }\n':
    types.EventIsExistingDocument,
  '\n      query allEvents($after: Cursor, $authorAccountId: UUID, $first: Int!) {\n        allEvents(\n          after: $after\n          condition: { authorAccountId: $authorAccountId }\n          first: $first\n          orderBy: START_DESC\n        ) {\n          nodes {\n            ...EventItem\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          totalCount\n        }\n      }\n    ':
    types.AllEventsDocument,
  '\n      query allInvitations($after: Cursor, $eventId: UUID!, $first: Int!) {\n        allInvitations(\n          after: $after\n          condition: { eventId: $eventId }\n          first: $first\n        ) {\n          nodes {\n            ...InvitationItem\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          totalCount\n        }\n      }\n    ':
    types.AllInvitationsDocument,
  '\n      query profilePictureByAccountId($accountId: UUID!) {\n        profilePictureByAccountId(accountId: $accountId) {\n          ...ProfilePictureItem\n        }\n      }\n    ':
    types.ProfilePictureByAccountIdDocument,
  '\n      query allUploads($after: Cursor, $first: Int!, $accountId: UUID) {\n        allUploads(\n          after: $after\n          condition: { accountId: $accountId }\n          first: $first\n        ) {\n          nodes {\n            ...UploadItem\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          totalCount\n        }\n      }\n    ':
    types.AllUploadsDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AccountItem on Account {\n    nodeId\n    id\n    username\n  }\n',
): (typeof documents)['\n  fragment AccountItem on Account {\n    nodeId\n    id\n    username\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AchievementItem on Achievement {\n    nodeId\n    id\n    accountId\n    achievement\n    level\n  }\n',
): (typeof documents)['\n  fragment AchievementItem on Achievement {\n    nodeId\n    id\n    accountId\n    achievement\n    level\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ContactItem on Contact {\n    nodeId\n    id\n    accountId\n    accountByAccountId {\n      id\n      username\n    }\n    accountByAuthorAccountId {\n      id\n      username\n    }\n    authorAccountId\n    address\n    emailAddress\n    emailAddressHash\n    firstName\n    lastName\n    phoneNumber\n    url\n  }\n',
): (typeof documents)['\n  fragment ContactItem on Contact {\n    nodeId\n    id\n    accountId\n    accountByAccountId {\n      id\n      username\n    }\n    accountByAuthorAccountId {\n      id\n      username\n    }\n    authorAccountId\n    address\n    emailAddress\n    emailAddressHash\n    firstName\n    lastName\n    phoneNumber\n    url\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment EventItem on Event {\n    id\n    nodeId\n    authorAccountId\n    accountByAuthorAccountId {\n      id\n      username\n    }\n    description\n    end\n    inviteeCountMaximum\n    isArchived\n    isInPerson\n    isRemote\n    location\n    name\n    slug\n    start\n    url\n    visibility\n  }\n',
): (typeof documents)['\n  fragment EventItem on Event {\n    id\n    nodeId\n    authorAccountId\n    accountByAuthorAccountId {\n      id\n      username\n    }\n    description\n    end\n    inviteeCountMaximum\n    isArchived\n    isInPerson\n    isRemote\n    location\n    name\n    slug\n    start\n    url\n    visibility\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment InvitationItem on Invitation {\n    id\n    nodeId\n    contactId\n    eventId\n    feedback\n    feedbackPaper\n    contactByContactId {\n      ...ContactItem\n    }\n  }\n',
): (typeof documents)['\n  fragment InvitationItem on Invitation {\n    id\n    nodeId\n    contactId\n    eventId\n    feedback\n    feedbackPaper\n    contactByContactId {\n      ...ContactItem\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ProfilePictureItem on ProfilePicture {\n    id\n    nodeId\n    accountId\n    uploadByUploadId {\n      ...UploadItem\n    }\n  }\n',
): (typeof documents)['\n  fragment ProfilePictureItem on ProfilePicture {\n    id\n    nodeId\n    accountId\n    uploadByUploadId {\n      ...UploadItem\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment UploadItem on Upload {\n    id\n    nodeId\n    accountId\n    sizeByte\n    storageKey\n  }\n',
): (typeof documents)['\n  fragment UploadItem on Upload {\n    id\n    nodeId\n    accountId\n    sizeByte\n    storageKey\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation authenticate($password: String!, $username: String!) {\n    authenticate(input: { password: $password, username: $username }) {\n      clientMutationId\n      jwt\n    }\n  }\n',
): (typeof documents)['\n  mutation authenticate($password: String!, $username: String!) {\n    authenticate(input: { password: $password, username: $username }) {\n      clientMutationId\n      jwt\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation accountDelete($password: String!) {\n        accountDelete(input: { password: $password }) {\n          clientMutationId\n        }\n      }\n    ',
): (typeof documents)['\n      mutation accountDelete($password: String!) {\n        accountDelete(input: { password: $password }) {\n          clientMutationId\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation accountEmailAddressVerification($code: UUID!) {\n        accountEmailAddressVerification(input: { code: $code }) {\n          clientMutationId\n        }\n      }\n    ',
): (typeof documents)['\n      mutation accountEmailAddressVerification($code: UUID!) {\n        accountEmailAddressVerification(input: { code: $code }) {\n          clientMutationId\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation jwtRefresh($id: UUID!) {\n    jwtRefresh(input: { jwtId: $id }) {\n      clientMutationId\n      jwt\n    }\n  }\n',
): (typeof documents)['\n  mutation jwtRefresh($id: UUID!) {\n    jwtRefresh(input: { jwtId: $id }) {\n      clientMutationId\n      jwt\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation accountPasswordChange(\n        $passwordCurrent: String!\n        $passwordNew: String!\n      ) {\n        accountPasswordChange(\n          input: {\n            passwordCurrent: $passwordCurrent\n            passwordNew: $passwordNew\n          }\n        ) {\n          clientMutationId\n        }\n      }\n    ',
): (typeof documents)['\n      mutation accountPasswordChange(\n        $passwordCurrent: String!\n        $passwordNew: String!\n      ) {\n        accountPasswordChange(\n          input: {\n            passwordCurrent: $passwordCurrent\n            passwordNew: $passwordNew\n          }\n        ) {\n          clientMutationId\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation accountPasswordReset($code: UUID!, $password: String!) {\n        accountPasswordReset(input: { code: $code, password: $password }) {\n          clientMutationId\n        }\n      }\n    ',
): (typeof documents)['\n      mutation accountPasswordReset($code: UUID!, $password: String!) {\n        accountPasswordReset(input: { code: $code, password: $password }) {\n          clientMutationId\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation accountPasswordResetRequest(\n        $emailAddress: String!\n        $language: String!\n      ) {\n        accountPasswordResetRequest(\n          input: { emailAddress: $emailAddress, language: $language }\n        ) {\n          clientMutationId\n        }\n      }\n    ',
): (typeof documents)['\n      mutation accountPasswordResetRequest(\n        $emailAddress: String!\n        $language: String!\n      ) {\n        accountPasswordResetRequest(\n          input: { emailAddress: $emailAddress, language: $language }\n        ) {\n          clientMutationId\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation accountRegistration(\n        $emailAddress: String!\n        $password: String!\n        $username: String!\n        $language: String!\n      ) {\n        accountRegistration(\n          input: {\n            emailAddress: $emailAddress\n            password: $password\n            username: $username\n            language: $language\n          }\n        ) {\n          clientMutationId\n        }\n      }\n    ',
): (typeof documents)['\n      mutation accountRegistration(\n        $emailAddress: String!\n        $password: String!\n        $username: String!\n        $language: String!\n      ) {\n        accountRegistration(\n          input: {\n            emailAddress: $emailAddress\n            password: $password\n            username: $username\n            language: $language\n          }\n        ) {\n          clientMutationId\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation accountRegistrationRefresh(\n        $accountId: UUID!\n        $language: String!\n      ) {\n        accountRegistrationRefresh(\n          input: { language: $language, accountId: $accountId }\n        ) {\n          clientMutationId\n        }\n      }\n    ',
): (typeof documents)['\n      mutation accountRegistrationRefresh(\n        $accountId: UUID!\n        $language: String!\n      ) {\n        accountRegistrationRefresh(\n          input: { language: $language, accountId: $accountId }\n        ) {\n          clientMutationId\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation achievementUnlock($code: UUID!, $alias: String!) {\n        achievementUnlock(input: { code: $code, alias: $alias }) {\n          clientMutationId\n          uuid\n        }\n      }\n    ',
): (typeof documents)['\n      mutation achievementUnlock($code: UUID!, $alias: String!) {\n        achievementUnlock(input: { code: $code, alias: $alias }) {\n          clientMutationId\n          uuid\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation createContact($contactInput: ContactInput!) {\n        createContact(input: { contact: $contactInput }) {\n          contact {\n            ...ContactItem\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      mutation createContact($contactInput: ContactInput!) {\n        createContact(input: { contact: $contactInput }) {\n          contact {\n            ...ContactItem\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation deleteContactById($id: UUID!) {\n        deleteContactById(input: { id: $id }) {\n          clientMutationId\n          contact {\n            ...ContactItem\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      mutation deleteContactById($id: UUID!) {\n        deleteContactById(input: { id: $id }) {\n          clientMutationId\n          contact {\n            ...ContactItem\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation updateContactById($id: UUID!, $contactPatch: ContactPatch!) {\n        updateContactById(input: { id: $id, contactPatch: $contactPatch }) {\n          contact {\n            ...ContactItem\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      mutation updateContactById($id: UUID!, $contactPatch: ContactPatch!) {\n        updateContactById(input: { id: $id, contactPatch: $contactPatch }) {\n          contact {\n            ...ContactItem\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation createEvent($createEventInput: CreateEventInput!) {\n        createEvent(input: $createEventInput) {\n          event {\n            ...EventItem\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      mutation createEvent($createEventInput: CreateEventInput!) {\n        createEvent(input: $createEventInput) {\n          event {\n            ...EventItem\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation eventDelete($id: UUID!, $password: String!) {\n        eventDelete(input: { id: $id, password: $password }) {\n          clientMutationId\n          event {\n            ...EventItem\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      mutation eventDelete($id: UUID!, $password: String!) {\n        eventDelete(input: { id: $id, password: $password }) {\n          clientMutationId\n          event {\n            ...EventItem\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation eventUnlock($invitationId: UUID!) {\n    eventUnlock(input: { invitationId: $invitationId }) {\n      eventUnlockResponse {\n        authorAccountUsername\n        eventSlug\n        jwt\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation eventUnlock($invitationId: UUID!) {\n    eventUnlock(input: { invitationId: $invitationId }) {\n      eventUnlockResponse {\n        authorAccountUsername\n        eventSlug\n        jwt\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation updateEventById($id: UUID!, $eventPatch: EventPatch!) {\n        updateEventById(input: { id: $id, eventPatch: $eventPatch }) {\n          event {\n            ...EventItem\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      mutation updateEventById($id: UUID!, $eventPatch: EventPatch!) {\n        updateEventById(input: { id: $id, eventPatch: $eventPatch }) {\n          event {\n            ...EventItem\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation createInvitation($invitationInput: InvitationInput!) {\n        createInvitation(input: { invitation: $invitationInput }) {\n          invitation {\n            contactByContactId {\n              ...ContactItem\n            }\n            id\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      mutation createInvitation($invitationInput: InvitationInput!) {\n        createInvitation(input: { invitation: $invitationInput }) {\n          invitation {\n            contactByContactId {\n              ...ContactItem\n            }\n            id\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation deleteInvitationById($id: UUID!) {\n        deleteInvitationById(input: { id: $id }) {\n          clientMutationId\n        }\n      }\n    ',
): (typeof documents)['\n      mutation deleteInvitationById($id: UUID!) {\n        deleteInvitationById(input: { id: $id }) {\n          clientMutationId\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation updateInvitationById(\n        $id: UUID!\n        $invitationPatch: InvitationPatch!\n      ) {\n        updateInvitationById(\n          input: { id: $id, invitationPatch: $invitationPatch }\n        ) {\n          invitation {\n            ...InvitationItem\n            contactByContactId {\n              ...ContactItem\n            }\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      mutation updateInvitationById(\n        $id: UUID!\n        $invitationPatch: InvitationPatch!\n      ) {\n        updateInvitationById(\n          input: { id: $id, invitationPatch: $invitationPatch }\n        ) {\n          invitation {\n            ...InvitationItem\n            contactByContactId {\n              ...ContactItem\n            }\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation invite($invitationId: UUID!, $language: String!) {\n        invite(input: { invitationId: $invitationId, language: $language }) {\n          clientMutationId\n        }\n      }\n    ',
): (typeof documents)['\n      mutation invite($invitationId: UUID!, $language: String!) {\n        invite(input: { invitationId: $invitationId, language: $language }) {\n          clientMutationId\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation profilePictureSet($uploadId: UUID!) {\n        profilePictureSet(input: { uploadId: $uploadId }) {\n          clientMutationId\n        }\n      }\n    ',
): (typeof documents)['\n      mutation profilePictureSet($uploadId: UUID!) {\n        profilePictureSet(input: { uploadId: $uploadId }) {\n          clientMutationId\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation uploadCreate($uploadCreateInput: UploadCreateInput!) {\n        uploadCreate(input: $uploadCreateInput) {\n          clientMutationId\n          upload {\n            id\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      mutation uploadCreate($uploadCreateInput: UploadCreateInput!) {\n        uploadCreate(input: $uploadCreateInput) {\n          clientMutationId\n          upload {\n            id\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query accountById($id: UUID!) {\n    accountById(id: $id) {\n      ...AccountItem\n    }\n  }\n',
): (typeof documents)['\n  query accountById($id: UUID!) {\n    accountById(id: $id) {\n      ...AccountItem\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query accountByUsername($username: String!) {\n    accountByUsername(username: $username) {\n      ...AccountItem\n    }\n  }\n',
): (typeof documents)['\n  query accountByUsername($username: String!) {\n    accountByUsername(username: $username) {\n      ...AccountItem\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query accountUploadQuotaBytes {\n        accountUploadQuotaBytes\n      }\n    ',
): (typeof documents)['\n      query accountUploadQuotaBytes {\n        accountUploadQuotaBytes\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query allAchievements($accountId: UUID) {\n        allAchievements(condition: { accountId: $accountId }) {\n          nodes {\n            ...AchievementItem\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      query allAchievements($accountId: UUID) {\n        allAchievements(condition: { accountId: $accountId }) {\n          nodes {\n            ...AchievementItem\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query allContacts($after: Cursor, $authorAccountId: UUID, $first: Int!) {\n        allContacts(\n          after: $after\n          condition: { authorAccountId: $authorAccountId }\n          first: $first\n          orderBy: [FIRST_NAME_ASC, LAST_NAME_ASC]\n        ) {\n          nodes {\n            ...ContactItem\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          totalCount\n        }\n      }\n    ',
): (typeof documents)['\n      query allContacts($after: Cursor, $authorAccountId: UUID, $first: Int!) {\n        allContacts(\n          after: $after\n          condition: { authorAccountId: $authorAccountId }\n          first: $first\n          orderBy: [FIRST_NAME_ASC, LAST_NAME_ASC]\n        ) {\n          nodes {\n            ...ContactItem\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          totalCount\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query eventByAuthorAccountIdAndSlug(\n    $authorAccountId: UUID!\n    $slug: String!\n    $invitationId: UUID\n  ) {\n    eventByAuthorAccountIdAndSlug(\n      authorAccountId: $authorAccountId\n      slug: $slug\n    ) {\n      ...EventItem\n      invitationsByEventId(condition: { id: $invitationId }) {\n        nodes {\n          ...InvitationItem\n          contactByContactId {\n            ...ContactItem\n          }\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query eventByAuthorAccountIdAndSlug(\n    $authorAccountId: UUID!\n    $slug: String!\n    $invitationId: UUID\n  ) {\n    eventByAuthorAccountIdAndSlug(\n      authorAccountId: $authorAccountId\n      slug: $slug\n    ) {\n      ...EventItem\n      invitationsByEventId(condition: { id: $invitationId }) {\n        nodes {\n          ...InvitationItem\n          contactByContactId {\n            ...ContactItem\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query eventIsExisting($authorAccountId: UUID!, $slug: String!) {\n    eventIsExisting(authorAccountId: $authorAccountId, slug: $slug)\n  }\n',
): (typeof documents)['\n  query eventIsExisting($authorAccountId: UUID!, $slug: String!) {\n    eventIsExisting(authorAccountId: $authorAccountId, slug: $slug)\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query allEvents($after: Cursor, $authorAccountId: UUID, $first: Int!) {\n        allEvents(\n          after: $after\n          condition: { authorAccountId: $authorAccountId }\n          first: $first\n          orderBy: START_DESC\n        ) {\n          nodes {\n            ...EventItem\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          totalCount\n        }\n      }\n    ',
): (typeof documents)['\n      query allEvents($after: Cursor, $authorAccountId: UUID, $first: Int!) {\n        allEvents(\n          after: $after\n          condition: { authorAccountId: $authorAccountId }\n          first: $first\n          orderBy: START_DESC\n        ) {\n          nodes {\n            ...EventItem\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          totalCount\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query allInvitations($after: Cursor, $eventId: UUID!, $first: Int!) {\n        allInvitations(\n          after: $after\n          condition: { eventId: $eventId }\n          first: $first\n        ) {\n          nodes {\n            ...InvitationItem\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          totalCount\n        }\n      }\n    ',
): (typeof documents)['\n      query allInvitations($after: Cursor, $eventId: UUID!, $first: Int!) {\n        allInvitations(\n          after: $after\n          condition: { eventId: $eventId }\n          first: $first\n        ) {\n          nodes {\n            ...InvitationItem\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          totalCount\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query profilePictureByAccountId($accountId: UUID!) {\n        profilePictureByAccountId(accountId: $accountId) {\n          ...ProfilePictureItem\n        }\n      }\n    ',
): (typeof documents)['\n      query profilePictureByAccountId($accountId: UUID!) {\n        profilePictureByAccountId(accountId: $accountId) {\n          ...ProfilePictureItem\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query allUploads($after: Cursor, $first: Int!, $accountId: UUID) {\n        allUploads(\n          after: $after\n          condition: { accountId: $accountId }\n          first: $first\n        ) {\n          nodes {\n            ...UploadItem\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          totalCount\n        }\n      }\n    ',
): (typeof documents)['\n      query allUploads($after: Cursor, $first: Int!, $accountId: UUID) {\n        allUploads(\n          after: $after\n          condition: { accountId: $accountId }\n          first: $first\n        ) {\n          nodes {\n            ...UploadItem\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          totalCount\n        }\n      }\n    ']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never

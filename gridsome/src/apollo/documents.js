const gql = require('graphql-tag')

module.exports = {
  ACCOUNT_PASSWORD_CHANGE: gql`
    mutation ($passwordCurrent: String!, $passwordNew: String!) {
      accountPasswordChange (input: {passwordCurrent: $passwordCurrent, passwordNew: $passwordNew}) {
        clientMutationId
      }
    }
  `,
  ACCOUNT_REGISTER_MUTATION: gql`
    mutation ($username: String!, $password: String!, $emailAddress: String!) {
      accountRegister(input: {username: $username, password: $password, emailAddress: $emailAddress}) {
        jwt
      }
    }
  `,
  ALL_EVENTS_QUERY: gql`
    query ($username: String, $limit: Int!, $cursor: Cursor) {
      allEvents (condition: {organizerUsername: $username}, first: $limit, after: $cursor) {
        nodes {
          name
          slug
          visibility
          organizerUsername
          description
          place
          start
          end
          archived
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,
  ALL_PROFILE_PICTURES: gql`
    query allProfilePictures($username: String!) {
      allProfilePictures(condition: {username: $username}) {
        nodes {
          uploadStorageKey
        }
      }
    }
  `,
  ALL_UPLOADS: gql`
    query ($username: String, $limit: Int!, $cursor: Cursor) {
      allUploads (condition: {username: $username}, first: $limit, after: $cursor) {
        nodes {
          id
          storageKey
          sizeByte
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,
  AUTHENTICATE_MUTATION: gql`
    mutation ($username: String!, $password: String!) {
      authenticate(input: {username: $username, password: $password}) {
        jwt
      }
    }
  `,
  EVENT_CONTACT_FEEDBACK_DATA_QUERY: gql`
    query ($organizerUsername: String!, $slug: String!) {
      eventContactFeedbackData(
        _organizerUsername: $organizerUsername
        _slug: $slug
      ) {
        event {
          id
          name
          slug
          visibility
          organizerUsername
          description
          place
          start
          end
          archived
        }
        contact {
          id
          firstName
          lastName
          address
          emailAddress
        }
        invitationFeedbackData {
          id
          invitationFeedback
          paperInvitationFeedback
        }
      }
    }
  `,
  JWT_REFRESH_MUTATION: gql`
    mutation ($id: UUID!) {
      jwtRefresh(input: {jwtId: $id}) {
        jwt
      }
    }
  `,
  PROFILE_PICTURE_SET: gql`
    mutation ($storageKey: String!) {
      profilePictureSet(input: {_storageKey: $storageKey}) {
        clientMutationId
      }
    }
  `,
  REDEEM_MUTATION: gql`
    mutation ($uuid: UUID!) {
      redeem(input: {invitationCode: $uuid}) {
        redeemResponse {
          organizerUsername
          eventSlug
          jwt
        }
      }
    }
  `,
  UPDATE_INVITATION_FEEDBACK_DATUM_BY_ID_MUTATION: gql`
    mutation (
      $id: Int!
      $invitationFeedbackDatumPatch: InvitationFeedbackDatumPatch!
    ) {
      updateInvitationFeedbackDatumById(
        input: {
          id: $id
          invitationFeedbackDatumPatch: $invitationFeedbackDatumPatch
        }
      ) {
        invitationFeedbackDatum {
          id
          invitationFeedback
          paperInvitationFeedback
        }
      }
    }
  `,
  UPLOAD_CREATE_MUTATION: gql`
    mutation ($uploadCreateInput: UploadCreateInput!) {
      uploadCreate(input: $uploadCreateInput) {
        uuid
      }
    }
  `
}

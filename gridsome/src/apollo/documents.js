const gql = require('graphql-tag')

module.exports = {
  EVENT_CONTACT_FEEDBACK_DATA_QUERY: gql`
    query($organizerUsername: String!, $slug: String!) {
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
  `
}

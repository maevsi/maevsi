import { useMutation } from '@urql/vue'
import { graphql } from '~~/gql/generated'

export const useCreateContactMutation = () =>
  useMutation(
    graphql(`
      mutation createContact($contactInput: ContactInput!) {
        createContact(input: { contact: $contactInput }) {
          contact {
            ...ContactItem
          }
        }
      }
    `),
  )

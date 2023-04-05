import { ContactItemFragment } from '~/gql/generated/graphql'

export function getContactName(
  contact: Pick<
    ContactItemFragment,
    'accountUsername' | 'firstName' | 'lastName'
  >,
  isUsernamePreferred = false
) {
  let name

  if (contact.accountUsername) {
    name = contact.accountUsername

    if (isUsernamePreferred) return name
  }

  if (contact.firstName) {
    name = contact.firstName
  }

  if (contact.lastName) {
    name += ' ' + contact.lastName
  }

  return name
}

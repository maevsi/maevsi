import type { ContactItemFragment } from '~~/gql/generated/graphql'

export const getContactName = (
  contact: Pick<ContactItemFragment, 'accountId' | 'firstName' | 'lastName'>,
  isUsernamePreferred = false,
) => {
  let name

  // TODO: use username (if it makes sense)
  if (contact.accountId) {
    name = contact.accountId

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

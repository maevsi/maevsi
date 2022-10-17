import { Contact } from '~/types/contact'

export function getContactName(
  contact: Contact,
  isUsernamePreferred = false
): string | undefined {
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

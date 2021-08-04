export interface Contact {
  nodeId: string

  authorAccountUsername: string
  accountUsername?: string
  firstName?: string
  lastName?: string

  emailAddress?: string
  emailAddressHash?: string

  address?: string
  phoneNumber?: string
  url?: string
}

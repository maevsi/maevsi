export type Visibility = 'PUBLIC' | 'PRIVATE'

export interface Event {
  id: string
  name: string
  description?: string
  authorUsername: string
  slug?: string

  isArchived: boolean
  visibility: Visibility

  location: string
  url?: string

  isInPerson: boolean
  isRemote: boolean

  start: string
  end: string
}

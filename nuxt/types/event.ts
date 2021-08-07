export type Visibility = 'PUBLIC' | 'PRIVATE'

export interface Event {
  name: string
  description?: string
  authorUsername: string

  isArchived: boolean
  visibility: Visibility

  location: string
  url?: string

  isInPerson: boolean
  isRemote: boolean

  start: string
  end: string
}

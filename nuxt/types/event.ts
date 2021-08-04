export type Visibility = 'PUBLIC' | 'PRIVATE'

export interface Event {
  isArchived: boolean
  visibility: Visibility

  location: string
  url?: string

  isInPerson: boolean
  isRemote: boolean

  start: number
  end: number
}

import { Invitation } from './invitation'

export type Visibility = 'PUBLIC' | 'PRIVATE'

export class Event {
  authorUsername: string
  description?: string | null
  end?: Date | null
  id: string
  invitationsByEventId?: { nodes: Invitation[] }
  inviteeCountMaximum?: number | null
  isArchived: boolean
  isInPerson?: boolean | null
  isRemote?: boolean | null
  location?: string | null
  name: string
  slug?: string
  start: Date
  url?: string | null
  visibility: Visibility

  constructor(
    id: string,
    authorUsername: string,
    end: Date,
    invitationsByEventId: { nodes: Invitation[] },
    inviteeCountMaximum: number,
    isArchived: boolean,
    isInPerson: boolean,
    isRemote: boolean,
    location: string,
    name: string,
    start: Date,
    visibility: Visibility
  ) {
    this.id = id
    this.authorUsername = authorUsername
    this.end = end
    this.invitationsByEventId = invitationsByEventId
    this.inviteeCountMaximum = inviteeCountMaximum
    this.isArchived = isArchived
    this.isInPerson = isInPerson
    this.isRemote = isRemote
    this.location = location
    this.name = name
    this.start = start
    this.visibility = visibility
  }
}

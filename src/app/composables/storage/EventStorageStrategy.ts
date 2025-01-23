import type { EventVisibility } from '~~/gql/generated/graphql'

export interface EventStorageStrategy {
  saveEvent(form: EventFormData): Promise<void>
}

export interface EventFormData {
  name: string
  slug: string
  isInPerson: boolean
  isRemote: boolean
  format: string
  category: string
  id: string
  authorAccountId: string
  description: string
  end: string
  inviteeCountMaximum: string
  location: string
  start: string
  url: string
  visibility: EventVisibility | null
  street: string
  houseNumber: string
  additionalStreet: string
  postcode: string
  city: string
  country: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  isRecurring: boolean
  frequency: string
  recurringEndDate: string
  address: string
  website: string
  images: File[]
  coverImage: File | null
  previewUrls: string[]
}

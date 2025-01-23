import type {
  EventItemFragment,
  EventVisibility,
} from '~~/gql/generated/graphql'

import type { EventFormData } from './EventStorageStrategy'

export type DraftEvent = Pick<
  EventItemFragment,
  | 'name'
  | 'accountByAuthorAccountId'
  | 'start'
  | 'visibility'
  | 'slug'
  | 'end'
  | 'description'
  | 'id'
> & {
  isDraft: boolean
  savedAt: Date
}

export class LocalStorageStrategy {
  private readonly STORAGE_KEY = 'event-drafts'

  //use single instance through out
  private static instance: LocalStorageStrategy | null = null

  private constructor(private store: ReturnType<typeof useMaevsiStore>) {}

  static getInstance(): LocalStorageStrategy {
    if (!this.instance) {
      const store = useMaevsiStore()
      if (!store) {
        throw new Error('Pinia store is not available.')
      }
      this.instance = new LocalStorageStrategy(store)
    }
    return this.instance
  }

  async saveEvent(form: EventFormData): Promise<void> {
    if (!this.store.signedInAccountId) throw new Error('Account id is missing!')
    if (!this.store.signedInUsername) throw new Error('Username is missing!')

    const drafts = this.getDrafts()
    const draftEvent: DraftEvent = {
      id: crypto.randomUUID(),
      name: form.name,
      accountByAuthorAccountId: {
        id: this.store.signedInAccountId,
        username: this.store.signedInUsername,
      },
      start: `${form.startDate}T${form.startTime}:00.000Z`,
      end: `${form.endDate}T${form.endTime}:00.000Z`,
      visibility: form.visibility as EventVisibility,
      slug: form.slug,
      description: form.description,
      isDraft: true,
      savedAt: new Date(),
    }

    drafts.push(draftEvent)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(drafts))
  }

  async getEvent(id: string): Promise<DraftEvent | null> {
    const drafts = this.getDrafts()
    return drafts.find((draft) => draft.slug === id) || null
  }

  async getAllEvents(): Promise<DraftEvent[]> {
    return this.getDrafts()
  }

  private getDrafts(): DraftEvent[] {
    const drafts = localStorage.getItem(this.STORAGE_KEY)
    if (!drafts) return []

    type StoredDraft = Omit<DraftEvent, 'savedAt'> & { savedAt: string }
    const parsed = JSON.parse(drafts) as StoredDraft[]

    return parsed.map((draft) => ({
      ...draft,
      savedAt: new Date(draft.savedAt),
    }))
  }
}

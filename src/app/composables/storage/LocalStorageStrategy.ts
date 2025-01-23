import type {
  EventItemFragment,
  EventVisibility,
} from '~~/gql/generated/graphql'
import type { EventFormData } from './EventStorageStrategy'

interface StoredDraft {
  id: string
  name: string
  authorId: string
  start: string
  end: string
  visibility: EventVisibility
  slug: string
  description: string
  isDraft: boolean
  savedAt: string
}

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
  private static instance: LocalStorageStrategy | null = null

  private constructor(private store: ReturnType<typeof useMaevsiStore>) {}

  static getInstance(): LocalStorageStrategy {
    if (!this.instance) {
      const store = useMaevsiStore()
      if (!store) throw new Error('Pinia store is not available.')
      this.instance = new LocalStorageStrategy(store)
    }
    return this.instance
  }

  async saveEvent(form: EventFormData): Promise<void> {
    if (!this.store.signedInAccountId) throw new Error('Account id is missing!')
    if (!this.store.signedInUsername) throw new Error('Username is missing!')

    const drafts = this.getDrafts()
    const storedDraft: StoredDraft = {
      id: crypto.randomUUID(),
      name: form.name,
      authorId: this.store.signedInAccountId,
      start: `${form.startDate}T${form.startTime}:00.000Z`,
      end: `${form.endDate}T${form.endTime}:00.000Z`,
      visibility: form.visibility as EventVisibility,
      slug: form.slug,
      description: form.description,
      isDraft: true,
      savedAt: new Date().toISOString(),
    }

    drafts.push(storedDraft)
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

    const parsed = JSON.parse(drafts) as StoredDraft[]

    return parsed
      .filter((draft) => draft.authorId === this.store.signedInAccountId)
      .map((draft) => ({
        ...draft,
        accountByAuthorAccountId: {
          id: this.store.signedInAccountId,
          username: this.store.signedInUsername,
        },
        savedAt: new Date(draft.savedAt),
      }))
  }
}

import type {
  EventItemFragment,
  EventVisibility,
} from '~~/gql/generated/graphql'
import type { EventFormData } from './EventStorageStrategy'
import dayjs from 'dayjs'

export type EventOrDraft = EventItemFragment | DraftEvent | null
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
  isArchived: boolean
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
  isArchived: boolean
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

    if (!form.startDate || !form.startTime) {
      throw new Error('Start date or time is missing or invalid')
    }
    if (!form.endDate || !form.endTime) {
      throw new Error('End date or time is missing or invalid')
    }

    const startDateTime = dayjs(
      `${form.startDate.split('T')[0]}T${form.startTime}:00`,
    )
    const endDateTime = dayjs(
      `${form.endDate.split('T')[0]}T${form.endTime}:00`,
    )

    if (!startDateTime.isValid()) {
      throw new Error('Invalid start date or time')
    }
    if (!endDateTime.isValid()) {
      throw new Error('Invalid end date or time')
    }

    const storedDraft: StoredDraft = {
      id: crypto.randomUUID(),
      name: form.name,
      authorId: this.store.signedInAccountId,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      visibility: form.visibility as EventVisibility,
      slug: form.slug,
      description: form.description,
      isDraft: true,
      savedAt: new Date().toISOString(),
      isArchived: false,
    }

    const currentDrafts = this.getDrafts()
    const draftsToStore = [
      ...currentDrafts,
      this.transformStoredToDraftEvent(storedDraft),
    ]

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(
        draftsToStore.map((draft) => ({
          ...draft,
          savedAt: draft.savedAt.toISOString(),
          accountByAuthorAccountId: undefined,
          authorId:
            draft.accountByAuthorAccountId?.id || this.store.signedInAccountId!,
        })),
      ),
    )
  }

  private transformStoredToDraftEvent(stored: StoredDraft): DraftEvent {
    return {
      id: stored.id,
      name: stored.name,
      start: stored.start,
      end: stored.end,
      visibility: stored.visibility,
      slug: stored.slug,
      description: stored.description,
      isDraft: true,
      savedAt: new Date(stored.savedAt),
      isArchived: stored.isArchived,
      accountByAuthorAccountId: {
        id: stored.authorId,
        username: this.store.signedInUsername!,
      },
    }
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
        id: draft.id,
        name: draft.name,
        start: draft.start,
        end: draft.end,
        visibility: draft.visibility,
        slug: draft.slug,
        description: draft.description,
        isDraft: true,
        savedAt: new Date(draft.savedAt),
        isArchived: draft.isArchived,
        accountByAuthorAccountId: {
          id: draft.authorId,
          username: this.store.signedInUsername!,
        },
      }))
  }

  getEventByAuthorAndSlug(
    authorAccountId: string,
    slug: string,
  ): DraftEvent | null {
    if (!authorAccountId || !slug) return null

    const drafts = this.getDrafts()
    const draft = drafts.find(
      (draft) =>
        draft.accountByAuthorAccountId?.id === authorAccountId &&
        draft.slug === slug,
    )

    return draft ?? null
  }

  deleteEventByAuthorAndSlug(authorAccountId: string, slug: string): boolean {
    const drafts = this.getDrafts()

    const index = drafts.findIndex(
      (draft) =>
        draft.accountByAuthorAccountId?.id === authorAccountId &&
        draft.slug === slug,
    )

    if (index !== -1) {
      drafts.splice(index, 1)

      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(
          drafts.map((draft) => ({
            ...draft,
            savedAt: draft.savedAt.toISOString(),
            accountByAuthorAccountId: undefined,
            authorId:
              draft.accountByAuthorAccountId?.id ||
              this.store.signedInAccountId!,
          })),
        ),
      )
      return true
    } else {
      return false
    }
  }
}

<template>
  <Loader
    v-if="($apollo.loading && !event) || graphqlError"
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
  />
  <div v-else>
    <div v-if="event" class="flex flex-col gap-4">
      <Breadcrumbs
        :prefixes="[
          { name: $t('events'), to: '../../..', append: true },
          { name: $route.params.username, to: '../..', append: true },
          { name: $route.params.event_name, to: '..', append: true },
        ]"
      >
        {{ $t('settings') }}
      </Breadcrumbs>
      <h1>{{ $t('title') }}</h1>
      <section>
        <h2>{{ $t('titleEdit') }}</h2>
        <FormEvent :event="event" />
      </section>
      <section>
        <h2>{{ $t('titleDelete') }}</h2>
        <FormDelete
          id="deleteEvent"
          :errors="$util.getGqlErrorMessages(graphqlErrorDelete, this)"
          :item-name="$t('event')"
          :mutation="mutation"
          :variables="{
            id: event.id,
          }"
          @error="onDeleteError"
          @success="onDeleteSuccess"
        />
      </section>
    </div>
    <Error v-else />
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'
import consola from 'consola'

import { defineComponent } from '#app'

import EVENT_BY_ORGANIZER_USERNAME_AND_SLUG from '~/gql/query/event/eventByAuthorUsernameAndSlug.gql'
import EVENT_DELETE_MUTATION from '~/gql/mutation/event/eventDelete.gql'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import { Event as MaevsiEvent } from '~/types/event'

export default defineComponent({
  name: 'IndexPage',
  apollo: {
    event(): any {
      return {
        query: EVENT_BY_ORGANIZER_USERNAME_AND_SLUG,
        variables: {
          authorUsername: this.$route.params.username,
          slug: this.$route.params.event_name,
        },
        update: (data: any) => data.eventByAuthorUsernameAndSlug,
        error(error: any, _vm: any, _key: any, _type: any, _options: any) {
          this.graphqlError = error
          consola.error(error)
        },
      }
    },
  },
  middleware({ error, res, params, store }: Context) {
    if (res && params.username !== store.getters.signedInUsername) {
      return error({ statusCode: 403 })
    }
  },
  async validate({ app, params }): Promise<boolean> {
    const {
      data: { eventIsExisting },
    } = await app.apolloProvider!.defaultClient.query({
      query: EVENT_IS_EXISTING_QUERY,
      variables: {
        slug: params.event_name,
        authorUsername: params.username,
      },
      fetchPolicy: 'network-only',
    })

    return eventIsExisting
  },
  transition: {
    name: 'layout',
  },
  data() {
    return {
      event: undefined as MaevsiEvent | undefined,
      graphqlError: undefined as Error | undefined,
      graphqlErrorDelete: undefined as Error | undefined,
      mutation: EVENT_DELETE_MUTATION,
    }
  },
  head() {
    const title = this.title as string
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            this.$router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: title,
        },
      ],
      title,
    }
  },
  computed: {
    title(): string | undefined {
      if (
        this.$route.params.username === this.$store.getters.signedInUsername &&
        this.event
      ) {
        return `${this.$t('title')} · ${this.event.name}`
      }
      return '403'
    },
  },
  methods: {
    onDeleteError(error: Error) {
      this.graphqlErrorDelete = error
    },
    onDeleteSuccess() {
      this.$router.push(this.localePath(`/event`))
      this.$apollo.queries.allEvents.refetch()
    },
  },
})
</script>

<i18n lang="yml">
de:
  event: Veranstaltung
  events: Veranstaltung
  postgres28P01: Passwort falsch! Überprüfe, ob du alles richtig geschrieben hast.
  postgresP0002: Die Veranstaltung wurde nicht gefunden!
  settings: Einstellungen
  title: Einstellungen
  titleDelete: Veranstaltung löschen
  titleEdit: Veranstaltung bearbeiten
en:
  event: event
  events: events
  postgres28P01: Password incorrect! Check that you have written everything correctly.
  postgresP0002: The event was not found!
  settings: settings
  title: Settings
  titleDelete: Delete event
  titleEdit: Edit event
</i18n>

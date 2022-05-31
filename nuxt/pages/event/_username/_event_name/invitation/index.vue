<template>
  <Loader
    v-if="($apollo.loading && !event) || graphqlError"
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
  />
  <div v-else>
    <div v-if="event">
      <!-- TODO: breadcrumbs -->
      <h1 class="text-center">
        {{ title }}
      </h1>
      <section>
        <h2>{{ $t('invitations') }}</h2>
        <InvitationList :event="event" />
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
    })

    return eventIsExisting
  },
  data() {
    return {
      event: undefined as MaevsiEvent | undefined,
      graphqlError: undefined as Error | undefined,
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
        this.$route.params.username === this.$store.getters.signedInUsername
      ) {
        return `${this.$t('invitations')} · ${this.event?.name}`
      }
      return '403'
    },
  },
})
</script>

<i18n lang="yml">
de:
  event: Veranstaltung
  invitations: Einladungen
en:
  event: event
  invitations: Invitations
</i18n>

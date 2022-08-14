<template>
  <Loader :api="api">
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
          :errors="api.errors"
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
  </Loader>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'
import { CombinedError } from '@urql/vue'
import consola from 'consola'
import { useI18n } from 'vue-i18n-composable'

import {
  computed,
  defineComponent,
  reactive,
  useNuxtApp,
  useRoute,
  watch,
} from '#app'

import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import { getApiMeta } from '~/plugins/util/util'
import {
  useEventByAuthorUsernameAndSlugQuery,
  useEventDeleteMutation,
} from '~/gql/generated'

export default defineComponent({
  name: 'IndexPage',
  middleware({ error, res, params, store }: Context) {
    if (res && params.username !== store.getters.signedInUsername) {
      return error({ statusCode: 403 })
    }
  },
  async validate({ app, params }): Promise<boolean> {
    const {
      data: { eventIsExisting },
    } = await app.$urql.value
      .query(EVENT_IS_EXISTING_QUERY, {
        slug: params.event_name,
        authorUsername: params.username,
      })
      .toPromise()

    return eventIsExisting
  },
  transition: {
    name: 'layout',
  },
  setup() {
    const { $router, $store, localePath } = useNuxtApp()
    const { t } = useI18n()
    const route = useRoute()
    const { executeMutation: executeMutationEventDelete } =
      useEventDeleteMutation()

    const eventQuery = useEventByAuthorUsernameAndSlugQuery({
      variables: {
        authorUsername: route.params.username,
        slug: route.params.event_name,
      },
    })
    const apiData = {
      api: computed(() => {
        return {
          data: {
            ...eventQuery.data.value,
          },
          ...getApiMeta([eventQuery]),
        }
      }),
      event: computed(
        () => eventQuery.data.value?.eventByAuthorUsernameAndSlug
      ),
    }
    const data = reactive({
      mutation: executeMutationEventDelete,
    })
    const methods = {
      onDeleteError(error: CombinedError) {
        apiData.api.value.errors.push(error)
      },
      onDeleteSuccess() {
        $router.push(localePath(`/event`))
        // TODO: cache update (allEvents)
      },
    }
    const computations = {
      title: computed((): string | undefined => {
        if (
          route.params.username === $store.getters.signedInUsername &&
          apiData.event.value
        ) {
          return `${t('title')} · ${apiData.event.value.name}`
        }
        return '403'
      }),
    }

    watch(eventQuery.error, (currentValue, _oldValue) => {
      if (currentValue) consola.error(currentValue)
    })

    return {
      ...apiData,
      ...data,
      ...methods,
      ...computations,
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

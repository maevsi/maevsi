<template>
  <Loader :api="api">
    <div v-if="event" class="flex flex-col gap-4">
      <Breadcrumbs
        :prefixes="[
          { name: t('events'), to: '../../..', append: true },
          { name: routeParamUsername, to: '../..', append: true },
          { name: routeParamEventName, to: '..', append: true },
        ]"
      >
        {{ t('settings') }}
      </Breadcrumbs>
      <section>
        <h1>{{ t('title') }}</h1>
        <FormEvent :event="event" />
      </section>
      <section>
        <h2>{{ t('titleDelete') }}</h2>
        <FormDelete
          id="deleteEvent"
          :errors="api.errors"
          :item-name="t('event')"
          :mutation="mutation"
          :variables="{
            authorUsername: routeParamUsername,
            slug: routeParamEventName,
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
import { CombinedError } from '@urql/vue'
import consola from 'consola'
import { computed, defineComponent, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useRoute, navigateTo, useRouter } from '#app'
import { useHead } from '#head'

import { getApiMeta } from '~/plugins/util/util'
import {
  useEventByAuthorUsernameAndSlugQuery,
  useEventDeleteMutation,
  useEventIsExistingQuery,
} from '~/gql/generated'
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const route = useRoute()
      const store = useMaevsiStore()

      if (route.params.username !== store.signedInUsername) {
        throw createError({ statusCode: 403 })
      }

      const eventIsExisting = useEventIsExistingQuery({
        variables: {
          slug: route.params.event_name as string,
          authorUsername: route.params.username as string,
        },
      }).executeQuery()

      if (
        eventIsExisting.error ||
        eventIsExisting.data.value?.eventIsExisting
      ) {
        return abortNavigation() // TODO: { statusCode: 403 }
      }
    },
  ],
})

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const localePath = useLocalePath()
    const router = useRouter()
    const { t } = useI18n()
    const store = useMaevsiStore()
    const route = useRoute()
    const { executeMutation: executeMutationEventDelete } =
      useEventDeleteMutation()

    const eventQuery = useEventByAuthorUsernameAndSlugQuery({
      variables: {
        authorUsername: route.params.username as string,
        slug: route.params.event_name as string,
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
      routeParamEventName: route.params.event_name as string,
      routeParamUsername: route.params.username as string,
    })
    const methods = {
      localePath,
      onDeleteError(error: CombinedError) {
        apiData.api.value.errors.push(error)
      },
      onDeleteSuccess() {
        navigateTo(localePath(`/dashboard`))
        // TODO: cache update (allEvents)
      },
      t,
    }
    const computations = {
      title: computed((): string | undefined => {
        if (
          route.params.username === store.signedInUsername &&
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

    useHead({
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: computations.title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            router.currentRoute.value.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: computations.title,
        },
      ],
      title: computations.title.value,
    })

    return {
      ...apiData,
      ...data,
      ...methods,
      ...computations,
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
  settings: bearbeiten
  title: Veranstaltung bearbeiten
  titleDelete: Veranstaltung löschen
en:
  event: event
  events: events
  postgres28P01: Password incorrect! Check that you have written everything correctly.
  postgresP0002: The event was not found!
  settings: edit
  title: Edit event
  titleDelete: Delete event
</i18n>

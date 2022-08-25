<template>
  <Loader :api="api">
    <div v-if="event" class="flex flex-col gap-4">
      <Breadcrumbs
        :prefixes="[
          { name: $t('events'), to: '../../..', append: true },
          { name: routeParamUsername, to: '../..', append: true },
          { name: routeParamEventName, to: '..', append: true },
        ]"
      >
        {{ $t('invitations') }}
      </Breadcrumbs>
      <h1>
        {{ $t('title') }}
      </h1>
      <InvitationList :event="event" />
    </div>
    <Error v-else />
  </Loader>
</template>

<script lang="ts">
import consola from 'consola'
import { definePageMeta } from 'nuxt/dist/pages/runtime/composables'
import { useI18n } from 'vue-i18n'

import {
  computed,
  defineComponent,
  reactive,
  useRouter,
  useRoute,
  watch,
  abortNavigation,
useNuxtApp,
} from '#app'
import { useHead } from '#head'

import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import { getApiMeta } from '~/plugins/util/util'
import { useEventByAuthorUsernameAndSlugQuery } from '~/gql/generated'
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    async function (_to: any, _from: any) {
      const { $urql } = useNuxtApp()
      const route = useRoute()
      const store = useMaevsiStore()

      if (res && route.params.username !== store.signedInUsername) {
        return error({ statusCode: 403 })
      }

      const {
        data: { eventIsExisting },
      } = await $urql.value
        .query(EVENT_IS_EXISTING_QUERY, {
          slug: route.params.event_name,
          authorUsername: route.params.username,
        })
        .toPromise()

      if (!eventIsExisting) {
        return abortNavigation({ statusCode: 404 })
      }
    },
  ],
})

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n()
    const store = useMaevsiStore()

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
      routeParamEventName: route.params.event_name,
      routeParamUsername: route.params.username,
      title: t('title'),
    })
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
          content: data.title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: data.title,
        },
      ],
      title: data.title,
    })

    return {
      ...apiData,
      ...computations,
    }
  },
})
</script>

<i18n lang="yml">
de:
  event: Veranstaltung
  events: Veranstaltungen
  invitations: Einladungen
  title: Einladungen
en:
  event: event
  events: events
  invitations: invitations
  title: Invitations
</i18n>

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
import { Context } from '@nuxt/types-edge'
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
import { useHead } from '#head'

import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import { getApiMeta } from '~/plugins/util/util'
import { useEventByAuthorUsernameAndSlugQuery } from '~/gql/generated'
import { useMaevsiStore } from '~/store'

export default defineComponent({
  name: 'IndexPage',
  middleware({ error, res, params, $pinia }: Context) {
    const store = useMaevsiStore($pinia)

    if (res && params.username !== store.signedInUsername) {
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
    const route = useRoute()
    const { $router } = useNuxtApp()
    const { t } = useI18n()
    const store = useMaevsiStore($pinia)

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
            $router.currentRoute.fullPath,
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

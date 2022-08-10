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
import { useEventByAuthorUsernameAndSlugQuery } from '~/gql/generated'

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
    const route = useRoute()
    const { $store, $t } = useNuxtApp()

    const eventQuery = useEventByAuthorUsernameAndSlugQuery({
      variables: {
        authorUsername: route.params.username,
        slug: route.params.event_name,
      },
    })

    const apiData = reactive({
      api: {
        data: {
          ...eventQuery.data.value,
        },
        ...getApiMeta([eventQuery]),
      },
      event: eventQuery.data.value?.eventByAuthorUsernameAndSlug,
    })
    const computations = {
      title: computed((): string | undefined => {
        if (
          route.params.username === $store.getters.signedInUsername &&
          apiData.event
        ) {
          return `${$t('title')} · ${apiData.event.name}`
        }
        return '403'
      }),
    }

    watch(eventQuery.error, (currentValue, _oldValue) => {
      if (currentValue) consola.error(currentValue)
    })

    return {
      ...apiData,
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
  events: Veranstaltungen
  invitations: Einladungen
  title: Einladungen
en:
  event: event
  events: events
  invitations: invitations
  title: Invitations
</i18n>

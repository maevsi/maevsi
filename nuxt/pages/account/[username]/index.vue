<template>
  <div class="flex flex-col gap-4">
    <Breadcrumbs :prefixes="[{ name: $t('accounts'), to: '..', append: true }]">
      {{ routeParamUsername }}
    </Breadcrumbs>
    <ButtonList v-if="signedInUsername === routeParamUsername">
      <ButtonColored :aria-label="$t('settings')" to="settings" append>
        {{ $t('settings') }}
        <template slot="prefix">
          <IconPencil />
        </template>
      </ButtonColored>
      <ButtonColored :aria-label="$t('signOut')" @click.native="signOut">
        {{ $t('signOut') }}
        <template slot="prefix">
          <IconSignOut />
        </template>
      </ButtonColored>
    </ButtonList>
    <div class="flex min-w-0 flex-col items-center justify-center sm:flex-row">
      <div class="sm:mr-4">
        <AccountProfilePicture
          ref="profilePicture"
          classes="h-24 rounded w-24"
          height="96"
          :username="routeParamUsername"
          width="96"
        />
      </div>
      <h2 class="max-w-full overflow-hidden text-ellipsis sm:w-auto">
        {{ routeParamUsername }}
      </h2>
    </div>
    <ButtonList>
      <ButtonColored
        :aria-label="$t('eventsTheir', { name: routeParamUsername })"
        :is-primary="false"
        :to="localePath(`/event/${routeParamUsername}`)"
      >
        {{ $t('eventsTheir', { name: routeParamUsername }) }}
        <template slot="prefix">
          <IconCalendar />
        </template>
      </ButtonColored>
    </ButtonList>
  </div>
</template>

<script lang="ts">
import { definePageMeta } from 'nuxt/dist/pages/runtime/composables'
import { defineComponent, reactive } from 'vue'

import { useRouter, useRoute, abortNavigation, useNuxtApp } from '#app'
import { useHead } from '#head'

import ACCOUNT_IS_EXISTING_QUERY from '~/gql/query/account/accountIsExisting.gql'
import { useSignOut } from '~/plugins/util/auth'
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    async function (_to: any, _from: any) {
      const { $urql } = useNuxtApp()
      const route = useRoute()

      const {
        data: { accountIsExisting },
      } = await $urql.value
        .query(ACCOUNT_IS_EXISTING_QUERY, {
          username: route.params.username,
        })
        .toPromise()

      if (!accountIsExisting) {
        return abortNavigation()
      }
    },
  ],
})

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const { signOut } = useSignOut()
    const router = useRouter()
    const store = useMaevsiStore()
    const route = useRoute()

    const data = reactive({
      signedInUsername: store.signedInUsername,
      routeParamUsername: route.params.username,
      title: route.params.username,
    })
    const methods = {
      signOut,
    }

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
          hid: 'og:type',
          property: 'og:type',
          content: 'profile',
        },
        {
          hid: 'profile:username',
          property: 'profile:username',
          content: route.params.username,
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
      ...data,
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  accounts: Konten
  eventsTheir: Veranstaltungen von {name}
  settings: Bearbeiten
  signOut: Abmelden
en:
  accounts: accounts
  eventsTheir: Events by {name}
  settings: Edit
  signOut: Sign out
</i18n>

<template>
  <div class="flex flex-col gap-4">
    <Breadcrumbs
      :prefixes="[{ name: t('accounts'), to: localePath('/account') }]"
    >
      {{ routeParamUsername }}
    </Breadcrumbs>
    <ButtonList v-if="signedInUsername === routeParamUsername">
      <ButtonColored :aria-label="t('settings')" to="settings" is-to-relative>
        {{ t('settings') }}
        <template #prefix>
          <IconPencil />
        </template>
      </ButtonColored>
      <ButtonColored :aria-label="t('signOut')" @click.native="signOut">
        {{ t('signOut') }}
        <template #prefix>
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
        :aria-label="t('eventsTheir', { name: routeParamUsername })"
        :is-primary="false"
        :to="localePath(`/event/${routeParamUsername}`)"
      >
        {{ t('eventsTheir', { name: routeParamUsername }) }}
        <template #prefix>
          <IconCalendar />
        </template>
      </ButtonColored>
    </ButtonList>
  </div>
</template>

<script setup lang="ts">
import { useSignOut } from '~/plugins/util/auth'
import { useMaevsiStore } from '~/store'
import ACCOUNT_IS_EXISTING_QUERY from '~/gql/query/account/accountIsExisting.gql'

definePageMeta({
  async validate(route) {
    const { $urql } = useNuxtApp()

    const accountIsExisting = await $urql.value
      .query(ACCOUNT_IS_EXISTING_QUERY, {
        username: route.params.username as string,
      })
      .toPromise()

    return (
      !accountIsExisting.error && !!accountIsExisting.data?.accountIsExisting
    )
  },
})

const { signOut } = useSignOut()
const { t } = useI18n()
const store = useMaevsiStore()
const route = useRoute()
const localePath = useLocalePath()

// data
const signedInUsername = store.signedInUsername
const routeParamUsername = route.params.username as string
const title = route.params.username as string

// initialization
useHeadDefault(title, {
  meta: [
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'profile',
    },
    {
      hid: 'profile:username',
      property: 'profile:username',
      content: route.params.username as string,
    },
  ],
})
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
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

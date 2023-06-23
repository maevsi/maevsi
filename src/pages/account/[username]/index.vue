<template>
  <Loader :api="api" indicator="ping">
    <div class="flex flex-col gap-4">
      <LayoutBreadcrumbs
        :prefixes="[{ name: t('accounts'), to: localePath('/account') }]"
      >
        {{ routeParamUsername }}
      </LayoutBreadcrumbs>
      <ButtonList
        v-if="signedInUsername === routeParamUsername"
        class="justify-end"
      >
        <ButtonColored :aria-label="t('settings')" to="settings" is-to-relative>
          {{ t('settings') }}
          <template #prefix>
            <IconPencil />
          </template>
        </ButtonColored>
        <ButtonColored :aria-label="t('signOut')" @click="signOut">
          {{ t('signOut') }}
          <template #prefix>
            <IconSignOut />
          </template>
        </ButtonColored>
      </ButtonList>
      <div
        class="flex min-w-0 flex-col items-center justify-center sm:flex-row"
      >
        <div class="sm:mr-4">
          <AccountProfilePicture
            :account-id="account?.id"
            classes="h-24 rounded w-24"
            height="96"
            width="96"
          />
        </div>
        <h1>
          {{ routeParamUsername }}
        </h1>
      </div>
      <ButtonList class="justify-center">
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
  </Loader>
</template>

<script setup lang="ts">
import { getAccountItem } from '~/gql/documents/fragments/accountItem'
import { useAccountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'
import { useMaevsiStore } from '~/store'

definePageMeta({
  async validate(route) {
    return await validateAccountExistence({ route })
  },
})

const { signOut } = useSignOut()
const { t } = useI18n()
const store = useMaevsiStore()
const route = useRoute()
const localePath = useLocalePath()

// api data
const accountByUsernameQuery = await useAccountByUsernameQuery({
  username: route.params.username as string,
})
const account = getAccountItem(
  accountByUsernameQuery.data.value?.accountByUsername
)
const api = getApiData([accountByUsernameQuery])

// data
const routeParamUsername = route.params.username as string
const title = route.params.username as string

// computations
const signedInUsername = computed(() => store.signedInUsername)

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

<i18n lang="yaml">
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

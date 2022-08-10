<template>
  <div class="flex flex-col gap-4">
    <Breadcrumbs :prefixes="[{ name: $t('accounts'), to: '..', append: true }]">
      {{ $route.params.username }}
    </Breadcrumbs>
    <ButtonList v-if="signedInUsername === $route.params.username">
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
          :username="$route.params.username"
          width="96"
        />
      </div>
      <h2 class="max-w-full overflow-hidden text-ellipsis sm:w-auto">
        {{ $route.params.username }}
      </h2>
    </div>
    <ButtonList>
      <ButtonColored
        :aria-label="$t('eventsTheir', { name: $route.params.username })"
        :is-primary="false"
        :to="localePath(`/event/${$route.params.username}`)"
      >
        {{ $t('eventsTheir', { name: $route.params.username }) }}
        <template slot="prefix">
          <IconCalendar />
        </template>
      </ButtonColored>
    </ButtonList>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useRoute } from '#app'

import ACCOUNT_IS_EXISTING_QUERY from '~/gql/query/account/accountIsExisting.gql'
import { useSignOut } from '~/plugins/util/auth'
import { useMaevsiStore } from '~/store'

export default defineComponent({
  name: 'IndexPage',
  async validate({ app, params }) {
    const {
      data: { accountIsExisting },
    } = await app.$urql.value
      .query(ACCOUNT_IS_EXISTING_QUERY, {
        username: params.username,
      })
      .toPromise()

    return accountIsExisting
  },
  transition: {
    name: 'layout',
  },
  setup() {
    const { signOut } = useSignOut()
    const store = useMaevsiStore()
    const route = useRoute()

    const data = reactive({
      signedInUsername: store.signedInUsername,
      title: route.params.username,
    })
    const methods = {
      signOut,
    }

    return {
      ...data,
      ...methods,
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
          hid: 'og:type',
          property: 'og:type',
          content: 'profile',
        },
        {
          hid: 'profile:username',
          property: 'profile:username',
          content: this.$route.params.username,
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

<template>
  <div class="flex flex-col gap-4">
    <Breadcrumbs :prefixes="[{ name: $t('accounts'), to: '..', append: true }]">
      {{ $route.params.username }}
    </Breadcrumbs>
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
        :to="localePath(`/event/${$route.params.username}`)"
      >
        {{ $t('eventsTheir', { name: $route.params.username }) }}
        <template slot="prefix">
          <IconCalendar />
        </template>
      </ButtonColored>
    </ButtonList>
    <ButtonList v-if="signedInUsername === $route.params.username">
      <ButtonColored :aria-label="$t('settings')" to="settings" append>
        {{ $t('settings') }}
        <template slot="prefix">
          <IconPencil />
        </template>
      </ButtonColored>
      <ButtonColored
        :aria-label="$t('signOut')"
        @click.native="$util.signOut($apollo.getClient(), $store)"
      >
        {{ $t('signOut') }}
        <template slot="prefix">
          <IconSignOut />
        </template>
      </ButtonColored>
    </ButtonList>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

import { defineComponent } from '#app'

import ACCOUNT_IS_EXISTING_MUTATION from '~/gql/query/account/accountIsExisting.gql'

export default defineComponent({
  name: 'IndexPage',
  async validate({ app, params }) {
    const {
      data: { accountIsExisting },
    } = await app.apolloProvider!.defaultClient.query({
      query: ACCOUNT_IS_EXISTING_MUTATION,
      variables: {
        username: params.username,
      },
      fetchPolicy: 'network-only',
    })

    return accountIsExisting
  },
  transition: {
    name: 'layout',
  },
  data() {
    return {
      title: this.$route.params.username,
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
  computed: {
    ...mapGetters(['signedInUsername']),
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

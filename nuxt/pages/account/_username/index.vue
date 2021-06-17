<template>
  <div>
    <div
      class="flex flex-col sm:flex-row items-center justify-center min-w-0 py-4"
    >
      <div class="sm:mr-4">
        <ProfilePicture
          classes="h-24 w-24"
          :username="$route.params.username"
        />
      </div>
      <h1 class="truncate max-w-full sm:w-auto">
        {{ $route.params.username }}
      </h1>
    </div>
    <EventList :username="$route.params.username" />
  </div>
</template>

<script>
import ACCOUNT_IS_EXISTING_MUTATION from '~/gql/query/account/accountIsExisting.gql'

export default {
  async validate({ app, params }) {
    const {
      data: { accountIsExisting },
    } = await app.apolloProvider.defaultClient.query({
      query: ACCOUNT_IS_EXISTING_MUTATION,
      variables: {
        username: params.username,
      },
    })

    return accountIsExisting
  },
  data() {
    return {
      title: this.$route.params.username,
    }
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
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
          content: this.title,
        },
      ],
      title: this.title,
    }
  },
}
</script>

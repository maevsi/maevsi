<template>
  <div>
    <div
      class="flex flex-col sm:flex-row items-center justify-center min-w-0 py-4"
    >
      <div class="sm:mr-4">
        <ProfilePicture
          class="h-24 w-24"
          :username="this.$route.params.username"
        />
      </div>
      <h1 class="truncate w-full sm:w-auto">
        {{ $route.params.username }}
      </h1>
    </div>
    <EventList :username="this.$route.params.username" />
  </div>
</template>

<script>
import ACCOUNT_IS_EXISTING_MUTATION from '~/gql/query/account/accountIsExisting'

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
  head() {
    return {
      meta: [
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
      ],
      title: this.$route.params.username,
    }
  },
}
</script>

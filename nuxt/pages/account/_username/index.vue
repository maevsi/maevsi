<template>
  <div>
    <div
      class="flex flex-col sm:flex-row items-center justify-center min-w-0 py-4"
    >
      <div class="mr-0 sm:mr-4">
        <ProfilePicture :username="this.$route.params.username" />
      </div>
      <h1 class="mb-0 truncate w-full sm:w-auto">
        {{ $route.params.username }}
      </h1>
    </div>
    <EventList :username="this.$route.params.username" />
  </div>
</template>

<script>
export default {
  validate({ app, params }) {
    return app.$global.REGEX_SLUG.test(params.username)
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

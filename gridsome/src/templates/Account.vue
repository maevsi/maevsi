<template>
  <Layout>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <div v-else>
      <div class="flex flex-col sm:flex-row items-center justify-center min-w-0 py-4">
        <div class="mr-0 sm:mr-4">
          <ProfilePicture :username="this.$route.params.username" />
        </div>
        <h1 class="mb-0 truncate w-full sm:w-auto">
          {{ $route.params.username }}
        </h1>
      </div>
      <h2 class="text-left truncate">
        Their Events
      </h2>
      <EventList :username="this.$route.params.username" />
    </div>
  </Layout>
</template>

<script>
import EventList from '~/components/EventList.vue'
import ProfilePicture from '~/components/ProfilePicture.vue'

export default {
  components: {
    EventList,
    ProfilePicture
  },
  metaInfo () {
    return { title: this.$route.params.username }
  }
}
</script>

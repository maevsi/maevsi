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
  head() {
    return { title: this.$route.params.username }
  },
  validate({ params }) {
    // Must be a number
    return /^[A-Za-z0-9-_]+$/.test(params.id)
  },
}
</script>

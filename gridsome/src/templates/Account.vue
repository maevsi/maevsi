<template>
  <Layout>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <div v-else-if="graphqlErrorMessage !== undefined">
      <AlertGraphql
        :graphql-error-message="graphqlErrorMessage"
        :validation-object="undefined"
      />
    </div>
    <div v-else>
      <div v-if="allEvents === null">
        <Error404 />
      </div>
      <div v-else>
        <div class="flex flex-col sm:flex-row items-center justify-center min-w-0 py-4">
          <g-image
            alt="blank profile picture"
            class="flex-none mr-0 sm:mr-4"
            src="~/assets/blank-profile-picture.svg"
            width="100"
          />
          <h1 class="mb-0 truncate w-full sm:w-auto">
            {{ $route.params.username }}
          </h1>
        </div>
        <h2 class="text-left truncate">
          Their Events
        </h2>
        <EventList
          :apollo="$apollo"
          :all-events="allEvents"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import { ALL_EVENTS_QUERY } from '~/apollo/documents'
import AlertGraphql from '~/components/AlertGraphql.vue'
import Error404 from '~/components/Error404.vue'
import EventList from '~/components/EventList.vue'

export default {
  apollo: {
    allEvents () {
      return {
        query: ALL_EVENTS_QUERY,
        variables: {
          cursor: null,
          limit: this.ITEMS_PER_PAGE,
          username: this.$route.params.username
        },
        error (error, vm, key, type, options) {
          this.graphqlErrorMessage = error.message
        }
      }
    }
  },
  components: {
    AlertGraphql,
    Error404,
    EventList
  },
  data () {
    return {
      graphqlErrorMessage: undefined
    }
  },
  metaInfo () {
    return { title: this.$route.params.username }
  }
}
</script>

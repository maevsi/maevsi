<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <div class="flex justify-around">
      <Button
        v-if="loggedIn"
        :icon-id="['fas', 'plus']"
        :link="'/new'"
        :text="'Create event'"
      />
      <ButtonRedeem />
    </div>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <AlertGraphql
      v-else-if="graphqlErrorMessage !== null"
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="undefined"
    />
    <EventList
      v-else
      :apollo="$apollo"
      :all-events="allEvents"
    />
  </Layout>
</template>

<script>
import AlertGraphql from '~/components/AlertGraphql.vue'
import Button from '~/components/Button.vue'
import ButtonRedeem from '~/components/ButtonRedeem.vue'
import EventList from '~/components/EventList.vue'

import gql from 'graphql-tag'

export default {
  apollo: {
    $prefetch: false,
    allEvents () {
      return {
        query: gql`
          query eventsPage ($limit: Int!, $cursor: Cursor) {
            allEvents (first: $limit, after: $cursor) {
              nodes {
                name
                slug
                visibility
                organizerUsername
                description
                place
                start
                end
                archived
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        `,
        variables: {
          cursor: null,
          limit: this.ITEMS_PER_PAGE
        },
        error (error, vm, key, type, options) {
          this.graphqlErrorMessage = error.message
        }
      }
    }
  },
  components: {
    AlertGraphql,
    Button,
    ButtonRedeem,
    EventList
  },
  data () {
    return {
      graphqlErrorMessage: null
    }
  },
  metaInfo () {
    return { title: 'Events' }
  }
}
</script>

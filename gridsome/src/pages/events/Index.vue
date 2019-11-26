<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <div v-else>
      <table class="m-auto" v-if="allEvents && allEvents.length">
        <thead>
          <tr>
            <th class="th">Name</th>
            <th class="th">Date</th>
            <th class="th">Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in allEvents" v-bind:key="event.id">
            <td class="td"><g-link :to="'/events/' + $slugify(event.organizerUsername) + '/' + $slugify(event.name)">{{event.name}}</g-link></td>
            <td class="td">{{event.timestamp | moment("lll")}}</td>
            <td class="td">{{event.interval | duration('humanize')}}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>
        There are currently no events :/
      </p>
    </div>
  </Layout>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      allEvents: null
    };
  },
  metaInfo() {
    return { title: "Events" };
  },
  apollo: {
    $prefetch: false,
    allEvents: {
      query: gql`{
        allEvents {
          nodes {
            id
            name
            visibility
            organizerUsername
            place
            timestamp
            interval {
              seconds
              minutes
              hours
              days
              months
              years
            }
            archived
          }
        }
      }`,
      update: data => data.allEvents.nodes
    }
  }
};
</script>
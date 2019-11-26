<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <table class="m-auto">
      <thead>
        <tr>
          <th class="th">Name</th>
          <th class="th">Date</th>
          <th class="th">Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in allEvents" v-bind:key="event.id">
          <td class="td"><g-link :to="'/events/' + $slugify(event.username, {lower: true}) + '/' + $slugify(event.name, {lower: true})">{{event.name}}</g-link></td>
          <td class="td">{{event.timestamp | moment("lll")}}</td>
          <td class="td">{{event.interval | duration('humanize')}}</td>
        </tr>
      </tbody>
    </table>
  </Layout>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      nodes: null
    };
  },
  metaInfo() {
    return { title: "Events" };
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    allEvents: {
      query: gql`{
        allAllEventsWithUsernames {
          nodes {
            id
            name
            visibility
            username
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
      update: data => data.allAllEventsWithUsernames.nodes
    }
  }
};
</script>
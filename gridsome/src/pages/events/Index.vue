<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <div v-if="$apollo.loading">Loading...</div>
    <div class="m-auto w-full" v-else>
      <ul class="mx-4 text-left" v-if="allEvents && allEvents.length">
        <g-link
          :to="'/events/' + event.organizerUsername + '/' + event.slug"
          v-for="event in allEvents"
          v-bind:key="event.id"
        >
          <li class="mb-4">
            <div class="bg-white border border-gray-400 flex flex-col p-4 rounded">
              <div class="flex items-center mb-2 text-gray-600 text-sm">
                <div>{{event.start | moment("lll")}}</div>
              </div>
              <div class="flex items-center mb-2 text-gray-600 text-sm">
                <font-awesome
                  class="mr-2"
                  :icon="['fas', 'lock-open']"
                  title="public"
                  v-if="event.visibility == 'PUBLIC'"
                />
                <font-awesome
                  class="mr-2"
                  :icon="['fas', 'key']"
                  title="private"
                  v-if="event.visibility == 'PRIVATE'"
                />
                <div class="font-bold text-gray-900 text-xl">{{event.name}}</div>
              </div>
              <p class="oneliner text-gray-700">{{event.description}}</p>
            </div>
          </li>
        </g-link>
      </ul>
      <p v-else>There are currently no events :/</p>
    </div>
  </Layout>
</template>

<script>
import gql from "graphql-tag";

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
      query: gql`
        {
          allEvents {
            nodes {
              id
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
          }
        }
      `,
      update: data => data.allEvents.nodes
    }
  }
};
</script>
<template>
  <Loader :error-message="graphqlErrorMessage" :loading="$apollo.loading">
    <div v-if="event">
      <!-- breadcrumbs -->
      <h1 class="text-center">
        {{ title }}
      </h1>
      <section>
        <h2>{{ $t('titleDangerZone') }}</h2>
        <FormDelete
          id="deleteEvent"
          :item-name="$t('event')"
          :mutation="mutation"
          :update="updateCacheDelete"
          :variables="{
            organizerUsername: $route.params.username,
            slug: $route.params.event_name,
          }"
          @success="onDeleteSuccess"
        />
      </section>
    </div>
    <Error v-else :status-code="404" />
  </Loader>
</template>

<script>
import EVENT_DELETE_MUTATION from '~/gql/mutation/eventDelete'
import ALL_EVENTS_QUERY from '~/gql/query/allEvents'
import EVENT_BY_ORGANIZER_USERNAME_AND_SLUG from '~/gql/query/eventByOrganizerUsernameAndSlug'

export default {
  apollo: {
    event() {
      return {
        query: EVENT_BY_ORGANIZER_USERNAME_AND_SLUG,
        variables: {
          organizerUsername: this.$route.params.username,
          slug: this.$route.params.event_name,
        },
        update: (data) => data.eventByOrganizerUsernameAndSlug,
        error(error, _vm, _key, _type, _options) {
          this.graphqlErrorMessage = error.message
        },
      }
    },
  },
  middleware({ app, store, redirect, route }) {
    // // If access permissions need to be validated by the server in the future.
    // const {
    //   data: { eventByOrganizerUsernameAndSlug },
    // } = await app.apolloProvider.defaultClient.query({
    //   query: EVENT_BY_ORGANIZER_USERNAME_AND_SLUG_QUERY,
    //   variables: {
    //     organizerUsername: route.params.username,
    //     slug: route.params.event_name,
    //   },
    // })
    if (
      !app.$global.checkNested(store.state.jwtDecoded, 'username') ||
      store.state.jwtDecoded.username !== route.params.username
    ) {
      return redirect({ append: true, path: '..' })
    }
  },
  data() {
    return {
      graphqlErrorMessage: undefined,
      mutation: EVENT_DELETE_MUTATION,
      title: this.$t('title'),
    }
  },
  head() {
    return { title: this.$route.params.event_name }
  },
  methods: {
    onDeleteSuccess() {
      this.$router.push(this.localePath(`/event`))
      this.$apollo.queries.allEvents && this.$apollo.queries.allEvents.refetch()
    },

    // /////////////////////////////////////////////////////////////////////////
    // TODO: Use apollo client v3.
    // https://www.apollographql.com/docs/react/caching/cache-configuration/
    // https://apollo.vuejs.org/guide/components/mutation.html

    // update(cache, {data: mutationData}) {
    //   if (mutationData) {
    //     const removedMatchId = mutationData.removeMatch;
    //     cache.modify('ROOT_QUERY', {
    //       matches: (matches: Reference[], helpers) => {
    //         const removedMatchRef = helpers.toReference({
    //           __typename: 'Match',
    //           id: removedMatchId,
    //         });
    //         return matches.filter(({__ref}) => __ref !== removedMatchRef.__ref);
    //       },
    //     });
    //   }
    // },

    // cache.evict(cache.identify(result.data.updateActivity));

    // const [deleteExpressHelp] = useDeleteExpressHelpMutation({
    //   update: (cache, {data}) => {
    //     cache.evict({
    //       id: cache.identify({
    //         __typename: 'express_help',
    //         id: data?.delete_express_help_by_pk?.id,
    //       }),
    //     });
    //   },
    // });
    // /////////////////////////////////////////////////////////////////////////

    // Just an example. Doesn't respect paramters like a conditional username that is set for this query on event lists on users' profiles.
    // Currently, the apollo fetch policy is `cache-and-network`: https://github.com/maevsi/maevsi/commit/02cbcd9c9a9784e9076c6a360f78a603623c819b#diff-ce51f9f2a4d27fb6594bd8d6dce05dcbca68a6a99999078c96dbab4033472650R247
    updateCacheDelete(store, { data: { _eventDelete } }) {
      const query = { query: ALL_EVENTS_QUERY }
      let data

      try {
        data = store.readQuery(query)
      } catch (e) {
        return
      }

      // const index = data.allEvents.nodes.find(
      const index = data.allEvents.nodes.findIndex(
        (x) =>
          x.organizerUsername === this.$route.params.username &&
          x.slug === this.$route.params.event_name
      )

      if (index !== -1) {
        data.allEvents.nodes.splice(index, 1)
        store.writeQuery({
          ...query,
          data,
        })
      }
    },
  },
}
</script>

<i18n lang="yml">
de:
  event: 'Veranstaltung'
  title: 'Einstellungen'
  titleDangerZone: 'Gefahrenzone'
en:
  event: 'event'
  title: 'Settings'
  titleDangerZone: 'Danger zone'
</i18n>

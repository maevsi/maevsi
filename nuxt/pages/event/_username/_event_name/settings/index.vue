<template>
  <Loader
    v-if="($apollo.loading && !event) || graphqlError"
    :error-message="graphqlError ? String(graphqlError) : undefined"
  />
  <div v-else>
    <div v-if="$route.params.username === $store.state.signedInUsername">
      <div v-if="event">
        <!-- TODO: breadcrumbs -->
        <h1 class="text-center">
          {{ title }}
        </h1>
        <section>
          <h2>{{ $t('titleInvitations') }}</h2>
          <InvitationList :event="event" />
        </section>
        <section>
          <h2>{{ $t('titleEdit') }}</h2>
          <FormEvent :event="event" />
        </section>
        <section>
          <h2>{{ $t('titleDelete') }}</h2>
          <FormDelete
            id="deleteEvent"
            :item-name="$t('event')"
            :mutation="mutation"
            :update="updateCacheDelete"
            :variables="{
              authorUsername: $route.params.username,
              slug: $route.params.event_name,
            }"
            @success="onDeleteSuccess"
          />
        </section>
      </div>
      <Error v-else />
    </div>
    <Error v-else :status-code="403" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import EVENT_BY_ORGANIZER_USERNAME_AND_SLUG from '~/gql/query/event/eventByAuthorUsernameAndSlug.gql'
import EVENT_DELETE_MUTATION from '~/gql/mutation/event/eventDelete.gql'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'
import EVENTS_ALL_QUERY from '~/gql/query/event/eventsAll.gql'

const consola = require('consola')

export default defineComponent({
  apollo: {
    event() {
      return {
        query: EVENT_BY_ORGANIZER_USERNAME_AND_SLUG,
        variables: {
          authorUsername: this.$route.params.username,
          slug: this.$route.params.event_name,
        },
        update: (data) => data.eventByAuthorUsernameAndSlug,
        error(error, _vm, _key, _type, _options) {
          this.graphqlError = error
          consola.error(error)
        },
      }
    },
  },
  middleware({ res, params, store }) {
    if (res && params.username !== store.state.signedInUsername) {
      res.statusCode = 403
    }
  },
  async validate({ app, params }) {
    const {
      data: { eventIsExisting },
    } = await app.apolloProvider.defaultClient.query({
      query: EVENT_IS_EXISTING_QUERY,
      variables: {
        slug: params.event_name,
        authorUsername: params.username,
      },
    })

    return eventIsExisting
  },
  data() {
    return {
      graphqlError: undefined,
      mutation: EVENT_DELETE_MUTATION,
    }
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            this.$router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: this.title,
        },
      ],
      title: this.title,
    }
  },
  computed: {
    title() {
      return this.$route.params.username === this.$store.state.signedInUsername
        ? this.$global.getNested(this.event, 'name')
        : '403'
    },
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
      const query = { query: EVENTS_ALL_QUERY }
      let data

      try {
        data = store.readQuery(query)
      } catch (e) {
        return
      }

      // const index = data.allEvents.nodes.find(
      const index = data.allEvents.nodes.findIndex(
        (x) =>
          x.authorUsername === this.$route.params.username &&
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
})
</script>

<i18n lang="yml">
de:
  event: Veranstaltung
  titleDelete: Veranstaltung löschen
  titleEdit: Veranstaltung bearbeiten
  titleInvitations: Einladungen
en:
  event: event
  titleDelete: Delete event
  titleEdit: Edit event
  titleInvitations: Invitations
</i18n>

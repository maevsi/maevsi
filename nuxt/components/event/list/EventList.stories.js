import { graphql } from 'msw'

import EventList from './EventList.vue'

export default {
  component: EventList,
  parameters: {
    msw: [
      graphql.query('EventsAll', (_req, res, ctx) => {
        return res(
          ctx.data({
            allEvents: {
              nodes: [
                {
                  id: -1,
                  authorUsername: 'authorUsername',
                  description: 'description',
                  end: '1970-01-01 00:00:00',
                  inviteeCountMaximum: -1,
                  isArchived: false,
                  isInPerson: false,
                  isRemote: false,
                  location: 'Place',
                  name: 'name',
                  slug: 'slug',
                  start: '1970-01-01 00:00:00',
                  url: 'https://example.com',
                  visibility: 'PUBLIC',
                  __typename: 'Event',
                },
              ],
              pageInfo: {
                endCursor: '',
                hasNextPage: false,
                __typename: 'PageInfo',
              },
              __typename: 'EventsConnection',
            },
          })
        )
      }),
    ],
  },
  title: 'event/list/EventList',
}

const Template = (_, { argTypes }) => ({
  components: { EventList },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<EventList v-bind="$props">EventList</EventList>',
})

export const Default = Template.bind({})
Default.args = {
  showButtonEventList: true,
}

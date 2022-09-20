import { graphql } from 'msw'

import { defineComponent } from 'vue'
import EventList from './EventList.vue'

export default {
  component: EventList,
  parameters: {
    msw: [
      graphql.query('allEvents', (_req, res, ctx) => {
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
                  nodeId: 'WyJldmVudHMiLDFd',
                  slug: 'slug',
                  start: '1970-01-01 00:00:00',
                  url: 'https://example.com',
                  visibility: 'PUBLIC',
                  __typename: 'Event',
                },
              ],
              pageInfo: {
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

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { EventList },
    props: Object.keys(argTypes),
    template: '<EventList v-bind="$props">EventList</EventList>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  showButtonEventList: true,
}

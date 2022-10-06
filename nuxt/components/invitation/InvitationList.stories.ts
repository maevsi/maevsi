import { graphql } from 'msw'

import { defineComponent } from 'vue'
import InvitationList from './InvitationList.vue'

export default {
  component: InvitationList,
  parameters: {
    msw: [
      graphql.query('allInvitations', (_req, res, ctx) => {
        return res(
          ctx.data({
            allInvitations: {
              nodes: [
                {
                  id: -1,
                  nodeId: 'WyJldmVudHMiLDFd',
                  contactId: -1,
                  eventId: -1,
                  feedback: null,
                  feedbackPaper: null,
                  uuid: '59462df6-10a9-11ea-bf8e-0f50c4d91a7a',
                  __typename: 'Invitation',
                  contactByContactId: {
                    id: -1,
                    nodeId: 'WyJldmVudHMiLDFd',
                    accountUsername: null,
                    address: null,
                    authorAccountUsername: null,
                    emailAddress: null,
                    emailAddressHash: null,
                    firstName: null,
                    lastName: null,
                    phoneNumber: null,
                    url: null,
                    __typename: 'Contact',
                  },
                },
              ],
              pageInfo: {
                hasNextPage: false,
                __typename: 'PageInfo',
              },
              totalCount: 1,
              __typename: 'InvitationsConnection',
            },
          })
        )
      }),
    ],
  },

  title: 'invitation/InvitationList',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { InvitationList },
    props: Object.keys(argTypes),
    template: '<InvitationList v-bind="$props">InvitationList</InvitationList>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  event: {
    id: -1,
    authorUsername: 'authorUsername',
    description: 'description',
    name: 'name',
    visibility: 'PUBLIC',
  },
}

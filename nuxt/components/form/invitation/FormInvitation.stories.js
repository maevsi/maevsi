import { graphql } from 'msw'

import FormInvitation from './FormInvitation.vue'

export default {
  component: FormInvitation,
  parameters: {
    msw: [
      graphql.query('allContacts', (_req, res, ctx) => {
        return res(
          ctx.data({
            allContacts: {
              nodes: [],
              pageInfo: {
                endCursor: '',
                hasNextPage: false,
                __typename: 'PageInfo',
              },
              __typename: 'ContactsConnection',
            },
          })
        )
      }),
    ],
  },
  title: 'form/invitation/FormInvitation',
}

const Template = (_, { argTypes }) => ({
  components: { FormInvitation },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<FormInvitation v-bind="$props">FormInvitation</FormInvitation>',
})

export const Default = Template.bind({})
Default.args = {
  event: {},
}

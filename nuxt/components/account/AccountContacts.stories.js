import { graphql } from 'msw'

import AccountContacts from './AccountContacts.vue'

export default {
  component: AccountContacts,
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
  title: 'account/AccountContacts',
}

const Template = (_, { argTypes }) => ({
  components: { AccountContacts },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<AccountContacts v-bind="$props">AccountContacts</AccountContacts>',
})

export const Default = Template.bind({})

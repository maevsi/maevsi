import { graphql } from 'msw'

import { defineComponent } from '@nuxtjs/composition-api'
import AccountContactList from './AccountContactList.vue'

export default {
  component: AccountContactList,
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
  title: 'account/AccountContactList',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { AccountContactList },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<AccountContactList v-bind="$props">AccountContactList</AccountContactList>',
  })

export const Default = Template.bind({})

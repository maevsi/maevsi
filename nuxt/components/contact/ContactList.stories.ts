import { graphql } from 'msw'

import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import ContactList from './ContactList.vue'

export default {
  component: ContactList,
  parameters: {
    msw: [
      graphql.query('allContacts', (_req, res, ctx) => {
        return res(
          ctx.data({
            allContacts: {
              nodes: [],
              pageInfo: {
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
  title: 'contact/ContactList',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ContactList },
    props: Object.keys(argTypes),
    template: '<ContactList v-bind="$props">ContactList</ContactList>',
  })

export const Default = Template.bind({})

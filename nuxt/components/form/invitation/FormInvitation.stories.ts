import { Story } from '@storybook/vue3'
import { graphql } from 'msw'

import { defineComponent } from 'vue'
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

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormInvitation },
    props: Object.keys(argTypes),
    template: '<FormInvitation v-bind="$props">FormInvitation</FormInvitation>',
  })

export const Default = Template.bind({})
Default.args = {
  event: {},
}

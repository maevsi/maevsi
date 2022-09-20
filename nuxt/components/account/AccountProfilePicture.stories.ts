import { graphql } from 'msw'

import { defineComponent } from 'vue'
import AccountProfilePicture from './AccountProfilePicture.vue'

export default {
  component: AccountProfilePicture,
  parameters: {
    msw: [
      graphql.query('profilePictureByUsername', (_req, res, ctx) => {
        return res(
          ctx.data({
            profilePictureByUsername: null,
          })
        )
      }),
    ],
  },
  title: 'account/AccountProfilePicture',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { AccountProfilePicture },
    props: Object.keys(argTypes),
    template:
      '<AccountProfilePicture v-bind="$props" class="h-12 w-12">AccountProfilePicture</AccountProfilePicture>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  height: '48',
  username: 'AccountProfilePicture',
  width: '48',
}

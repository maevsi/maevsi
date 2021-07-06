import { graphql } from 'msw'

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

const Template = (_, { argTypes }) => ({
  components: { AccountProfilePicture },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<AccountProfilePicture v-bind="$props" class="h-12 w-12">AccountProfilePicture</AccountProfilePicture>',
})

export const Default = Template.bind({})
Default.args = {
  height: '48',
  username: 'AccountProfilePicture',
  width: '48',
}

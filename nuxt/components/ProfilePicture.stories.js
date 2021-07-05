import { graphql } from 'msw'

import ProfilePicture from './ProfilePicture.vue'

export default {
  component: ProfilePicture,
  parameters: {
    msw: [
      graphql.query('profilePictureByUsername', (req, res, ctx) => {
        const { username } = req.variables
        return res(
          ctx.data({
            __typename: 'ProfilePicture',
            id: 0,
            nodeId: 'WyJldmVudHMiLDFd',
            uploadStorageKey: '123',
            username,
          })
        )
      }),
    ],
  },
  title: 'ProfilePicture',
}

const Template = (_, { argTypes }) => ({
  components: { ProfilePicture },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<ProfilePicture v-bind="$props">ProfilePicture</ProfilePicture>',
})

export const Default = Template.bind({})
Default.args = {
  username: 'ProfilePicture',
}

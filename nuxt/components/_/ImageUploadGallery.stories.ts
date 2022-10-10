import { Story } from '@storybook/vue3'
import { graphql } from 'msw'

import { defineComponent } from 'vue'
import ImageUploadGallery from './ImageUploadGallery.vue'

export default {
  component: ImageUploadGallery,
  parameters: {
    msw: [
      graphql.query('allUploads', (_req, res, ctx) => {
        // const { username } = req.variables
        return res(
          ctx.data({
            allUploads: {
              nodes: [
                // {
                //   id: -1,
                //   sizeByte: -1,
                //   storageKey: '',
                //   username,
                //   uuid: '',
                //   nodeId: 'WyJldmVudHMiLDFd',
                //   __typename: 'Upload',
                // },
              ],
              pageInfo: {
                hasNextPage: false,
                __typename: 'PageInfo',
              },
              __typename: 'UploadsConnection',
            },
          })
        )
      }),
    ],
  },
  title: 'ImageUploadGallery',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ImageUploadGallery },
    props: Object.keys(argTypes),
    template:
      '<ImageUploadGallery v-bind="$props">ImageUploadGallery</ImageUploadGallery>',
  })

export const Default = Template.bind({})
Default.args = {
  username: 'username',
}

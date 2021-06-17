import { graphql } from 'msw'

import ImageUploadGallery from './ImageUploadGallery.vue'

export default {
  component: ImageUploadGallery,
  parameters: {
    msw: [
      graphql.query('uploadsAll', (req, res, ctx) => {
        const { username } = req.variables
        return res(
          ctx.data({
            __typename: 'Upload',
            nodes: {
              id: -1,
              sizeByte: -1,
              storageKey: '',
              username,
              uuid: '',
            },
            pageInfo: {
              endCursor: '',
              hasNextPage: false,
            },
          })
        )
      }),
    ],
  },
  title: 'ImageUploadGallery',
}

const Template = (_, { argTypes }) => ({
  components: { ImageUploadGallery },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<ImageUploadGallery v-bind="$props">ImageUploadGallery</ImageUploadGallery>',
})

export const Default = Template.bind({})

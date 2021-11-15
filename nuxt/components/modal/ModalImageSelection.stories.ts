import { Store } from 'vuex'
import { graphql } from 'msw'

import { defineComponent } from '@nuxtjs/composition-api'
import ModalImageSelection from './ModalImageSelection.vue'

export default {
  component: ModalImageSelection,
  parameters: {
    msw: [
      graphql.query('allUploads', (_req, res, ctx) => {
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
  title: 'modal/ModalImageSelection',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { ModalImageSelection },
    props: Object.keys(argTypes),
    store: new Store({
      state: {
        modals: [{ id: 'ModalImageSelection', isVisible: true }],
      },
      getters: {
        modals: (state) => state.modals,
      },
    }),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<ModalImageSelection v-bind="$props" id="ModalImageSelection">ModalImageSelection</ModalImageSelection>',
  })

export const Default = Template.bind({})

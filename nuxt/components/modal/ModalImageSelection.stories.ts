import { Story } from '@storybook/vue3'
import { graphql } from 'msw'
import { defineComponent } from 'vue'

import ModalImageSelection from './ModalImageSelection.vue'
import { useMaevsiStore } from '~/store'

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
                //   username: 'username',
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
  title: 'modal/ModalImageSelection',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ModalImageSelection },
    props: Object.keys(argTypes),
    setup() {
      const store = useMaevsiStore()
      store.modalAdd({ id: 'ModalImageSelection', isVisible: true })
    },
    template:
      '<ModalImageSelection v-bind="$props" id="ModalImageSelection">ModalImageSelection</ModalImageSelection>',
  })

export const Default = Template.bind({})

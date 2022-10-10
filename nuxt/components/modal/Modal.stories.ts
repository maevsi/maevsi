import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import Modal from './Modal.vue'
import { useMaevsiStore } from '~/store'

export default {
  component: Modal,
  title: 'modal/Modal',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { Modal },
    props: Object.keys(argTypes),
    setup() {
      const store = useMaevsiStore()
      store.modalAdd({
        contentBody: 'contentBody',
        id: 'Modal',
        isVisible: true,
      })
    },
    template: '<Modal v-bind="$props" id="Modal">Modal</Modal>',
  })

export const Default = Template.bind({})

Default.args = {
  submitName: 'submitName',
  submitTaskProvider: () => Promise.resolve(),
}

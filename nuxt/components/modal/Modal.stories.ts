import { Store } from 'vuex'

import Modal from './Modal.vue'
import { defineComponent } from '#app'

export default {
  component: Modal,
  title: 'modal/Modal',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Modal },
    props: Object.keys(argTypes),
    store: new Store({
      state: {
        modals: [{ contentBody: 'contentBody', id: 'Modal', isVisible: true }],
      },
      getters: {
        modals: (state) => state.modals,
      },
    }),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Modal v-bind="$props" id="Modal">Modal</Modal>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  submitName: 'submitName',
  submitTaskProvider: () => Promise.resolve(),
}

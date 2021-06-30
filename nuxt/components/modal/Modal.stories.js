import Vuex from 'vuex'

import Modal from './Modal.vue'

export default {
  component: Modal,
  title: 'modal/Modal',
}

const Template = (_, { argTypes }) => ({
  components: { Modal },
  props: Object.keys(argTypes),
  store: new Vuex.Store({
    state: {
      modals: [{ contentBody: 'contentBody', id: 'Modal', isVisible: true }],
    },
  }),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<Modal v-bind="$props" id="Modal">Modal</Modal>',
})

export const Default = Template.bind({})
Default.args = {
  isStorybook: true,
  submitName: 'submitName',
  submitTaskProvider: () => Promise.resolve(),
}

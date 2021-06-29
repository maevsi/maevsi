import CardAlert from './CardAlert.vue'

export default {
  component: CardAlert,
  title: 'card/CardAlert',
}

const Template = (_, { argTypes }) => ({
  components: { CardAlert },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<CardAlert v-bind="$props">CardAlert</CardAlert>',
})

export const Default = Template.bind({})

export const Error = Template.bind({})
Error.args = {
  errorMessage: 'errorMessage',
}

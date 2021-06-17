import Error from './Error.vue'

export default {
  component: Error,
  title: 'Error',
}

const Template = (_, { argTypes }) => ({
  components: { Error },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<Error v-bind="$props">Error</Error>',
})

export const Default = Template.bind({})
Default.args = {
  statusCode: 400,
}

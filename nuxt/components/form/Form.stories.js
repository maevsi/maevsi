import Form from './Form.vue'

export default {
  component: Form,
  title: 'form/Form',
}

const Template = (_, { argTypes }) => ({
  components: { Form },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<Form v-bind="$props">Form</Form>',
})

export const Default = Template.bind({})
Default.args = {
  form: {},
  formSent: false,
  graphqlErrorMessage: undefined,
}

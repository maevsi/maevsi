import FormInputSuccess from './FormInputSuccess.vue'

export default {
  component: FormInputSuccess,
  title: 'form/input/FormInputSuccess',
}

const Template = (_, { argTypes }) => ({
  components: { FormInputSuccess },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<FormInputSuccess v-bind="$props">FormInputSuccess</FormInputSuccess>',
})

export const Default = Template.bind({})
Default.args = {
  formInput: {
    $model: 'x',
    $invalid: false,
  },
}

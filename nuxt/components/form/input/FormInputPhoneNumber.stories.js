import FormInputPhoneNumber from './FormInputPhoneNumber.vue'

export default {
  component: FormInputPhoneNumber,
  title: 'form/input/FormInputPhoneNumber',
}

const Template = (_, { argTypes }) => ({
  components: { FormInputPhoneNumber },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<FormInputPhoneNumber v-bind="$props">FormInputPhoneNumber</FormInputPhoneNumber>',
})

export const Default = Template.bind({})
Default.args = {
  formElement: {},
}

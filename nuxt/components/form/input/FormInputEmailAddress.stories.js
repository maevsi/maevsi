import FormInputEmailAddress from './FormInputEmailAddress.vue'

export default {
  component: FormInputEmailAddress,
  title: 'form/input/FormInputEmailAddress',
}

const Template = (_, { argTypes }) => ({
  components: { FormInputEmailAddress },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<FormInputEmailAddress v-bind="$props">FormInputEmailAddress</FormInputEmailAddress>',
})

export const Default = Template.bind({})
Default.args = {
  formElement: {},
}

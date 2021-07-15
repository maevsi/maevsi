import FormInputPassword from './FormInputPassword.vue'

export default {
  component: FormInputPassword,
  title: 'form/input/FormInputPassword',
}

const Template = (_, { argTypes }) => ({
  components: { FormInputPassword },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<FormInputPassword v-bind="$props">FormInputPassword</FormInputPassword>',
})

export const Default = Template.bind({})
Default.args = {
  id: 'id',
  formInput: {},
}

import FormInputUsername from './FormInputUsername.vue'

export default {
  component: FormInputUsername,
  title: 'form/input/FormInputUsername',
}

const Template = (_, { argTypes }) => ({
  components: { FormInputUsername },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<FormInputUsername v-bind="$props">FormInputUsername</FormInputUsername>',
})

export const Default = Template.bind({})
Default.args = {
  id: 'id',
  formInput: {},
}

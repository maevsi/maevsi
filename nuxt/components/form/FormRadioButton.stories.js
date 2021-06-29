import FormRadioButton from './FormRadioButton.vue'

export default {
  component: FormRadioButton,
  title: 'form/FormRadioButton',
}

const Template = (_, { argTypes }) => ({
  components: { FormRadioButton },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<FormRadioButton v-bind="$props">FormRadioButton</FormRadioButton>',
})

export const Default = Template.bind({})
Default.args = {
  title: 'title',
  value: 'value',
}

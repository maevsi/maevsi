import FormCheckbox from './FormCheckbox.vue'

export default {
  component: FormCheckbox,
  title: 'form/FormCheckbox',
}

const Template = (_, { argTypes }) => ({
  components: { FormCheckbox },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<FormCheckbox v-bind="$props">FormCheckbox</FormCheckbox>',
})

export const Default = Template.bind({})

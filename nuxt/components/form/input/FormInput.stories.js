import FormInput from './FormInput.vue'

export default {
  component: FormInput,
  title: 'form/input/FormInput',
}

const Template = (_, { argTypes }) => ({
  components: { FormInput },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<FormInput v-bind="$props">FormInput</FormInput>',
})

export const Default = Template.bind({})

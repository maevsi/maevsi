import FormInputWarning from './FormInputWarning.vue'

export default {
  component: FormInputWarning,
  title: 'form/input/FormInputWarning',
}

const Template = (_, { argTypes }) => ({
  components: { FormInputWarning },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<FormInputWarning v-bind="$props">FormInputWarning</FormInputWarning>',
})

export const Default = Template.bind({})

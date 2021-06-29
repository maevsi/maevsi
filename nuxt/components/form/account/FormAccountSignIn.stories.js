import FormAccountSignIn from './FormAccountSignIn.vue'

export default {
  component: FormAccountSignIn,
  title: 'form/accout/FormAccountSignIn',
}

const Template = (_, { argTypes }) => ({
  components: { FormAccountSignIn },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<FormAccountSignIn v-bind="$props">FormAccountSignIn</FormAccountSignIn>',
})

export const Default = Template.bind({})

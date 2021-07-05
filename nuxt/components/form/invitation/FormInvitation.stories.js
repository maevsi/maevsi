import FormInvitation from './FormInvitation.vue'

export default {
  component: FormInvitation,
  title: 'form/invitation/FormInvitation',
}

const Template = (_, { argTypes }) => ({
  components: { FormInvitation },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<FormInvitation v-bind="$props">FormInvitation</FormInvitation>',
})

export const Default = Template.bind({})
Default.args = {
  event: {},
}

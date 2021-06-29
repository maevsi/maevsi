import FormEventInvitation from './FormEventInvitation.vue'

export default {
  component: FormEventInvitation,
  title: 'form/event/FormEventInvitation',
}

const Template = (_, { argTypes }) => ({
  components: { FormEventInvitation },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<FormEventInvitation v-bind="$props">FormEventInvitation</FormEventInvitation>',
})

export const Default = Template.bind({})
Default.args = {
  event: {},
}

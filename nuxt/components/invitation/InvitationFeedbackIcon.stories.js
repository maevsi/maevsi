import InvitationFeedbackIcon from './InvitationFeedbackIcon.vue'

export default {
  component: InvitationFeedbackIcon,
  title: 'invitation/InvitationFeedbackIcon',
}

const Template = (_, { argTypes }) => ({
  components: { InvitationFeedbackIcon },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<InvitationFeedbackIcon v-bind="$props">InvitationFeedbackIcon</InvitationFeedbackIcon>',
})

export const Default = Template.bind({})
Default.args = {
  feedback: 'ACCEPTED',
}

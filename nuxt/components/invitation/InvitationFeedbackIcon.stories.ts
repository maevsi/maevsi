import { defineComponent } from 'vue'
import InvitationFeedbackIcon from './InvitationFeedbackIcon.vue'

export default {
  component: InvitationFeedbackIcon,
  title: 'invitation/InvitationFeedbackIcon',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { InvitationFeedbackIcon },
    props: Object.keys(argTypes),
    template:
      '<InvitationFeedbackIcon v-bind="$props">InvitationFeedbackIcon</InvitationFeedbackIcon>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  feedback: 'ACCEPTED',
}

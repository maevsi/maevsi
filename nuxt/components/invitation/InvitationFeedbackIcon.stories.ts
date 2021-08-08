import { defineComponent } from '@nuxtjs/composition-api'
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
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<InvitationFeedbackIcon v-bind="$props">InvitationFeedbackIcon</InvitationFeedbackIcon>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  feedback: 'ACCEPTED',
}

import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import InvitationFeedbackIcon from './InvitationFeedbackIcon.vue'

export default {
  component: InvitationFeedbackIcon,
  title: 'invitation/InvitationFeedbackIcon',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { InvitationFeedbackIcon },
    props: Object.keys(argTypes),
    template:
      '<InvitationFeedbackIcon v-bind="$props">InvitationFeedbackIcon</InvitationFeedbackIcon>',
  })

export const Default = Template.bind({})
Default.args = {
  feedback: 'ACCEPTED',
}

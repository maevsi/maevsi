import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormAccountPasswordResetRequest from './FormAccountPasswordResetRequest.vue'

export default {
  component: FormAccountPasswordResetRequest,
  title: 'form/account/password/FormAccountPasswordResetRequest',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormAccountPasswordResetRequest },
    props: Object.keys(argTypes),
    template:
      '<FormAccountPasswordResetRequest v-bind="$props">FormAccountPasswordResetRequest</FormAccountPasswordResetRequest>',
  })

export const Default = Template.bind({})

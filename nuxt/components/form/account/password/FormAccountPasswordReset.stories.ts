import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormAccountPasswordReset from './FormAccountPasswordReset.vue'

export default {
  component: FormAccountPasswordReset,
  title: 'form/account/password/FormAccountPasswordReset',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormAccountPasswordReset },
    props: Object.keys(argTypes),
    template:
      '<FormAccountPasswordReset v-bind="$props">FormAccountPasswordReset</FormAccountPasswordReset>',
  })

export const Default = Template.bind({})

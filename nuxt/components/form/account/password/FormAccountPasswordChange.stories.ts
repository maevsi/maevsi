import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormAccountPasswordChange from './FormAccountPasswordChange.vue'

export default {
  component: FormAccountPasswordChange,
  title: 'form/account/password/FormAccountPasswordChange',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormAccountPasswordChange },
    props: Object.keys(argTypes),
    template:
      '<FormAccountPasswordChange v-bind="$props">FormAccountPasswordChange</FormAccountPasswordChange>',
  })

export const Default = Template.bind({})

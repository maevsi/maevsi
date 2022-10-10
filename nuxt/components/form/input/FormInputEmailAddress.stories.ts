import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormInputEmailAddress from './FormInputEmailAddress.vue'

export default {
  component: FormInputEmailAddress,
  title: 'form/input/FormInputEmailAddress',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormInputEmailAddress },
    props: Object.keys(argTypes),
    template:
      '<FormInputEmailAddress v-bind="$props">FormInputEmailAddress</FormInputEmailAddress>',
  })

export const Default = Template.bind({})
Default.args = {
  formInput: {},
}

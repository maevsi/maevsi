import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormInputPhoneNumber from './FormInputPhoneNumber.vue'

export default {
  component: FormInputPhoneNumber,
  title: 'form/input/FormInputPhoneNumber',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormInputPhoneNumber },
    props: Object.keys(argTypes),
    template:
      '<FormInputPhoneNumber v-bind="$props">FormInputPhoneNumber</FormInputPhoneNumber>',
  })

export const Default = Template.bind({})
Default.args = {
  formInput: {},
}

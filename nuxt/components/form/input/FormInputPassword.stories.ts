import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormInputPassword from './FormInputPassword.vue'

export default {
  component: FormInputPassword,
  title: 'form/input/FormInputPassword',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormInputPassword },
    props: Object.keys(argTypes),
    template:
      '<FormInputPassword v-bind="$props">FormInputPassword</FormInputPassword>',
  })

export const Default = Template.bind({})
Default.args = {
  formInput: {},
}

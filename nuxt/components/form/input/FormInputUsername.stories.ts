import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormInputUsername from './FormInputUsername.vue'

export default {
  component: FormInputUsername,
  title: 'form/input/FormInputUsername',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormInputUsername },
    props: Object.keys(argTypes),
    template:
      '<FormInputUsername v-bind="$props">FormInputUsername</FormInputUsername>',
  })

export const Default = Template.bind({})
Default.args = {
  formInput: {},
}

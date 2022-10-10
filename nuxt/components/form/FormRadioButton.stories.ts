import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormRadioButton from './FormRadioButton.vue'

export default {
  component: FormRadioButton,
  title: 'form/FormRadioButton',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormRadioButton },
    props: Object.keys(argTypes),
    template:
      '<FormRadioButton v-bind="$props">FormRadioButton</FormRadioButton>',
  })

export const Default = Template.bind({})
Default.args = {
  title: 'title',
  value: 'value',
}

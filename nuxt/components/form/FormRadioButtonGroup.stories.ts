import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormRadioButtonGroup from './FormRadioButtonGroup.vue'

export default {
  component: FormRadioButtonGroup,
  title: 'form/FormRadioButtonGroup',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormRadioButtonGroup },
    props: Object.keys(argTypes),
    template:
      '<FormRadioButtonGroup v-bind="$props">FormRadioButtonGroup</FormRadioButtonGroup>',
  })

export const Default = Template.bind({})
Default.args = {
  titlesValues: ['a', 'b'],
}

import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormInputStateWarning from './FormInputStateWarning.vue'

export default {
  component: FormInputStateWarning,
  title: 'form/input/state/FormInputStateWarning',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormInputStateWarning },
    props: Object.keys(argTypes),
    template:
      '<FormInputStateWarning v-bind="$props">FormInputStateWarning</FormInputStateWarning>',
  })

export const Default = Template.bind({})

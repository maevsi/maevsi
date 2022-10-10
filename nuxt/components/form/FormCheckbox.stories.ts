import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormCheckbox from './FormCheckbox.vue'

export default {
  component: FormCheckbox,
  title: 'form/FormCheckbox',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormCheckbox },
    props: Object.keys(argTypes),
    template: '<FormCheckbox v-bind="$props">FormCheckbox</FormCheckbox>',
  })

export const Default = Template.bind({})

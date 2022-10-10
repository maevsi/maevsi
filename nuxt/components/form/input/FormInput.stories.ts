import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormInput from './FormInput.vue'

export default {
  component: FormInput,
  title: 'form/input/FormInput',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormInput },
    props: Object.keys(argTypes),
    template: '<FormInput v-bind="$props">FormInput</FormInput>',
  })

export const Default = Template.bind({})

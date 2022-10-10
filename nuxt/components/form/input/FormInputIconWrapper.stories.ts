import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormInputIconWrapper from './FormInputIconWrapper.vue'

export default {
  component: FormInputIconWrapper,
  title: 'form/input/FormInputIconWrapper',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormInputIconWrapper },
    props: Object.keys(argTypes),
    template:
      '<FormInputIconWrapper v-bind="$props">FormInputIconWrapper</FormInputIconWrapper>',
  })

export const Default = Template.bind({})

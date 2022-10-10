import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormInputState from './FormInputState.vue'

export default {
  component: FormInputState,
  title: 'form/input/state/FormInputState',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormInputState },
    props: Object.keys(argTypes),
    template: '<FormInputState v-bind="$props">FormInputState</FormInputState>',
  })

export const Default = Template.bind({})

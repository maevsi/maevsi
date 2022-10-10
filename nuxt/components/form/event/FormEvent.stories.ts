import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormEvent from './FormEvent.vue'

export default {
  component: FormEvent,
  title: 'form/event/FormEvent',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormEvent },
    props: Object.keys(argTypes),
    template: '<FormEvent v-bind="$props">FormEvent</FormEvent>',
  })

export const Default = Template.bind({})

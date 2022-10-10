import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import DropDown from './DropDown.vue'

export default {
  component: DropDown,
  title: 'DropDown',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { DropDown },
    props: Object.keys(argTypes),
    template: '<DropDown v-bind="$props">DropDown</DropDown>',
  })

export const Default = Template.bind({})

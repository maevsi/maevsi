import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconDotsVertical from './IconDotsVertical.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconDotsVertical,
  title: 'icon/IconDotsVertical',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconDotsVertical },
    props: Object.keys(argTypes),
    template:
      '<IconDotsVertical v-bind="$props" @click="click">IconDotsVertical</IconDotsVertical>',
  })

export const Default = Template.bind({})

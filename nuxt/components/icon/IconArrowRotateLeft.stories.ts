import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconArrowRotateLeft from './IconArrowRotateLeft.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconArrowRotateLeft,
  title: 'icon/IconArrowRotateLeft',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconArrowRotateLeft },
    props: Object.keys(argTypes),
    template:
      '<IconArrowRotateLeft v-bind="$props" @click="click">IconArrowRotateLeft</IconArrowRotateLeft>',
  })

export const Default = Template.bind({})

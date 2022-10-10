import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconArrowLeft from './IconArrowLeft.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconArrowLeft,
  title: 'icon/IconArrowLeft',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconArrowLeft },
    props: Object.keys(argTypes),
    template:
      '<IconArrowLeft v-bind="$props" @click="click">IconArrowLeft</IconArrowLeft>',
  })

export const Default = Template.bind({})

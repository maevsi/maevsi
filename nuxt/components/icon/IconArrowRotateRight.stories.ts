import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconArrowRotateRight from './IconArrowRotateRight.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconArrowRotateRight,
  title: 'icon/IconArrowRotateRight',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconArrowRotateRight },
    props: Object.keys(argTypes),
    template:
      '<IconArrowRotateRight v-bind="$props" @click="click">IconArrowRotateRight</IconArrowRotateRight>',
  })

export const Default = Template.bind({})

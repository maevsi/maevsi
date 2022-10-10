import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconEyeOff from './IconEyeOff.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconEyeOff,
  title: 'icon/IconEyeOff',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconEyeOff },
    props: Object.keys(argTypes),
    template:
      '<IconEyeOff v-bind="$props" @click="click">IconEyeOff</IconEyeOff>',
  })

export const Default = Template.bind({})

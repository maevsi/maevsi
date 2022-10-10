import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconHourglass from './IconHourglass.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconHourglass,
  title: 'icon/IconHourglass',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconHourglass },
    props: Object.keys(argTypes),
    template:
      '<IconHourglass v-bind="$props" @click="click">IconHourglass</IconHourglass>',
  })

export const Default = Template.bind({})

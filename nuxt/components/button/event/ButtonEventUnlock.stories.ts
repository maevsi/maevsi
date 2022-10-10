import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import ButtonEventUnlock from './ButtonEventUnlock.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: ButtonEventUnlock,
  title: 'button/ButtonEventUnlock',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ButtonEventUnlock },
    props: Object.keys(argTypes),
    template:
      '<ButtonEventUnlock v-bind="$props" @click="click">ButtonEventUnlock</ButtonEventUnlock>',
  })

export const Default = Template.bind({})

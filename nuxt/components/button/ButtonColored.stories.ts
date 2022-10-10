import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import ButtonColored from './ButtonColored.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: ButtonColored,
  title: 'button/ButtonColored',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ButtonColored },
    props: Object.keys(argTypes),
    template:
      '<ButtonColored v-bind="$props" @click="click">ButtonColored</ButtonColored>',
  })

export const Default = Template.bind({})
Default.args = {
  ariaLabel: 'ButtonColored',
}

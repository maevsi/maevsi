import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import MaevsiButton from './Button.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: MaevsiButton,
  title: 'button/Button',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { MaevsiButton },
    props: Object.keys(argTypes),
    template: '<Button v-bind="$props" @click="click">Button</Button>',
  })

export const Default = Template.bind({})
Default.args = {
  ariaLabel: 'Button',
}

export const Disabled = Template.bind({})
Disabled.args = {
  ariaLabel: 'Button',
  disabled: true,
}

import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import ButtonText from './ButtonText.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: ButtonText,
  title: 'button/ButtonText',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ButtonText },
    props: Object.keys(argTypes),
    template:
      '<ButtonText v-bind="$props" @click="click"><IconHome /></ButtonText>',
  })

export const Default = Template.bind({})
Default.args = {
  ariaLabel: 'ButtonText',
}

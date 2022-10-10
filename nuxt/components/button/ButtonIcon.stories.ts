import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import ButtonIcon from './ButtonIcon.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: ButtonIcon,
  title: 'button/ButtonIcon',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ButtonIcon },
    props: Object.keys(argTypes),
    template:
      '<ButtonIcon v-bind="$props" @click="click"><IconHome /></ButtonIcon>',
  })

export const Default = Template.bind({})
Default.args = {
  ariaLabel: 'ButtonIcon',
}

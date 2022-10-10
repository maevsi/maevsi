import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import ButtonMenu from './ButtonMenu.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: ButtonMenu,
  title: 'button/ButtonMenu',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ButtonMenu },
    props: Object.keys(argTypes),
    template:
      '<ButtonMenu v-bind="$props" @click="click">ButtonMenu</ButtonMenu>',
  })

export const Default = Template.bind({})

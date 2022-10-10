import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import ButtonHome from './ButtonHome.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: ButtonHome,
  title: 'button/ButtonHome',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ButtonHome },
    props: Object.keys(argTypes),
    template:
      '<ButtonHome v-bind="$props" @click="click">ButtonHome</ButtonHome>',
  })

export const Default = Template.bind({})

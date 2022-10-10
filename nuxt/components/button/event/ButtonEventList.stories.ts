import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import ButtonEventList from './ButtonEventList.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: ButtonEventList,
  title: 'button/ButtonEventList',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ButtonEventList },
    props: Object.keys(argTypes),
    template:
      '<ButtonEventList v-bind="$props" @click="click">ButtonEventList</ButtonEventList>',
  })

export const Default = Template.bind({})

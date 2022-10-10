import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import ButtonEventNew from './ButtonEventNew.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: ButtonEventNew,
  title: 'button/ButtonEventNew',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ButtonEventNew },
    props: Object.keys(argTypes),
    template:
      '<ButtonEventNew v-bind="$props" @click="click">ButtonEventNew</ButtonEventNew>',
  })

export const Default = Template.bind({})

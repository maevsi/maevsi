import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import ButtonSignIn from './ButtonSignIn.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: ButtonSignIn,
  title: 'button/ButtonSignIn',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ButtonSignIn },
    props: Object.keys(argTypes),
    template:
      '<ButtonSignIn v-bind="$props" @click="click">ButtonSignIn</ButtonSignIn>',
  })

export const Default = Template.bind({})

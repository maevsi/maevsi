import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconSignIn from './IconSignIn.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconSignIn,
  title: 'icon/IconSignIn',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconSignIn },
    props: Object.keys(argTypes),
    template:
      '<IconSignIn v-bind="$props" @click="click">IconSignIn</IconSignIn>',
  })

export const Default = Template.bind({})

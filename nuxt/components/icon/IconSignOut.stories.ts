import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconSignOut from './IconSignOut.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconSignOut,
  title: 'icon/IconSignOut',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconSignOut },
    props: Object.keys(argTypes),
    template:
      '<IconSignOut v-bind="$props" @click="click">IconSignOut</IconSignOut>',
  })

export const Default = Template.bind({})

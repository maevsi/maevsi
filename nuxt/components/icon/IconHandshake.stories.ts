import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconHandshake from './IconHandshake.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconHandshake,
  title: 'icon/IconHandshake',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconHandshake },
    props: Object.keys(argTypes),
    template:
      '<IconHandshake v-bind="$props" @click="click">IconHandshake</IconHandshake>',
  })

export const Default = Template.bind({})

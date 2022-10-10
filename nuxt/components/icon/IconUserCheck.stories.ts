import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconUserCheck from './IconUserCheck.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconUserCheck,
  title: 'icon/IconUserCheck',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconUserCheck },
    props: Object.keys(argTypes),
    template:
      '<IconUserCheck v-bind="$props" @click="click">IconUserCheck</IconUserCheck>',
  })

export const Default = Template.bind({})

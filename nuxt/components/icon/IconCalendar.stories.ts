import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconCalendar from './IconCalendar.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconCalendar,
  title: 'icon/IconCalendar',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconCalendar },
    props: Object.keys(argTypes),
    template:
      '<IconCalendar v-bind="$props" @click="click">IconCalendar</IconCalendar>',
  })

export const Default = Template.bind({})

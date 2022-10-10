import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import EventDashlet from './EventDashlet.vue'

export default {
  component: EventDashlet,
  title: 'event/dashlet/EventDashlet',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { EventDashlet },
    props: Object.keys(argTypes),
    template: '<EventDashlet v-bind="$props">EventDashlet</EventDashlet>',
  })

export const Default = Template.bind({})

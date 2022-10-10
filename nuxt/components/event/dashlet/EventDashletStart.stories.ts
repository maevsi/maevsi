import { Story } from '@storybook/vue3'
import MockDate from 'mockdate'

import { defineComponent } from 'vue'
import EventDashletStart from './EventDashletStart.vue'

MockDate.set('1970-01-01 00:00:00')

export default {
  component: EventDashletStart,
  title: 'event/dashlet/EventDashletStart',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { EventDashletStart },
    props: Object.keys(argTypes),
    template:
      '<EventDashletStart v-bind="$props">EventDashletStart</EventDashletStart>',
  })

export const Default = Template.bind({})
Default.args = {
  event: {
    start: new Date(),
  },
}

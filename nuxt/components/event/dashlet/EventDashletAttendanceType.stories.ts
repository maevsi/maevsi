import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import EventDashletAttendanceType from './EventDashletAttendanceType.vue'

export default {
  component: EventDashletAttendanceType,
  title: 'event/dashlet/EventDashletAttendanceType',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { EventDashletAttendanceType },
    props: Object.keys(argTypes),
    template:
      '<EventDashletAttendanceType v-bind="$props">EventDashletAttendanceType</EventDashletAttendanceType>',
  })

export const Default = Template.bind({})
Default.args = {
  event: {
    isInPerson: true,
    isRemote: true,
  },
}

export const One = Template.bind({})
One.args = {
  event: {
    isInPerson: true,
    isRemote: false,
  },
}

import EventDashletAttendanceType from './EventDashletAttendanceType.vue'

import { defineComponent } from '#app'

export default {
  component: EventDashletAttendanceType,
  title: 'event/dashlet/EventDashletAttendanceType',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { EventDashletAttendanceType },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<EventDashletAttendanceType v-bind="$props">EventDashletAttendanceType</EventDashletAttendanceType>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  event: {
    isInPerson: true,
    isRemote: true,
  },
}

export const One = Template.bind({})
// @ts-ignore
One.args = {
  event: {
    isInPerson: true,
    isRemote: false,
  },
}

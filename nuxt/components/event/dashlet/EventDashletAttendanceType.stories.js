import EventDashletAttendanceType from './EventDashletAttendanceType.vue'

export default {
  component: EventDashletAttendanceType,
  title: 'event/dashlet/EventDashletAttendanceType',
}

const Template = (_, { argTypes }) => ({
  components: { EventDashletAttendanceType },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
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

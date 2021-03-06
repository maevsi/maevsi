import EventDashletDuration from './EventDashletDuration.vue'

export default {
  component: EventDashletDuration,
  title: 'event/dashlet/EventDashletDuration',
}

const Template = (_, { argTypes }) => ({
  components: { EventDashletDuration },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<EventDashletDuration v-bind="$props">EventDashletDuration</EventDashletDuration>',
})

export const Default = Template.bind({})
Default.args = {
  event: {
    start: '1970-01-01 00:00:00+00',
    end: '1970-01-01 00:00:00+00',
  },
}

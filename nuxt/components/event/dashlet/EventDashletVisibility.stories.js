import EventDashletVisibility from './EventDashletVisibility.vue'

export default {
  component: EventDashletVisibility,
  title: 'event/dashlet/EventDashletVisibility',
}

const Template = (_, { argTypes }) => ({
  components: { EventDashletVisibility },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<EventDashletVisibility v-bind="$props">EventDashletVisibility</EventDashletVisibility>',
})

export const Default = Template.bind({})
Default.args = {
  event: {
    visibility: 'PUBLIC',
  },
}

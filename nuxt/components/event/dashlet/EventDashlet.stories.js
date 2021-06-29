import EventDashlet from './EventDashlet.vue'

export default {
  component: EventDashlet,
  title: 'event/dashlet/EventDashlet',
}

const Template = (_, { argTypes }) => ({
  components: { EventDashlet },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<EventDashlet v-bind="$props">EventDashlet</EventDashlet>',
})

export const Default = Template.bind({})

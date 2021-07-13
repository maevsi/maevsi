import EventIconVisibility from './EventIconVisibility.vue'

export default {
  component: EventIconVisibility,
  title: 'event/EventIconVisibility',
}

const Template = (_, { argTypes }) => ({
  components: { EventIconVisibility },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<EventIconVisibility v-bind="$props">EventIconVisibility</EventIconVisibility>',
})

export const Default = Template.bind({})
Default.args = {
  event: {
    visibility: 'PUBLIC',
  },
}

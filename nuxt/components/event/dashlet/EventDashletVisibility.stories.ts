import { defineComponent } from '#app'
import EventDashletVisibility from './EventDashletVisibility.vue'

export default {
  component: EventDashletVisibility,
  title: 'event/dashlet/EventDashletVisibility',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { EventDashletVisibility },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<EventDashletVisibility v-bind="$props">EventDashletVisibility</EventDashletVisibility>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  event: {
    visibility: 'PUBLIC',
  },
}

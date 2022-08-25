import { defineComponent } from 'vue'
import EventDashletLocation from './EventDashletLocation.vue'

export default {
  component: EventDashletLocation,
  title: 'event/dashlet/EventDashletLocation',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { EventDashletLocation },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<EventDashletLocation v-bind="$props">EventDashletLocation</EventDashletLocation>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  event: {
    isInPerson: true,
    isRemote: true,
    location: 'Place',
    url: 'https://example.com',
  },
}

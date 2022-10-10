import { defineComponent } from 'vue'
import EventDashlet from './EventDashlet.vue'

export default {
  component: EventDashlet,
  title: 'event/dashlet/EventDashlet',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { EventDashlet },
    props: Object.keys(argTypes),
    template: '<EventDashlet v-bind="$props">EventDashlet</EventDashlet>',
  })

export const Default = Template.bind({})

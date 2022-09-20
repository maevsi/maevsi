import { defineComponent } from 'vue'
import EventIconVisibility from './EventIconVisibility.vue'

export default {
  component: EventIconVisibility,
  title: 'event/EventIconVisibility',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { EventIconVisibility },
    props: Object.keys(argTypes),
    template:
      '<EventIconVisibility v-bind="$props">EventIconVisibility</EventIconVisibility>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  visibility: 'PUBLIC',
}
